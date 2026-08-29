//------------------------비동기
console.log("[전체]비동기 시작");

function 라면장보기() {
  return new Promise((resolve, reject) => {
    console.log("[라면] 1. 재료 사러 가기");
    setTimeout(() => {
      const 돈있음 = true; // ← 실패 테스트 시 false로 변경
      if (돈있음) {
        resolve("[라면] 2. 재료 구매 성공");
      } else {
        reject("[라면] 2. 재료 구매 실패 (돈 없음)");
      }
    }, 1000);
  });
}

function 커피장보기() {
  return new Promise((resolve, reject) => {
    console.log("[커피] 1. 사러 가기");
    setTimeout(() => {
      const 돈있음 = false; // ← 실패 테스트 시 false로 변경
      if (돈있음) {
        resolve("[커피] 2. 구매 성공");
      } else {
        reject("[커피] 2. 구매 실패 (돈 없음)");
      }
    }, 500);
  });
}

라면장보기() //return이 Promise객체임
  .then((result) => {
    console.log(result);
    console.log("[라면] 3. 완성");
    return 커피장보기(); //return이 Promise객체임
  })
  .then((result) => {
    console.log(result);
    console.log("[커피] 3. 마심");
  })
  .catch((error) => {
    console.log("[실패]", error);
  });

console.log("[전체] 비동기끝!!!!!");
