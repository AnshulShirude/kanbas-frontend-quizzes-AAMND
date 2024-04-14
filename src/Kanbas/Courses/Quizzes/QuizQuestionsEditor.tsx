import "./index.css";
import {
  TbLetterVSmall,
  TbLetterI,
  TbSquareLetterA,
  TbLetterA,
} from "react-icons/tb";
import { FaBold, FaItalic, FaHighlighter } from "react-icons/fa";
import { FiUnderline } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { FaKeyboard } from "react-icons/fa";
import { Box, Grid } from "@mui/material";
import { FaLinkSlash } from "react-icons/fa6";
import { PiArrowsOutSimpleLight } from "react-icons/pi";
import { useState, useEffect } from "react";

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

interface QuizQuestionsEditorProps {
  question: Question | null;
  onCancel: () => void;
}


const QuizQuestionsEditor: React.FC<QuizQuestionsEditorProps> = ({ question, onCancel }) => {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question || {
    _id: '',
    quizId: '',
    questionType: 'Multiple Choice',
    title: '',
    points: 1,
    content: '',
    answer: [],
    options: [],
    numOptions: 0
  });

  useEffect(() => {
    setEditedQuestion(question || {
      _id: '',
      quizId: '',
      questionType: 'Multiple Choice',
      title: '',
      points: 1,
      content: '',
      answer: [],
      options: [],
      numOptions: 0
    });
  }, [question]);

  const handleInputChange = (field: keyof Question, value: any) => {
    setEditedQuestion(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = () => {
    const method = editedQuestion._id ? 'PUT' : 'POST';
    const endpoint = editedQuestion._id ? `/api/questions/${editedQuestion._id}` : `/api/quizzes/${editedQuestion.quizId}/questions`;

    fetch(endpoint, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedQuestion)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      onCancel(); // Close editor after save
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const renderAnswerSection = () => {
    switch (editedQuestion.questionType) {
      case "Multiple Choice":
        return (
          <>
            {editedQuestion.options.map((option, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center" }}>
                <i className="fa-solid fa-arrow-right green-arrow"></i>
                <h6 style={{ margin: "0 10px" }}>Option {index + 1}:</h6>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <input
                  type="radio"
                  checked={editedQuestion.answer.includes(option)}
                  onChange={() => handleInputChange('answer', [option])}
                />
              </div>
            ))}
            <button onClick={addOption} style={{ marginTop: "20px", marginBottom: "20px" }}>
              <i className="fa-solid fa-ellipsis"></i> Add Another Option
            </button>
          </>
        );
      case "True/False":
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <i className="fa-solid fa-arrow-right green-arrow"></i>
            <h6 style={{ margin: "0 10px" }}>Correct Answer:</h6>
            <input
              type="radio"
              value="True"
              checked={editedQuestion.answer[0] === "True"}
              onChange={() => handleInputChange('answer', ["True"])}
            /> True
            <input
              type="radio"
              value="False"
              checked={editedQuestion.answer[0] === "False"}
              onChange={() => handleInputChange('answer', ["False"])}
            /> False
          </div>
        );
      case "Blank":
        return (
          <>
            {Array.from({ length: editedQuestion.numOptions }, (_, k) => (
              <div key={k} style={{ display: "flex", alignItems: "center" }}>
                <i className="fa-solid fa-arrow-right green-arrow"></i>
                <h6 style={{ margin: "0 10px" }}>Blank {k + 1}:</h6>
                <input
                  type="text"
                  value={editedQuestion.answer[k] || ''}
                  onChange={(e) => handleBlankChange(k, e.target.value)}
                />
              </div>
            ))}
            <button onClick={addBlank} style={{ marginTop: "20px", marginBottom: "20px" }}>
              <i className="fa-solid fa-ellipsis"></i> Add Another Blank
            </button>
          </>
        );
      default:
        return null;
    }
  };
  
  
  const handleOptionChange = (index : any, value: any) => {
    let newOptions = [...editedQuestion.options];
    newOptions[index] = value;
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };
  
  const addOption = () => {
    let newOptions = [...editedQuestion.options, ''];
    setEditedQuestion({ ...editedQuestion, options: newOptions });
  };
  
  const handleBlankChange = (index: any, value: any) => {
    let newAnswers = [...editedQuestion.answer];
    newAnswers[index] = value;
    setEditedQuestion({ ...editedQuestion, answer: newAnswers });
  };
  
  const addBlank = () => {
    let newNumOptions = editedQuestion.numOptions + 1;
    let newAnswers = [...editedQuestion.answer, ''];
    setEditedQuestion({ ...editedQuestion, numOptions: newNumOptions, answer: newAnswers });
  };
  
  
  return (
    <>
      <h1>Edit Question</h1>

      
      <input
        type="text"
        id="qTitle"
        name="question"
        value={editedQuestion.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
      />
      <label htmlFor="qTitle"></label>

      <select
        style={{ marginLeft: "10px" }}
        value={editedQuestion.questionType}
        onChange={(e) => handleInputChange('questionType', e.target.value)}
      >
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="True/False">True/False</option>
        <option value="Blank">Fill in the Blank</option>
      </select>

      {editedQuestion.questionType === "multiple_choice" && (
        editedQuestion.options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...editedQuestion.options];
                newOptions[index] = e.target.value;
                handleInputChange('options', newOptions);
              }}
            />
            <button onClick={() => handleInputChange('answer', option)}>Set as Correct</button>
          </div>
        ))
      )}

      <span className="float-end">
        {" "}
        pts:
        <input
          type="number"
          id="numPoints"
          name="answer"
          value="1"
          style={{ width: "20px", marginRight: "20px" }}
        />
        <label htmlFor="numPoints"></label>
      </span>

      <hr></hr>
      <p>
        Enter your question and multiple answers, then select the one correct
        answer.
      </p>

      <h5>Question:</h5>

      <div style={{ display: "flex" }}>
        <span style={{ display: "inline-block", marginBottom: "10px" }}>
          Edit View Insert Format Tools Table
        </span>
      </div>

      <div style={{ display: "flex" }}>
        <span style={{ display: "inline-block" }}>
          12pt
          <RiArrowDropDownLine />
          Paragraph
          <RiArrowDropDownLine />
          <TbLetterI /> <FaBold /> <FaItalic />
          <FiUnderline />
          <TbLetterA /> <RiArrowDropDownLine />
          <FaHighlighter /> <RiArrowDropDownLine />
          <HiOutlineEllipsisVertical />
        </span>
      </div>

      <textarea
        rows={5}
        cols={100}
        placeholder="Enter question details here..."
        value={editedQuestion.content || ''}
        onChange={(e) => handleInputChange('content', e.target.value)}
      />

      <div>
        <span
          className="float-end"
          style={{ color: "red", marginRight: "185px" }}
        >
          <FaKeyboard />
          <TbLetterI />
          6 words
          <TbLetterI />
          <FaLinkSlash />
          <PiArrowsOutSimpleLight />
          <HiOutlineEllipsisVertical />
        </span>
      </div>

      <h4>Answers:</h4>
      {renderAnswerSection()}

      <div style={{ display: "flex", alignItems: "center" }}>
        <i style={{ color: "green" }} className="fa-solid fa-comment"></i>
        <i style={{ color: "red" }} className="fa-solid fa-comment red"></i>
        <i style={{ color: "gray" }} className="fa-solid fa-comment gray"></i>
      </div>

      <div>
      <button className="btn btn-light" onClick={onCancel}>Cancel</button>
      <button className="btn btn-danger" onClick={saveChanges}>Save Changes</button>
      </div>
    </>
  );
}

export default QuizQuestionsEditor;
