import { Link, useLocation } from "react-router-dom";
import "./index.css";
import {
  FaTachometerAlt,
  FaRegUserCircle,
  FaBook,
  FaRegCalendarAlt,
  FaHistory,
  FaPrint,
  FaTv,
} from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoMdHelpCircleOutline } from "react-icons/io";
function KanbasNavigation() {
  const links = [
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2 red-icon" /> },
    { label: "Courses", icon: <FaBook className="fs-2 red-icon" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2 red-icon" /> },
    { label: "Inbox", icon: <FaPrint className="fs-2 red-icon" /> },
    { label: "History", icon: <FaHistory className="fs-2 red-icon" /> },
    { label: "Studio", icon: <FaTv className="fs-2 red-icon" /> },
    {
      label: "Commons",
      icon: <FaArrowRightFromBracket className="fs-2 red-icon" />,
    },
    {
      label: "Help",
      icon: <IoMdHelpCircleOutline className="fs-2 red-icon" />,
    },
  ];
  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
      <img
        src={require("./neu_logo.jpg")}
        alt="Logo"
        width="70px"
        height="70px"
        style={{
          paddingLeft: "15px",
          paddingTop: "15px",
          paddingBottom: "15px",
        }}
      />
      {links.map((link, index) => (
        <li
          key={index}
          className={pathname.includes(link.label) ? "wd-active" : ""}
        >
          <Link to={`/Kanbas/${link.label}`}>
            {" "}
            {link.icon} {link.label}{" "}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;
