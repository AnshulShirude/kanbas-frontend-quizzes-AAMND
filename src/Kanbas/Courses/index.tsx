import { db } from "../../Kanbas/Database/index";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";

function Courses() {
  const { quizId } = useParams();
  const { courseId } = useParams();
  const COURSES_API = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);
  const location = useLocation();
  const lastWord =
    location?.pathname?.split("/").pop()?.replace(/%20/g, " ") || "";

  return (
    <div>
      <div className="d-md-block d-none">
        <h1 style={{ color: "red", paddingLeft: "27px", fontSize: "37px" }}>
          <HiMiniBars3 /> Course {course?.name}{" "}
          <i
            style={{ color: "black", fontSize: "20px" }}
            className="fa-solid fa-greater-than"
          ></i>{" "}
          <span style={{ color: "black" }}>{lastWord}</span>
        </h1>
        <hr />
        <CourseNavigation />
      </div>
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Zoom Meetings" element={<h1>Zoom Meetings</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Quizzes/:quizId/Edit" element={<QuizEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetails />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="People" element={<h1>People</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default Courses;
