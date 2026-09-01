import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import New from "../pages/New";
import Diary from "../pages/Diary";
import Editor from "../pages/Editor";
import "./DiaryApp.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { mockData } from "../data/mockData.ts";
import {
  DiaryDispatchContext,
  DiaryStateContext,
  type DiaryData,
} from "./DiaryContext";

type Action =
  | { type: "INIT"; data: DiaryData[] }
  | { type: "CREATE"; data: DiaryData }
  | { type: "UPDATE"; data: DiaryData }
  | { type: "DELETE"; targetId: number };

export default function DiaryApp() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date: Date, content: string, emotionId: number) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (
    targetId: number,
    date: Date,
    content: string,
    emotionId: number,
  ) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId: number) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };

  function reducer(state: DiaryData[], action: Action): DiaryData[] {
    switch (action.type) {
      case "INIT": {
        return action.data;
      }

      case "CREATE": {
        return [action.data, ...state];
      }

      case "UPDATE": {
        return state.map((it) => (it.id === action.data.id ? action.data : it));
      }

      case "DELETE": {
        return state.filter((it) => it.id !== action.targetId);
      }

      default: {
        return state;
      }
    }
  }

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/new/:id" element={<New />} />
              <Route
                path="edit"
                element={<Editor initData={null} onSubmit={null} />}
              />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
