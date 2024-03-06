import Card from "../ui/Card";

import classes from "./GroupItem.module.css";

const GroupItem = (props) => {
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
          <button>添加到我的学习小组</button>
        </div>
      </Card>
    </li>
  );
};

export default GroupItem;
