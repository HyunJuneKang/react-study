const person = { name: "MAX", age: 20, score: 99 };
const person2 = { name: "채연", age: 30, score: 88 };
//익명함수 , literal 형식 , 매개변수는 없고 return이있는 함수
const f1 = function () {
  return "f1함수입니다. 나의 이름은" + person.name;
};
const f2 = function () {
  return "f2함수입니다. 나의 이름은" + person.name;
};

export { person as default, f1, f2, person2 };

//다른 js에서 이 모듈을 import하기 person, { f1}
//default export는 1개만 가능
