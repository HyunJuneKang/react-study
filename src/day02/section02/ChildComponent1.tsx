export type CustomerType = {
  custId: number;
  custName: string;
  clickHandler2: () => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ChildComponent1(props: CustomerType) {
  const { custId, custName, clickHandler2, changeHandler } = props;
  return (
    <div>
      <h1>고객정보</h1>
      <ul>
        <li>고객번호: {custId}</li>
        <li>고객이름: {custName}</li>
      </ul>
      <button onClick={() => alert("버튼을 클릭함")}>버튼1</button>
      <button onClick={clickHandler2}>버튼2</button>
      <input onChange={changeHandler} />
    </div>
  );
}
