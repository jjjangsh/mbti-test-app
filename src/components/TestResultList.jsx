import React from "react";
import TestResultItem from "./TestResultItem";

const TestResultList = ({ results, user, handleUpdate, handleDelete }) => {
  return (
    <div>
      {results
        .filter((result) => {
          return result.visibility || result.userId === user.userId;
        })
        .map((result) => {
          return (
            <TestResultItem
              key={result.id}
              result={result}
              user={user}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          );
        })}
    </div>
  );
};

export default TestResultList;
