import { useContext } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Editor from "@/day06/section11_practice_diary/components/Editor";
import type { DiaryFormData } from "@/day06/section11_practice_diary/types/diary";
import { Header } from "@/day06/section11_practice_diary/components/Header";
import Button from "@/day06/section11_practice_diary/components/Button";
import { useDiary } from "@/day06/section11_practice_diary/hooks/useDiary";
import { DiaryDispatchContext } from "@/day06/section11_practice_diary/contexts/DiaryContext";

export default function Edit() {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  const diaryDispatch = useContext(
    DiaryDispatchContext,
  );

  if (!diaryDispatch) {
    throw new Error(
      "DiaryDispatchContext.Provider 내부에서 사용해야 합니다.",
    );
  }

  const { onDelete, onUpdate } = diaryDispatch;

  const onSubmit = (formData: DiaryFormData) => {
    if (!window.confirm("일기를 정말 수정할까요?")) {
      return;
    }

    if (!id) return;

    onUpdate(
      Number(id),
      formData.date,
      formData.content,
      formData.emotionId,
    );

    navigate("/diary", { replace: true });
  };

  const onClickDelete = () => {
    if (
      !window.confirm(
        "일기를 정말 삭제할까요? 다시 복구되지 않아요!",
      )
    ) {
      return;
    }

    if (!id) return;

    navigate("/diary", { replace: true });
    onDelete(Number(id));
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  }

  return (
    <div>
      <Header
        title="일기 수정하기"
        leftChild={
          <Button
            text="< 뒤로가기"
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          <Button
            text="삭제하기"
            type="negative"
            onClick={onClickDelete}
          />
        }
      />

      <Editor
        initData={data}
        onSubmit={onSubmit}
      />
    </div>
  );
}
