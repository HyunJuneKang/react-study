import { useContext, useMemo, useState } from "react";
import Button from "../component/Button";
import { Header } from "../component/Header";
import { DiaryStateContext } from "../util/DiaryContext";
import { getMonthRangeByDate } from "../util/getMonthRangeByDate";
import { DiaryList } from "./DiaryList";
export default function Home() {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const filteredData = useMemo(() => {
    const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);

    return data.filter(
      (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp,
    );
  }, [data, pivotDate]);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
  return (
    <div>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onIncreaseMonth} />}
        rightChild={<Button text={">"} onClick={onDecreaseMonth} />}
      />
      Home 페이지 입니다.
      <DiaryList data={filteredData} />
    </div>
  );
}
