import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

const reducer = (questions = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...questions, action.payload];

    case UPDATE:
      return questions.map((question) =>
        question._id === action.payload._id ? action.payload : question
      );

    case DELETE:
      return questions.filter((question) => question._id !== action.payload);

    default:
      return questions;
  }
};

export default reducer;
