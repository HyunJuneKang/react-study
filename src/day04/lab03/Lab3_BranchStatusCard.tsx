// TODO [난이도★☆☆-①] 이 컴포넌트를 React.memo로 감싸 내보내세요.
// 힌트: export default React.memo(BranchStatusCard);
function Lab3_BranchStatusCard({
  name,
  open,
}: {
  name: string;
  open: boolean;
}) {
  console.log(`BranchStatusCard(${name}) 렌더링`);

  // ↓↓↓ 아래 화면(UI) 코드는 완성되어 있습니다. 수정하지 마세요. ↓↓↓
  return (
    <div
      className={`px-4 py-3 rounded-lg border text-center ${
        open ? "bg-green-50 border-green-400" : "bg-gray-100 border-gray-300"
      }`}
    >
      <p className="font-semibold">{name}</p>
      <p className={open ? "text-green-600" : "text-gray-500"}>
        {open ? "영업중" : "마감"}
      </p>
    </div>
  );
}

export default Lab3_BranchStatusCard;
