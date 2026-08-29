export const BASE_URL = "http://localhost:8000/api";
export function add(a: number, b: number): number {
  return a + b;
}
export type UserType = {
  id: number;
  name: string;
  // 선택적 속성: 컴포넌트를 사용할 때 생략할 수 있다.
  email?: string;
  phone?: string;
};
