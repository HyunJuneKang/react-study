import type { UserType } from "../../common/utils";

type UserProps = {
  name: string;
  age: number;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickHandler?: () => void;
  f1Call?: (a: number, b: number) => number;
};
//<UserCard name="kim"  age={20}/>
//Property변수이름은 자유
//구조분해할당
//const v1: UserProps = { name: "kim", age: 20 };
//const { name, age } = v1;
//console.log(name, age);
export default function UserCard(props2: UserProps) {
  const { name, age, changeHandler, onClickHandler, f1Call } = props2;
  //const result = f1Call && f1Call(10, 20);
  //console.log("함수호출:" + result);
  return (
    <div>
      <h1>UserCard의 속성 받기1 </h1>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
      <button onClick={() => f1Call && f1Call(10, 20)}>함수호출</button>

      <button onClick={onClickHandler}>버튼이 이벤트로출하기</button>
      <input onChange={changeHandler} />
    </div>
  );
}

export function UserCard2({ name, age }: UserProps) {
  return (
    <div>
      <h1>UserCard의 속성 받기2 </h1>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
}

export function UserCard3({ id, name, email, phone }: UserType) {
  return (
    <div>
      <h1>UserCard의 속성 받기3 </h1>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>email: {email ?? "data없음"}</p>
      <p>phone: {phone ?? "data없음"}</p>
    </div>
  );
}
