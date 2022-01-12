import React from "react";
import { BsQuestion } from "react-icons/bs";
import { useEffect, useState } from "react";
import LoseScreen from "./LoseScreen";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Fade, Transform } from "react-animation-components";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { createQuestion } from "../../actions/questions";

const Question = ({
  dispatch,
  question,
  nextClick,
  chooseDisplayedInfo,
  isLoading,
  setImgLoaded,
  lose,
  adminMode,
  questionState,
  setquestionState,
}) => {
  const [editQuestionMode, seteditQuestionMode] = useState(false);

  //   const dispatch = useDispatch();
  const [oneArrow, setOneArrow] = useState(false);
  const [twoArrows, setTwoArrows] = useState(false);
  const [zeroArrows, setZeroArrows] = useState(false);
  const [makeSmallText, setMakeSmallText] = useState(false);

  const changeAltText = (info, e, index) => {
    const newInfo = { ...info, altText: e.target.value };
    const newArray = questionState.infos;
    newArray[index] = newInfo;
    setquestionState({ ...questionState, infos: newArray });
  };
  const checkInfosForOptions = (option) => {
    if (!option.infos) {
      let number = option.text[0];
      const n = <div className="number">{number}</div>;
      var text = option.text.split(/.(.+)/)[1];
      text = text.split(/.(.+)/)[1];
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
          checkHeader.push(theRest);
        }
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

    const separatedText = separateParts(option.text);
    return <div className="text">{separatedText}</div>;
  };

  function checkInfosForQuestion(question) {
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
    for (let i = 1; i < parts.length; i += 2) {
      parts[i] = l(parts, i);
    }

    ///-------------
    function updateQuestionText(event) {
      event.preventDefault();
      dispatch(createQuestion(questionState));
    }
    function updateAltText(event) {
      event.preventDefault();
    }

    if (!editQuestionMode) {
      return <h2>{parts}</h2>;
    } else {
      return (
        <>
          <form action="" onSubmit={updateQuestionText}>
            <label htmlFor="">
              Редактирование вопроса:
              <input
                style={{
                  width: "100%",
                  height: "200px",
                  overflowWrap: "break-word",
                }}
                type="text"
                value={questionState.text}
                onChange={(e) =>
                  setquestionState({ ...questionState, text: e.target.value })
                }
              />
              <input type="submit" value="Submit" />
            </label>
          </form>
          {questionState.infos.map((info, i) => {
            return (
              <form action="" onSubmit={updateAltText}>
                <label htmlFor="">
                  Редактирование подсвечиваемых слов, указывающих на справку:
                  <input
                    style={{
                      width: "100%",
                      height: "200px",
                      overflowWrap: "break-word",
                    }}
                    type="text"
                    value={info.altText}
                    onChange={(e) => changeAltText(info, e, i)}
                  />
                  <input type="submit" value="Submit" />
                </label>
              </form>
            );
          })}
        </>
      );
    }
  }

  const isOverflown = ({
    clientWidth,
    clientHeight,
    scrollWidth,
    scrollHeight,
  }) => {
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  };

  const heightIsOverNpx = ({ clientHeight }, number) => {
    return clientHeight >= number;
  };

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

  console.log(editQuestionMode);
  console.log(questionState);

  useEffect(() => {
    determineArrowsNumber();
    determineTextSmall();
  }, [question]);

  return (
    <>
      {/* <TransitionGroup component={null}>
        <CSSTransition
          in={!isLoading}
          key={question[0].id}
          timeout={500}
          classNames="alert"
        > */}
      <>
        {/* <div className="id-testing">current: {question[0].id}</div> */}{" "}
        {/*testing */}
        {question[0].options.length === 1 && (
          <div className="arrows">
            {!zeroArrows && oneArrow && (
              <svg
                className="arrow"
                width="87"
                height="157"
                viewBox="0 0 87 157"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M85.1192 93.312C86.2457 94.1102 86.5118 95.6706 85.7135 96.7972L44.3733 155.138C43.8986 155.808 43.1253 156.202 42.3044 156.192C41.4835 156.183 40.7196 155.771 40.2606 155.09L0.927173 96.7493C0.15533 95.6045 0.457683 94.0507 1.60251 93.2789C2.74733 92.507 4.3011 92.8094 5.07295 93.9542L39.8335 145.512L39.8335 3C39.8335 1.61929 40.9528 0.499998 42.3335 0.499998C43.7142 0.499998 44.8335 1.61929 44.8335 3L44.8335 145.84L81.6339 93.9064C82.4322 92.7798 83.9926 92.5137 85.1192 93.312Z"
                  fill="#FF2400"
                />
              </svg>
            )}
            {!zeroArrows && twoArrows && (
              <>
                <svg
                  className="arrow"
                  width="87"
                  height="157"
                  viewBox="0 0 87 157"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M85.1192 93.312C86.2457 94.1102 86.5118 95.6706 85.7135 96.7972L44.3733 155.138C43.8986 155.808 43.1253 156.202 42.3044 156.192C41.4835 156.183 40.7196 155.771 40.2606 155.09L0.927173 96.7493C0.15533 95.6045 0.457683 94.0507 1.60251 93.2789C2.74733 92.507 4.3011 92.8094 5.07295 93.9542L39.8335 145.512L39.8335 3C39.8335 1.61929 40.9528 0.499998 42.3335 0.499998C43.7142 0.499998 44.8335 1.61929 44.8335 3L44.8335 145.84L81.6339 93.9064C82.4322 92.7798 83.9926 92.5137 85.1192 93.312Z"
                    fill="#FF2400"
                  />
                </svg>
                <svg
                  className="arrow"
                  width="87"
                  height="157"
                  viewBox="0 0 87 157"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M85.1192 93.312C86.2457 94.1102 86.5118 95.6706 85.7135 96.7972L44.3733 155.138C43.8986 155.808 43.1253 156.202 42.3044 156.192C41.4835 156.183 40.7196 155.771 40.2606 155.09L0.927173 96.7493C0.15533 95.6045 0.457683 94.0507 1.60251 93.2789C2.74733 92.507 4.3011 92.8094 5.07295 93.9542L39.8335 145.512L39.8335 3C39.8335 1.61929 40.9528 0.499998 42.3335 0.499998C43.7142 0.499998 44.8335 1.61929 44.8335 3L44.8335 145.84L81.6339 93.9064C82.4322 92.7798 83.9926 92.5137 85.1192 93.312Z"
                    fill="#FF2400"
                  />
                </svg>
              </>
            )}
          </div>
        )}
        <div className={`question-text ${makeSmallText ? " small-text" : ""}`}>
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
                        {/*testing*/}
                        {/* <div className="next-option-testing">
                      nextJump: {option.nextJump}
                    </div> */}
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
                              nextJump,
                              jumpFromHere
                            )
                          }
                        >
                          {checkInfosForOptions(option)}
                          {"img" in option ? (
                            <img
                              className="option-img"
                              src={
                                process.env.PUBLIC_URL + `/images/${option.img}`
                              }
                              style={!isLoading ? {} : { display: "none" }}
                              alt="img here"
                              onLoad={() => setImgLoaded(true)}
                            />
                          ) : null}
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
                        {/*testing*/}
                        {/* <div className="next-option-testing">
                      next: {option.next}
                    </div> */}
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
                              0,
                              jumpFromHere
                            )
                          }
                        >
                          {checkInfosForOptions(option)}
                          {"img" in option ? (
                            <img
                              className="option-img"
                              src={
                                process.env.PUBLIC_URL + `/images/${option.img}`
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
        {lose && <LoseScreen question={question} />}
        {question[0].options.length === 1 && (
          <div className="down-line">
            <hr />
          </div>
        )}
      </>
      {/* </CSSTransition>
      </TransitionGroup> */}
    </>
  );
};

export default Question;
