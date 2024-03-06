import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/favorites-context";

const MainNavigation = () => {
  //使用 context
  const favoritesCtx = useContext(FavoritesContext);
  return (
    <header className={classes.header}>
      <div className={classes.logo}>WTF 学习小组</div>
      <nav>
        <ul>
          <li>
            <Link to="/all-groups">全部小组</Link>
          </li>
          <li>
            <Link to="/new-group">创建小组</Link>
          </li>
          <li>
            <Link to="/favorites">
              我的小组
              <span className="classes.badge">
                {favoritesCtx.totalFavorites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
