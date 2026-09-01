import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  // 홈으로 돌아가는 함수
  const goToHome = () => {
    navigate("/"); //location.href = "" , Spring에서
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-description">
          요청하신 페이지가 사라졌거나, 주소가 잘못 입력되었을 수 있습니다.
        </p>
        <button onClick={goToHome} className="notfound-button">
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
