import { useState, type ChangeEvent } from "react";

type Subject = "Java" | "Web" | "JavaScript" | "Spring";

type User = {
  name: string;
  age: number;
  phone: string;
  subjects: Subject[];
};

const initUser: User = {
  name: "",
  age: 0,
  phone: "",
  subjects: [],
};

export default function UserForm() {
  const SUBJECTS: Subject[] = ["Java", "Web", "JavaScript", "Spring"];
  const [user, setUser] = useState<User>(initUser);
  const [userList, setUserList] = useState<User[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    const key = name as keyof User;

    setUser((previousUser) => ({
      ...previousUser,
      [key]: key === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (): void => {
    if (!user.name || user.age <= 0 || !user.phone) {
      return;
    }

    setUserList((previousList) => [...previousList, user]);

    setUser(initUser);
  };

  const handleSubjectChange = (subject: Subject): void => {
    setUser((prev) => {
      if (!prev) return prev;

      const isSelected = prev.subjects.includes(subject); //배열에 이미 있는지 체크

      return {
        ...prev,
        subjects: isSelected
          ? prev.subjects.filter((s) => s !== subject)
          : [...prev.subjects, subject],
      };
    });
  };

  return (
    <div className="mx-auto max-w-sm space-y-4 rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold text-black">사용자 등록</h2>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="이름"
          className="w-full rounded border px-3 py-2"
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          value={user.age === 0 ? "" : user.age}
          placeholder="나이"
          className="w-full rounded border px-3 py-2"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          value={user.phone}
          placeholder="전화번호"
          className="w-full rounded border px-3 py-2"
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <p className="font-medium">좋아하는 과목</p>
        {SUBJECTS.map((subject) => (
          <label key={subject} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={user?.subjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            {subject}
          </label>
        ))}
      </div>

      <div className="space-y-1 rounded bg-gray-100 p-3 text-black">
        <p>이름: {user.name}</p>
        <p>나이: {user.age || ""}</p>
        <p>전화번호: {user.phone}</p>
        <p>과목:{user.subjects}</p>
      </div>

      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 "
        onClick={handleSubmit}
      >
        배열 등록
      </button>

      {userList.length > 0 ? (
        <div>
          <h2 className="text-lg font-semibold mt-6">등록된 사용자 목록</h2>

          <ul className="mt-4 space-y-2">
            {userList.map((registeredUser, index) => (
              <li
                key={`${registeredUser.phone}-${index}`}
                className="rounded border p-2 text-black"
              >
                <p>이름: {registeredUser.name}</p>
                <p>나이: {registeredUser.age}</p>
                <p>전화번호: {registeredUser.phone}</p>
                <p>과목:{registeredUser.subjects.join(",")}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500">아직 등록된 사용자가 없습니다.</p>
      )}
    </div>
  );
}
