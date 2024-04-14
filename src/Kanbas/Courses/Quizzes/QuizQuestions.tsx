import { Link } from "react-router-dom";
import QuizEditorNav from "./QuizEditorNav";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import { findQuizzesForCourse } from "./client";
import { findQuestionsForQuiz } from "./Questions/client";


interface Question {
  _id: string;
  quizId: string;
  questionType: string;
  title: string;
  points: number;
  content: string;
  answer: string[];
  options: string[];
  numOptions: number;
}

function QuizQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [showEditor, setShowEditor] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const { quizId } = useParams();
  const [questionList2, setQuestionList2] = useState([]);

  const fetchQuestions = (quizId: any) => {
    findQuestionsForQuiz(quizId)
      .then((questionList) => {
        if (questionList.length > 0) {
          setQuestionList2(questionList);
          setQuestions(questionList[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  };

  useEffect(() => {
    fetchQuestions(quizId);
  }, [quizId]);

  // Add a new question
  const handleAddNewQuestion = () => {
     setCurrentQuestion({
      _id: '', quizId: '1000', questionType: 'Multiple Choice',
      title: '', points: 1, content: '', answer: [], options: [], numOptions: 0
    });
    setShowEditor(true);
  };

  const handleEditQuestion = (question : Question) => {
    setCurrentQuestion(question); // Set the current question for editing
    setShowEditor(true);
  };

  const handleSaveEditedQuestion = (editedQuestion : Question) => {
    const method = editedQuestion._id ? 'PUT' : 'POST';
    const endpoint = editedQuestion._id ? `/api/questions/${editedQuestion._id}` : `/api/quizzes/1000/questions`;

    fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedQuestion)
    })
    .then(response => response.json())
    .then(data => {
      if (!editedQuestion._id) { // New question
        setQuestions(questions.concat(data));
      } else { // Updated question
        setQuestions(questions.map(q => q._id === data._id ? data : q));
      }
      setShowEditor(false);
      setCurrentQuestion(null);
    })
    .catch(console.error);
  };

  const handleDeleteQuestion = (questionId: string) => {
    fetch(`/api/questions/${questionId}`, { method: 'DELETE' })
    .then(() => {
      setQuestions(questions.filter(q => q._id !== questionId));
    })
    .catch(console.error);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setCurrentQuestion(null);
  };

  // Renders the question and answer fields
  const renderQuestionFields = (question: Question) => (
    <li key={question._id} className="list-group-item">
      <div>
        <strong>Q:</strong> {question.content}
        <div>
          {question.questionType === "Multiple Choice" && (
            <div className="mt-2">
              <strong>Options:</strong>
              {question.options.map((option: any, index: any) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`option-${question._id}`}
                    id={`option-${question._id}-${index}`}
                    value={option}
                    checked={question.answer === option}
                    onChange={() => {}}
                    disabled
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option-${question._id}-${index}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.questionType === "True/False" && (
            <div className="mt-2">
              <strong>Answer:</strong>
              <p className="form-control-plaintext">
                {question.answer ? "True" : "False"}
              </p>
            </div>
          )}
          {question.questionType === "Blank" && (
            <div className="mt-2">
              <strong>Answer:</strong>
              <p className="form-control-plaintext">{question.answer}</p>
            </div>
          )}
        </div>
      </div>
      {/* Edit button goes here */}
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => handleEditQuestion(question)}
      >
        Edit
      </button>

      <button 
      type="button" 
      className="btn btn-danger btn-sm"
       onClick={() => handleDeleteQuestion(question._id)}>
        Delete
      </button>
    </li>
  );
  return (
    <>
      <QuizEditorNav />
      <div>
        {!showEditor ? (
          <div>
            <ul className="list-group">
              {questionList2.map(renderQuestionFields)}
            </ul>
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddNewQuestion}
              >
                + New Question
              </button>
            </div>
          </div>
        ) : (
          <QuizQuestionsEditor
          question={currentQuestion}
          onCancel={handleCancelEdit}
        />
        )}

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => {
              /* logic to handle cancel */
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => {
              /* logic to handle save and publish */
            }}
          >
            Save & Publish
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              /* logic to handle save */
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default QuizQuestions;
