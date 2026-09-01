import { useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from "./useDebounce";

export default function Debounce_ProfileEditor() {
  console.log("ProfileEditor 렌더링");

  const [age, setAge] = useState<number>(10);
  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(Number(e.target.value));
  };

  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 500);
  const [apiCallCount, setApiCallCount] = useState(0);
  useEffect(() => {
    if (!debouncedKeyword) return;
    // -- apiCallCount는
    // debouncedKeyword가 "몇 번 바뀌었는지"를 세는 누적값이라 현재 값만으로는
    // 계산할 수 없고, 반드시 effect 안에서 이전 값 + 1로 갱신해야 합니다.
    // (fullName = firstName + lastName처럼 렌더링 중 계산으로 대체 가능한
    // 케이스가 아니라, 진짜로 effect가 필요한 경우라 의도적으로 예외 처리합니다.)
    //effect + setState로 한 박자 늦게 반영...불필요한 리렌더링이 한 번 더 생기고, 심지어 그 사이 화면에 값이 잠깐 비어있는 깜빡임(flash)까지 생김

    //eslint-disable-next-line react-hooks/set-state-in-effect
    setApiCallCount((pre) => pre + 1);
    console.log("API 호출:", debouncedKeyword);
  }, [debouncedKeyword]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg bg-white shadow-sm space-y-4">
      {/* 나이 표시 */}
      <div className="flex items-center">
        <span className="text-gray-600 font-medium">나이Display:</span>
        <span className="text-md font-semibold text-blue-600">{age}</span>
      </div>

      {/* 나이 입력 */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-500">
          나이 입력 (디바운스 미적용 · 즉시 반영)
        </label>
        <input
          type="number"
          value={age}
          onChange={handleAgeChange}
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 검색 */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm text-gray-500">
          검색어 입력 (디바운스 500ms 적용)
        </label>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어 입력"
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <p>실시간 입력값(keyword): {keyword}</p>
      <p>500ms 후 확정값(debouncedKeyword):{debouncedKeyword}</p>
      <p>실제 API 호출 횟수:{apiCallCount}</p>
    </div>
  );
}
