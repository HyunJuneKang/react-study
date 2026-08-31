import type { ChangeEvent } from "react";
import { useAge } from "../hooks/useAge";

export default function ProfileEditor() {
  console.log("ProfileEditor 렌더링");

  const { setAge } = useAge();

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };
  return (
    <div className="border-2">
      <span>나이입력:</span>
      <input
        className="border-2 border-blue-500"
        type="number"
        onChange={handleAgeChange}
      />
    </div>
  );
}
