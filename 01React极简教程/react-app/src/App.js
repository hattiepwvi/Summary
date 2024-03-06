import { Routes, Route } from "react-router-dom";

import AllGroupsPage from "./pages/AllGroups";
import NewGroupPage from "./pages/NewGroup";
import FavoritesPage from "./pages/Favorites";

import Layout from "./components/layout/Layout";

const App = () => {
  //Router告诉React Router只有一个Route是active活动状态；
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<AllGroupsPage />} />
        <Route path="/new-group" element={<NewGroupPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
