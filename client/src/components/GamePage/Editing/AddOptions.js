import React, { useState, useEffect } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import FileBase from "react-file-base64";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddInfosOptions from "./AddInfosOptions";

const AddOptions = ({
  setShowModalOptions,
  question,
  setQuestion,
  setShowModalQuestion,
  questions,
  optionToUpdate,
  setCurrentOptionID,
  currentOptionID,
}) => {
  const initialStateOption = {
    id: 0,
    text: "",
    state: {},
    next: 0,
    isInfo: false,
    isActive: false,
    infos: [],
    img: "",
  };

  const [option, setOption] = useState(
    optionToUpdate ? optionToUpdate : initialStateOption
  );
  const [currentInfoID, setCurrentInfoID] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [showOwnInfos, setShowOwnInfos] = useState(false);

  const handleSubmit = () => {
    let newArr = question.options;
    if (!optionToUpdate) {
      let biggestID = 10;
      if (question.options.length > 0) {
        question.options.forEach((option) => {
          if (option.id > biggestID) biggestID = option.id;
        });
      }

      let optionCopy = { ...option, id: biggestID + 1 };
      newArr = [...newArr, optionCopy];
      setQuestion({ ...question, options: newArr });
    } else {
      newArr = newArr.map((x) => (x.id === currentOptionID ? option : x));
      setQuestion({ ...question, options: newArr });
    }
    setShowModalOptions(false);
    setShowModalQuestion(true);
    setCurrentOptionID(null);
  };

  const updateOptionNext = (e) => {
    setOption({ ...option, next: e.target.value });
    console.log(option);
  };

  useEffect(() => {
    console.log(option);
  });

  return (
    <div className="modal">
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
            type="button"
            onClick={() => {
              setShowModalOptions(false);
              setShowModalQuestion(true);
              setCurrentOptionID(null);
              setOption(initialStateOption);
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
            {optionToUpdate ? "Редактировать ответ" : "Добавить ответ"}
          </h2>
          <button className="save-btn" onClick={() => handleSubmit()}>
            {optionToUpdate ? "Сохранить" : "Добавить"}
          </button>
        </div>
        <div className="form">
          <form autoComplete="off" action="">
            <label htmlFor="">
              Текст ответа:
              <textarea
                type="text"
                value={option.text}
                onChange={(e) => setOption({ ...option, text: e.target.value })}
                style={{
                  display: "block",
                  width: "100%",
                  minHeight: "100px",
                  marginBottom: "20px",
                }}
              />
            </label>
            <label htmlFor="">
              Какой вопрос увидит игрок после выбора этого ответа?
              <select
                className="dropdown"
                type="text"
                value={option.next}
                onChange={updateOptionNext}
              >
                <option value="choose">---Выберите ответ---</option>
                {questions.map((question) => {
                  return (
                    <option value={question.id}>{`${question.id} - ${
                      Math.floor(question.id / 100) === 10 ? "(М) " : "(Ж) "
                    }${question.text.substring(0, 50)}...`}</option>
                  );
                })}
              </select>
            </label>
            <div className="image">
              {"img" in option && (
                <div className="image">
                  <span>Текущее изображение:</span>
                  <img
                    //   src={
                    //     process.env.PUBLIC_URL + `/images/${question.img}`
                    //   }
                    src={`./images/${option.img}`}
                    alt=""
                    style={{
                      width: "100px",
                    }}
                  />
                </div>
              )}
              {!("img" in option) && (
                <span>Выбрать изображение (опционально)</span>
              )}
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setOption({ ...option, img: base64 })}
              />
            </div>
            <label htmlFor="infos">
              У ответа будет справочная информация?
              <input
                type="checkbox"
                id="infos"
                name="infos"
                value={option.isInfo}
                checked={option.isInfo}
                onChange={() => {
                  setShowOwnInfos(false);
                  if (option.infos.length > 0) {
                    setShowAlert(true);
                  } else {
                    setOption({ ...option, isInfo: !option.isInfo });
                  }
                }}
              />
            </label>
            {showAlert && (
              <label htmlFor="alert">
                Удалить все справки?
                <button
                  className="confirm-btn"
                  onClick={() => {
                    setOption({
                      ...option,
                      isInfo: false,
                      infos: [],
                    });
                    setShowAlert(false);
                  }}
                >
                  Да
                </button>
                <button
                  className="confirm-btn"
                  type="button"
                  onClick={() => {
                    setShowAlert(false);
                  }}
                >
                  Нет
                </button>
              </label>
            )}
          </form>
          {option.isInfo && (
            <div className="infos">
              <h3 className="options-header">Справки для ответа:</h3>

              <div className="options">
                {option.infos.map((info, index) => {
                  return (
                    <div className="option" key={info.id}>
                      <div className="text">
                        {info.name}
                        <br />
                      </div>
                      <div className="buttons">
                        <button
                          className="delete-button"
                          onClick={() => {
                            const copyInfos = option.infos.filter(
                              (x) => x.id !== info.id
                            );
                            const newOption = { ...option, infos: copyInfos };
                            setOption(newOption);
                            const newOptions = question.options.map((x) =>
                              x.id === newOption.id ? newOption : x
                            );
                            setQuestion({
                              ...question,
                              options: newOptions,
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
                            setCurrentInfoID(info.id);
                            setShowOwnInfos(true);
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
                    setShowOwnInfos(true);
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
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
          {showOwnInfos && (
            <AddInfosOptions
              setShowOwnInfos={setShowOwnInfos}
              currentInfoID={currentInfoID}
              option={option}
              setOption={setOption}
              setCurrentInfoID={setCurrentInfoID}
              setShowModalOptions={setShowModalOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddOptions;
