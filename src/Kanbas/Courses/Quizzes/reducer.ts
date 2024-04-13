import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  description: string;
  quizType: string;
  points: Number;
  assignmentGroup: string;
  shuffleAnswers: boolean;
  timeLimit: Number;
  multipleAttempts: boolean;
  showCorrectAnswers: boolean;
  accessCode: string;
  oneQuestionAtATime: boolean;
  webcamRequired: boolean;
  lockQuestionsAfterAnswering: boolean;
  dueDate: any;
  availableDate: any;
  untilDate: any;
  published: boolean;
  viewResponses: string;
  lockdownRequired: boolean;
  viewQuizResults: boolean;
  for: string;
}

interface QuizzesState {
  quizzes: Quiz[];
  quiz: Quiz;
}

const currentDate = new Date();
const formattedCurrentDate = currentDate.toISOString().split("T")[0];
const formattedDueDate = `${formattedCurrentDate}T23:59:59`;

const initialState: QuizzesState = {
  quizzes: [],

  quiz: {
    _id: "",
    title: "New Quiz",
    course: "",
    description: "",
    quizType: "Graded Quiz",
    points: 100,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: formattedDueDate,
    availableDate: formattedDueDate,
    untilDate: formattedDueDate,
    published: false,
    viewResponses: "Always",
    lockdownRequired: false,
    viewQuizResults: true,
    for: "Everyone",
  },
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload
      );
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload._id) {
          return action.payload;
        } else {
          return quiz;
        }
      });
    },
    setQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quiz = action.payload;
    },
    publishQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((quiz) => {
        if (quiz._id === action.payload) {
          return { ...quiz, published: true };
        } else {
          return quiz;
        }
      });
    }
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes, publishQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
