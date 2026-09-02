import { useRef, useState } from "react";

import useBoardStore from "../types/boardType";
import { useNavigate, useParams } from "react-router-dom";

// 입력 : /board/new  (bno 없음 -> 작성 모드)
// 수정 : /board/:bno/edit (bno 있음 -> 수정 모드, posts에서 직접 조회)

export default function BoardEditor() {
  //const selectedId = useBoardStore((state) => state.selectedId);
  const { bno } = useParams();
  const navigate = useNavigate();
  const isEditMode = bno !== undefined;

  const posts = useBoardStore((state) => state.posts);
  const post = isEditMode
    ? (posts.find((it) => it.bno === Number(bno)) ?? null)
    : null;
  const onCreate = useBoardStore((state) => state.onCreate);
  const onUpdate = useBoardStore((state) => state.onUpdate);

  // 게시글이 선택되면 수정 폼으로 전환, 선택 해제되면 초기화
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [writer, setWriter] = useState(post?.writer ?? "");
  const titleRef = useRef<HTMLInputElement>(null);

  //저장누름, 입력일수도 수정일수도있음
  const onSubmit = () => {
    if (!title.trim() || !content.trim() || !writer.trim()) {
      titleRef.current?.focus();
      return;
    }
    //수정 : 1번을 수정했다면 1번찾기, 내용은 신규입력으로 할당
    if (isEditMode && post) {
      onUpdate(post.bno, title, content, writer);
      navigate(`/board/${post.bno}`); //상세보기로이동
    } else {
      onCreate(title, content, writer);
      navigate("/board"); //목록조회이동
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h4 className="text-xl font-bold mb-4 text-gray-800">
        게시글 {isEditMode ? "수정" : "신규작성"}
      </h4>
      <div className="flex flex-col gap-3">
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          placeholder="작성자"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {isEditMode ? "수정 완료" : "등록완료"}
          </button>
        </div>
      </div>
    </div>
  );
}
