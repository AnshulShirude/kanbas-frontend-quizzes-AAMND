import {
    JSXElementConstructor,
    Key,
    ReactElement,
    ReactNode,
    ReactPortal,
    useEffect,
  } from "react";
  import "./index.css";
  import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
  import { useParams } from "react-router";
  import { useSelector, useDispatch } from "react-redux";
  import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
  } from "./reducer";
  import * as client from "./client";
  import { KanbasState } from "../../store";
  import { findModulesForCourse, createModule } from "./client";
  
  function QuizzesList() {
    const { courseId } = useParams<{ courseId: string }>();
    useEffect(() => {
      findModulesForCourse(courseId).then((modules) =>
        dispatch(setModules(modules))
      );
    }, [courseId]);
    const moduleList = useSelector(
      (state: KanbasState) => state.modulesReducer.modules
    );
    const module = useSelector(
      (state: KanbasState) => state.modulesReducer.module
    );
    const dispatch = useDispatch();
    const handleAddModule = () => {
      createModule(courseId, module).then((module) => {
        dispatch(addModule(module));
      });
    };
    const handleDeleteModule = (moduleId: string) => {
      client.deleteModule(moduleId).then((status) => {
        dispatch(deleteModule(moduleId));
      });
    };
    const handleUpdateModule = async () => {
      const status = await client.updateModule(module);
      dispatch(updateModule(module));
    };
  
    return (
      <>
        <div className="d-block d-md-none">
          <nav
            className="navbar bg-dark border-bottom border-body"
            data-bs-theme="dark"
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Navigation Bar
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/Kanbas/Account/Profile/screen.html"
                    >
                      <i className="fa fa-user"></i> Account
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      aria-current="page"
                      href="/Kanbas/Dashboard/screen.html"
                    >
                      <i className="fa fa-tachometer"></i> Dashboard
                    </a>
                  </li>
  
                  <li className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle active "
                      href="/Kanbas/Courses/Home/screen.html"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-book" aria-hidden="true"></i>
                      Courses
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/Kanbas/Courses/Home/screen.html"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/Kanbas/Courses/Modules/screen.html"
                        >
                          Modules
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="http://piazza.com">
                          Piazza
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Zoom
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/Kanbas/Courses/Assignments/screen.html"
                        >
                          Assignments
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Quizzes
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/Kanbas/Courses/Grades/screen.html"
                        >
                          Grades
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          People
                        </a>
                      </li>
                    </ul>
                  </li>
  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      <i className="fa fa-calendar"></i> Calendar
                    </a>
                  </li>
  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      <i className="fa fa-envelope"></i> Inbox
                    </a>
                  </li>
  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      <i className="fa fa-history" aria-hidden="true"></i> History
                    </a>
                  </li>
  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      <i className="fa fa-desktop" aria-hidden="true"></i> Studio
                    </a>
                  </li>
  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      <i className="fa fa-sign-in" aria-hidden="true"></i> Commons
                    </a>
                  </li>
  
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="#">
                      <i className="fa fa-question-circle" aria-hidden="true"></i>{" "}
                      <span> Help </span>{" "}
                    </a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </nav>
        </div>
  
        <div style={{ marginTop: "20px" }}>
          <button type="button" className="btn btn-light">
            Collapse All
          </button>
          <button type="button" className="btn btn-light">
            View Progress
          </button>
  
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i style={{ color: "green" }} className="fa-solid fa-check"></i>{" "}
              Publish All
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Publish All
                </a>
              </li>
            </ul>
          </div>
  
          <button type="button" className="btn btn-danger">
            <i className="fa-solid fa-plus"></i> Module
          </button>
  
          <button type="button" className="btn btn-light">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </button>
          <hr />
          <ul className="list-group wd-modules">
            <li className="list-group-item">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddModule}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdateModule}
              >
                Update
              </button>
              <input
                className="form-control"
                value={module.name}
                onChange={(e) =>
                  dispatch(setModule({ ...module, name: e.target.value }))
                }
              />
              <textarea
                className="form-control"
                value={module.description}
                onChange={(e) =>
                  setModule({
                    ...module,
                    description: e.target.value,
                  })
                }
              />
            </li>
  
            {moduleList
              .filter((module) => module.course === courseId)
              .map((module, index) => (
                <li key={index} className="list-group-item">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => dispatch(setModule(module))}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDeleteModule(module._id)}
                  >
                    Delete
                  </button>
                  <div>
                    <FaEllipsisV className="me-2" />
                    {module.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaPlusCircle className="ms-2" />
                      <FaEllipsisV className="ms-2" />
                    </span>
                  </div>
                  <ul className="list-group">
                    {module.lessons?.map(
                      (lesson: {
                        _id: Key | null | undefined;
                        name:
                          | string
                          | number
                          | boolean
                          | ReactElement<any, string | JSXElementConstructor<any>>
                          | Iterable<ReactNode>
                          | ReactPortal
                          | null
                          | undefined;
                      }) => (
                        <li className="list-group-item" key={lesson._id}>
                          <FaEllipsisV className="me-2" />
                          {lesson.name}
                          <span className="float-end">
                            <FaCheckCircle className="text-success" />
                            <FaEllipsisV className="ms-2" />
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
  
  export default QuizzesList;
  