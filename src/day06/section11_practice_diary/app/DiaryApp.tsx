import { Outlet } from "react-router-dom";
import "@/day06/section11_practice_diary/app/DiaryApp.css";
import { useEffect, useReducer, useRef, useState } from "react";
import { mockData } from "@/day06/section11_practice_diary/data/mockData.ts";
import {
  DiaryDispatchContext,
  DiaryStateContext,
} from "@/day06/section11_practice_diary/contexts/DiaryContext";
import type { Diary as DiaryEntry } from "@/day06/section11_practice_diary/types/diary";

type Action =
  | { type: "INIT"; data: DiaryEntry[] }
  | { type: "CREATE"; data: DiaryEntry }
  | { type: "UPDATE"; data: DiaryEntry }
  | { type: "DELETE"; targetId: number };

export default function DiaryApp() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const idRef = useRef(
    Math.max(...mockData.map((diary) => diary.id), 0) + 1,
  );

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

  function reducer(state: DiaryEntry[], action: Action): DiaryEntry[] {
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
            <Outlet />
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}
