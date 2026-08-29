import { useReducer } from "react";

//1.상태타입
type State = {
  count: number;
  lunch: string;
};

//2.액션타입
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "LUNCH_CHANGE"; menu: string };

//3.초기상태
const initialState: State = {
  count: 0,
  lunch: "아무거나",
};

//4.Reducer함수
function countReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return initialState;
    case "LUNCH_CHANGE":
      return { ...state, lunch: action.menu };
    default:
      return state;
  }
}
//useReducer는 useState의 대체, component의 복잡을 방지하기위함
//useReducer의 사용
//[상태를 관리할 변수, 로직을 호출할 함수이름 ] = useReducer(로직, 초기값)
export default function CounterUsingReduce() {
  //const [count, setCount] = useState<number>(0)
  //dispatch(값) : 값은 countReducer의 2번째로 전달
  //상태값은 첫번째변수의 값이 countReducer의 1번째로 전달
  const [data, dispatch] = useReducer(countReducer, initialState);
  const { count, lunch } = data;
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "LUNCH_CHANGE", menu: event.target.value });
  };
  const incrementHandler = () => {
    dispatch({ type: "INCREMENT" });
  };
  const decrementHandler = () => {
    dispatch({ type: "DECREMENT" });
  };
  const resetHandler = () => {
    dispatch({ type: "RESET" });
  };

  const buttonStyle =
    "mt-5 px-6 py-3 text-xl rounded-full bg-blue-500 text-white";
  return (
    <div>
      <div>
        <h1>점심메뉴 : {lunch}</h1>
      </div>
      <div>
        <h2>Count: {count}</h2>
        점심메뉴입력 :{" "}
        <input className="px-6 py-2 bg-red-300" onChange={changeHandler} />
        <button className={buttonStyle} onClick={incrementHandler}>
          +
        </button>
        <button className={buttonStyle} onClick={decrementHandler}>
          -
        </button>
        <button className={buttonStyle} onClick={resetHandler}>
          Reset
        </button>
      </div>
    </div>
  );
}
