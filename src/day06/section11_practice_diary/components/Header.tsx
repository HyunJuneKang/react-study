import type { ReactNode } from "react";
import "@/day06/section11_practice_diary/components/Header.css";

type HeaderProps = {
  title: string;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
};

export const Header = ({ title, leftChild, rightChild }: HeaderProps) => {
  return (
    <div className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_title">{title}</div>
      <div className="header_right">{rightChild}</div>
    </div>
  );
};
