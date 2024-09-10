import { Link, useNavigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user, logout } = userStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-12 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            홈
          </Link>
          <div className="space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  프로필
                </Link>
                <Link
                  to="/test"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  테스트
                </Link>
                <Link
                  to="/results"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  결과보기
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-gray-900 font-semibold"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container main">{children}</main>
    </div>
  );
};

export default Layout;
