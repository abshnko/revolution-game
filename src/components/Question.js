import React from "react";
import { BsQuestion } from "react-icons/bs";

const Question = ({ question, nextClick }) => {
  return (
    <>
      <div className="img-ref">
        <a href={question[0].imgRef}>источник</a>
      </div>
      <div className="id-testing">current: {question[0].id}</div>
      <div className="question">
        <h2>{question[0].text}</h2>
      </div>
      {question[0].options.length > 1 && (
        <div className="options">
          <div className="option-container">
            {question[0].options.map((option) => {
              if ("nextJump" in option) {
                if ("jumpFromHere" in option) {
                  var jumpFromHere = option.jumpFromHere;
                }
                const nextJump = option.nextJump;
                const next = option.next;
                return (
                  <>
                    {/*testing*/}
                    <div className="next-option-testing">
                      nextJump: {option.nextJump}
                    </div>
                    <button
                      className={`option ${option.isActive ? "active" : ""}`}
                      key={option.id}
                      onClick={() =>
                        nextClick(
                          option.id,
                          option.isActive,
                          next,
                          nextJump,
                          jumpFromHere
                        )
                      }
                    >
                      {option.text}
                    </button>
                  </>
                );
              } else {
                if ("jumpFromHere" in option) {
                  var jumpFromHere = option.jumpFromHere;
                }
                const next = option.next;
                return (
                  <>
                    {/*testing*/}
                    <div className="next-option-testing">
                      next: {option.next}
                    </div>
                    <button
                      className={`option ${option.isActive ? "active" : ""}`}
                      key={option.id}
                      onClick={() =>
                        nextClick(
                          option.id,
                          option.isActive,
                          next,
                          0,
                          jumpFromHere
                        )
                      }
                    >
                      {option.text}
                    </button>
                  </>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
