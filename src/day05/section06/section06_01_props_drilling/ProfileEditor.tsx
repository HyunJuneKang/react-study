import type { ChangeEvent } from "react";
type PropsType = {
  age: number;
  setAge: (age: number) => void;
};
function ProfileEditor({ age, setAge }: PropsType) {
  console.log("ProfileEditor 렌더링");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };
  return (
    <div className="border-2">
      <p>나이 : {age}</p>
      <span>나이입력</span>
      <input
        className="border-2 border-blue-500"
        type="number"
        onChange={handleChange}
      />
    </div>
  );
}

export default ProfileEditor;
