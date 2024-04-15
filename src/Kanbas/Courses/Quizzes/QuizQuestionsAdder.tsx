import "./index.css";
import {
  TbLetterVSmall,
  TbLetterI,
  TbSquareLetterA,
  TbLetterA,
} from "react-icons/tb";
import { FaBold, FaItalic, FaHighlighter, FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { FiUnderline } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { FaKeyboard } from "react-icons/fa";
import { Box, Grid } from "@mui/material";
import { FaLinkSlash } from "react-icons/fa6";
import { PiArrowsOutSimpleLight } from "react-icons/pi";
import PossibleAnswer from "./PossibleAnswer";
import { useParams } from "react-router-dom";
import { createQuestion, findQuestionsForQuiz, updateQuestion } from "./Questions/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizQuestions from "./QuizQuestions";

function QuizQuestionsAdder() {
  const initialQuestionState = {
    _id: "2",
    quizId: "1000",
    questionType: "True/False",
    title: "Question 2",
    points: 1,
    content: "The earth is flat",
    answer: ["False"],
    options: ["True", "False"],
    numOptions: 2,
  };
  const { quizId } = useParams();
  const { courseId } = useParams();

  const [questionList2, setQuestionList2] = useState([]);
  const [question, setQuestion] = useState<any | null>(initialQuestionState);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


  // NEEDED FOR EDITING:
  // const fetchQuestions = (quizId: any) => {
  //   findQuestionsForQuiz(quizId)
  //     .then((questionList) => {
  //       if (questionList.length > 0) {
  //         setQuestionList2(questionList);
  //         setQuestion({ ...question, questionType: "Multiple Choice" });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching quiz questions:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchQuestions(quizId);
  // }, [quizId]);
  // NEEDED FOR EDITING

  const handleAddAnotherAnswer = () => {
    // return <PossibleAnswer />;
    const newList = [...question.options, "New Item"];
    setQuestion({ ...question, options: newList });
    console.log("did this again");

    // return <PossibleAnswer/>
    // setQuestion({ ...question, options: [...question.options, ""] });
  };

  const handleDeleteAnswer = (index: number) => {
    const updatedOptions = [...question.options];
    updatedOptions.splice(index, 1);
    setQuestion({ ...question, options: updatedOptions });
  };

  const handleEditAnswer = (index: number) => {
    setEditingIndex(index);
  };

  const handleUpdateQuestion = () => {
    const newList = [...question.options, question.answer[0]];
    setQuestion({ ...question, options: newList });
    createQuestion(quizId, question)
      .then((response) => {
      })
      .catch((error) => {
      });
  }

  return (
    <>
      <h1>Quiz Questions</h1>
      <input
        type="text"
        id="qTitle"
        name="answer"
        placeholder="Question Title"
        value={question?.title || ""}
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
      />
      <label htmlFor="qTitle"></label>
      <select
        style={{ marginLeft: "10px" }}
        onChange={(e) =>
          setQuestion({ ...question, questionType: e.target.value })
        }
      >
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="True/False">True/False</option>
        <option value="Blank">Fill in the blank</option>
      </select>
      <span className="float-end">
        {" "}
        pts:
        <input
          type="text"
          id="numPoints"
          name="answer"
          value={question?.points || ""}
          onChange={(e) => setQuestion({ ...question, points: e.target.value })}
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
      <textarea rows={5} cols={100}
      value={question.content}
      onChange={(e) =>
        setQuestion({ ...question, content: [e.target.value] })} >
        </textarea>
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
      {/* This is the correct answer component*/}
      <div style={{ display: "flex", alignItems: "center" }}>
        <i className="fa-solid fa-arrow-right green-arrow"></i>
        <h6 style={{ margin: "0 10px" }}>Correct Answer:</h6>
        <input
          type="text"
          value={question.answer[0]}
          onChange={(e) =>
            setQuestion({ ...question, answer: [e.target.value] })
          }
        />
      </div>
      <button
        className="green-outline"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      {/* This is the correct answer component*/}
      {/* <Grid>
        <Box
          sx={{
            backgroundColor: "transparent",
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <i className="fa-solid fa-arrow-right green-arrow"></i>
              <h6 style={{ margin: "0 10px" }}>Possible Answer:</h6>
              <input type="number" value="" />
            </div>

            <div>
              <i className="fa-solid fa-pencil"></i>{" "}
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>

          <button
            className="red-outline"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </Box>
      </Grid> */}
      <div>
        {question.options
          .filter((option: any) => !question.answer.includes(option))
          .map((value: string, index: number) => (
            <div key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <i className="fa-solid fa-arrow-right green-arrow"></i>
                <h6 style={{ margin: "0 10px" }}>Possible Answer:</h6>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const updatedOptions = [...question.options.filter((option: any) => !question.answer.includes(option))];
                    console.log(updatedOptions);
                    updatedOptions[index] = e.target.value;
                    setQuestion({ ...question, options: updatedOptions });
                    console.log(updatedOptions);
                  }}
                  disabled={editingIndex !== index}
                />
                <button style={{marginLeft: '125px'}} onClick={() => handleDeleteAnswer(index)}>
                 <FaTrashAlt /> 
              </button>
              <button onClick={() => handleEditAnswer(index)}>
                 <FaPencilAlt /> 
              </button>
              </div>
              <button className="red-outline" style={{ marginRight: "10px" }}>
                <i className="fa-solid fa-ellipsis"></i>
              </button>
              
            </div>
          ))}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              color: "red",
              border: "none",
              background: "none",
              padding: "0",
              font: "inherit",
              cursor: "pointer",
            }}
            onClick={handleAddAnotherAnswer}
          >
            <i className="fa-solid fa-plus"></i> Add Another Answer{" "}
          </button>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <i style={{ color: "green" }} className="fa-solid fa-comment"></i>
        <i style={{ color: "red" }} className="fa-solid fa-comment red"></i>
        <i style={{ color: "gray" }} className="fa-solid fa-comment gray"></i>
      </div>
      <div>
        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit/Questions`}
        >
          <button className="btn btn-light">Cancel</button>
        </Link>

        <Link
          to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit/Questions`}
        >
          <button className="btn btn-danger" onClick={handleUpdateQuestion}>Add Question
          </button>
        </Link>
      </div>
    </>
  );
}

export default QuizQuestionsAdder;
