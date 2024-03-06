import NewGroupForm from "../components/groups/NewGroupForm";

const NewGroupPage = () => {
  //子传父: fetch

  const addGroupHandler = (groupData) => {
    //后面添加segment会被翻译成文件夹或数据库的table: 将groups table添加到数据库，firebase需要在后面添加.json
    fetch(
      "https://react-getting-started-9a99e-default-rtdb.firebaseio.com/groups.json",
      {
        // 存储数据用post请求
        method: "POST",
        body: JSON.stringify(groupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <section>
      <h1>创建小组</h1>
      <NewGroupForm onAddGroup={addGroupHandler} />
    </section>
  );
};

export default NewGroupPage;
