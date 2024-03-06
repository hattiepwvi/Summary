import { Routes, Route } from "react-router-dom";

import AllGroupsPage from "./pages/AllGroups";
import NewGroupPage from "./pages/NewGroup";
import FavoritesPage from "./pages/Favorites";

import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Layout>
      <Route>
        <Route path="/" exact>
          <AllGroupsPage />
        </Route>
        <Route path="/new-group">
          <NewGroupPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
      </Route>
    </Layout>
  );
};

export default App;
