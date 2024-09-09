import { questions } from "../data/questions";

const calculateMBTI = (answers) => {
  const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  answers.forEach((answer, index) => {
    const question = questions[index];
    if (question.type === "E/I") {
      scores[answer === "예" ? "E" : "I"]++;
    } else if (question.type === "S/N") {
      scores[answer === "예" ? "S" : "N"]++;
    } else if (question.type === "T/F") {
      scores[answer === "예" ? "T" : "F"]++;
    } else if (question.type === "J/P") {
      scores[answer === "예" ? "J" : "P"]++;
    }
  });

  const result = `${scores.E >= scores.I ? "E" : "I"}${
    scores.S >= scores.N ? "S" : "N"
  }${scores.T >= scores.F ? "T" : "F"}${scores.J >= scores.P ? "J" : "P"}`;

  return result;
};

export default calculateMBTI;
