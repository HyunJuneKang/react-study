// ------------------------------------------------------------
// [문제 0] 백지 복습 (6강) — async / Promise.all
// 아래 getFee 는 가짜 서버다 (타입 표기가 붙은 것만 다르다 — 읽어볼 것).
// async 함수 totalFee() 를 작성하라:
//   getFee(1) 과 getFee(2) 를 "동시에" 요청해 합계를 리턴. (결과: 75000)
// ------------------------------------------------------------
const getFee = async (id: number): Promise<number> =>
  id === 1 ? 30000 : 45000;

// 여기에 작성:
async function totalFee() {
  try {
    const [first, second] = await Promise.all([getFee(1), getFee(2)]);
    return first + second;
  } catch (error) {
    console.log(error);
  }
}
totalFee();
