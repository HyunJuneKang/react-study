import { useState, type ChangeEvent } from "react";

type Board = {
  title: string;
  contents: string;
  writer: string;
};

const initBoard: Board = {
  title: "",
  contents: "",
  writer: "",
};

export default function Board() {
  const [board, setBoard] = useState<Board>(initBoard);
  const [boardList, setBoardList] = useState<Board[]>([]);

  const handleSubmit = (): void => {
    if (!board.title || !board.contents || !board.writer) {
      return;
    }
    setBoardList((previousList) => [...previousList, board]);
    setBoard(initBoard);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    const key = name as keyof Board;

    setBoard((previousBoard) => ({
      ...previousBoard,
      [key]: value,
    }));
  };

  return (
    <div>
      <h1>게시글 등록(Board)</h1>
      <div>
        <input
          type="text"
          name="title"
          value={board.title}
          placeholder="제목"
          className="w-full rounded border px-3 py-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="contents"
          value={board.contents}
          placeholder="내용"
          className="w-full rounded border px-3 py-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="writer"
          value={board.writer}
          placeholder="작성자"
          className="w-full rounded border px-3 py-2"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-success" onClick={handleSubmit}>
        추가
      </button>
      <h2>게시글 목록</h2>
      <div>
        {boardList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>제목</th>
                <th>내용</th>
                <th>작성자</th>
              </tr>
            </thead>
            <tbody>
              {boardList.map((board, index) => (
                <tr key={index}>
                  <td>{board.title}</td>
                  <td>{board.contents}</td>
                  <td>{board.writer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500">아직 등록된 게시글이 없습니다</p>
        )}
      </div>
    </div>
  );
}
