import ChildComponent1, { type CustomerType } from "./ChildComponent1";
import UserCard, { UserCard2, UserCard3 } from "./UserCard";

export default function Section2Start() {
  const obj = {
    id: 5678,
    name: "천유진",
    email: "jin@naver.com",
    phone: "010-7896-8989",
  };
  //event는 일어나는 사건, eventHandler : 이벤트발생시의 동작
  const onClickHandler = () => {
    alert("버튼 클릭");
  };
  const f1 = (a: number, b: number): number => {
    alert(`f1함수는 ${a} + ${b} = ${a + b}`);
    return a + b;
  };
  //input태그에서 사용예정 <input onChange={} value=""/>
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input태그에서 사용자가 입력한 값:" + event.target.value);
  };

  const custInfo: CustomerType = {
    custId: 12345,
    custName: "김고객",
    clickHandler2: () => {
      alert("클릭22");
    },
    changeHandler: (e) => {
      console.log(e.target.value);
    },
  };

  return (
    <>
      <ChildComponent1 {...custInfo} />
      <UserCard
        name="kim"
        age={20}
        changeHandler={changeHandler}
        f1Call={f1}
        onClickHandler={onClickHandler}
      />
      <UserCard2 name="park" age={30} />
      <UserCard3
        id={12345}
        name="여도영"
        email="young@naver.com"
        phone="010-1234-5689"
      />
      <UserCard3 {...obj} />
      <UserCard3 id={4545} name="여도영2" />
    </>
  );
}
/*
Property(속성)
부모가 자식에게 전달하는 단방향 데이터

*/
