import React from "react";
import { BsQuestion } from "react-icons/bs";

const Question = ({ question, nextClick, chooseDisplayedInfo }) => {
  const checkInfosForOptions = (option) => {
    if (!option.infos) {
      let number = option.text[0];
      const n = <div className="number">{number}</div>;
      var text = option.text.split(/.(.+)/)[1];
      text = text.split(/.(.+)/)[1];
      console.log(text);
      const header = text.split(/[.,,,:,;,!,?](.+)/);
      const high = <div className="highlighted">{header[0]}</div>;
      const rest = header[1];
      const all = (
        <div className="header">
          {n}
          {high}
        </div>
      );
      const newText = [all, rest];
      return <div className="text">{newText}</div>;
    }
    let allId = option.infos.map((e) => e.id);
    let allText = option.infos.map((e) => e.altText);
    console.log(allText);

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

    const func = (text) => {
      const number = text[0];
      const n = <div className="number">{number}</div>; //NUMBER
      let allButNumber = text.split(/.(.+)/)[1];
      allButNumber = allButNumber.split(/.(.+)/)[1];
      let header = allButNumber.split(/[.,,,:,;,!,?](.+)/)[0]; //HEADER
      let theRest = allButNumber.split(/[.,,,:,;,!,?](.+)/)[1]; //REST
      let checkHeader = header.split(new RegExp(`(${allText.join("|")})`));
      let checkRest = theRest.split(new RegExp(`(${allText.join("|")})`));
      //    IF LINK IN HEADER
      if (checkHeader.length > 2) {
        for (let i = 1; i < checkHeader.length; i += 2) {
          checkHeader[i] = l(checkHeader, i);
        }

        let firstPart = (
          <div className="highlighted">
            {[checkHeader[0], checkHeader[1], checkHeader[2]]}
          </div>
        );
        const all = (
          <div className="header">
            {n}
            {firstPart}
          </div>
        );
        checkHeader.push(theRest);
        let final = [all, checkHeader[checkHeader.length - 1]];
        return [final];
      }
      if (checkRest.length > 2) {
        for (let i = 1; i < checkRest.length; i += 2) {
          checkRest[i] = l(checkRest, i);
        }
        let firstPart = <div className="highlighted">{checkHeader[0]}</div>;
        const all = (
          <div className="header">
            {n}
            {firstPart}
          </div>
        );
        let final = [all, checkRest];
        return [final];
      }
    };

    let parts = option.text.split(new RegExp(`(${allText.join("|")})`));
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }

    const m = func(option.text);
    return <div className="text">{m}</div>;
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
    // console.log(parts);
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }
    return <h2>{parts}</h2>;
  };

  return (
    <>
      {/* <div className="id-testing">current: {question[0].id}</div> */}{" "}
      {/*testing */}
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
                    {/* <div className="next-option-testing">
                      nextJump: {option.nextJump}
                    </div> */}
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
                    {/* <div className="next-option-testing">
                      next: {option.next}
                    </div> */}
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
