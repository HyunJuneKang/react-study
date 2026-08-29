import { Component } from "react";

type ChildProps = {
  title: string;
};
class LifeCycleChild extends Component<ChildProps> {
  constructor(props: ChildProps) {
    super(props);
    console.log("자식 constructor");
  }
  componentDidMount() {
    console.log("자식 componentDidMount");
  }
  shouldComponentUpdate() {
    console.log("자식 shouldComponentUpdate");
    return true; // 항상 리렌더링
  }
  componentDidUpdate() {
    console.log("자식 componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("자식 componentWillUnmount");
  }

  render() {
    console.log("자식 render");
    return (
      <div>
        <hr />
        <h4>자식 컴포넌트 (부모 props: {this.props.title})</h4>
      </div>
    );
  }
}
export default LifeCycleChild;
