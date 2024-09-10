import { useNavigate } from "react-router-dom";
import calculateMBTI from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import TestForm from "../components/TestForm";
import userStore from "../zustand/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TestPage = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["testResults"]);
      navigate("/results");
    },
  });

  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);
    const resultData = {
      userId: user.userId,
      nickname: user.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };

    mutation.mutate(resultData);
  };
  return (
    <div>
      <TestForm handleTestSubmit={handleTestSubmit} />
    </div>
  );
};

export default TestPage;
