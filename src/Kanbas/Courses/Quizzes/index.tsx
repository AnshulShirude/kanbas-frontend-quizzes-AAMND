import QuizzesList from "./List";
import QuizDetails from "./QuizDetails";
import QuizEditor from "./QuizEditor";
import QuizListScreen from "./QuizListScreen";

function Quizzes() {
  return (
    <>
      <div style={{ marginTop: "20px" }} />
      <QuizListScreen />
      <QuizzesList />
      <QuizDetails quizId="1000" />
      <QuizEditor />
    </>
  );
}
export default Quizzes;
