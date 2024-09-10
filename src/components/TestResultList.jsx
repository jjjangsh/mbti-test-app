import TestResultItem from "./TestResultItem";

const TestResultList = ({ results, user }) => {
  return (
    <div className="flex justify-center mt-30">
      <div className="flex flex-col w-1/2">
        {results
          .filter((result) => {
            return result.visibility || result.userId === user.userId;
          })
          .map((result) => {
            return (
              <TestResultItem key={result.id} result={result} user={user} />
            );
          })}
      </div>
    </div>
  );
};

export default TestResultList;
