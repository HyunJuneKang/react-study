import { useEffect, useState, type ChangeEvent } from "react";
import { getFormattedDate } from "../util/getFormattedDate";
import { useNavigate } from "react-router-dom";
import { emotionList } from "../util/util";
import Button from "../component/Button";
import EmotionItem from "../component/EmotionItem";
import "./Editor.css";
export default function Editor({ initData, onSubmit }) {
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: "",
  });

  const handleChangeDate = (e: ChangeEvent<HTMLDataElement>) => {
    setState({ ...state, date: e.target.value });
  };
  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, content: e.target.value });
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleSubmit = () => {};
  const handleChangeEmotion = (emotionId: number) => {
    setState({
      ...state,
      emotionId,
    });
  };

  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  return (
    <div className="Editor">
      <div className="editor_section">
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper ">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <h4>오늘의 감정</h4>
      <div className="editor_section emotion_list_wrapper">
        {emotionList.map((it) => (
          <EmotionItem
            key={it.id}
            {...it}
            onClick={handleChangeEmotion}
            isSelected={state.emotionId === it.id}
          />
        ))}
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
        <Button text={"취소하기"} type={"negative"} onClick={handleGoBack} />
        <Button text={"작성 완료"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
}
