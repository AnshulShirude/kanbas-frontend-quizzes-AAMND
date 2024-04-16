import QuizzesList from "./List";
import QuizListScreen from "./QuizListScreen";
import QuizQuestionsEditor from "./QuizQuestionsAdder";

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
