import Button from "../section04_03_useEffect_function/Button";
import type { ColorType } from "../section04_03_useEffect_function/Button";

type CountControllerProps = {
  count?: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

function CountController({ setCount }: CountControllerProps) {
  const dataArr = [-1, -10, -100, -1000, 1000, 100, 10, 1, 0];
  const colorArr: ColorType[] = [
    "green",
    "red",
    "blue",
    "gray",
    "black",
    "green",
    "red",
    "blue",
    "gray",
  ];

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const su = parseInt(e.currentTarget.innerText);
    if (su === 0) {
      setCount(0);
    } else {
      setCount((prev) => prev + su);
    }
  };
  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {dataArr.map((item, idx) => (
        <Button
          key={`${item}-${idx}`}
          color={colorArr[idx]}
          clickHandler={clickHandler}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
export default CountController;
