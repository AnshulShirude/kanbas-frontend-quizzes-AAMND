function ContextMenu() {
  return (
    <div className="btn-group">
      <button type="button" className="btn btn-success">
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
      <button type="button" className="btn btn-light">
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
    </div>
  );
}

export default ContextMenu;
