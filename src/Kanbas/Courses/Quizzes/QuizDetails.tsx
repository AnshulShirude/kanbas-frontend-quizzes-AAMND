
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuizzes,
} from "./reducer";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";

interface QuizDetailsProps {
  quizId: string;
}

function QuizDetails(props: QuizDetailsProps) {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);

  const { quizId } = props;
  console.log(quizId);
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  console.log(quizList);
  const quiz = quizList.find((quiz) => quiz._id === quizId);
  return (
    <>
      <div>
        <h1>{quiz?.title}</h1>
        <ul className="list-group">
          <li>
            <strong>Quiz Type: </strong>
            {quiz?.quizType}
          </li>
          <li>
            <strong>Points: </strong>
            {quiz?.points}
          </li>
          <li>
            <strong>Assignment Group: </strong>
            {quiz?.assignmentGroup}
          </li>
          <li>
            <strong>Shuffle Answers: </strong>
            {quiz?.shuffleAnswers}
          </li>
          <li>
            <strong>Time Limit: </strong>
            {quiz?.timeLimit}
          </li>
          <li>
            <strong>Multiple Attempts: </strong>
            {quiz?.multipleAttempts}
          </li>
          <li>
            <strong>View Responses: </strong>
            {quiz?.viewResponses}
          </li>
          <li>
            <strong>Show Correct Answers: </strong>
            {quiz?.showCorrectAnswers}
          </li>
          <li>
            <strong>One Question at a Time: </strong>
            {quiz?.oneQuestionAtATime ? "Yes" : "No"}
          </li>
          <li>
            <strong>Require Respondus Lockdown Browser: </strong>
            {quiz?.lockdownRequired ? "Yes" : "No"}
          </li>
          <li>
            <strong>Required to View Quiz Results: </strong>
            {quiz?.viewQuizResults ? "Yes" : "No"}
          </li>

          <li>
            <strong>Webcam Required: </strong>
            {quiz?.webcamRequired ? "Yes" : "No"}
          </li>
          <li>
            <strong>Lock Questions After Answering: </strong>
            {quiz?.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </li>
        </ul>

        <div style={{ display: "flex", justifyContent: "space-evenly", marginTop:"10px" }}>
          <div>
            <strong>Due</strong>
          </div>
          <div>
            <strong>For</strong>
          </div>
          <div>
            <strong>Available From</strong>
          </div>
          <div>
            <strong>Until</strong>
          </div>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>{quiz?.dueDate}</div>
          <div>{quiz?.for}</div>
          <div>{quiz?.availableDate}</div>
          <div>{quiz?.untilDate}</div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default QuizDetails;
