const input = "10";
let result;
if (input) {
  const number = Number(input);
  result = number + 5;
}

console.log(result);
console.log(typeof input);
console.log(input == 10);
console.log(input === 10);

const values = [0, "0", "", null, undefined, [], {}];
for (const value of values) {
  if (value) {
    console.log(value, "truthy");
  } else {
    console.log(value, "falsy");
  }
}

const name = "철수";
let score = 10;

score = 20;
// name = "영희";
// 오류
