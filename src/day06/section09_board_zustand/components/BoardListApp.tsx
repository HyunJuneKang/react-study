import useBoardStore from "../types/boardType";
import BoardEditor from "./BoardEditor";
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";

export default function BoardListApp() {
  const posts = useBoardStore((state) => state.posts);
  const selectedId = useBoardStore((state) => state.selectedId);
  const selectedPost = posts.find((it) => it.bno === selectedId) ?? null;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <BoardHeader />
        <BoardEditor key={selectedPost?.bno ?? "empty"} post={selectedPost} />
        <BoardList />
      </div>
    </div>
  );
}
