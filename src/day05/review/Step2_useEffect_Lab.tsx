import { useState, useEffect } from "react";

// 실제 프로젝트에서는 axios/fetch로 대체
function fetchAccountBalance(): Promise<number> {
  return new Promise((resolve) => setTimeout(() => resolve(500_000), 800));
}

/**
 * 실습: 마운트 시 계좌 조회 + 실시간 환율
 * 목표: useEffect의 의존성 배열과 cleanup 함수를 직접 작성해본다.
 */
export default function AccountBalance() {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rate, setRate] = useState<number>(1320.5); // 실시간 환율(시뮬레이션)

  // TODO :컴포넌트가 처음 화면에 나타날 때 1회만 fetchAccountBalance()를 호출하세요.
  // 힌트: useEffect(() => { ... }, [])
  // 조건: 응답이 오면 loading을 false로, balance를 결과값으로 설정
  // 주의: 언마운트된 후에 응답이 와서 상태를 바꾸면 안 되므로 cleanup에서 cancelled 플래그를 사용하세요.
  useEffect(() => {
    let cancelled = false;

    fetchAccountBalance().then((amount) => {
      if (!cancelled) {
        setBalance(amount);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);
  // TODO: setInterval로 1초마다 rate를 랜덤하게 갱신하는 effect를 작성하세요.
  // 주의: return 문에서 clearInterval로 반드시 정리해야 합니다. (cleanup 누락 시 메모리 누수)
  // 힌트: setRate(r => Number((r + (Math.random() - 0.5) * 2).toFixed(1)))

  useEffect(() => {
    const timerId = setInterval(() => {
      setRate((r) => Number((r + (Math.random() - 0.5) * 2).toFixed(1)));
    }, 1000);
    //Component가 제거시 수행된다.
    return () => {
      console.log("이 부분은 Component가 제거시 수행된다.");
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold text-slate-400">
        신한은행 · 입출금 계좌
      </p>

      {loading ? (
        <p className="mt-1 text-lg font-medium text-slate-400">조회 중...</p>
      ) : (
        <p className="mt-1 text-3xl font-bold text-slate-800">
          {balance!.toLocaleString()}
          <span className="ml-1 text-base font-medium text-slate-400">원</span>
        </p>
      )}

      <p className="mt-3 text-sm text-slate-500">
        USD/KRW 실시간 환율:
        <span className="font-semibold text-slate-700">{rate}</span>
      </p>
    </div>
  );
}

/**
 * 확인 질문
 * - 의존성 배열을 []로 두는 것과 아예 생략하는 것의 차이는?
 * - cleanup 함수는 정확히 언제(어떤 타이밍에) 호출되는가?
 */
