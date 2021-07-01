import React from "react";

const AllQuestions = ({ questions }) => {
  return (
    <>
      <h1>all questions</h1>
      {questions.map((question) => {
        return (
          <button className="question">
            <div className="id">{question.id}</div>
            <div className="name">{question.text}</div>
          </button>
        );
      })}
    </>
  );
};

export default AllQuestions;
