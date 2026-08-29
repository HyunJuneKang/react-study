console.log(`a=${a}`); //var는 호이스팅
//error console.log(`b=${b}`);
var a = 10;
let b = 20;
const c = 30;
console.log(a + b + c);

var a = "자바스크립트";
b = "자바스크립트";
//c = "자바스크립트";  //const는 재할당불가능
console.log(`a=${a}, var는 재선언가능  `);
console.log(`b=${b}, let는 재할당가능  `);
//console.log(`c=${c}, const는 재할당불가능  `);

{
  var v1 = "타입스크립트v1";
  let v2 = "타입스크립트v2"; //let는 block내에서 유효
}
console.log(v1);
