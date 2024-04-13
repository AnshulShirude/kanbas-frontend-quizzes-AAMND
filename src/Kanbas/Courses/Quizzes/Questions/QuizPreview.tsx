import { CgDanger } from "react-icons/cg";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { GoTriangleRight } from "react-icons/go";
import { useParams } from "react-router";
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid'; 
import './index.css'; 
import { useEffect, useState } from "react";
import { findQuestionsForQuiz } from "./client";
import { findQuizzesForCourse } from "../client";

function QuizPreview() {
  const { quizId } = useParams();

const {courseId} = useParams();


  const [question, setQuestion] = useState<any | null>(null);
  const [questionList, setQuestionList] = useState<any | null>(null);

  const [quiz, setQuiz] = useState<any | null>(null);


  useEffect(() => {
    findQuestionsForQuiz(quizId)
      .then((questionList) => {
        if (questionList.length > 0) {
          setQuestionList(questionList);
          setQuestion(questionList[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);

  useEffect(() => {
    findQuizzesForCourse(courseId)
      .then((quizList) => {
        setQuiz(quizList.find((quiz: any) => quiz._id === quizId))
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, [quizId]);



  const handleNextQuestion = () => {
    const currentIndex = questionList.findIndex((q: any) => q._id === question?._id);
    if (currentIndex !== -1 && currentIndex < questionList.length - 1) {
      setQuestion(questionList[currentIndex + 1]);
    }
  };


  const containerStyle = {
    paddingRight: quizId === '1' ? '750px' : '20px',
    textAlign: 'right'
  };

  const questionNumberStyle = {
    color: quizId === '1' ? 'red' : 'black'
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

    <Grid container spacing={2} style={{ paddingRight: '100px' }}>
      <Grid item xs={12}>
        <Box sx={{
          backgroundColor: quizId === '1' ? '#CCCCCC' : 'transparent', // Apply background color here
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '10px'
        }}>
          <div className="question-area">
            <h4 className="question-title" style={questionNumberStyle}>{question?.title}
              <span className="float-end">1 pts</span>
            </h4>

            <hr />

            <h5>{question?.content}</h5>

            <hr />
            {(question?.questionType === 'Multiple Choice' || question?.questionType === 'True/False') && (
              question?.options.map((option: string, index: number) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    value={option}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label><br />
                  <hr></hr>
                </div>
              ))
            )}
            
            {question?.questionType === 'Blank' && [...Array(question?.numOptions)].map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  id={`box${index + 1}`}
                  name="answer"
                  value=''
                />
                <label htmlFor={`box${index + 1}`}></label>
                <br />
                <hr />
              </div>
            ))}
            
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} style={{ textAlign: 'right', paddingBottom: '10px' }}>
        <Box sx={{ paddingTop: '5px', paddingBottom: '10px' }}>
          <button className="float-end" onClick={handleNextQuestion}>Next <GoTriangleRight /></button>
        </Box>
      </Grid>
    </Grid>

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ paddingTop: '20px', textAlign: 'center', border: '1px solid #ddd',
        borderRadius: '5px', marginRight: '100px', width: '1000px' }}>
        <p style={{ display: 'inline-block' }}>Quiz saved at 8:16 am</p>
        <button style={{marginRight: '10px'}}className="float-end">Submit Quiz</button>
      </Box>
    </div>

    <h3>Questions</h3>
    <ul>
      <li><IoIosHelpCircleOutline />
        Question 1</li>
      <li> <IoIosHelpCircleOutline />
        Question 2</li>
      <li><IoIosHelpCircleOutline />
        Question 3</li>
    </ul>
  </>
);
}

export default QuizPreview;