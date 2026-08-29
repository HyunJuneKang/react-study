//type script에서 함수 정의, 사용

//1.선언적 함수...default값 할당
function add(a: number = 100, b: number = 200): number {
  return a + b;
}
//2.화살표함수...default값 할당
const login = (id: string = "admin", pass: string = "1234"): boolean =>
  id === "admin" && pass === "1234";
console.log(add(10, 20), add());
console.log(login("admin", "12345") ? "login성공" : "login실패");
console.log(login() ? "login성공" : "login실패");

//optional : ?
function printUser(name: string, age?: number) {
  if (age) {
    console.log(`name은 ${name} 나이는 ${age}`);
  } else {
    console.log(`name은 ${name} 나이는  몰라요 `);
  }
}
console.log();
printUser("홍길동", 20);
printUser("홍길동2");

function sumArray(arr: number[]): number {
  let sum = 0;
  for (const n of arr) {
    sum += n;
  }
  return sum;
}

function sumArray2(arr: number[]): void {
  let sum = 0;
  for (const n of arr) {
    sum += n;
  }
  console.log(`합계는 ${sum}`);
}

console.log(sumArray([10, 20, 30]), sumArray2([10, 20, 30])); //sumArray2=undefined

//함수타입정의
let addFunc: (a: number, b: number) => number;
addFunc = function (a, b) {
  return a + b;
};
console.log(addFunc(1, 2));
addFunc = function (a, b) {
  return a + b + 123;
};
console.log(addFunc(1, 2));

const addFunc2 = (a: number, b: number): number => a + b;
console.log(addFunc2(1, 2));

//가장일반적
const addFunc3 = (a: number, b: number): number => {
  console.log("======여러줄의 로직======");
  return a + b;
};
console.log(addFunc3(1, 2));

//callback사용하기

function work(callback: (n: number) => number) {
  return callback(10);
}
const result: number = work((n) => n * 2);
console.log(result);

//배열형태로 들어옴 []
function sum1(nums: number[]): number {
  let total = 0;
  for (const n of nums) {
    total += n;
  }
  return total;
}
//매개변수 갯수가 가변
function sum2(...nums: number[]): number {
  let total = 0;
  for (const n of nums) {
    total += n;
  }
  return total;
}
console.log(sum1([10, 20, 30]), sum2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

//자바의 enum과 유사
type UnionType = string | number | boolean;
const v1: UnionType = "hello";
const v2: UnionType = 42;
const v3: UnionType = true;
console.log(v1, v2, v3);

// let anyVar: any = "This is a string";
// console.log(anyVar);
// anyVar = 100;
// console.log(anyVar);
// anyVar = { key: "value" };
// console.log(anyVar);
