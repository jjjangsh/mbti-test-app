import { useEffect, useState } from "react";
import { getTestResults } from "../api/testResults";
import TestResultList from "../components/TestResultList";
import userStore from "../zustand/userStore";

const TestResultPage = () => {
  const [results, setResults] = useState([]);

  const { user } = userStore();

  const fetchResults = async () => {
    const data = await getTestResults();
    setResults(data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleUpdate = async () => {
    fetchResults();
  };

  const handleDelete = async () => {
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
