import { useRef, useState } from "react";

/*
함수형Componet에서 사용하는 기능제공 
useState()....상태관리, 값이바뀌면 UI다시그린다. 
useEffect()....LifeCycle   useEffect(f, [aa])
useRef()....DOM접근 , 리렌더링되어도 값초기화안됨
*/

type BoardType = {
  bno: number;
  title: string;
  content: string;
  writer: string;
};
const boardArr: BoardType[] = [
  { bno: 1, title: "월요일", content: "졸려", writer: "jin" },
  { bno: 2, title: "화요일", content: "재밋어", writer: "jin" },
  { bno: 3, title: "수요일", content: "배고파", writer: "jin" },
];
export default function BoardForm() {
  const initBoard = { bno: 0, title: "", content: "", writer: "" };
  const [board, setBoard] = useState<BoardType>(initBoard);
  const [boardList, setBoardList] = useState<BoardType[]>(boardArr);
  const bnoRef = useRef<number>(4);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    //setBoard({...board, [name]:value});
    setBoard((prev) => ({ ...prev, [name]: value })); //비동기
  };
  const addClickHandler = () => {
    if (!board.title || !board.content || !board.writer) {
      alert("제목,내용,작성자는 필수입력입니다.");
      return;
    }

    const newBoard = { ...board, bno: bnoRef.current++ };
    setBoardList([...boardList, newBoard]); //비동기
    setBoard(initBoard); //clear
    //console.log(boardList); //잘못된 코드(set이 비동기이기때문에 기존값이 출력된다.)
  };
  return (
    <div className="max-w-sm mx-auto p-4 space-y-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold">게시글 등록</h2>
      <input
        onChange={changeHandler}
        type="text"
        name="title"
        value={board.title}
        placeholder="제목"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        onChange={changeHandler}
        type="text"
        name="content"
        value={board.content}
        placeholder="내용"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        onChange={changeHandler}
        type="text"
        name="writer"
        value={board.writer}
        placeholder="작성자"
        className="w-full border px-3 py-2 rounded"
      />
      <button
        onClick={addClickHandler}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        배열등록
      </button>
      <h2 className="text-lg font-semibold">작성된 게시글 목록</h2>
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-700">
          <tr>
            <th className="px-6 py-4">bno</th>
            <th className="px-6 py-4">제목</th>
            <th className="px-6 py-4">내용</th>
            <th className="px-6 py-4">작성자</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 border-t border-gray-200">
          {boardList &&
            boardList.map((b, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2">{b.bno}</td>
                <td className="px-3 py-2 font-medium text-gray-900">
                  {b.title}
                </td>
                <td className="px-3 py-2">{b.content}</td>
                <td className="px-3 py-2"> {b.writer} </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
