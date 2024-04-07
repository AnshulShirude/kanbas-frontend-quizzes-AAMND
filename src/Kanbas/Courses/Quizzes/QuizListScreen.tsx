import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaSpaceShuttle, FaTimesCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Database/index";
import ContextMenu from "./ContextMenu";
import React, {useEffect, useState } from "react";
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


function QuizListScreen() {
  const [showPopup, setShowPopup] = useState(false);
  const { courseId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  const quiz = useSelector(
    (state: KanbasState) => state.quizzesReducer.quiz
  );
  const dispatch = useDispatch();
  const handleAddQuiz = () => {
    client.createQuiz(courseId, quiz).then((quiz) => {
      dispatch(addQuiz(quiz));
    });
  };
  const handleDeleteQuiz = (quizId: string) => {
    client.deleteQuiz(quizId).then((status) => {
      dispatch(deleteQuiz(quizId));
    });
  };
  const handleUpdateQuiz = async () => {
    const status = await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  const handleOpenPopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
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
                <FaSpaceShuttle className="text-success"/>
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
                    Due Sep 7 at 11:59pm | 100 pts | 6 Questions
                  </span>
                </Link>

                
                {showPopup &&
                <ContextMenu />
                }

                <span className="float-end">
                    {/* TODO: Make this a ternary based off of the graded status */}
                    {true ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
                  <div onClick={handleOpenPopup} className="ms-2">
                  <FaEllipsisV/>
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
