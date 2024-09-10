import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import userStore from "../zustand/userStore";
import { useQuery } from "@tanstack/react-query";

const TestResultPage = () => {
  const { user } = userStore();

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testResults"],
    queryFn: getTestResults,
  });

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      <div>
        <TestResultList results={results} user={user} />
      </div>
    </div>
  );
};

export default TestResultPage;
