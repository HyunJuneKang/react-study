import Section from "./Section";

type PropsType = {
  age: number;
  setAge: (age: number) => void;
};
function Page({ age, setAge }: PropsType) {
  console.log("Page 렌더링");
  return (
    <div>
      <Section age={age} setAge={setAge} />
    </div>
  );
}
export default Page;
