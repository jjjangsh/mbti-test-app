import AuthForm from "../components/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      setUser(response);
      if (response.success) {
        alert("로그인 성공!");
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
      console.log("error => ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">로그인</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <div className="mt-4 text-center">
          <p>
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
