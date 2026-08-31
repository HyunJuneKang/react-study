import { useState } from "react";
import Page from "./Page";

export default function App7() {
  console.log("App 렌더링 ");
  const [age, setAge] = useState<number>(20);
  return (
    <div>
      <Page age={age} setAge={setAge} />
    </div>
  );
}
