// 입력 : /board/new  (bno 없음 -> 작성 모드)

import { useNavigate, useParams } from "react-router-dom";
import useBoardStore from "../types/boardType";
import { useRef, useState } from "react";

// 수정 : /board/:bno/edit (bno 있음 -> 수정 모드, posts에서 직접 조회)
export default function BoardEditor() {
  const { bno } = useParams();
  const navigate = useNavigate();
  const isEditMode = bno !== undefined;

  const posts = useBoardStore((state) => state.posts);
  const onCreate = useBoardStore((state) => state.onCreate);
  const onUpdate = useBoardStore((state) => state.onUpdate);

  const post = isEditMode
    ? (posts.find((it) => it.bno === Number(bno)) ?? null)
    : null;

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [author, setAuthor] = useState(post?.writer ?? "");
  const titleRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      titleRef.current?.focus();
      return;
    }
    if (isEditMode && post) {
      onUpdate(post.bno, title, content, author);
      navigate(`/board/${post.bno}`);
    } else {
      onCreate(title, content, author);
      navigate("/board");
    }
  };

  if (isEditMode && !post) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center text-gray-400">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h4 className="text-xl font-bold mb-4 text-gray-800">
        게시글 {isEditMode ? "수정" : "작성"}
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
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="작성자"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {isEditMode ? "수정 완료" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
