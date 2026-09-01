import useBoardStore, { type postType } from "../types/boardType";
import { useRef, useState } from "react";

export default function BoardEditor({ post }: { post: postType | null }) {
  const selectedId = useBoardStore((state) => state.selectedId);
  const onCreate = useBoardStore((state) => state.onCreate);
  const onUpdate = useBoardStore((state) => state.onUpdate);

  // 게시글이 선택되면 수정 폼으로 전환, 선택 해제되면 초기화
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [author, setAuthor] = useState(post?.writer ?? "");
  const titleRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      titleRef.current?.focus();
      return;
    }
    if (selectedId !== null) {
      onUpdate(selectedId, title, content, author);
    } else {
      onCreate(title, content, author);
    }
    setTitle("");
    setContent("");
    setAuthor("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
      <h4 className="text-xl font-bold mb-4 text-gray-800">
        게시글 {selectedId !== null ? "수정" : "작성"}
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
            {selectedId !== null ? "수정 완료" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
}
