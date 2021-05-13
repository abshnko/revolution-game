import React from "react";
import { BsQuestion } from "react-icons/bs";

const Question = ({
  setIsShowInfo,
  question,
  questionChanged,
  nextClick,
  handleClick,
  questionCounter,
}) => {
  return (
    ///show info - think how to hide question when isShowInfo is true
    <>
      <button className="info-btn" onClick={() => setIsShowInfo(true)}>
        <BsQuestion />
      </button>

      {/* CARD W/ QUESTION */}
      {
        <>
          <div className="card" id={question[0].id}>
            <div className="year">{question[0].year}</div>
            <div className="img-container">
              <img
                className="headImage"
                src="../images/placeholder.png"
                alt=""
              />
            </div>

            <div className="question">
              <h2>{question[0].text}</h2>
            </div>
            {question[0].options.length > 1 && (
              <div className="options">
                <div className="option-container">
                  {question[0].options.map((option) => {
                    if ("nextJump" in option) {
                      const nextJump = option.nextJump;
                      const next = option.next;
                      return (
                        <button
                          className={`option ${
                            option.isActive ? "active" : ""
                          }`}
                          key={option.id}
                          onClick={() =>
                            nextClick(
                              option.id,
                              option.isActive,
                              next,
                              nextJump
                            )
                          }
                        >
                          {option.text}
                        </button>
                      );
                    } else {
                      const next = option.next;
                      return (
                        <button
                          className={`option ${
                            option.isActive ? "active" : ""
                          }`}
                          key={option.id}
                          onClick={() =>
                            nextClick(option.id, option.isActive, next, 0)
                          }
                        >
                          {option.text}
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="next">
            <div className="question-number">{questionCounter}</div>
            <button className="next-button" onClick={() => handleClick()}>
              Далее
            </button>
          </div>
        </>
      }
    </>
  );
};

export default Question;
