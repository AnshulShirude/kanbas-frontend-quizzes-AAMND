function QuizDetails() {
  const quiz = {
    Name: "Q1 HTML",
    Points: 100,
    "Assignment Group": "Quizzes",
    "Shuffle Answers": true,
    "Time Limit": 20,
    "Multiple Attempts": false,
    "Show Correct Answers": "If and when correct answers are shown to students",
    "Access Code": "",
    "One Question at a Time": true,
    "Webcam Required": false,
    "Lock Questions After Answering": false,
    "Due Date": "2024-04-30",
    "Available Date": "2024-04-01",
    "Until Date": "2024-04-30",
  };

  return (
    <div>
      <div>
        <h1>{quiz.Name}</h1>
        <ul className="list-group">
          <li>
            <strong> Points: </strong>
            {quiz.Points}
          </li>
          <li>
            <strong> Assignment Group: </strong>
            {quiz["Assignment Group"]}
          </li>
          <li>
            <strong> Shuffle Answers: </strong>
            {quiz["Shuffle Answers"] ? "Yes" : "No"}
          </li>
          <li>
            <strong> Time Limit: </strong>
            {quiz["Time Limit"]} minutes
          </li>
          <li>
            <strong> Multiple Attempts: </strong>
            {quiz["Multiple Attempts"] ? "Yes" : "No"}
          </li>
          <li>
            <strong> Show Correct Answers: </strong>
            {quiz["Show Correct Answers"]}
          </li>
          <li>
            <strong> Access Code: </strong>
            {quiz["Access Code"]}
          </li>
          <li>
            <strong> One Question at a Time: </strong>
            {quiz["One Question at a Time"] ? "Yes" : "No"}
          </li>
          <li>
            <strong> Webcam Required: </strong>
            {quiz["Webcam Required"] ? "Yes" : "No"}
          </li>
          <li>
            <strong> Lock Questions After Answering: </strong>
            {quiz["Lock Questions After Answering"] ? "Yes" : "No"}
          </li>
          <li>
            <strong> Due Date: </strong>
            {quiz["Due Date"]}
          </li>
          <li>
            <strong> Available Date: </strong>
            {quiz["Available Date"]}
          </li>
          <li>
            <strong> Until Date: </strong>
            {quiz["Until Date"]}
          </li>
        </ul>

        {/* Due For Available From Until
        <hr />
        {quiz["Due Date"]} Everyone {quiz["Available Date"]} {quiz["Until Date"]}
        <hr /> */}

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <strong>Due</strong>
          </div>
          <div>
            <strong>For</strong>
          </div>
          <div>
            <strong>Available From</strong>
          </div>
          <div>
            <strong>Until</strong>
          </div>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>{quiz["Due Date"]}</div>
          <div>Everyone</div>
          <div>{quiz["Available Date"]}</div>
          <div>{quiz["Until Date"]}</div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default QuizDetails;
