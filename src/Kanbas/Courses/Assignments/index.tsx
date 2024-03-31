import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { db } from "../../Database/index";
function Assignments() {
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
        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <div>
              <FaEllipsisV className="me-2" /> ASSIGNMENTS
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            <ul className="list-group">
              {assignmentList.map((assignment) => (
                <li className="list-group-item">
                  <FaEllipsisV className="me-2" />
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
                        color: "red",
                        fontSize: "16px",
                      }}
                    >
                      Multiple Modules
                    </span>{" "}
                    |
                    <span style={{ color: "black", fontSize: "16px" }}>
                      {" "}
                      Due Sep 7 at 11:59pm | 100 pts
                    </span>
                  </Link>
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
export default Assignments;
