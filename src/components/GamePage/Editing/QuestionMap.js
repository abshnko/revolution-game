import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "../../../styles/main/question-map.css";
import { ToastContainer } from "react-toastify";
import { notifyAboutDelete } from "../../../utils/notifyers";
// import asd from "../../../../public/images"

const QuestionMap = ({
  questions,
  setCurrentQuestionID,
  setShowModalQuestion,
  setAlertDeleteQuestion,
  setShowQuestionMap,
  questionInitialState,
  setQuestionInitialState,
  alertDeleteQuestion,
  dispatch,
  deleteQuestion,
  setQuestion,
  setIndex,
  question,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [idForDelete, setIdForDelete] = useState(null);
  //   const showUploadedImage = singleQuestion.img.includes("data:");

  //   const [allNexts, setAllNexts] = useState([]);
  let allNexts = [];
  const allNextsTemp = questions.map((question) => {
    return question.options.map((option) => option.next);
  });
  allNexts = [...new Set(allNextsTemp.flat())];
  const questionRef = useRef();

  useEffect(() => {
    if (questionRef !== undefined) {
      questionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="wrapper-map">
      <button onClick={() => setShowQuestionMap(false)} className="back-button">
        Назад
      </button>
      <div className="questions">
        {questions.length === 0 ? (
          <h1>LOADING...</h1>
        ) : (
          <>
            {questions
              .sort(function (a, b) {
                return a.id - b.id;
              })
              .map((singleQuestion) => {
                const notInAnyOption = allNexts.includes(singleQuestion.id)
                  ? false
                  : true;
                return (
                  <div
                    key={singleQuestion._id}
                    className="question"
                    style={notInAnyOption ? { border: "3px solid red" } : {}}
                    ref={
                      singleQuestion.id === question[0].id ? questionRef : null
                    }
                  >
                    <div className="upper">
                      <h2>
                        <button
                          style={
                            singleQuestion.id === question[0].id
                              ? { color: "rgb(108, 209, 61)" }
                              : {}
                          }
                          onClick={() => {
                            setIndex(singleQuestion.id);
                            setQuestion(
                              questions.filter(
                                (item) => item.id === singleQuestion.id
                              )
                            );
                            setShowQuestionMap(false);
                          }}
                        >
                          {singleQuestion.id}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-arrow-narrow-right"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <line x1="15" y1="16" x2="19" y2="12"></line>
                            <line x1="15" y1="8" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        {singleQuestion.id === question[0].id && (
                          <p>текущий вопрос</p>
                        )}
                      </h2>
                      {notInAnyOption && (
                        <p style={{ color: "red" }}>
                          ! На вопрос не указывает ни один из ответов
                        </p>
                      )}
                      <h4>{singleQuestion.text.substring(0, 50)}...</h4>
                      <div className="options">
                        {singleQuestion.options.map((option) => {
                          return (
                            <div
                              className="option"
                              style={
                                option.next === 0
                                  ? {
                                      border: "1px solid red",
                                      padding: "10px",
                                      borderRadius: "50px",
                                    }
                                  : {}
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-arrow-bottom-bar"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                ></path>
                                <path d="M12 3v18"></path>
                                <path d="M9 18l3 3l3 -3"></path>
                                <path d="M9 3h6"></path>
                              </svg>
                              {option.next}
                              {"lose" in singleQuestion &&
                                singleQuestion.lose === true &&
                                (singleQuestion.year === "1953" ? (
                                  <span className="win">ПОБЕДА</span>
                                ) : (
                                  <span className="lose">ПОРАЖЕНИЕ</span>
                                ))}
                            </div>
                          );
                        })}
                      </div>
                      {singleQuestion.img !== "" && (
                        <img
                          //   src={
                          //     process.env.PUBLIC_URL +
                          //     `/images/${singleQuestion.img}`
                          //   }
                          src={
                            singleQuestion.img.includes("data:")
                              ? singleQuestion.img
                              : process.env.PUBLIC_URL +
                                `/images/${singleQuestion.img}`
                          }
                          style={
                            imgLoaded ? { width: "150px" } : { display: "none" }
                          }
                          alt="img here"
                          onLoad={() => setImgLoaded(true)}
                        />
                      )}
                    </div>

                    <div className="buttons">
                      <button
                        className="edit-button"
                        onClick={() => {
                          if (questionInitialState.id === 0) {
                            let temp = 1000;
                            if (questions.length > 0) {
                              questions.forEach((x) => {
                                if (x.id > temp) {
                                  temp = x.id;
                                }
                              });
                            }
                            setQuestionInitialState({
                              ...questionInitialState,
                              id: temp + 1,
                            });
                          }
                          setCurrentQuestionID(singleQuestion._id);
                          setShowModalQuestion(true);
                        }}
                      >
                        <svg className="svg-icon" viewBox="0 0 20 20">
                          <path
                            fill="#d4d4d4"
                            d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          setIdForDelete(singleQuestion._id);
                          setAlertDeleteQuestion(true);
                        }}
                      >
                        <svg className="delete-icon" viewBox="0 0 20 20">
                          <path
                            fill="#d4d4d4"
                            d="M16.471,5.962c-0.365-0.066-0.709,0.176-0.774,0.538l-1.843,10.217H6.096L4.255,6.5c-0.066-0.362-0.42-0.603-0.775-0.538C3.117,6.027,2.876,6.375,2.942,6.737l1.94,10.765c0.058,0.318,0.334,0.549,0.657,0.549h8.872c0.323,0,0.6-0.23,0.656-0.549l1.941-10.765C17.074,6.375,16.833,6.027,16.471,5.962z"
                          ></path>
                          <path
                            fill="#d4d4d4"
                            d="M16.594,3.804H3.406c-0.369,0-0.667,0.298-0.667,0.667s0.299,0.667,0.667,0.667h13.188c0.369,0,0.667-0.298,0.667-0.667S16.963,3.804,16.594,3.804z"
                          ></path>
                          <path
                            fill="#d4d4d4"
                            d="M9.25,3.284h1.501c0.368,0,0.667-0.298,0.667-0.667c0-0.369-0.299-0.667-0.667-0.667H9.25c-0.369,0-0.667,0.298-0.667,0.667C8.583,2.985,8.882,3.284,9.25,3.284z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            <button
              className="add-button"
              onClick={() => {
                setShowModalQuestion(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
                width="80%"
                height="80%"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </>
        )}
        {alertDeleteQuestion && (
          <div className="alert-delete-modal">
            <div className="alert-delete-modal-content">
              <p>
                Вы уверены, что хотите удалить вопрос?
                <div className="buttons">
                  <button
                    onClick={() => {
                      dispatch(deleteQuestion(idForDelete));
                      setIdForDelete(null);
                      notifyAboutDelete();
                      setAlertDeleteQuestion(false);
                    }}
                  >
                    Да
                  </button>
                  <button onClick={() => setAlertDeleteQuestion(false)}>
                    Нет
                  </button>
                </div>
              </p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default QuestionMap;
