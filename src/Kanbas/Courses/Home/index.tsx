import ModuleList from "../Modules/List";
import Status from "../Modules/Status";
import "./index.css";

function Home() {
  return (
    <>
      <div className="wd-flex-row-container">
        <div className="col-9">
          <ModuleList />
        </div>
        <div className="col-3">
          <Status />
        </div>
      </div>
    </>
  );
}
export default Home;
