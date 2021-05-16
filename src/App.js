import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
// import Question from "./Question";
import data from "./data";
import Question from "./Question";
import { BsQuestion } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

function App() {
  const [index, setIndex] = useState(1000);
  const [question, setQuestion] = useState(data);
  const [questionChanged, setQuestionChanged] = useState(false);
  const [infoArray, setInfoArray] = useState([]); //write infos here
  const [isShowInfo, setIsShowInfo] = useState(false);
  const [questionCounter, setQuestionCounter] = useState(1);
  const [isJump, setIsJump] = useState(false);
  const [jump, setJump] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [periodArray, setPeriodArray] = useState(["1900-1917"]);
  // console.log(typeof infoArray);
  // info object:
  // {title, text, img, isActive}

  const handleClick = () => {
    if (index !== question[0].id) setQuestionCounter(questionCounter + 1);

    setQuestionChanged(true);
    setQuestion(data.filter((item) => item.id === index));
    setQuestionChanged(false);
  };

  // const checkInfoStatus = () => {
  //   question[0].isInfo ? setIsInfo(true) : setIsInfo(false);
  // };

  useEffect(() => {
    checkOptions();
  }, [question]);

  useEffect(() => {
    checkInfos();
    checkInfosTest();
  }, [questionCounter]);

  useEffect(() => {
    console.log("array changed, new length:", infoArray.length);
  }, [infoArray]);
  const nextClick = (id, isActive, next, nextJump) => {
    if (nextJump !== 0) {
      setJump(nextJump);
      setIsJump(true);
    }
    setIndex(next);

    //change active option
    const i = question[0].options.findIndex((option) => option.id === id);
    const clone = [...question[0].options];
    clone[i] = { ...clone[i], isActive: true };
    const objClone = [...question];
    objClone[0] = { ...question[0], options: clone };
    setQuestion(objClone);
    question[0].options.map((option) => {
      option.isActive = false;
    });
  };

  //check if there's more than one option = it's a question, otherwise =it's an announcement
  const checkOptions = () => {
    if (question[0].options.length === 1) {
      if (isJump) {
        setIndex(jump);
        console.log(jump);
        setIsJump(false);
      } else {
        setIndex(question[0].options[0].next);
      }
    }
  };

  const setShowInfoTrue = () => {
    setIsShowQuestion(false);
    setIsShowInfo(true);
  };
  const setShowQuestionTrue = () => {
    setIsShowInfo(false);
    setIsShowQuestion(true);
  };

  //check infos in question
  const checkInfos = () => {
    if ("info" in question[0]) {
      question[0].info.map((singleInfo) => {
        setInfoArray((infoArray) => [...infoArray, singleInfo]);
      });
    }
  };

  //check infos in options
  const checkInfosTest = () => {
    question[0].options.map((option) => {
      if ("info" in option) {
        option.info.map((singleInfo) => {
          setInfoArray((infoArray) => [...infoArray, singleInfo]);
        });
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        {questionChanged && <h1>Loading...</h1>}
        {/* CARD */}
        <>
          <div className="container">
            <div className="info-entries">
              <div className="perod-info-toggle">
                {infoArray.map((info) => {
                  return (
                    <div className="info-single-entry">
                      {/* {info.id - 9} */}
                      {info.name}
                    </div>
                  );
                })}
              </div>
            </div>
            {isShowInfo && ( //show currently chosen info entry
              <div className="card" id={question[0].id}>
                <div className="infoName">
                  <h2>Info Name</h2>
                </div>
                <div className="img-container">
                  <img
                    className="headImage"
                    src="../images/placeholder.png"
                    alt=""
                  />
                </div>

                <div className="question">
                  <h2>{question[0].info}</h2>
                </div>
              </div>
            )}
            {isShowQuestion && (
              <div className="card" id={question[0].id}>
                <div className="year">{question[0].year}</div>
                <div className="img-container">
                  <img
                    className="headImage"
                    src="../images/placeholder.png"
                    alt="img here"
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
            )}
            <div className="next">
              <div className="question-number">{questionCounter}</div>
              <button className="next-button" onClick={() => handleClick()}>
                Далее
              </button>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default App;

/* OLD CARD W/ QUESTION */

/* {isShowQuestion && (
          <div className="container">
            <>
              <button
                className="info-btn"
                onClick={() => setShowInfoTrue(true)}
              >
                <BsQuestion />
              </button>
              {
                <>
                  <div className="card" id={question[0].id}>
                    <div className="year">{question[0].year}</div>
                    <div className="img-container">
                      <img
                        className="headImage"
                        src="./images/placeholder.png"
                        alt="img here"
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
                                    nextClick(
                                      option.id,
                                      option.isActive,
                                      next,
                                      0
                                    )
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
                    <button
                      className="next-button"
                      onClick={() => handleClick()}
                    >
                      Далее
                    </button>
                  </div>
                </>
              } */

/* </>
          </div>
        )} */
