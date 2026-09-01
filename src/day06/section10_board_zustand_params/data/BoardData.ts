import type { postType } from "../types/boardType";

export const mockData: postType[] = [
  {
    bno: 0,
    title: "첫 번째 글",
    content: "게시판 첫 번째 글입니다.",
    writer: "admin",
    regDate: new Date().getTime() - 2 * 24 * 60 * 60 * 1000,
  }, // 2일전
  {
    bno: 1,
    title: "React Hook",
    content: "React Hook 정리 글입니다.",
    writer: "hong",
    regDate: new Date().getTime() - 1 * 24 * 60 * 60 * 1000,
  }, // 1일전
];
