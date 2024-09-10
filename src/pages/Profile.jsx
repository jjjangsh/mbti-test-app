import { useState } from "react";
import { updateProfile } from "../api/auth";
import { useNavigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = userStore();
  const [nickname, setNickname] = useState(user?.nickname || "");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateProfile(nickname, user.accessToken);
      setUser({ ...user, nickname: response.nickname });
      if (response.success) {
        alert(response.message);
        navigate("/");
      }
    } catch (error) {
      alert("회원정보 수정이 실패했습니다. 다시 시도해주세요.");
      console.log("error => ", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">프로필 수정</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>닉네임</label>
            <p>
              <input
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
                value={nickname}
                onChange={handleNicknameChange}
              />
            </p>
          </div>
          <button
            className="bg-red-500 mt-5 text-white px-4 py-2 rounded hover:bg-red-600"
            type="submit"
          >
            프로필 업데이트
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
