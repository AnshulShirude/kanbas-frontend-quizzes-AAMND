import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
  questions: Question[];
  question: Question;
}

interface Question {
  _id: string;
  quizId: string;
  questionType: string;
  title: string;
  points: Number;
  content: string;
  answer: any;
  options: any;
  selectedOption: any;
  numOptions: Number;
}

const initialQuestionState: QuestionsState = {
  questions: [],
  question: {
    _id: "2",
    quizId: "1000",
    questionType: "True/False",
    title: "Question 2",
    points: 1,
    content: "The earth is flat",
    answer: ["False"],
    options: ["True", "False"],
    selectedOption: "",
    numOptions: 2,
  },
};

const questionSlice = createSlice({
  name: "questions",
  initialState: initialQuestionState,
  reducers: {
    selectOption: (state, action: PayloadAction<{ questionId: string; selectedOption: string }>) => {
      state.questions = state.questions.map((question) => {
        if (question._id === action.payload.questionId) {
          return { ...question, selectedOption: action.payload.selectedOption };
        } else {
          return question;
        }
      });
    },
  },
});

export const { selectOption } = questionSlice.actions;
export default questionSlice.reducer;
