import { useContext } from "react";

import FavoritesContext from "../store/favorites-context";

import GroupList from "../components/groups/GroupList";

const FavoritesPage = () => {
  const favoritesCtx = useContext(FavoritesContext);

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = (
      <p>童鞋，你还没有加入任何学习小组，要不要看看我们的新学习计划呀?</p>
    );
  } else {
    content = <GroupList groups={favoritesCtx.favorites} />;
  }

  return (
    <section>
      <h1>我的学习小组</h1>
      {/* <GroupList groups={favoritesCtx.favorites} /> */}
      {content}
    </section>
  );
};

// 使用 context
export default FavoritesPage;
