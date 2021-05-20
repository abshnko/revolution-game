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
  const [testCounter, setTestCounter] = useState(1); //test

  const [isJump, setIsJump] = useState(false);
  const [jump, setJump] = useState(0);
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [INFOS, setINFOS] = useState([]);
  // const [isShowInfoEntries, setIsShowInfoEntries] = useState(false);
  // console.log(typeof infoArray);
  // info object:
  // {title, text, img, isActive}

  const addInfoHelper = (singleInfo) => {
    const i = INFOS.findIndex(
      (infoObj) => infoObj.period === question[0].period
    );
    console.log("index in INFOS:", i);
    if (i !== -1) {
      const newINFO = {
        infoId: singleInfo.id,
        infoName: singleInfo.name,
        infoText: singleInfo.text,
      };
      var infosArray = INFOS[i].infos;
      infosArray.push(newINFO);
      const newObj = { ...INFOS[i], infos: infosArray };
      const newArray = INFOS;
      newArray[i] = newObj;
      setINFOS(newArray);
    } else {
      const newINFO = {
        infoId: singleInfo.id,
        infoName: singleInfo.name,
        infoText: singleInfo.text,
      };
      setINFOS((INFOS) => [
        ...INFOS,
        {
          id: INFOS.length + 1,
          period: question[0].period,
          infos: [newINFO],
          isShowEntries: true,
        },
      ]);

      INFOS.map((INFO) => {
        INFO.isShowEntries = false;
      });
    }
  };

  function addINFO() {
    if ("infos" in question[0]) {
      question[0].infos.map((singleInfo) => {
        addInfoHelper(singleInfo);
      });
    }
    question[0].options.map((option) => {
      if ("infos" in option) {
        option.infos.map((singleInfo) => {
          addInfoHelper(singleInfo);
        });
      }
    });
  }

  const setIsShowInfoEntries = (periodId) => {
    const i = INFOS.findIndex((period) => period.id === periodId);
    const newArray = [...INFOS];
    const cloneObj = newArray[i];
    const show = cloneObj.isShowEntries;
    const newObj = { ...cloneObj, isShowEntries: !show };
    newArray[i] = newObj;
    setINFOS(newArray);
    INFOS.map((INFO) => {
      INFO.isShowEntries = false;
    });
  };

  const handleClick = () => {
    if (index !== question[0].id) setQuestionCounter(questionCounter + 1);
    setQuestionChanged(true);
    setQuestion(data.filter((item) => item.id === index));
    setQuestionChanged(false);
  };

  useEffect(() => {
    checkOptions();
  }, [question]);

  useEffect(() => {
    checkInfos();
    addINFO();
  }, [questionCounter]);

  useEffect(() => {
    console.log("array changed, new length:", INFOS.length);
  }, [INFOS]);

  // useEffect(() => {
  //   // addINFO();
  // }, [index]);

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
      // ADD if length === 0 : endgame (maybe)
    }
  };

  //check infos in question
  const checkInfos = () => {
    // if ("infos" in question[0]) {
    //   // question[0].infos.map((singleInfo) => {
    //   //   setInfoArray((infoArray) => [...infoArray, singleInfo.name]);
    //   // });
    // }
    setTestCounter(testCounter + 1);
  };

  return (
    <>
      <div className="wrapper">
        {questionChanged && <h1>Loading...</h1>}
        {/* CARD */}
        <>
          <div className="container">
            <div className="info-entries">
              {" "}
              {/*whole left column*/}
              {INFOS.map((period) => {
                return (
                  <div className="single-period">
                    <button
                      className="period-btn"
                      onClick={() => setIsShowInfoEntries(period.id)}
                    >
                      {period.period}
                    </button>
                    {period.isShowEntries &&
                      period.infos.map((info) => {
                        return (
                          <>
                            <div className="info-single-entry">
                              {info.infoName}
                            </div>
                          </>
                        );
                      })}
                  </div>
                );
              })}
              {/* {isShowInfoEntries &&
                INFOS.map((info) => {
                  return (
                    <>
                      {info.infos.map((singleInfo) => {
                        return (
                          <div className="info-single-entry">
                            {singleInfo.infoName}
                          </div>
                        );
                      })}
                    </>
                  );
                })} */}
              {/* {infoArray.map((item) => {
                return <>{item}</>;
              })} */}
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
