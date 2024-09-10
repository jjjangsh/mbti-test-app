import React, { useEffect, useState } from "react";
import { deleteTestResult, getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";

const TestResultPage = ({ user }) => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const data = await getTestResults();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleUpdate = async () => {
    // await updateTestResultVisibility(id, visibility);
    fetchResults();
  };

  const handleDelete = async () => {
    // await deleteTestResult(id);
    fetchResults();
  };

  return (
    <div>
      <div>
        <TestResultList
          results={results}
          user={user}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default TestResultPage;
