import React, { useState } from "react";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: mode === "login" ? undefined : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredFormData = { ...formData };
    if (mode === "login") {
      delete filteredFormData.nickname;
    }
    onSubmit(filteredFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디"
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
        />
      </div>
      {mode === "signup" && (
        <div className="mb-4">
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            required
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full p-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
      >
        {mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};

export default AuthForm;
