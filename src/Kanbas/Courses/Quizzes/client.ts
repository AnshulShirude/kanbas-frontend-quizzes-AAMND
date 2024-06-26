import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const QUIZZES_API = "http://localhost:4000/api/quizzes";
const QUESTIONS_API = "http://localhost:4000/api/questions";
export const updateQuiz = async (quiz : any) => {
  const response = await axios.
    put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};
export const deleteQuiz = async (quizId : any) => {
  const response = await axios
    .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
export const createQuiz = async (courseId: any, quiz : any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};
export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};
export const publishQuiz = async (quizId : any) => {
  const response = await axios
    .put(`${QUIZZES_API}/publish/${quizId}`);
  return response.data;
}

export const updateQuestion = async (question : any, quiz: any) => {
  const response = await axios.
    put(`${QUIZZES_API}/${quiz._id}`, question);
  return response.data;
};
