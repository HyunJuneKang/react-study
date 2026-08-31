// [ContextSplit_Before.tsx]
// BEFORE: State + Dispatch를 하나의 Context에 합쳐서 관리
// → count가 바뀌면 Display뿐 아니라 Controls도 함께 리렌더링됨
//   (Controls는 dispatch만 쓰는데도 불필요하게 다시 그려진다)

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

type State = { count: number; name: string };
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_NAME"; payload: string };

// state와 dispatch를 한 객체로 묶어서 Context 하나로 제공
type ContextType = { state: State; dispatch: Dispatch<Action> };
const CountContext = createContext<ContextType | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "SET_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

function CountProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { count: 0, name: "아무개" });

  // value 객체 자체가 매 렌더링마다 새로 생성됨
  //    → state가 바뀌면 Context를 구독하는 모든 컴포넌트가 리렌더링 대상이 된다
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {children}
    </CountContext.Provider>
  );
}
function useCount() {
  const ctx = useContext(CountContext);
  if (!ctx) throw new Error("useCount must be used within CountProvider");
  return ctx;
}
// Component
function Display() {
  const { state } = useCount();
  console.log("[Before] Display 렌더링");

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-xl font-bold">
        {state.name}의 카운트 : {state.count}
      </p>
    </div>
  );
}

function Controls() {
  // dispatch만 필요한데도 useCount() 안에서 state까지 함께 구독하게 됨
  const { dispatch } = useCount();
  console.log("[Before] Controls 렌더링");

  return (
    <div className="bg-green-50 p-4 rounded-lg mt-3 flex gap-3">
      <button
        onClick={() => dispatch({ type: "INCREMENT" })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        + 증가
      </button>
      <button
        onClick={() => dispatch({ type: "DECREMENT" })}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        - 감소
      </button>
      <input
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
    </div>
  );
}
export default function BoardBefore() {
  return (
    <CountProvider>
      <h3 className="text-lg font-semibold mb-3">
        Before: 합쳐진 Context (문제 상황)
      </h3>
      <Display />
      <Controls />
    </CountProvider>
  );
}
