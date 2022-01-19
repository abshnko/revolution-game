import React from "react";
import { useState, useEffect } from "react";
import { createQuestion, updateQuestion } from "../../../actions/questions";
import AddOptions from "../Editing/AddOptions";
import FileBase from "react-file-base64";
import axios from "axios";

import "../../../styles/main/edit-question.css";

import AddInfosQuestion from "../Editing/AddInfosQuestion";
import { notifyAboutEdit } from "../../../utils/notifyers";

const EditQuestion = ({
  dispatch,
  questionToUpdate,
  showModalQuestion,
  questions,
  alertDeleteQuestion,
  setIdForDelete,
  setAlertDeleteQuestion,
  idForDelete,
  initialState,
  setShowModalQuestion,
  setCurrentQuestionID,
  currentQuestionID,
  questionInitialState,
  setQuestionInitialState,
  setIndex,
  question,
  setQuestion,
}) => {
  const [currentOptionID, setCurrentOptionID] = useState(null);
  const [currentInfoID, setCurrentInfoID] = useState(null);
  const [showModalOptions, setShowModalOptions] = useState(false);
  const [showInfos, setShowInfos] = useState(false);
  const optionToUpdate = currentOptionID
    ? questionInitialState.options.find(
        (option) => option.id === currentOptionID
      )
    : null;

  const [alertDeleteInfos, setAlertDeleteInfos] = useState(false);
  const [line, setLine] = useState("unset");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (uploadedImage) {
    //   const data = new FormData();
    //   data.append("file", uploadedImage);
    //   axios
    //     .post("https://revolution-game.herokuapp.com/upload", data, {
    //       // receive two parameter endpoint url ,form data
    //     })
    //     .then((res) => {
    //       // then print response status
    //       console.log(res.statusText);
    //     });
    // }

    if (currentQuestionID) {
      dispatch(updateQuestion(currentQuestionID, questionInitialState));
    } else {
      dispatch(createQuestion(questionInitialState));
    }
    setCurrentQuestionID(null);
    setShowModalQuestion(false);
    setQuestionInitialState(initialState);
    document.body.style.overflow = "unset";
    notifyAboutEdit(currentQuestionID);
  };

  useEffect(() => {
    if (questionToUpdate) setQuestionInitialState(questionToUpdate);
  }, [questionToUpdate]);

  useEffect(() => {
    if (showModalOptions || showModalQuestion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModalQuestion, showModalOptions]);

  useEffect(() => {
    if (!questionToUpdate) {
      let temp = 999;
      if (line === "male") {
        if (questions.length > 0) {
          questions.forEach((x) => {
            if (x.id > temp && x.id < 1100) {
              temp = x.id;
            }
          });
        }
      } else {
        if (questions.length > 0) {
          questions.forEach((x) => {
            if (x.id > temp && x.id > 1100) {
              temp = x.id;
            }
          });
        }
      }
      setQuestionInitialState({ ...questionInitialState, id: temp + 1 });
      temp = 999;
    }
  }, [line]);

  return (
    <div>
      {showModalQuestion && (
        <div className="modal-edit-question">
          <div className="modal-content">
            <div
              className="header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                className="cancel-btn"
                onClick={() => {
                  document.body.style.overflow = "unset";
                  setQuestionInitialState(initialState);
                  setShowModalQuestion(false);
                  setCurrentQuestionID(null);
                  setLine("unset");
                  console.log(showModalQuestion, showModalOptions);
                }}
              >
                <svg className="svg-icon" viewBox="0 0 20 20" width="50">
                  <path
                    fill="grey"
                    d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
                  ></path>
                </svg>
                <div>Отменить</div>
              </button>
              <h2 style={{ fontSize: "24px", fontWeight: "300" }}>
                {currentQuestionID
                  ? "Редактирование вопроса "
                  : "Добавление вопроса "}
                <span style={{ textDecoration: "underline" }}>
                  {questionInitialState.id}
                </span>
              </h2>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="save-btn"
              >
                {currentQuestionID ? "Сохранить" : "Добавить"}
              </button>
            </div>
            <div className="form">
              <form autoComplete="off" action="">
                <label htmlFor="">
                  Текст вопроса:
                  <textarea
                    type="text"
                    value={questionInitialState.text}
                    onChange={(e) =>
                      setQuestionInitialState({
                        ...questionInitialState,
                        text: e.target.value,
                      })
                    }
                    style={{
                      display: "block",
                      width: "95%",
                      minHeight: "90px",
                    }}
                  />
                </label>

                <div
                  className="second-row"
                  style={{ display: "flex", marginTop: "20px" }}
                >
                  <label htmlFor="">
                    Год:
                    <input
                      type="text"
                      value={questionInitialState.year}
                      onChange={(e) =>
                        setQuestionInitialState({
                          ...questionInitialState,
                          year: e.target.value,
                        })
                      }
                      style={{
                        display: "block",
                        marginRight: "30px",
                        width: "80px",
                        borderColor: "#ababab",
                        backgroundColor: "transparent",
                      }}
                    />
                  </label>
                  <label htmlFor="">
                    Временной период:
                    <select
                      type="text"
                      value={questionInitialState.period}
                      onChange={(e) =>
                        setQuestionInitialState({
                          ...questionInitialState,
                          period: e.target.value,
                        })
                      }
                      style={{ display: "block", marginRight: "30px" }}
                    >
                      <option value="">---Выберите период---</option>
                      <option value="1900-1914">1900-1914</option>
                      <option value="1914-1917">1914-1917</option>
                      <option value="1918-1922">1918-1922</option>
                      <option value="1922-1929">1922-1929</option>
                      <option value="1929-1941">1929-1941</option>
                      <option value="1941-1945">1941-1945</option>
                      <option value="1945-1953">1945-1953</option>
                    </select>
                  </label>
                  <label htmlFor="">
                    Ветка:
                    <select
                      type="text"
                      value={
                        questionInitialState.id > 999
                          ? Math.floor(questionInitialState.id / 100) === 10
                            ? "male"
                            : "female"
                          : "unset"
                      }
                      onChange={(e) => setLine(e.target.value)}
                      style={{ display: "block", marginRight: "30px" }}
                    >
                      <option value="">---Выберите ветку---</option>
                      <option value="female">Женская</option>
                      <option value="male">Мужская</option>
                    </select>
                  </label>
                  <div className="image-container">
                    {questionInitialState.img !== "" && (
                      <div className="image">
                        <span>Текущее изображение:</span>
                        <img
                          //ПОМЕНЯТЬ
                          //   src={
                          //     process.env.PUBLIC_URL +
                          //     `/images/${questionInitialState.img}`
                          //   }
                          //   src={`./images/${questionInitialState.img}`}
                          src={
                            questionInitialState.img.includes("data:")
                              ? questionInitialState.img
                              : process.env.PUBLIC_URL +
                                `/images/${questionInitialState.img}`
                          }
                          alt=""
                          style={{
                            width: "100px",
                          }}
                        />
                      </div>
                    )}
                    {questionInitialState.img === "" && (
                      <span>Выбрать изображение (опционально)</span>
                    )}
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setQuestionInitialState({
                          ...questionInitialState,
                          img: base64,
                        })
                      }
                    />
                    {/* <form
                      method="post"
                      enctype="multipart/form-data"
                      action="/upload"
                    >
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => setUploadedImage(e.target.files[0])}
                      />
                    </form> */}
                  </div>
                  <label htmlFor="lose">
                    Это последний вопрос в ветке?
                    <input
                      className="checkbox"
                      type="checkbox"
                      id="lose"
                      name="lose"
                      value={questionInitialState.lose}
                      checked={questionInitialState.lose}
                      onChange={() => {
                        setQuestionInitialState({
                          ...questionInitialState,
                          lose: !questionInitialState.lose,
                        });
                      }}
                    />
                  </label>
                </div>
                <h3 className="options-header">Варианты ответа:</h3>
                <div className="options">
                  {questionInitialState.options.map((option, index) => {
                    return (
                      <div className="option" key={option.id}>
                        <div className="text">
                          {option.text} <br />
                          {option.next === 0 ? (
                            <span style={{ color: "red" }}>
                              Следующий вопрос не установлен!
                            </span>
                          ) : (
                            <div style={{ margin: "10px 0", color: "#bbb" }}>
                              Следующий вопрос:
                              <span
                                style={{
                                  textDecoration: "underline",
                                  marginLeft: "5px",
                                }}
                              >
                                {option.next}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="buttons">
                          <button
                            className="delete-button"
                            onClick={() => {
                              const copyOptions =
                                questionInitialState.options.filter(
                                  (x) => x.id !== option.id
                                );
                              setQuestionInitialState({
                                ...questionInitialState,
                                options: copyOptions,
                              });
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
                          <button
                            className="edit-button"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentOptionID(option.id);
                              setShowModalOptions(true);
                              //   setShowModalQuestion(false);
                            }}
                          >
                            <svg className="svg-icon" viewBox="0 0 20 20">
                              <path
                                fill="#d4d4d4"
                                d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => {
                      setShowModalOptions(true);
                      //   setShowModalQuestion(false);
                    }}
                    style={{
                      backgroundColor: "#F4F4F4",
                      borderRadius: "5px",
                      border: "none",
                      minHeight: "200px",
                      width: "170px",
                      cursor: "pointer",
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
                      //   stroke-linecap="round"
                      //   stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                <label htmlFor="infos">
                  У вопроса будет справочная информация?
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="infos"
                    name="infos"
                    value={questionInitialState.isInfo}
                    checked={questionInitialState.isInfo}
                    onChange={() => {
                      setShowInfos(false);
                      if (questionInitialState.infos.length > 0) {
                        setAlertDeleteInfos(true);
                      } else {
                        setQuestionInitialState({
                          ...questionInitialState,
                          isInfo: !questionInitialState.isInfo,
                        });
                      }
                    }}
                  />
                </label>
                {alertDeleteInfos && (
                  <label htmlFor="alert" style={{ marginLeft: "20px" }}>
                    Удалить все справки?
                    <button
                      className="confirm-btn"
                      onClick={() => {
                        setQuestionInitialState({
                          ...questionInitialState,
                          isInfo: false,
                          infos: [],
                        });
                        setAlertDeleteInfos(false);
                      }}
                    >
                      Да
                    </button>
                    <button
                      className="confirm-btn"
                      type="button"
                      onClick={() => {
                        setAlertDeleteInfos(false);
                      }}
                    >
                      Нет
                    </button>
                  </label>
                )}
                {questionInitialState.isInfo && (
                  <>
                    <h3 className="options-header">Справки для вопроса:</h3>
                    <div className="options">
                      {questionInitialState.infos.map((info, index) => {
                        return (
                          <div className="option" key={info.id}>
                            <div className="text">
                              {info.name} <br />
                            </div>
                            <div className="buttons">
                              <button
                                className="delete-button"
                                onClick={() => {
                                  const copyInfos =
                                    questionInitialState.infos.filter(
                                      (x) => x.id !== info.id
                                    );
                                  setQuestionInitialState({
                                    ...questionInitialState,
                                    infos: copyInfos,
                                  });
                                }}
                              >
                                <svg
                                  className="delete-icon"
                                  viewBox="0 0 20 20"
                                >
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
                              <button
                                className="edit-button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentInfoID(info.id);
                                  setShowInfos(true);
                                  // setShowModalQuestion(false);
                                }}
                              >
                                <svg className="svg-icon" viewBox="0 0 20 20">
                                  <path
                                    fill="#d4d4d4"
                                    d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => {
                          setShowInfos(true);
                        }}
                        style={{
                          backgroundColor: "#F4F4F4",
                          borderRadius: "5px",
                          border: "none",
                          minHeight: "200px",
                          width: "170px",
                          cursor: "pointer",
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
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      {showModalOptions && (
        <AddOptions
          setShowModalOptions={setShowModalOptions}
          questionInitialState={questionInitialState}
          setQuestionInitialState={setQuestionInitialState}
          setShowModalQuestion={setShowModalQuestion}
          questions={questions}
          optionToUpdate={optionToUpdate}
          setCurrentOptionID={setCurrentOptionID}
          currentOptionID={currentOptionID}
        />
      )}
      {showInfos && (
        <AddInfosQuestion
          setShowInfos={setShowInfos}
          setShowModalQuestion={setShowModalQuestion}
          questionInitialState={questionInitialState}
          currentInfoID={currentInfoID}
          setQuestionInitialState={setQuestionInitialState}
          setCurrentInfoID={setCurrentInfoID}
        />
      )}
    </div>
  );
};

export default EditQuestion;
