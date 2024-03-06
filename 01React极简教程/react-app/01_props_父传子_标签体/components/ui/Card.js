import classes from "./Card.module.css";

//包装JSX内容(组件通常用来包裹组件，被包裹的组件的内容被储存成props.children的值): 通过props传递属性、标签体的内容

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
