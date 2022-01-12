import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  text: String,
  year: String,
  id: Number,
  period: String,
  img: String,
  options: Array,
  isInfo: Boolean,
  infos: Array,
});

const QuestionMessage = mongoose.model("QuestionMessage", questionSchema);

export default QuestionMessage;
