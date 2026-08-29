import { Component } from "react";

export class MyClassComp1 extends Component {
  render() {
    return (
      <div>
        <h1>MyClassComp1</h1>
      </div>
    );
  }
}
//class component는 반드시 render()함수가 있어야한다.
//class 내의 함수정의시 function 예약어 불가
export default class MyClassComp2 extends Component {
  f1() {}
  render() {
    return (
      <div>
        <h1>MyClassComp2</h1>
      </div>
    );
  }
}
