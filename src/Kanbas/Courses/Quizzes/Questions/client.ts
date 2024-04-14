import axios from "axios";
const QUESTIONS_API = "http://localhost:4000/api/questions";
const QUIZZES_API = "http://localhost:4000/api/quizzes";

export const updateQuiz = async (question : any) => {
  const response = await axios.
    put(`${QUESTIONS_API}/${question._id}`, question);
  return response.data;
};
export const deleteQuiz = async (questionId : any) => {
  const response = await axios
    .delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};
export const createQuiz = async (quizId: any, question : any) => {
  const response = await axios.post(
    `${QUESTIONS_API}/${quizId}/questions`,
    question
  );
  return response.data;
};
export const findQuestionsForQuiz = async (quizId: any) => {
  const response = await axios
    .get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const publishQuestion = async (questionId : any) => {
  const response = await axios
    .put(`${QUESTIONS_API}/publish/${questionId}`);
  return response.data;
  
}