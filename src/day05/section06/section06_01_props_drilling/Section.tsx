import ProfileEditor from "./ProfileEditor";
type PropsType = {
  age: number;
  setAge: (age: number) => void;
};
function Section({ age, setAge }: PropsType) {
  console.log("Section 렌더링");
  return (
    <div>
      <ProfileEditor age={age} setAge={setAge} />
    </div>
  );
}
export default Section;
