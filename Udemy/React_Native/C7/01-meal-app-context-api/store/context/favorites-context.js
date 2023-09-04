import { createContext, useState } from "react";

// context obj
export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

// the wrapper component
function FavoritesContextProvider({children}) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([]);

    function addFavorite(id){
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);  // add new element to state
    }

    function removeFavorite(id){
        setFavoriteMealIds((currentFavIds) => currentFavIds.filter(mealId => mealId !== id))
    }

    const value = {
        ids: favoriteMealIds,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;
