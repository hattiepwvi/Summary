import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Groups</div>
      <nav>
        <ul>
          <li>
            <Link to="/all-groups">全部小组</Link>
          </li>
          <li>
            <Link to="/new-group">创建小组</Link>
          </li>
          <li>
            <Link to="/favorites">我的小组</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
