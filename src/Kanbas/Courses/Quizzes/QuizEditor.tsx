import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { findQuizzesForCourse } from "./client";
import {
  addQuiz,
  setQuizzes,
  deleteQuiz,
  updateQuiz,
  setQuiz,
  publishQuiz,
} from "./reducer";
import QuizEditorNav from "./QuizEditorNav";

function QuizEditor() {
  const handleSaveChanges = () => {
    // Code to save changes and navigate to Quiz Details screen
  };

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { quizId } = useParams();
  useEffect(() => {
    findQuizzesForCourse(courseId).then((quizzes) =>
      dispatch(setQuizzes(quizzes))
    );
  }, [courseId]);

  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizzes
  );
  let quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  quiz = quizList.find((quiz) => quiz?._id === quizId);
  const formattedDueDate = quiz?.dueDate ? quiz?.dueDate.split("T")[0] : "";
  const formattedAvailableDate = quiz?.availableDate
    ? quiz?.availableDate.split("T")[0]
    : "";
  const formattedUntilDate = quiz?.untilDate
    ? quiz?.untilDate.split("T")[0]
    : "";
  console.log(quizId);
  console.log(quiz);

  return (
    <div>
      <QuizEditorNav />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <input
            id="title2"
            type="text"
            className="form-control"
            placeholder="Title"
            value={quiz?.title}
            onChange={(e) => setQuiz({ ...quiz, Title: e.target.value })}
          />
          <textarea
            className="form-control"
            placeholder="Description"
            value={quiz?.description}
            onChange={(e) => setQuiz({ ...quiz, Description: e.target.value })}
          />
          <select
            className="form-control"
            value={quiz?.quizType}
            onChange={(e) => setQuiz({ ...quiz, QuizType: e.target.value })}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
          <select
            className="form-control"
            value={quiz?.assignmentGroup}
            onChange={(e) =>
              setQuiz({ ...quiz, AssignmentGroup: e.target.value })
            }
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={quiz?.shuffleAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            Shuffle Answers
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Time Limit"
            value={quiz?.timeLimit}
            onChange={(e) =>
              setQuiz({ ...quiz, Points: parseInt(e.target.value) })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={quiz?.multipleAttempts}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            Multiple Attempts
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz?.showCorrectAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            Show Correct Answers
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz?.oneQuestionAtATime}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            One Question at a Time?
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz?.webcamRequired}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            WebCam required
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz?.lockQuestionsAfterAnswering}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            Lock Questions After Answering
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Access Code"
            value={quiz?.accessCode}
            onChange={(e) => setQuiz({ ...quiz, Title: e.target.value })}
          />
          <div>
            <label htmlFor="dueDate">Due Date: </label>
            <input
              id="dueDate"
              type="date"
              className="form-control"
              value={formattedDueDate}
              onChange={(e) => setQuiz({ ...quiz, DueDate: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="availableDate">Available Date: </label>
            <input
              id="availableDate"
              type="date"
              className="form-control"
              value={formattedAvailableDate}
              onChange={(e) =>
                setQuiz({ ...quiz, AvailableDate: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="untilDate">Until Date: </label>
            <input
              id="untilDate"
              type="date"
              className="form-control"
              value={formattedUntilDate}
              onChange={(e) => setQuiz({ ...quiz, UntilDate: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSaveChanges}
          >
            Save
          </button>
        </li>
      </ul>
    </div>
  );
}

export default QuizEditor;
