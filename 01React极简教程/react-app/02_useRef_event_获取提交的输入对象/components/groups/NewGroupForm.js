import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewGroupForm.module.css";

const NewGroupForm = () => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const goalInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    //监听表单提交；阻止浏览器默认行为（它会自动发送一个HTTP请求，重新加载页面；阻止这种行为使submit由Javascript和react处理）
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredGoal = goalInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const groupData = {
      title: enteredTitle,
      image: enteredImage,
      goal: enteredGoal,
      description: enteredDescription,
    };

    console.log(groupData);
  };
  return (
    <Card>
      {/* 监听提交 */}
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          {/* 扩大可点击区域： <label> 元素与 id="title" 的 <input> 元素关联起来  */}
          <label htmlFor="title">名称</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">海报</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="goal">目标</label>
          <input type="text" required id="goal" ref={goalInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">描述</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.action}>
          <button>创建小组</button>
        </div>
      </form>
    </Card>
  );
};

export default NewGroupForm;
