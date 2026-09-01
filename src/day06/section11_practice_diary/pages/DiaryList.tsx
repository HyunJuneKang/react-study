import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import "./DiaryList.css";
export const DiaryList = ({ data }) => {
  const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
  ];
  const navigate = useNavigate();
  const onClickNew = () => {
    navigate("/new");
  };
  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <select>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </select>
        </div>
        <div className="right_col">
          <Button
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={onClickNew}
          />
        </div>
      </div>
    </div>
  );
};
