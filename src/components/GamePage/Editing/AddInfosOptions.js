import React, { useState } from "react";
import FileBase from "react-file-base64";

const AddInfosOptions = ({
  setShowOwnInfos,
  currentInfoID,
  option,
  setOption,
  setCurrentInfoID,
  setShowModalOptions,
  questionInitialState,
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
    ? option.infos.find((info) => info.id === currentInfoID)
    : null;
  const [info, setInfo] = useState(
    infoToUpdate ? infoToUpdate : initialStateInfo
  );

  const handleSubmitInfos = () => {
    // let temp = 10;
    // if (option.infos.length > 0) {
    //   option.infos.forEach((info) => {
    //     if (info.id > temp) {
    //       temp = info.id;
    //     }
    //   });
    // }
    // let newInfo = { ...info, id: temp + 1 };
    // let newInfos = [...option.infos, newInfo];
    // setOption({ ...option, infos: newInfos });
    // setShowOwnInfos(false);
    // setInfo(initialStateInfo);

    if (!infoToUpdate) {
      let temp = 10;
      //   if (option.infos.length > 0) {
      //     option.infos.forEach((info) => {
      //       if (info.id > temp) {
      //         temp = info.id;
      //       }
      //     });
      //   }
      if ("infos" in questionInitialState) {
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
      let newInfos = [...option.infos, newInfo];
      setOption({ ...option, infos: newInfos });
    } else {
      let newArr = option.infos;
      newArr = newArr.map((x) => (x.id === currentInfoID ? info : x));
      setOption({ ...option, infos: newArr });
    }
    setShowOwnInfos(false);
    setInfo(initialStateInfo);
    setCurrentInfoID(null);
    setShowModalOptions(true);
  };

  return (
    <div className="form">
      <form autoComplete="off" action="">
        <label htmlFor="">
          ?????????? ??????????????:
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
          ?????????????????? ??????????????:
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
          ???????????????????????????? ?? ???????????? ????????????, ?????????????? ?????????? ????????????????????????????:
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
        {"img" in info && info.img !== "" && (
          <div className="image">
            ??????????????????????:
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
              ??????????????
            </button>
          </div>
        )}
        {(!("img" in info) || ("img" in info && info.img === "")) && (
          <span style={{ marginTop: "20px", display: "block" }}>
            ?????????????? ?????????????????????? (??????????????????????)
          </span>
        )}
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setInfo({ ...info, img: base64 })}
        />
        <button type="button" onClick={() => handleSubmitInfos()}>
          {infoToUpdate ? "??????????????????" : "????????????????"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowOwnInfos(false);
            setInfo(initialStateInfo);
          }}
        >
          ????????????????
        </button>
      </form>
    </div>
  );
};

export default AddInfosOptions;
