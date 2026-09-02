import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/day06/section11_practice_diary/components/Button";
import { Header } from "@/day06/section11_practice_diary/components/Header";
import Editor from "@/day06/section11_practice_diary/components/Editor";
import type { DiaryFormData } from "@/day06/section11_practice_diary/types/diary";
import { DiaryDispatchContext } from "@/day06/section11_practice_diary/contexts/DiaryContext";

export default function New() {
  const navigate = useNavigate();

  const diaryDispatch = useContext(
    DiaryDispatchContext,
  );

  if (!diaryDispatch) {
    throw new Error(
      "DiaryDispatchContext.Provider 내부에서 사용해야 합니다.",
    );
  }

  const { onCreate } = diaryDispatch;

  const onSubmit = (formData: DiaryFormData) => {
    onCreate(
      formData.date,
      formData.content,
      formData.emotionId,
    );

    navigate("/diary", { replace: true });
  };

  return (
    <div className="New">
      <Header
        title="새 일기 쓰기"
        leftChild={
          <Button
            text="< 뒤로가기"
            onClick={() => navigate(-1)}
          />
        }
      />

      <Editor onSubmit={onSubmit} />
    </div>
  );
}
