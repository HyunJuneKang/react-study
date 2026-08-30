import React from "react";

// TODO [난이도★☆☆-①] 이 컴포넌트를 React.memo로 감싸 내보내세요.
function RecalcButton({ onRecalculate }: { onRecalculate: () => void }) {
  console.log("RecalcButton 렌더링");

  // ↓↓↓ 아래 화면(UI) 코드는 완성되어 있습니다. 수정하지 마세요. ↓↓↓
  return (
    <button
      onClick={onRecalculate}
      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
    >
      이자 계산 로그 출력
    </button>
  );
}

export default React.memo(RecalcButton);
