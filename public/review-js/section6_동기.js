console.log("==== 동기 방식 ====");
console.log("1. 물 올리기");
sleepBlocking(3000); // 물이 끓을 때까지 3초간 아무것도 못 하고 '멈춰서 기다림'
console.log("2. 계란 풀기");
console.log("3. 그릇 꺼내기");
console.log("4. 물 다 끓음 → 라면 넣기");
// 총 소요시간 = 3초(그냥 대기) + 계란풀기 + 그릇꺼내기 = 낭비되는 시간이 생김

function sleepBlocking(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // 아무것도 안 하고 CPU만 붙잡고 있음
  }
}
