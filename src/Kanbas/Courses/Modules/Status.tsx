function Status() {
  return (
    <div
      className="flex-grow-0 me-2 d-none d-lg-block"
      style={{ width: "250px", marginTop: "20px"}}
    >
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-file-import"></i> Import Existing Content
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-arrow-right"></i> Import From Commons
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-bullseye"></i> Choose Home Page
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-chart-simple"></i> View Course Stream
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-bullhorn"></i> New Announcement
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-chart-simple"></i> New Analytics
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa-regular fa-bell"></i> View Course Notifications
      </button>

      <h4 style={{marginTop: "20px"}}>To Do</h4>
      <hr />
      <a
        href="/Kanbas/Courses/Calendar/screen.html"
        style={{ textDecoration: "none", color: "red" }}
      >
        View Calendar
      </a>
      <ul style={{ color: 'red' }}>
        <li>
          <a
            href="/Kanbas/Courses/Lectures/screen.html"
            style={{ textDecoration: "none", color: "red" }}
          >
            Lecture CS4550.12631.202410 Sep 7 at 11:45am
          </a>
        </li>
        <li>
          <a
            href="/Kanbas/Courses/Lectures/screen.html"
            style={{ textDecoration: "none", color: "red" }}
          >
            Lecture CS4550.12631.202410 Sep 11 at 11:45am
          </a>
        </li>
        <li>
          <a
            href="/Kanbas/Courses/Lectures/screen.html"
            style={{ textDecoration: "none", color: "red" }}
          >
            CS 5610 06 SP23 Lecture Sep 11 at 6pm
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Status;
