import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaSpaceShuttle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Database/index";
import ContextMenu from "./ContextMenu";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuiz,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  setQuizzes,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";
import { publishQuiz } from "./reducer";
import { format } from "date-fns";

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
    client.createQuiz(courseId, quiz).then((quiz) => {
      dispatch(addQuiz(quiz));
    });
  };
  const handleDeleteQuiz = (quizId: any) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };
  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const handleOpenPopup = (quizId: any) => {
    setOpenPopupId(quizId === openPopupId ? null : quizId);
  };
  const handlePublish = (quizId: any) => {
    client.publishQuiz(quizId).then((status) => {
      dispatch(publishQuiz(quizId));
    });
  };

  return (
    <>
    {console.log(quizList)}
      <div className="input-group mb-3">
        <input
          style={{ width: "100px" }}
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
        />
        <button type="button" className="btn btn-danger">
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
                  to={`/Kanbas/Courses/${courseId}/Assignments/${quiz._id}`}
                >
                  {quiz.title}
                  <br />
                  <span
                    style={{
                      paddingLeft: "25px",
                      fontSize: "16px",
                    }}
                  >
                    Closed
                  </span>{" "}
                  |
                  <span style={{ color: "gray", fontSize: "16px" }}>
                    {" "}
                    Due {format(
                      new Date(quiz.dueDate),
                      "MMM d 'at' h:mma"
                    )} | {quiz.points} pts | 6 Questions
                  </span>
                </Link>

                {openPopupId === quiz._id && (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handlePublish(quiz._id)}
                    >
                      <i className="fa fa-check" /> Published
                    </button>
                    <button type="button" className="btn btn-light">
                      Preview
                    </button>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={handleUpdateQuiz}
                    >
                      <i className="fa fa-pencil" /> Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleDeleteQuiz}
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
