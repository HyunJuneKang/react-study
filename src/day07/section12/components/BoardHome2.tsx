import { API_BASE_URL } from "@/common/url";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";

export default function BoardHome2() {
  const url = API_BASE_URL;

  const clickHandler1 = () => {
    axios({ url: "https://jsonplaceholder.typicode.com/posts", method: "get" })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const clickHandler2 = () => {
    axios({ url: `${url}/api/freeboard/list`, method: "get" })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Board CRUD</h1>
      <Link
        to={""}
        className="px-4 py-2 bg-green-500 text-white rounded-lg  no-underline text-sm font-medium"
      >
        목록
      </Link>
      <Link
        to={"new"}
        className="px-4 py-2 bg-pink-500 text-white rounded-lg  no-underline text-sm font-medium"
      >
        신규작성
      </Link>
      <button
        onClick={clickHandler1}
        className="px-4 py-2 bg-orange-400 text-white rounded-lg"
      >
        Axios연습1
      </button>
      <button
        onClick={clickHandler2}
        className="px-4 py-2 bg-orange-400 text-white rounded-lg"
      >
        Axios연습2(boardlist)
      </button>
      <hr />
      <div>
        {/* 자식영역 : 라우터가 중첩된 경우 사용한다.  */}
        <Outlet />
      </div>
    </div>
  );
}

/*
Access to XMLHttpRequest at 'http://localhost:8000/api/freeboard/list'
 from origin 'http://localhost:5173' has been blocked by CORS policy: 
 No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
