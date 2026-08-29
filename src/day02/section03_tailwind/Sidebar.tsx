export default function Sidebar() {
  return (
    <aside>
      <ul className="space-y-1 text-sm">
        <li
          className="px-3 py-2 rounded cursor-pointer transition-colors text-gray-800"
          key="hover:bg-b;ue-100 hover:text-blue-700"
        >
          직원관리
        </li>
        <li>게시글관리</li>
        <li>계약관리</li>
      </ul>
    </aside>
  );
}
