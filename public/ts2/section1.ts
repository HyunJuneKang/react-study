type PersonType = {
  name: string;
  age: number;
};
type StudentType = PersonType & {
  major: string;
};
interface PersonType2 {
  name: string;
  age: number;
}
interface StudentInter extends PersonType2 {
  major: string;
}
const p1: PersonType = { name: "kim", age: 20 };
const p2: PersonType2 = { name: "kim2", age: 30 };
const p3: PersonType = { name: "kim", age: 20 };
const s1: StudentInter = { name: "park", age: 25, major: "컴공" };
const s2: StudentType = { name: "park", age: 25, major: "컴공" };
console.log(p1, p2, p3, s1, s2);
