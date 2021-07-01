import React from "react";
import AllQuestions from "./allQuestions";
import CurrentQuestion from "./currentQuestion";
import NewQuestion from "./newQuestion";
import "../../../styles/editing/editing.css";

const Editing = ({ questions }) => {
  return (
    <>
      <div className="editing">
        <div className="all-questions">
          <AllQuestions questions={questions} />
        </div>
        <div className="current-question">
          <CurrentQuestion />
        </div>
        <div className="new-question">
          <NewQuestion />
        </div>
      </div>
    </>
  );
};

export default Editing;
