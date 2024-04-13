import { Link } from "react-router-dom";
import QuizEditorNav from "./QuizEditorNav";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
const questions = [
  {
    id: "q1",
    type: "true_false",
    question: "The sky is blue.",
    answer: true,
  },
  {
    id: "q2",
    type: "multiple_choice",
    question: "Which of the following is a programming language?",
    options: ["Python", "Snake", "Cobra", "Viper"],
    answer: "Python",
  },
  {
    id: "q3",
    type: "fill_blank",
    question: "________ is the capital of France.",
    answer: "Paris",
  },
  {
    id: "q4",
    type: "multiple_choice",
    question: "What is the result of 3 * 3?",
    options: ["6", "9", "12", "15"],
    answer: "9",
  },
  {
    id: "q5",
    type: "true_false",
    question: "Humans can breathe underwater without any help.",
    answer: false,
  },
  {
    id: "q6",
    type: "fill_blank",
    question: "The chemical symbol for water is _______.",
    answer: "H2O",
  },
];

function QuizQuestions() {
  // Renders the question and answer fields
  const renderQuestionFields = (question: any) => (
    <li key={question.id} className="list-group-item">
      <div>
        <strong>Q:</strong> {question.question}
        <div>
          {question.type === "multiple_choice" && (
            <div className="mt-2">
              <strong>Options:</strong>
              {question.options.map((option: any, index: any) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`option-${question.id}`}
                    id={`option-${question.id}-${index}`}
                    value={option}
                    checked={question.answer === option}
                    onChange={() => {}}
                    disabled
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option-${question.id}-${index}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === "true_false" && (
            <div className="mt-2">
              <strong>Answer:</strong>
              <p className="form-control-plaintext">
                {question.answer ? "True" : "False"}
              </p>
            </div>
          )}
          {question.type === "fill_blank" && (
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
        onClick={() => {
          /* logic to handle edit */
        }}
      >
        Edit
      </button>
    </li>
  );
  return (
    <>
      <QuizEditorNav />
      <div>
        <ul className="list-group">{questions.map(renderQuestionFields)}</ul>

        <div className="mt-3">
            {/* <Link to={<QuizQuestionsEditor />}>  */}
          <button
            type="button"
            className="btn btn-secondary"
            // disabled={editing}
          >
            + New Question
          </button>
          {/* </Link> */}
        </div>

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
