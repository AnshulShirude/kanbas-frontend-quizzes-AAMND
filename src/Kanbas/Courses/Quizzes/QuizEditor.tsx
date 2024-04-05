import React, { useState } from "react";

const QuizEditor = () => {
  const [quiz, setQuiz] = useState({
    Title: "",
    Description: "",
    QuizType: "Graded Quiz",
    Points: 0,
    AssignmentGroup: "Quizzes",
    ShuffleAnswers: true,
    TimeLimit: 20,
    MultipleAttempts: false,
    ShowCorrectAnswers: false,
    AccessCode: "",
    OneQuestionAtATime: true,
    WebcamRequired: false,
    LockQuestionsAfterAnswering: false,
    DueDate: "",
    AvailableDate: "",
    UntilDate: "",
  });

  const handleSaveChanges = () => {
    // Code to save changes and navigate to Quiz Details screen
  };

  return (
    <div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <input
            id="title2"
            type="text"
            className="form-control"
            placeholder="Title"
            value={quiz.Title}
            onChange={(e) => setQuiz({ ...quiz, Title: e.target.value })}
          />
          <textarea
            className="form-control"
            placeholder="Description"
            value={quiz.Description}
            onChange={(e) => setQuiz({ ...quiz, Description: e.target.value })}
          />
          <select
            className="form-control"
            value={quiz.QuizType}
            onChange={(e) => setQuiz({ ...quiz, QuizType: e.target.value })}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
          <select
            className="form-control"
            value={quiz.AssignmentGroup}
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
              checked={quiz.ShuffleAnswers}
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
            value={quiz.TimeLimit}
            onChange={(e) =>
              setQuiz({ ...quiz, Points: parseInt(e.target.value) })
            }
          />
          <label>
            <input
              type="checkbox"
              checked={quiz.MultipleAttempts}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            Multiple Attempts
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz.ShowCorrectAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            Show Correct Answers
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz.OneQuestionAtATime}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            One Question at a Time?
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz.WebcamRequired}
              onChange={(e) =>
                setQuiz({ ...quiz, ShuffleAnswers: e.target.checked })
              }
            />
            WebCam required
          </label>
          <label>
            <input
              type="checkbox"
              checked={quiz.LockQuestionsAfterAnswering}
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
            value={quiz.AccessCode}
            onChange={(e) => setQuiz({ ...quiz, Title: e.target.value })}
          />
          <div>
            <label htmlFor="dueDate">Due Date: </label>
            <input
              id="dueDate"
              type="date"
              className="form-control"
              value={quiz.DueDate}
              onChange={(e) => setQuiz({ ...quiz, DueDate: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="availableDate">Available Date: </label>
            <input
              id="availableDate"
              type="date"
              className="form-control"
              value={quiz.AvailableDate}
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
              value={quiz.UntilDate}
              onChange={(e) =>
                setQuiz({ ...quiz, AvailableDate: e.target.value })
              }
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
};

export default QuizEditor;
