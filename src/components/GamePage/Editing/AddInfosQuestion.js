import React, { useState } from "react";
import FileBase from "react-file-base64";

const AddInfosQuestion = ({
  setShowInfos,
  setShowModalQuestion,
  questionInitialState,
  currentInfoID,
  setQuestionInitialState,
  setCurrentInfoID,
}) => {
  const initialStateInfo = {
    id: 0,
    text: "",
    name: "",
    key: 0,
    isActive: false,
    altText: "",
    img: "",
  };
  const infoToUpdate = currentInfoID
    ? questionInitialState.infos.find((info) => info.id === currentInfoID)
    : null;
  const [info, setInfo] = useState(
    infoToUpdate ? infoToUpdate : initialStateInfo
  );

  const handleSubmitInfos = () => {
    if (!infoToUpdate) {
      let temp = 10;
      if (questionInitialState.infos.length > 0) {
        questionInitialState.infos.forEach((info) => {
          if (info.id > temp) {
            temp = info.id;
          }
        });
      }
      if (questionInitialState.options.length > 1) {
        questionInitialState.options.forEach((option) => {
          if ("infos" in option) {
            option.infos.forEach((info) => {
              if (info.id > temp) {
                temp = info.id;
              }
            });
          }
        });
      }
      let newInfo = { ...info, id: temp + 1 };
      let newInfos = [...questionInitialState.infos, newInfo];
      setQuestionInitialState({ ...questionInitialState, infos: newInfos });
    } else {
      let newArr = questionInitialState.infos;
      newArr = newArr.map((x) => (x.id === currentInfoID ? info : x));
      setQuestionInitialState({ ...questionInitialState, infos: newArr });
    }
    setShowInfos(false);
    setInfo(initialStateInfo);
    setCurrentInfoID(null);
    setShowModalQuestion(true);
  };
  return (
    <div className="modal-edit-question">
      <div className="modal-content">
        <div className="form">
          <form autoComplete="off" action="">
            <label htmlFor="">
              Текст справки:
              <textarea
                type="text"
                value={info.text}
                onChange={(e) => setInfo({ ...info, text: e.target.value })}
                style={{
                  display: "block",
                  width: "100%",
                  minHeight: "100px",
                }}
              />
            </label>
            <label htmlFor="">
              Заголовок справки:
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                style={{
                  display: "block",
                  width: "100%",
                }}
              />
            </label>
            <label htmlFor="">
              Словосочетание в тексте вопроса, которое будет подсвечиваться:
              <input
                type="text"
                value={info.altText}
                onChange={(e) => setInfo({ ...info, altText: e.target.value })}
                style={{
                  display: "block",
                  width: "100%",
                }}
              />
            </label>
            {/* <div className="image">
              Изображение:
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setInfo({ ...info, img: base64 })}
              />
            </div> */}
            {"img" in info && info.img !== "" && (
              <div className="image">
                Изображение:
                <img
                  src={
                    info.img.includes("data:")
                      ? info.img
                      : process.env.PUBLIC_URL + `/images/${info.img}`
                  }
                  alt="img here"
                  style={{
                    width: "100px",
                  }}
                />
                <button onClick={() => setInfo({ ...info, img: "" })}>
                  Удалить
                </button>
              </div>
            )}
            {(!("img" in info) || ("img" in info && info.img === "")) && (
              <span style={{ marginTop: "20px", display: "block" }}>
                Выбрать изображение (опционально)
              </span>
            )}
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setInfo({ ...info, img: base64 })}
            />
            <button type="button" onClick={() => handleSubmitInfos()}>
              {infoToUpdate ? "Сохранить" : "Добавить"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowInfos(false);
                setInfo(initialStateInfo);
                setShowModalQuestion(true);
              }}
            >
              Отменить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInfosQuestion;
