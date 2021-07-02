import React, { useState } from "react";
import AllQuestions from "./allQuestions";
import CurrentQuestion from "./currentQuestion";
import NewQuestion from "./newQuestion";
import "../../../styles/editing/editing.css";

const Editing = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const chooseCurrent = (id) => {
    const newQuestion = questions.filter((question) => question.id === id)[0];
    setPreviousQuestions((array) => [...array, currentQuestion.id]);
    setCurrentQuestion(newQuestion);
  };
  return (
    <>
      <div className="editing">
        <AllQuestions
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          chooseCurrent={chooseCurrent}
        />
        <CurrentQuestion
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          chooseCurrent={chooseCurrent}
          previousQuestions={previousQuestions}
        />
        <NewQuestion />
      </div>
    </>
  );
};

export default Editing;
