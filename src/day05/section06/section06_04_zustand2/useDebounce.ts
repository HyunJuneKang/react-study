import { useEffect, useState } from "react";

//value가 바뀔 때마다 타이머 재설정
//delay 동안 변경 없으면 확정
//useDebounce("Hello",1000)
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
