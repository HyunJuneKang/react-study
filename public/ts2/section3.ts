//Generic 함수: 타입을 나중에 결정하는 함수...들어온 값에 따라 다르게 동작, 하지만 return 타입은 동일해야함. 변경불가
function wrap<T>(value: T): T {
  if (typeof value === "string") {
    console.log("문자열이 들어왔습니다.");
    //return value + ""
    //에러 발생, 컴파일 시점에 T타입이 string인지 확신할 수 없기 때문
  } else if (typeof value === "number") {
    console.log("숫자가 들어왔습니다.");
  }
  return value;
}
console.log(wrap<number>(123), wrap<string>("Hello"), wrap<boolean>(true));

//제네릭없이 Union 타입으로 작성한 함수(깔끔)
function wrap2(value: string | number): string | number {
  if (typeof value === "string") {
    return value.length; // number
  } else {
    return `숫자:${value}`; // string
  }
}
const a = wrap2("hello"); // number
const b = wrap2(10); // string
console.log(a, b);

//제네릭 제한 걸기 (권장안함)
function wrap3<T extends string | number>(value: T): T {
  if (typeof value === "string") {
    console.log("#문자열");
    return (value + "!!!") as T;
  } else if (typeof value === "number") {
    console.log("#숫자");
    return (value + 100) as T;
  }
  return value;
}
const a3 = wrap3("hello"); // number
const b3 = wrap3(10); // string
//const c3 = wrap3(true); // string

console.log(a3, b3);

///////////-----------------제네릭의 가장 일반적인 활용
type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type Customer = {
  name: string;
  age: number;
};
interface Board {
  bno: number;
  title: string;
  writer?: string;
}

const result2: ApiResponse<Customer> = {
  success: true,
  data: {
    name: "kim",
    age: 20,
  },
};
const result3: ApiResponse<Board> = {
  success: true,
  data: {
    bno: 1,
    title: "수요일",
  },
};

console.log(result2.data.name);
console.log(result3.data.title);
