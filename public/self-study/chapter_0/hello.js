const name = "JavaScript";

console.log("안녕하세요!");
console.log(name);

function add2(a, b) {
  const result = a + b;
  return result;
}
const total = add2(10, 20);
console.log(total);
// import 연습
import { add, subtract } from "./calculator.js";

const addResult = add(10, 20);
const subtractResult = subtract(30, 20);

console.log("더하기:", addResult);
console.log("빼기:", subtractResult);

const unusedValue = 100;
