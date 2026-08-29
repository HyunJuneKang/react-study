//----------------------동기
console.log("[전체] 시작");

function 라면장보기() {
  console.log("[라면] 1. 재료 사러 가기");
  const 돈있음 = true; // ← 실패 테스트 시 false로 변경
  if (돈있음) {
    return "[라면] 2. 재료 구매 성공";
  } else {
    throw "[라면] 2. 재료 구매 실패 (돈 없음)";
  }
}

function 커피장보기() {
  console.log("[커피] 1. 사러 가기");
  const 돈있음 = true; // ← 실패 테스트 시 false로 변경
  if (돈있음) {
    return "[커피] 2. 구매 성공";
  } else {
    throw "[커피] 2. 구매 실패 (돈 없음)";
  }
}

try {
  const r1 = 라면장보기();
  console.log(r1);
  console.log("[라면] 3. 완성");

  const r2 = 커피장보기();
  console.log(r2);
  console.log("[커피] 3. 마심");
} catch (error) {
  console.log("[실패]", error);
}

console.log("[전체] 끝");
