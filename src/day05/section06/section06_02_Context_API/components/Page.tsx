// import { useAge } from "../hooks/useAge";
import { useAge } from "../hooks/useAge";
import Section from "./Section";

export default function Page() {
  // const { age } = useAge();
  console.log("Page 렌더링");
  const { age } = useAge();
  return (
    <div>
      <p>나이: {age}</p>
      <Section />
    </div>
  );
}
