import type { MouseEventHandler } from "react";
import "./Button.css";

interface ButtonProps {
  text: string;
  type?: "positive" | "negative" | "default";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, type = "default", onClick }: ButtonProps) => {
  return (
    <button type="button" className={`Button Button_${type}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
