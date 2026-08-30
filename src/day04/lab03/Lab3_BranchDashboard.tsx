type Branch = { name: string; open: boolean };

function Lab3_BranchDashboard() {
  const [branches, setBranches] = useState<Branch[]>([
    { name: "강남지점", open: true },
    { name: "종로지점", open: false },
    { name: "해운대지점", open: true },
  ]);

  // 지점 상태와 무관한 값 — 이 값이 바뀔 때 카드가 리렌더링되는지 확인합니다.
  const [visitorCount, setVisitorCount] = useState<number>(0);

  // TODO [난이도★★☆-②] 특정 지점의 open 값을 반대로 바꾸는 함수를 작성하세요.
  // ⚠️ 주의: branches 배열을 직접 수정(push, 인덱스 대입 등)하지 말고,
  //          map으로 새 배열을 만들어 setBranches에 전달해야 합니다.
  const toggleBranch = (name: string): void => {};

  // TODO [난이도★★★-③] useMemo를 사용해 영업중인 지점 수(openCount)를 계산하세요.
  // 힌트: branches.filter((b) => b.open).length
  // 의존성 배열에는 branches만 넣어야, visitorCount가 바뀔 때 다시 계산하지 않습니다.
  const openCount = 0; // 이 줄을 useMemo 코드로 교체하세요.

  // ↓↓↓ 아래 화면(UI) 코드는 완성되어 있습니다. 수정하지 마세요. ↓↓↓
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        지점 영업상태 대시보드
      </h2>

      <p className="text-center text-gray-600">
        영업중인 지점:{" "}
        <span className="font-semibold text-green-600">{openCount}</span> /{" "}
        {branches.length}
      </p>

      <div className="grid grid-cols-3 gap-3">
        {branches.map((branch) => (
          <button key={branch.name} onClick={() => toggleBranch(branch.name)}>
            <BranchStatusCard name={branch.name} open={branch.open} />
          </button>
        ))}
      </div>

      <div className="border-t pt-4 text-center">
        <p className="text-gray-600 mb-2">오늘 누적 방문자수: {visitorCount}</p>
        <button
          onClick={() => setVisitorCount((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          방문자 +1 (지점 카드와 무관한 상태)
        </button>
      </div>
    </div>
  );
}

export default Lab3_BranchDashboard;
