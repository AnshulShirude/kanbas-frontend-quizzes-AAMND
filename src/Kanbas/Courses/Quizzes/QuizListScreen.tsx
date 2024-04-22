import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaSpaceShuttle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, deleteQuiz, updateQuiz, setQuizzes } from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";
import { publishQuiz } from "./reducer";
import { format, set } from "date-fns";
import { findQuestionsForQuiz } from "./Questions/client";

function QuizListScreen() {
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const { courseId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const dispatch = useDispatch();

  const handleAddQuiz = () => {
    client.createQuiz(courseId, quiz).then((courseId) => {
      dispatch(addQuiz(quiz));
    });
  };
  const handleDeleteQuiz = (quizId: any) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };
  const handleUpdateQuiz = async () => {
    window.location.href = `/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Edit/Details`;
  };
  const handleOpenPopup = (quizId: any) => {
    setOpenPopupId(quizId === openPopupId ? null : quizId);
  };
  const handlePublish = (quizId: any) => {
    client.publishQuiz(quizId).then((status) => {
      dispatch(publishQuiz(quizId));
    });
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes)))
  };

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

  const getAvailabilityStatus = (quiz: any) => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);

    if (currentDate > untilDate) {
      return "Closed";
    } else if (currentDate >= availableDate && currentDate <= untilDate) {
      return "Available";
    } else if (currentDate < availableDate) {
      return `Not available until ${formatDate(quiz.availableDate)}`;
    }
  };
  // If the keys are the _id of the quiz and the values are number of questions
type QuestionCounts = {
  [key: string]: number; // Assuming the key is _id which is a string
};



  const [questionCounts , setQuestionCounts] = useState<QuestionCounts>({}); // State to store question counts
  // Add a new state to store the total points for each quiz
  const [quizPoints, setQuizPoints] = useState<{ [quizId: string]: number }>({});

  useEffect(() => {
    async function fetchQuizzesAndQuestions(courseId : string) {
      try {
        const quizzes = await findQuizzesForCourse(courseId);
        dispatch(setQuizzes(quizzes));
            

          // Initialize counts with the correct type
      const counts: QuestionCounts = {};
      const points: { [quizId: string]: number } = {};

        for (const quiz  of quizzes) {
          const questions = await findQuestionsForQuiz(quiz._id);
          counts[quiz._id] = questions.length;

          points[quiz._id] = questions.reduce((acc : any, question : any) => acc + (+question.points || 0), 0);
        }
        setQuestionCounts(counts);

        setQuizPoints(points);
      } catch (error) {
        console.error('Error fetching quizzes and questions:', error);
      }
    }

    if (courseId) {
      fetchQuizzesAndQuestions(courseId);
    }
  }, [courseId, dispatch]);



  return (
    <>
      <div className="input-group mb-3">
        <input
          style={{ width: "100px" }}
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
        />
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleAddQuiz}
        >
          <i className="fa-solid fa-plus"></i> Quiz
        </button>

        <button type="button" className="btn btn-light">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> <strong>Assignment Quizzes</strong>
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {quizList.map((quiz) => (
              <li className="list-group-item">
                <FaSpaceShuttle className="text-success" />
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "17px",
                  }}
                  to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                >
                  {quiz.title}
                  <br />
                  <span
                    style={{
                      paddingLeft: "25px",
                      fontSize: "16px",
                    }}
                  >
                    {getAvailabilityStatus(quiz)}
                  </span>{" "}
                  |
                  <span style={{ color: "gray", fontSize: "16px" }}>
                    {" "}
                    Due {format(
                      new Date(quiz.dueDate),
                      "MMM d 'at' h:mma"
                    )} | {quizPoints[quiz._id] || 0} pts | {questionCounts[quiz._id] || 0} Questions
                  </span>
                </Link>

                {openPopupId === quiz._id && (
                  <div className="btn-group">
                    {!quizList.find((quiz1) => quiz1._id === quiz._id)?.published &&
                      ( <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handlePublish(quiz._id)}
                      >
                        <i className="fa fa-check" /> Publish
                      </button>)
                    }
                    {quizList.find((quiz1) => quiz1._id === quiz._id)?.published &&
                      ( <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handlePublish(quiz._id)}
                      >
                        <i className="fa-solid fa-x" /> Unpublish
                      </button>)
                    }
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Preview`}>
                    <button type="button" className="btn btn-light">
                      Preview
                    </button>
                    </Link>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz?._id}/Edit/Details`}>
                    <button
                      type="button"
                      className="btn btn-light"
                    >
                      <i className="fa fa-pencil" /> Edit
                    </button>
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteQuiz(quiz._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <span className="float-end">
                  {quiz.published ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <FaTimesCircle className="text-danger" />
                  )}
                  <div
                    onClick={() => handleOpenPopup(quiz._id)}
                    className="ms-2"
                  >
                    <FaEllipsisV />
                  </div>
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <hr />
      
    </>
  );
}

export default QuizListScreen;
