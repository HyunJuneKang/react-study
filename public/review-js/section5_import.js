import person, { f1, f2, person2 } from "./section3.js";
import { clean, baseData } from "./section4.js";

console.log(person, person2);
console.log(f1(), f2());
console.log(baseData);
console.log(clean("모듈사용"));

const a = 100;
const f3 = function () {};
console.log(a);
console.log(f3, typeof f3);

function call() {
  console.log("1.선언적함수");
}
const call2 = function () {
  console.log("2.리터럴방식");
};
const call3 = () => console.log("3.화살표함수");
call();
call2();
call3();

//----------구조분해 할당
const subject = ["자바스크립트", "리엑트"]; // iterable
const student = { studentName: "홍길동", major: "컴공" };

const [v1, v2] = subject;
const { studentName, major } = student;
console.log(`v1=${v1}  v2=${v2}   studentName=${studentName}   major=${major}`);
console.log(subject[0], student.studentName);
//-----------스프레드연산자
const subject2 = [subject, "스프링부트"];
const subject3 = [...subject, "스프링부트"];
console.log(subject2, subject3, subject2[0][1], subject3[1]);
const student2 = { student, 점심메뉴: "해장라면" };
const student3 = { ...student, 점심메뉴: "해장라면" };
console.log(
  student2,
  student3,
  student2.student.studentName,
  student3.studentName,
);

//-------------class
class Animal {
  constructor(name) {
    this.name = name;
    console.log("Animal생성자실행--부모");
  }

  speak() {
    console.log(`${this.name}이 소리를 냅니다.!!--부모`);
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name);
    this.age = age;
    console.log("Dog생성자실행");
  }
  speak() {
    super.speak(); //부모의 메서드 호출
    console.log(`${this.name}가 멍멍 소리를 냅니다.(${this.age})`);
  }
}

const ani = new Animal("에니멀");
ani.speak();
const dog1 = new Dog("멍멍이", 3);
dog1.speak();

const names = ["홍길동", "김길동", "박길동", "김기도"];
const users = [
  { name: "김민석", isActive: true },
  { name: "이남경", isActive: false },
  { name: "정수필", isActive: true },
];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const names2 = names.map((name) => name + "@daum.net");

console.log(names2);
names2.forEach((n) => console.log(n));

//---filter
console.log("====================filter====================");
names
  .filter((n) => n.substring(0, 1) === "김")
  .forEach((aa) => console.log(aa));

users.filter((user) => user.isActive).forEach((uu) => console.log(uu));

const result = numbers.reduce((sum, n) => sum + n, 0);
console.log(result);

//map은 한건씩 들어온 data를 변형에서 return함
names.map((name) => `<li>${name}</li>`).forEach((row) => console.log(row));
