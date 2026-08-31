// ZUSTAND 버전 : Context/Provider 없이 selector만으로 동일한 최적화
// npm install zustand
// → Controls는 increment/decrement "함수만" 구독하므로 count가
//   바뀌어도 리렌더링되지 않는다 (Context 분리 불필요)

import { create } from "zustand";
type CountStore = {
  count: number;
  name: string;
  increment: () => void;
  decrement: () => void;
  setName: (name: string) => void;
};
// 스토어는 컴포넌트 트리 "바깥"에 딱 한 번 생성된다 (Provider로 감쌀 필요 없음)
const useCountStore = create<CountStore>((set) => ({
  count: 0,
  name: "아무개",
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setName: (name) => set({ name }),
}));

function Display() {
  // count/name "만" 골라서 구독(selector) → 이 값이 바뀔 때만 리렌더링됨
  const count = useCountStore((state) => state.count);
  const name = useCountStore((state) => state.name);
  console.log("[Zustand] Display 렌더링:");
  return (
    <div style={{ background: "#eef4ff", padding: 16, borderRadius: 8 }}>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>
        {name}의 카운트 : {count}
      </p>
    </div>
  );
}

function Controls() {
  // increment/decrement 액션 함수"만" 구독. 이 함수들은 스토어 생성 시
  //    딱 한 번 정의되어 참조가 절대 바뀌지 않으므로, count가 아무리
  //    바뀌어도 Controls는 리렌더링 대상에서 자동으로 제외된다.
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);
  console.log("[Zustand] Controls 렌더링:");
  return (
    <div
      style={{
        background: "#eefaf0",
        padding: 16,
        borderRadius: 8,
        marginTop: 12,
      }}
    >
      <button onClick={increment}>+ 증가</button>
      <button onClick={decrement}>- 감소</button>
    </div>
  );
}
export default function BoardZustand() {
  return (
    <>
      <h3>Zustand 버전: Provider도, Context 분리 필요 없다</h3>
      <Display />
      <Controls />
    </>
  );
}
