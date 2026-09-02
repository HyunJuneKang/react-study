import { useNavigate } from "react-router-dom";
import "@/day06/section11_practice_diary/components/DiaryItem.css";
import { getEmotionImgById } from "@/day06/section11_practice_diary/utils/getEmotionImgById";
import Button from "@/day06/section11_practice_diary/components/Button";
type DiaryItemProps = {
  id: number;
  emotionId: number;
  content: string;
  date: number;
};
export default function DiaryItem({
  id,
  emotionId,
  content,
  date,
}: DiaryItemProps) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/diary/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={`img_section_${emotionId}`}>
        <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
      </div>
      <div onClick={goDetail} className="info_section">
        <div className="date_wrapper">
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="content_wrapper">{content.slice(0, 25)}</div>
      </div>
      <div className="button-section">
        <Button onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
}
