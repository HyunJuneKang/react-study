import { Link, useNavigate, useParams } from "react-router-dom";
import useBoardStore from "../types/boardType";

// 상세 : /board/:bno  /board/33
export default function BoardDetail() {
  const { bno } = useParams();
  const navigate = useNavigate();
  const posts = useBoardStore((state) => state.posts);
  const onDelete = useBoardStore((state) => state.onDelete);
  const post = posts.find((it) => it.bno === Number(bno));
  if (!post) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center text-gray-400">
        게시글을 찾을 수 없습니다.
        <div className="mt-4">
          <Link to="/board" className="text-blue-500 hover:underline">
            목록으로
          </Link>
        </div>
      </div>
    );
  }

  const onClickDelete = () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    onDelete(post.bno);
    navigate("/board");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h4 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h4>
      <div className="text-sm text-gray-500 mb-4">
        작성자: {post.writer} ·{" "}
        {post.regDate ? new Date(post.regDate).toLocaleString() : ""}
      </div>
      <p className="text-gray-800 whitespace-pre-wrap mb-6">{post.content}</p>
      <div className="flex gap-2">
        <Link
          to="/board"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
        >
          목록
        </Link>
        {/* /board/123/edit */}
        <Link
          to={`/board/${post.bno}/edit`}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          수정
        </Link>
        <button
          onClick={onClickDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
