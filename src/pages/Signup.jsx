import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { register } from "../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const response = await register(formData);
      if (response.success) {
        alert(response.message);
        navigate("/login");
      }
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      console.log("error => ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">회원가입</h1>
        <AuthForm mode="signup" onSubmit={handleSignup} />
        <div className="mt-4 text-center">
          <p>
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-red-500 hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
