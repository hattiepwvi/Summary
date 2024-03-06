import { useContext } from "react";
import Card from "../ui/Card";
import classes from "./GroupItem.module.css";
import FavoritesContext from "../../store/favorites-context";

const GroupItem = (props) => {
  //使用 context
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoriteHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        goal: props.goal,
      });
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <goal>{props.goal}</goal>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          {/* <button>To Favorites</button> */}
          <button onClick={toggleFavoriteHandler}>
            {itemIsFavorite ? "从我的学习小组里移除" : "添加到我的学习小组"}
          </button>
        </div>
      </Card>
    </li>
  );
};

export default GroupItem;
