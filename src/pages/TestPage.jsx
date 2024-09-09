import React from "react";
import { useNavigate } from "react-router-dom";
import calculateMBTI from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import TestForm from "../components/TestForm";

const TestPage = ({ user }) => {
  const navigate = useNavigate();

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
    await createTestResult(resultData);
    navigate("/results");
  };
  return (
    <div>
      <h1>MBTI 테스트</h1>
      <TestForm handleTestSubmit={handleTestSubmit} />
    </div>
  );
};

export default TestPage;
