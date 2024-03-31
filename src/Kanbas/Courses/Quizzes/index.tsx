import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Database/index";
import QuizzesList from "./List";

function Quizzes() {
  const { courseId } = useParams();
  const assignmentList = db.assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div className="input-group mb-3">
          <input
            style={{ width: "100px" }}
            type="text"
            className="form-control"
            placeholder="Search for Assignment"
          />
          <button type="button" className="btn btn-light">
            <i className="fa-solid fa-plus"></i> Group
          </button>
          <button type="button" className="btn btn-danger">
            <i className="fa-solid fa-plus"></i> Assignment
          </button>

          <button type="button" className="btn btn-light">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>

        <hr />
        
      </div>
      <QuizzesList />
    </>
  );
}
export default Quizzes;
