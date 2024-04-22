import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes } from "./reducer";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";
import { FaEllipsisV } from "react-icons/fa";
import * as client from "./client";
import { publishQuiz } from "./reducer";
import { findQuestionsForQuiz } from "./Questions/client";

function QuizDetails() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { quizId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);

  const [totalPoints, setTotalPoints] = useState<number | null>(null);

  useEffect(() => {
    if (quizId) {
      findQuestionsForQuiz(quizId).then((questions) => {
        // Assuming each question has a 'points' property
        const total = questions.reduce((acc : any, question: any) => acc +  (+question.points || 0), 0);
        setTotalPoints(total);
      });
    }
  }, [quizId]);

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = quizList.find((quiz) => quiz._id === quizId);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
     return dateString;
    }

    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    const formattedDate = `${month} ${day} at ${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}${amPm}`;
    return formattedDate;
  };

  const handlePublish = (quizId: any) => {
    client.publishQuiz(quizId).then((status) => {
      dispatch(publishQuiz(quizId));
    });
  };

  return (
    <>
      <div
        className="btn-group"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handlePublish(quizId)}
        >
          <i className="fa fa-check" /> Published
        </button>
        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Preview`}>
        <button type="button" className="btn btn-light">
          Preview
        </button>
        </Link>
        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Edit/Details`}>
          <button type="button" className="btn btn-danger">
            <i className="fa fa-pencil" /> Edit
          </button>
        </Link>
        <button type="button" className="btn btn-light">
          <FaEllipsisV />
        </button>
      </div>
      <div>

      <div className="mb-3">
  <h1>{quiz?.title}</h1>
  <p style={{ marginBottom: '20px' }}>{quiz?.description}</p> {/* Added paragraph tag and margin */}
</div>

        <ul className="list-group">
          <li>
            <strong>Quiz Type: </strong>
            {quiz?.quizType}
          </li>
          <li>
            <strong>Points: </strong>
            {totalPoints !== null ? totalPoints : 0}
          </li>
          <li>
            <strong>Assignment Group: </strong>
            {quiz?.assignmentGroup}
          </li>
          <li>
            <strong>Shuffle Answers: </strong>
            {quiz?.shuffleAnswers ? "Yes" : "No"}
          </li>
          <li>
            <strong>Time Limit: </strong>

              {quiz?.timeLimitBool ? quiz?.timeLimit : "No time limit"}
          </li>
          <li>
            <strong>Multiple Attempts: </strong>
            {quiz?.multipleAttempts ? quiz?.numberOfAttempts : "No"}
          </li>
          <li>
            <strong>Access Code: </strong>
            {(quiz?.accessCode == "") ? "No Access Code" : quiz?.accessCode}
          </li>
        
          <li>
            <strong>Show Correct Answers: </strong>
            {quiz?.showCorrectAnswers ? "Yes, revealed: "  + formatDate(quiz?.showCorrectAnswersDate): "No"}
          </li>
          <li>
            <strong>One Question at a Time: </strong>
            {quiz?.oneQuestionAtATime ? "Yes" : "No"}
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "10px",
          }}
        >
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
          <div>{formatDate(quiz?.dueDate)}</div>
          <div>{quiz?.for}</div>
          <div>{formatDate(quiz?.availableDate)}</div>
          <div>{formatDate(quiz?.untilDate)}</div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default QuizDetails;
