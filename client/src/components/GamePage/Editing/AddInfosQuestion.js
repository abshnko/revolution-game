import React, { useState } from "react";
import FileBase from "react-file-base64";

const AddInfosQuestion = ({
  setShowInfos,
  setShowModalQuestion,
  question,
  currentInfoID,
  setQuestion,
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
    ? question.infos.find((info) => info.id === currentInfoID)
    : null;
  const [info, setInfo] = useState(
    infoToUpdate ? infoToUpdate : initialStateInfo
  );

  const handleSubmitInfos = () => {
    if (!infoToUpdate) {
      let temp = 10;
      if (question.infos.length > 0) {
        question.infos.forEach((info) => {
          if (info.id > temp) {
            temp = info.id;
          }
        });
      }
      let newInfo = { ...info, id: temp + 1 };
      let newInfos = [...question.infos, newInfo];
      setQuestion({ ...question, infos: newInfos });
    } else {
      let newArr = question.infos;
      newArr = newArr.map((x) => (x.id === currentInfoID ? info : x));
      setQuestion({ ...question, infos: newArr });
    }
    setShowInfos(false);
    setInfo(initialStateInfo);
    setCurrentInfoID(null);
    setShowModalQuestion(true);
  };
  return (
    <div className="modal">
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
              Словосочетание в тексте справки, которое будет подсвечиваться:
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
            <div className="image">
              Изображение:
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setInfo({ ...info, img: base64 })}
              />
            </div>
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
