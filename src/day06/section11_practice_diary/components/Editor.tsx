import "@/day06/section11_practice_diary/components/Editor.css";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getFormattedDate } from "@/day06/section11_practice_diary/utils/getFormattedDate";
import { emotionList } from "@/day06/section11_practice_diary/utils/emotion";
import Button from "@/day06/section11_practice_diary/components/Button";
import EmotionItem from "@/day06/section11_practice_diary/components/EmotionItem";
import type { Diary, DiaryFormData } from "@/day06/section11_practice_diary/types/diary";

type EditorProps = {
  initData?: Diary;
  onSubmit: (data: DiaryFormData) => void;
};

export default function Editor({ initData, onSubmit }: EditorProps) {
  const navigate = useNavigate();

  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });

  useEffect(() => {
    if (!initData) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      date: getFormattedDate(new Date(initData.date)),
      emotionId: initData.emotionId,
      content: initData.content,
    });
  }, [initData]);

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      date: event.target.value,
    });
  };

  const handleChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...state,
      content: event.target.value,
    });
  };

  const handleChangeEmotion = (emotionId: number) => {
    setState({
      ...state,
      emotionId,
    });
  };

  const handleSubmit = () => {
    if (!state.content.trim()) {
      alert("일기 내용을 입력해주세요.");
      return;
    }

    onSubmit({
      date: new Date(state.date),
      content: state.content,
      emotionId: state.emotionId,
    });
  };

  return (
    <div className="Editor">
      <div className="editor_section">
        <h4>오늘의 날짜</h4>

        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>

      <div className="editor_section">
        <h4>오늘의 감정</h4>

        <div className="emotion_list_wrapper">
          {emotionList.map((emotion) => (
            <EmotionItem
              key={emotion.id}
              {...emotion}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === emotion.id}
            />
          ))}
        </div>
      </div>

      <div className="editor_section">
        <h4>오늘의 일기</h4>

        <div className="input_wrapper">
          <textarea
            placeholder="오늘은 어땠나요?"
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>

      <div className="editor_section bottom_section">
        <Button text="취소하기" type="negative" onClick={() => navigate(-1)} />

        <Button text="작성 완료" type="positive" onClick={handleSubmit} />
      </div>
    </div>
  );
}
