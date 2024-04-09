import * as client from "./client";
import { useDispatch } from "react-redux";
import { publishQuiz } from "./reducer";

function ContextMenu(quizId : any) {
  const dispatch = useDispatch();

  const handlePublish = (quizId: any) => {
    client.publishQuiz(quizId).then((status) => {
      dispatch(publishQuiz(quizId));
    });
  };
  return (
    <div className="btn-group">
      <button type="button" className="btn btn-success" onClick={() => handlePublish(quizId)}>
        <i className="fa fa-check" /> Published
      </button>
      <button type="button" className="btn btn-light">
        Preview
      </button>
      <button type="button" className="btn btn-light">
        <i className="fa fa-pencil" /> Edit
      </button>
      <button type="button" className="btn btn-danger">
        Delete
      </button>
    </div>
  );
}

export default ContextMenu;
