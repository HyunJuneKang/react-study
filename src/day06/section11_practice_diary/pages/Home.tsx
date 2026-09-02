import { useContext, useMemo, useState } from "react";
import Button from "@/day06/section11_practice_diary/components/Button";
import { Header } from "@/day06/section11_practice_diary/components/Header";
import { DiaryStateContext } from "@/day06/section11_practice_diary/contexts/DiaryContext";
import { getMonthRangeByDate } from "@/day06/section11_practice_diary/utils/getMonthRangeByDate";
import { DiaryList } from "@/day06/section11_practice_diary/components/DiaryList";
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
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={filteredData} />
    </div>
  );
}
