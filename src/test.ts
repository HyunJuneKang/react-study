// ------------------------------------------------------------
// [문제 5] 종합 — 리터럴 유니온 + 배열 메서드 (2강 결합)
// namesByStatus(list, status) 함수를 작성하라:
//   list   : { name: string; status: ContractStatus }[] 타입
//   status : ContractStatus 타입
//   해당 status 인 항목들의 name 배열을 리턴 (string[]).
//   힌트: filter 다음 map
// ------------------------------------------------------------
type ContractStatus = "DRAFT" | "ACTIVE" | "DONE";

type listType = {
  name: string;
  status: ContractStatus;
};
const namesByStatus = (list: listType[], status: ContractStatus) => {
  return list.filter((item) => item.status === status).map((item) => item.name);
};
