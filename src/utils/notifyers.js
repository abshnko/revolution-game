import { ToastContainer, toast } from "react-toastify";

export const notifyAboutDelete = () =>
  toast.success("Вопрос удален", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const notifyAboutEdit = (currentQuestionID) =>
  toast.success(`${currentQuestionID ? "Вопрос изменен" : "Вопрос добавлен"}`, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
