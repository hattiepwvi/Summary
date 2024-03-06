import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./NewGroupForm.module.css";

const NewGroupForm = (props) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const goalInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    //监听表单提交；阻止浏览器默认行为（它会自动发送一个HTTP请求，重新加载页面；阻止这种行为使submit由Javascript和react处理）
    event.preventDefault();

    //读取输入的值有两种方法（改变屏幕的输出用useState，读取输入用ref）: 方法一 useState + onChange 跟踪每次输入；方法二 ref 对用户提交表单时的输入感兴趣
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

    //子传父:props的value是个function,传入参数groupData;
    props.onAddGroup(groupData);
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
