import Button from "../component/Button";
import { Header } from "../component/Header";
export default function Home() {
  return (
    <div>
      <Header
        title={"Home"}
        leftChild={
          <Button
            text="작성 완료"
            type="positive"
            onClick={() => console.log("작성 완료")}
          />
        }
        rightChild={
          <Button
            text="작성 완료"
            type="negative"
            onClick={() => console.log("작성 완료")}
          />
        }
      />
      Home 페이지 입니다.
      <Button
        text="작성 완료"
        type="positive"
        onClick={() => console.log("작성 완료")}
      />
    </div>
  );
}
