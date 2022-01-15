import React from "react";

const AllQuestions = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  chooseCurrent,
}) => {
  return (
    <>
      <div className="all-questions">
        <div className="title-questions">
          <h2>все вопросы</h2>
        </div>

        <div className="questions">
          {questions.map((question) => {
            return (
              <button
                className="question"
                onClick={() => chooseCurrent(question.id)}
              >
                <div className="id">{question.id}</div>
                <div className="name">{question.text}</div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllQuestions;
