import React, { useState } from "react";
import { questions } from "../data/questions";

const TestForm = ({ handleTestSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTestSubmit(answers);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-6 p-6 bg-slate-300 rounded-lg shadow-sm border border-gray-200 w-full max-w-md"
      >
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <p className="font-medium text-gray-700">{q.question}</p>
            <div className="mt-2 space-y-2">
              {q.options.map((option, i) => (
                <label key={i} className="flex items-center text-gray-600">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleChange(index, option)}
                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out mr-3"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default TestForm;
