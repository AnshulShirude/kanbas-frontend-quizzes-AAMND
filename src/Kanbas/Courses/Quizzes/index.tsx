import QuizzesList from "./List";
import QuizListScreen from "./QuizListScreen";
import QuizQuestionsEditor from "./QuizQuestionsEditor";

function Quizzes() {
  return (
    <>
      <div style={{ marginTop: "20px" }} />
      <QuizListScreen />
      <QuizzesList />
      <QuizQuestionsEditor />
    </>
  );
}
export default Quizzes;
