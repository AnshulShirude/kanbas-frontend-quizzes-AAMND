import QuizzesList from "./List";
import QuizEditor from "./QuizEditor";
import QuizListScreen from "./QuizListScreen";

function Quizzes() {
  return (
    <>
      <div style={{ marginTop: "20px" }} />
      <QuizListScreen />
      <QuizzesList />
    </>
  );
}
export default Quizzes;
