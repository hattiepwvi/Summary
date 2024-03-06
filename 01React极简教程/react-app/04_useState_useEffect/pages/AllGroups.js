import { useEffect, useState } from "react";

import GroupList from "../components/groups/GroupList";

const AllGroupsPage = () => {
  // useState: 返回一个临时的JSX代码，等到有response时更新返回的JSX代码
  //不能推迟返回一个值（不能等到有response才返回值，不能等data返回后在添加到return里）：不能用asyn await,因为async就是把函数转变成返回Promise的函数（但是React函数必须是同步的，不能返回promis，必须直接返回JSX）

  const [isLoading, setIsLoading] = useState(true);
  const [loadedGroups, setLoadedGroups] = useState([]);

  // useEffect：在一定条件下运行代码；依赖项数组（没有外部依赖项就不用添加）
  //无限循环：setIsLoading(false)和setLoadedGroups([])改变了loading 和loadedgroup的state, fetch函数会再次请求、再次更新state、无限循环

  useEffect(() => {
    setIsLoading(true);
    // 默认get请求
    fetch(
      "https://react-getting-started-9a99e-default-rtdb.firebaseio.com/groups.json"
    )
      .then((response) => {
        return response.json();
      })
      //把response作为group list的groups prop;
      .then((data) => {
        const groups = [];

        for (const key in data) {
          const group = {
            id: key,
            ...data[key],
          };

          groups.push(group);
        }

        setIsLoading(false);
        setLoadedGroups(groups);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>全部小组</h1>

      <GroupList groups={loadedGroups} />
    </section>
  );
};

export default AllGroupsPage;
