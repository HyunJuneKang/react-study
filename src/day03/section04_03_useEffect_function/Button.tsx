export type ColorType = "green" | "red" | "blue" | "gray" | "black";
type ButtonProps = {
  children: React.ReactNode;
  clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  color: ColorType;
};
const colorMap = {
  green: "bg-green-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
  gray: "bg-gray-500",
  black: "bg-black",
};
export default function Button({ children, clickHandler, color }: ButtonProps) {
  const btnStyle = `px-4 py-2 ${colorMap[color]} text-white rounded`;
  console.log(btnStyle);
  return (
    <button onClick={clickHandler} className={btnStyle}>
      {children}
    </button>
  );
}
