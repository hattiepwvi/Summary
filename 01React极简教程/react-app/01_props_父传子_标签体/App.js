import { Routes, Route } from "react-router-dom";

import AllGroupsPage from "./pages/AllGroups";
import FavoritesPage from "./pages/Favorites";
import NewGroupPage from "./pages/NewGroup";

import Layout from "./components/layout/Layout";

const App = () => {
  //Router告诉React Router只有一个Route是active活动状态；
  return (
    <Layout>
      <Routes>
        <Route path="/" exact>
          <AllGroupsPage />
        </Route>
        <Route path="/new-group">
          <NewGroupPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
