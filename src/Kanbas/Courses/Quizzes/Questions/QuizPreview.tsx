import { CgDanger } from "react-icons/cg";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoTriangleRight } from "react-icons/go";
import { useParams } from "react-router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./index.css";
import { useEffect, useState } from "react";
import { findQuestionsForQuiz } from "./client";
import { findQuizzesForCourse } from "../client";
import { useSelector, useDispatch } from "react-redux";
import { selectOption } from "./reducer";

function QuizPreview() {
  const { quizId } = useParams();
  const { courseId } = useParams();
  const [question, setQuestion] = useState<any | null>(null);
  const [questionList, setQuestionList] = useState<any | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<any | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const dispatch = useDispatch();

  useEffect(() => {}, [selectedAnswer]);

  useEffect(() => {
    findQuestionsForQuiz(quizId)
      .then((questionList) => {
        if (questionList.length > 0) {
          setQuestionList(questionList);
          setQuestion(questionList[0]);
        } else {
          setQuestionList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);

  useEffect(() => {
    findQuizzesForCourse(courseId)
      .then((quizList) => {
        setQuiz(quizList.find((quiz: any) => quiz._id === quizId));
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);

  const handleNextQuestion = () => {
    if (!Array.isArray(questionList)) {
      console.error('questionList is not an array');
      return;
    }

    if (questionList.length=== 0) {
      console.error('questionList is empty');
      return;
    }

    const currentIndex = questionList.findIndex(
      (q: any) => q._id === question?._id
    );

    if (currentIndex >= 0 && currentIndex < questionList.length - 1) {
      setQuestion(questionList[currentIndex + 1]);
    }
  
  };

  const handleSubmitQuiz = () => {
    const currentIndex = 0;
    setQuestion(questionList[currentIndex]);
  };

  const containerStyle = {
    paddingRight: quizId === "1" ? "750px" : "20px",
    textAlign: "right",
  };

  const questionNumberStyle = {
    color: quizId === "1" ? "red" : "black",
  };

  const handleOptionChange = (questionId: string, option: string) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: option,
    }));
  };

  return (
    <>
      <h2 style={{ paddingTop: "20px" }}>{quiz?.title}</h2>

      <h5 style={{ paddingRight: "100px" }} className="preview-msg">
        <CgDanger /> This is a preview of the published version of the quiz
      </h5>

      <h6>Started: Nov 29 at 8:19 am</h6>

      <h2>Quiz Instructions</h2>

      <hr className="line" />

      <Grid container spacing={2} style={{ paddingRight: "100px" }}>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: quizId === "1" ? "#CCCCCC" : "transparent", // Apply background color here
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <div className="question-area">
              <h4 className="question-title" style={questionNumberStyle}>
                {question?.title}
                <span className="float-end">1 pts</span>
              </h4>

              <hr />

              <h5>{question?.content}</h5>

              <hr />
              {(question?.questionType === "Multiple Choice" ||
                question?.questionType === "True/False") &&
                question?.options.map((option: string, index: number) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`option-${question._id}-${index}`}
                      name="answer"
                      checked={option === selectedOptions[question._id]}
                      onChange={() => handleOptionChange(question._id, option)}
                    />
                    {/* con */}
                    <label htmlFor={`option-${question._id}-${index}`}>
                      {option}
                    </label>
                    <br />
                    <hr></hr>
                  </div>
                ))}

              {question?.questionType === "Blank" &&
                [...Array(question?.numOptions)].map((_, index) => (
                  <div key={index}>
                    <input
                      type="text"
                      id={`box${index + 1}`}
                      name="answer"
                      value={selectedOptions[question._id] || ""}
                      onChange={(e) =>
                        handleOptionChange(question._id, e.target.value)
                      }
                    />
                    <label htmlFor={`box${index + 1}`}></label>
                    <br />
                    <hr />
                  </div>
                ))}
            </div>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ textAlign: "right", paddingBottom: "10px" }}
        >
          <Box sx={{ paddingTop: "5px", paddingBottom: "10px" }}>
            <button className="float-end" onClick={handleNextQuestion}>
              Next <GoTriangleRight />
            </button>
          </Box>
        </Grid>
      </Grid>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            paddingTop: "20px",
            textAlign: "center",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginRight: "100px",
            width: "1000px",
          }}
        >
          <p style={{ display: "inline-block" }}>Quiz saved at 8:16 am</p>
          <button
            style={{ marginRight: "10px" }}
            className="float-end"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </Box>
      </div>

      <h3>Questions</h3>
      {questionList && questionList.length > 0 ? (
        <ul>
          {questionList.map((q : any, index : any) => (
            <li key={q._id}>
              <IoIosHelpCircleOutline />
              {`Question ${index + 1}`}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export default QuizPreview;
