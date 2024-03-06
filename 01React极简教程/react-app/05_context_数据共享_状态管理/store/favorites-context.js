import { createContext, useState } from "react";
//状态管理包Redux， React也有内置的状态管理方案context：管理一些会影响多个组件的state：比提升state方案更好（在App.js管理state，然后传递给所有组件）、
// store文件夹：为这个应用程序application设置状态存储 state store
// context文件：就是一个javascript对象，可以存储在一个常量里，参数包括：初始值或state(可以是个object),
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteGroup) => {},
  removeFavorite: (groupId) => {},
  itemIsFavorite: (groupId) => {},
});

//增加和删除收藏夹：提供这个context给其他组件（包裹这些组件：state/context更新后这些监听state/context的组件也会更新）
export const FavoritesContextProvider = (props) => {
  const [userFavorites, setUserFavorites] = useState([]);

  const addFavoriteHandler = (favoriteGroup) => {
    //concat类似与push,但返回一个（增加了favoriteGroup的）新数组array;
    //React不是即时更新state, 而是在幕后统一安排（it schedules them behind the scenes.）; 所以更新取决于最新state时，不能传递新值，而是传递一个函数，函数会自动传入最新的state也就是prestate，返回更新的state；
    //setUserFavorites(userFavorites.concat(favoriteGroup));
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteGroup);
    });
  };

  const removeFavoriteHandler = (groupId) => {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter((group) => group.id !== groupId);
    });
  };

  const itemIsFavoriteHandler = (groupId) => {
    return userFavorites.some((group) => group.id === groupId);
  };

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };
  return (
    //传递value prop, value改变时，所有监听contex的组件也会更新
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
