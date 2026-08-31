// [ContextSplit_After.tsx]
// AFTER: State Context와 Dispatch Context를 분리해서 관리
// state가 변경되어도 dispatch만 구독하는 Controls는 다시 렌더링되지 않는다.

import {
  createContext,
  useContext,
  useReducer,
  type Context,
  type Dispatch,
  type ReactNode,
} from "react";

type State = {
  count: number;
  name: string;
};

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_NAME"; payload: string };

const CountStateContext = createContext<State | null>(null);

const CountDispatchContext = createContext<Dispatch<Action> | null>(null);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };

    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
}

function CountProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    name: "아무개",
  });

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

function createContextHook<T>(context: Context<T | null>, hookName: string) {
  return function useSafeContext(): T {
    const value = useContext(context);

    if (value === null) {
      throw new Error(`${hookName} must be used within CountProvider`);
    }

    return value;
  };
}

const useCountState = createContextHook(CountStateContext, "useCountState");

const useCountDispatch = createContextHook(
  CountDispatchContext,
  "useCountDispatch",
);

function Display() {
  const state = useCountState();

  console.count("[After] Display 렌더링");

  return (
    <div className="rounded-lg bg-blue-50 p-4">
      <p className="text-xl font-bold">
        {state.name}의 카운트: {state.count}
      </p>
    </div>
  );
}

function Controls() {
  const dispatch = useCountDispatch();

  console.count("[After] Controls 렌더링");

  return (
    <div className="mt-3 flex gap-3 rounded-lg bg-green-50 p-4">
      <button
        type="button"
        onClick={() => dispatch({ type: "INCREMENT" })}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        + 증가
      </button>

      <button
        type="button"
        onClick={() => dispatch({ type: "DECREMENT" })}
        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
      >
        - 감소
      </button>

      <input
        type="text"
        placeholder="이름 입력"
        onChange={(event) =>
          dispatch({
            type: "SET_NAME",
            payload: event.target.value,
          })
        }
        className="rounded border border-slate-300 px-3 py-2"
      />
    </div>
  );
}

export default function BoardAfter() {
  return (
    <CountProvider>
      <h3 className="mb-3 text-lg font-semibold">
        After: 분리된 Context (해결)
      </h3>

      <Display />
      <Controls />
    </CountProvider>
  );
}
