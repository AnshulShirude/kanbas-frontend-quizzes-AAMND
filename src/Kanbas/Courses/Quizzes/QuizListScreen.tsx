import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Database/index";
import ContextMenu from "./ContextMenu";

function QuizListScreen() {
  const { courseId } = useParams();
  const assignmentList = db.assignments.filter(
    (assignment) => assignment.course === courseId
  );
  return (
    <>
      <div className="input-group mb-3">
        <input
          style={{ width: "100px" }}
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
        />
        <button type="button" className="btn btn-danger">
          <i className="fa-solid fa-plus"></i> Quiz
        </button>

        <button type="button" className="btn btn-light">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <div>
            <FaEllipsisV className="me-2" /> <strong>Assignment Quizzes</strong>
            <span className="float-end">
              <FaCheckCircle className="text-success" />
              <FaPlusCircle className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item">
                <i className="fa fa-space-shuttle" />{" "}
                <Link
                  style={{
                    color: "black",
                    textDecoration: "none",
                    fontSize: "17px",
                  }}
                  to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                  <br />
                  <span
                    style={{
                      paddingLeft: "25px",
                      fontSize: "16px",
                    }}
                  >
                    Closed
                  </span>{" "}
                  |
                  <span style={{ color: "gray", fontSize: "16px" }}>
                    {" "}
                    Due Sep 7 at 11:59pm | 100 pts | 6 Questions
                  </span>
                </Link>

                
                {/* TODO: Make this a ternary based off of if you click it or change the status (look at requirements) */}
                <ContextMenu />

                <span className="float-end">
                    {/* TODO: Make this a ternary based off of the graded status */}
                    {true ? <FaCheckCircle className="text-success" /> : <FaTimesCircle className="text-danger" />}
                  <FaEllipsisV className="ms-2" />
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <hr />
    </>
  );
}

export default QuizListScreen;
