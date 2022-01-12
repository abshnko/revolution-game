// import { Mongoose } from "mongoose";
import QuestionMessage from "../models/questionMessage.js";
import mongoose from "mongoose";

export const getQuestions = async (req, res) => {
  try {
    const questionMessages = await QuestionMessage.find();
    res.json(questionMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  const question = req.body;
  const newQuestion = new QuestionMessage(question);
  try {
    await newQuestion.save();
    res.status(200).json(newQuestion);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const question = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No question with that ID");

  const updatedQuestion = await QuestionMessage.findByIdAndUpdate(
    id,
    question,
    { new: true }
  );

  res.status(200).json(updatedQuestion);
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No question with that ID");

  await QuestionMessage.findByIdAndRemove(id);

  res.status(200).json({ message: "Question deleted successfully" });
};
