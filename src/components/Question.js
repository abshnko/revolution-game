import React from "react";
import { BsQuestion } from "react-icons/bs";

const Question = ({ question, nextClick, chooseDisplayedInfo }) => {
  const checkInfosForOptions = (option) => {
    if (!option.infos) return option.text;
    let allId = option.infos.map((e) => e.id);
    let allText = option.infos.map((e) => e.altText);

    const l = (parts, i) => {
      //для верной передачи цифр
      return (
        <a
          className="info-link"
          onClick={() => {
            chooseDisplayedInfo(allId[Math.floor(i / 2)]);
          }}
        >
          {parts[i]}
        </a>
      );
    };
    let parts = option.text.split(new RegExp(`(${allText.join("|")})`));
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }
    return parts;
  };

  const checkInfosForQuestion = (question) => {
    if (!question[0].infos) return <h2>{question[0].text}</h2>;
    let allId = question[0].infos.map((e) => e.id);
    let allText = question[0].infos.map((e) => e.altText);

    const l = (parts, i) => {
      //для верной передачи цифр
      return (
        <a
          className="info-link"
          onClick={() => {
            chooseDisplayedInfo(allId[Math.floor(i / 2)]);
          }}
        >
          {parts[i]}
        </a>
      );
    };
    let parts = question[0].text.split(new RegExp(`(${allText.join("|")})`));
    console.log(parts);
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }
    return <h2>{parts}</h2>;
  };

  return (
    <>
      <div className="img-ref">
        <a href={question[0].imgRef}>источник</a>
      </div>
      <div className="id-testing">current: {question[0].id}</div>
      <div className="question">{checkInfosForQuestion(question)}</div>
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
                      {checkInfosForOptions(option)}
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
                      {checkInfosForOptions(option)}
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
