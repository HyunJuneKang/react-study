import { useNavigate, useParams } from "react-router-dom";
import { useDiary } from "@/day06/section11_practice_diary/hooks/useDiary";
import { Header } from "@/day06/section11_practice_diary/components/Header";
import Button from "@/day06/section11_practice_diary/components/Button";
import { getFormattedDate } from "@/day06/section11_practice_diary/utils/getFormattedDate";
import Viewer from "@/day06/section11_practice_diary/components/Viewer";

export default function Diary() {
  const { id } = useParams();
  const data = useDiary(id);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const goEdit = () => {
    navigate(`/diary/edit/${id}`);
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    const { date, emotionId, content } = data;
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`;
    return (
      <div>
        <Header
          leftChild={<Button onClick={goBack} text={"< 뒤로가기"} />}
          title={title}
          rightChild={<Button onClick={goEdit} text={"수정하기"} />}
        ></Header>
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
}
