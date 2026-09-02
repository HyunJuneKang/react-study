import { emotionList } from "@/day06/section11_practice_diary/utils/emotion";
import "@/day06/section11_practice_diary/components/Viewer.css";

type ViewerProps = {
  content: string;
  emotionId: number;
};

export default function Viewer({ content, emotionId }: ViewerProps) {
  const emotionItem = emotionList.find((it) => it.id === emotionId);

  return (
    <div className="Viewer">
      <section>
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img alt={emotionItem?.name} src={emotionItem?.img} />
          <div className="emotion_descript">{emotionItem?.name}</div>
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
}
