export default function Body() {
  const subject: string = "ReactJS";
  const price: number = 30000;
  const arr: number[] = [100, 90, 80];
  const v1 = null;
  const v2: undefined = undefined;
  const v3: boolean = true;
  const v4: { name: string; age: number } = { name: "민준", age: 30 };
  return (
    <section>
      <p>Body Component</p>
      <p>문자 : {subject}</p>
      <p>number : {price}</p>
      <p>arr : {arr.join(",")}</p>
      <p>null(rendering없음) : {v1}</p>
      <p>undefined(rendering없음) : {v2}</p>
      <p>boolean(rendering없음) : {v3}</p>
      <p>boolean(조건식사용, rendering있음) : {v3 == true ? "참" : "거짓"}</p>
      <p>
        객체 : {v4.name}---{v4.age}
      </p>
    </section>
  );
}
