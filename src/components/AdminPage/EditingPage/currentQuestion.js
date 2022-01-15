import { React } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const CurrentQuestion = ({
  currentQuestion,
  setCurrentQuestion,
  chooseCurrent,
  previousQuestions,
  questions,
}) => {
  const goBack = (id) => {
    const newQuestion = questions.filter((question) => question.id === id)[0];
    setCurrentQuestion(newQuestion);
  };
  return (
    <>
      <div className="current-question">
        <div className="current-title">
          <h2>просмотр вопроса</h2>
        </div>
        {previousQuestions.length > 0 && (
          <>
            <button onClick={() => goBack(previousQuestions.pop())}>
              {previousQuestions[previousQuestions.length - 1]}
              <BsArrowLeft />
            </button>
            <small> предыдущий вопрос</small>
          </>
        )}
        <div className="question-scroll">
          {/*name, id, image*/}
          <div className="question-id">
            <h1>{currentQuestion.id}</h1>
          </div>
          <div className="question-year">
            год: {currentQuestion.year}, период: {currentQuestion.period}
          </div>
          <div className="question-image">
            {currentQuestion.img !== "" ? (
              <>
                <img
                  src={
                    process.env.PUBLIC_URL + `/images/${currentQuestion.img}`
                  }
                  alt="img here"
                />
                <small> изображение</small>
                <div className="imgRef">
                  <a href={currentQuestion.imgRef}>источник</a>
                </div>
              </>
            ) : (
              <p style={{ color: "red" }}>изображения нет</p>
            )}
          </div>

          <div className="question-text">{currentQuestion.text}</div>

          {/*options */}
          <div className="question-options">
            <h4>Варианты ответов:</h4>
            {currentQuestion.options.map((option, index) => {
              return (
                <div key={index} className="question-option">
                  {option.text} <BsArrowRight />{" "}
                  <div className="option-next">
                    <button onClick={() => chooseCurrent(option.next)}>
                      {option.next}
                    </button>
                  </div>
                  {option.infos &&
                    option.infos.map((info) => {
                      return (
                        <>
                          <h4>Справка для термина из варианта ответа:</h4>
                          <p>
                            {info.name} <small>название справки</small>
                          </p>
                          <p>
                            {info.text} <small>текст справки</small>
                          </p>
                          <p>
                            {info.altText}{" "}
                            <small>
                              {" "}
                              подсвечивающийся текст для нажатия на справку
                            </small>
                          </p>
                        </>
                      );
                    })}
                </div>
              );
            })}
            {currentQuestion.options.length === 1 && (
              <small>
                нет выбора, на данном ходе просто сообщается информация
              </small>
            )}
          </div>

          {/*infos */}
          <div className="question-infos">
            <h4>Справки для терминов из вопроса:</h4>
            {currentQuestion.infos &&
              currentQuestion.infos.map((info, index) => {
                return (
                  <div className="info" key={index}>
                    <div className="info-name">
                      {index + 1}. {info.name} <small>название справки</small>
                    </div>
                    <div className="info-text">
                      {info.text} <small>текст справки</small>
                    </div>
                    <div className="alt-text">
                      {info.altText}{" "}
                      <small>
                        подсвечивающийся текст для нажатия на справку
                      </small>
                    </div>
                  </div>
                );
              })}
            {!currentQuestion.infos && <p>нет</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentQuestion;
