import { useNavigate } from "react-router-dom";
import Button from "@/day06/section11_practice_diary/components/Button";
import DiaryItem from "@/day06/section11_practice_diary/components/DiaryItem";
import "@/day06/section11_practice_diary/components/DiaryList.css";
import { useEffect, useState } from "react";

import type { Diary } from "@/day06/section11_practice_diary/types/diary";

type DiaryListProps = {
  data: Diary[];
};

type SortType = "latest" | "oldest";

export const DiaryList = ({ data }: DiaryListProps) => {
  const sortOptionList: { value: SortType; name: string }[] = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
  ];

  const navigate = useNavigate();

  const [sortType, setSortType] = useState<SortType>("latest");
  const [sortedData, setSortedData] = useState<Diary[]>([]);

  useEffect(() => {
    const copyList = [...data];

    copyList.sort((a, b) => {
      if (sortType === "latest") {
        return b.date - a.date;
      }

      return a.date - b.date;
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSortedData(copyList);
  }, [data, sortType]);

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
          >
            {sortOptionList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button
            type="positive"
            text="새 일기 쓰기"
            onClick={() => navigate("/diary/new")}
          />
        </div>
      </div>

      <div className="list_wrapper">
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};
