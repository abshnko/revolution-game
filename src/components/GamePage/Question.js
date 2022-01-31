import React from "react";
import { useEffect, useState } from "react";
import LoseScreen from "./LoseScreen";
import Arrow from "../../utils/svgs/Arrow";
import { isOverflown, heightIsOverNpx } from "../../utils/resolutionFunctions";
import "../../styles/main/question.scss";

const Question = ({
  question,
  nextClick,
  setCurrentInfoDisplayed,
  setIsShowInfo,
  isLoading,
  setImgLoaded,
}) => {
  const [oneArrow, setOneArrow] = useState(false);
  const [twoArrows, setTwoArrows] = useState(false);
  const [zeroArrows, setZeroArrows] = useState(false);
  const [makeSmallText, setMakeSmallText] = useState(false);

  const chooseDisplayedInfo = (id) => {
    if ("infos" in question[0] && question[0].infos.length > 0) {
      const infos = question[0].infos.filter((info) => info.id === id);
      if (infos.length > 0) {
        setCurrentInfoDisplayed(infos[0]);
        setIsShowInfo(true);
      }
    }
    question[0].options.forEach((option) => {
      if ("infos" in option && option.infos.length > 0) {
        const infos = option.infos.filter((info) => info.id === id);
        if (infos.length > 0) {
          setCurrentInfoDisplayed(infos[0]);
          setIsShowInfo(true);
        }
      }
    });
  };

  const checkInfosForOptions = (option) => {
    if (!option.infos || option.infos.length === 0) {
      let number = option.text[0];
      const n = <div className="number">{number}</div>;
      var text = option.text.split(/.(.+)/)[1];
      text = text.split(/.(.+)/)[1];
      const header = text.split(/[.,,,:,;,!,?](.+)/);
      const high = <div className="highlighted">{header[0]}</div>;
      const rest = <p className="option-text">{header[1]}</p>;
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

    const separateParts = (text) => {
      const number = text[0];
      const n = <div className="number">{number}</div>; //NUMBER
      let allButNumber = text.split(/.(.+)/)[1];
      allButNumber = allButNumber.split(/.(.+)/)[1];
      let header = allButNumber.split(/[.,,,:,;,!,?](.+)/)[0]; //HEADER
      let theRest = allButNumber.split(/[.,,,:,;,!,?](.+)/)[1]; //REST
      let checkHeader = header.split(new RegExp(`(${allText.join("|")})`));
      let checkRest;
      if (theRest !== undefined) {
        checkRest = theRest.split(new RegExp(`(${allText.join("|")})`));
      } else {
        checkRest = [];
      }

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
        if (theRest !== undefined) {
          checkHeader.push(<p className="option-text">{theRest}</p>);
        }
        let final = [all, checkHeader[checkHeader.length - 1]];
        return [final];
      }
      //IF LINK IN TEXT
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
        let final = [all, <p className="option-text">{checkRest}</p>];
        return [final];
      }
    };

    let parts = option.text.split(new RegExp(`(${allText.join("|")})`));
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }

    const separatedText = separateParts(option.text);
    console.log(separatedText);
    return <div className="text">{separatedText}</div>;
  };

  function checkInfosForQuestion(question) {
    if (!question[0].infos) {
      return <h2>{question[0].text}</h2>;
    }
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
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }

    return (
      <h2 style={question[0].options.length === 1 ? { fontSize: "35px" } : {}}>
        {parts}
      </h2>
    );
  }

  const determineArrowsNumber = () => {
    const main = document.getElementsByClassName("main")[0];
    const viewportHeight =
      document.getElementsByTagName("body")[0].clientHeight;
    const overflowMain = isOverflown(main);
    const questionText = document.getElementsByClassName("question-text")[0];
    const heightOver200 = heightIsOverNpx(questionText, 200);
    const heightOver100 = heightIsOverNpx(questionText, 100);
    if (overflowMain) {
      heightOver200 ? setZeroArrows(true) : setOneArrow(true);
    } else if (heightOver200) {
      setZeroArrows(true);
    } else {
      viewportHeight <= 1000 && heightOver100
        ? setOneArrow(true)
        : setTwoArrows(true);
    }
  };

  const determineTextSmall = () => {
    const questionText = document.getElementsByClassName("question-text")[0];
    if (heightIsOverNpx(questionText, 700)) {
      setMakeSmallText(true);
    }
  };

  useEffect(() => {
    determineArrowsNumber();
    determineTextSmall();
  }, [question]);

  return (
    <>
      {question[0].options.length === 1 && (
        <div className="arrows">
          {!zeroArrows && oneArrow && <Arrow />}
          {!zeroArrows && twoArrows && (
            <>
              <Arrow />
              <Arrow />
            </>
          )}
        </div>
      )}
      <div className={`question-text ${makeSmallText ? " small-text" : ""} `}>
        {checkInfosForQuestion(question)}
      </div>
      {question[0].options.length > 1 && (
        <>
          <div className="options">
            <div className="option-container">
              {question[0].options.map((option) => {
                if ("nextJump" in option) {
                  if ("jumpFromHere" in option) {
                    var jumpFromHere =
                      localStorage.getItem("jump-from-here") ||
                      option.jumpFromHere;
                    //   localStorage.setItem(
                    //     "jump-from-here",
                    //     JSON.stringify(jumpFromHere)
                    //   );
                  }
                  const nextJump =
                    parseInt(localStorage.getItem("next-jump")) ||
                    option.nextJump;
                  // localStorage.setItem("next-jump", JSON.stringify(nextJump));
                  const next = option.next;
                  return (
                    <>
                      <button
                        className={`option ${option.isActive ? "active" : ""} 
                        `}
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
                        {"img" in option && option.img !== "" && (
                          <img
                            className="option-img"
                            src={
                              option.img.includes("data:")
                                ? option.img
                                : process.env.PUBLIC_URL +
                                  `/images/${option.img}`
                            }
                            style={!isLoading ? {} : { display: "none" }}
                            alt=""
                            onLoad={() => setImgLoaded(true)}
                          />
                        )}
                      </button>
                    </>
                  );
                } else {
                  if ("jumpFromHere" in option) {
                    jumpFromHere =
                      localStorage.getItem("jump-from-here") ||
                      option.jumpFromHere;
                    localStorage.setItem(
                      "jump-from-here",
                      JSON.stringify(jumpFromHere)
                    );
                  }
                  const next = option.next;
                  return (
                    <>
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
                        {"img" in option && option.img !== "" ? (
                          <img
                            className="option-img"
                            src={
                              option.img.includes("data:")
                                ? option.img
                                : process.env.PUBLIC_URL +
                                  `/images/${option.img}`
                            }
                            style={!isLoading ? {} : { display: "none" }}
                            alt="img here"
                            onLoad={() => setImgLoaded(true)}
                          />
                        ) : null}
                      </button>
                    </>
                  );
                }
              })}
            </div>
          </div>
        </>
      )}
      {"lose" in question[0] && <LoseScreen question={question} />}
      {question[0].options.length === 1 && (
        <div className="down-line">
          <hr />
        </div>
      )}
    </>
  );
};

export default Question;
