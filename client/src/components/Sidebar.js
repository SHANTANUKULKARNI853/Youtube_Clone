import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // Import CSS for styling

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="sidebar-link">
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        {/* <li>
          <Link to="/trending" className="sidebar-link">
            <i className="fas fa-fire"></i> Trending
          </Link>
        </li> */}
        <li>
          <Link to="/subscriptions" className="sidebar-link">
            <i className="fas fa-users"></i> Subscriptions
          </Link>
        </li>
        <li>
          {/* <Link to="/library" className="sidebar-link">
            <i className="fas fa-book"></i> Library
          </Link> */}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
