import "./LifeCycleExample.css";
import { Component } from "react";
import LifeCycleChild from "./LifeCycleChild";

// 부모 컴포넌트
type PropsType = object; //Record<string, never>;   속성이 비어있는 경우
type State = {
  title: string;
  childVisible: boolean;
};

class LifeCycleParent extends Component<PropsType, State> {
  constructor(props: PropsType) {
    super(props);
    console.log("부모 constructor");
    this.state = { title: "초기값", childVisible: false };
  }

  componentDidMount() {
    console.log("부모 componentDidMount");
  }
  shouldComponentUpdate(nextState: State): boolean {
    console.log("부모 shouldComponentUpdate");
    // 현재 state와 다음 state가 다를 경우에만 리렌더링하도록 최적화
    return (
      this.state.title !== nextState.title ||
      this.state.childVisible !== nextState.childVisible
    );
  }
  componentDidUpdate() {
    console.log("부모 componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("부모 componentWillUnmount");
  }

  // 부모의 title 상태를 변경하는 핸들러
  titleChangeHandler = () => {
    this.setState({ title: "타이틀 변경됨" });
  };

  // 자식 컴포넌트의 보이기/숨기기 상태를 토글하는 핸들러
  childDisplayHandler = () => {
    this.setState({ childVisible: !this.state.childVisible });
  };

  render() {
    console.log("부모 render");
    return (
      <div className="parent-container">
        <title>Rect타이틀수정..Helmet</title>

        <h3>부모 title : {this.state.title}</h3>
        <div className="button-group">
          <button onClick={this.titleChangeHandler}>부모 타이틀 변경</button>
          <button onClick={this.childDisplayHandler}>
            {this.state.childVisible ? "자식 숨기기" : "자식 보이기"}
          </button>
        </div>

        {/* childVisible 상태가 true일 때만 자식 컴포넌트를 렌더링합니다. */}
        {this.state.childVisible && <LifeCycleChild title={this.state.title} />}
      </div>
    );
  }
}

export default LifeCycleParent;
