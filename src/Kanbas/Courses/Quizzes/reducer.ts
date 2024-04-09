import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quiz {
  _id: string;
  title: string;
  description: string;
}

interface QuizzesState {
  quizzes: Quiz[];
  quiz: Quiz;
}

const initialState: QuizzesState = {
  quizzes: [],
  quiz: { _id: "", title: "New Quiz 123", description: "New Description" },
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
