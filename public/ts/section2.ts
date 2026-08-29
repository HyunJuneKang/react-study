const age: number = 20;
const myname: string = "kim";
const isLogin: boolean = true;
const names: string[] = ["kim", "park", "lee"];
const scores: number[] = [100, 80, 70];

console.log(age, myname, isLogin);
names.forEach((n) => console.log(n));
scores.forEach((n) => console.log(n));

//var는 재선언가능
//let는 재할당가능
//const는 재할당 불가

type PersonType = { name: string; age: number };

const person: PersonType = { name: "kim", age: 20 };
console.log(person);

const person2: PersonType = { name: "park", age: 40 };
console.log(person2);

// person = { name: "kim2", age: 30 };
// console.log(person);

type ScoreArray = number[];
const myScore: ScoreArray = [100, 90, 80];
console.log(myScore);
///////////////////////////////////////////////
type PersonType2 = { name: string; age: number };
interface PersonInterface {
  name: string;
  age: number;
}
//type사용
const person3: PersonType2 = {
  name: "park",
  age: 30,
};
//interface type사용
const person4: PersonInterface = {
  name: "Lee",
  age: 40,
};
console.log(person3, person4);

export {};
