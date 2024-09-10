import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">무료 성격 테스트</h1>
        <p className="mt-2 text-gray-600">
          자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-md">
        <p className="text-xl font-semibold text-gray-700">성격 유형 검사</p>
        <span className="text-gray-500">
          자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
          알아보세요.
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-full max-w-md">
        <p className="text-xl font-semibold text-gray-700">성격 유형 이해</p>
        <span className="text-gray-500">
          다른 사람들이 어떻게 행동하는지 이해하는데 도움을 줄 수 있습니다.
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md">
        <p className="text-xl font-semibold text-gray-700">팀 평가</p>
        <span className="text-gray-500">
          팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
          배워보세요.
        </span>
      </div>

      <div>
        <Link
          to="/login"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          로그인하고 테스트 시작하기
        </Link>
      </div>
    </div>
  );
};

export default Home;
