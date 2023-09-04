C7

App-wide state management

+ actually has nothing to do with React Native, but react features





# Absract

:gem: code is based on previous class

实现: 点击stack navigator 3rd layer的MealDetailScreen的favor button, add that meal to user's favorite list



We might need to manage some states app-wide (e.g. across several screens)  =>

+ React Native + React Context Example (适用于小型project)
  + Context obj + Context Provider
  + wrap + useContext() to retrieve context and context managing callbacks
+ React Native + Redux Example (适用于大型project)
  + 有需求再看






# 1. React Context API

115-118

convention: store folder for app-wide state management





## 1.1 Define Context Format and Context Provider

+ for centralised app-wide state management
+ define context obj
+ define context obj's provider
  + pack up state and state management handlers to Context provider, which binds context obj with context provider



```js
export context obj

context provider

export context provider
```



```js
import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],			// list that stores favorites meals' ids
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

// the wrapper component
function FavoriteContextProvider({children}) {
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
		
    // pack up state and state management handlers to Context provider
    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoriteContextProvider;

```



then, wrap the component blocks that want the access to context provider

```js
export default function App() {
  return (
    <>
      <StatusBar style="light"></StatusBar>

      <FavoritesContextProvider>		// context provider wrap up
        <NavigationContainer>
          <Stack.Navigator ...>
            <Stack.Screen .../>
            <Stack.Screen .../>
            <Stack.Screen .../>
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}
```





## 1.2 Add favorite meal

useContext() to get that app-wide context and add context change handlers for user clicking on favorite button 

```js
import { useLayoutEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {
  // get app-wide context **********************
  const favoriteMealCtx = useContext(FavoritesContext);

  const mealId = route.params.mealId;
  const mealIsFavorite = favoriteMealCtx.ids.includes(mealId);  // state-derived variable **********

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
	
  // context change handler ********************
  function changeFavoriteStatusHandler() {
    if (mealIsFavorite){
      favoriteMealCtx.removeFavorite(mealId);
    } else {
      favoriteMealCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ url: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>

      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
```



extract a component MealList from MealsOverviewScreen. 还是React的component化思维. 不展示代码了 在 component > MealsList里



## 1.3 DIsplay favorite meals in FavoriteScreen

use FavoritesMealsContext to display meals at FavoriteScreen

+ :bangbang: It is worth mentioning that even at FavoriteScreen, when click on a MealItem, we can still navigate to MealDetail Screen smoothly. See below tree:

  ```js
  // navigation tree
  NavigationContainer
  	|-- Stack.Navigator
  				|-- Stack.Screen	
  							|-- Drawer.Navigator		// nested navigator
  										|-- Drawer.Screen "Categories"
  												|-- a list of CategoryGridTile, onClick navigate to MealsOverview
  										|-- Drawer.Screen "Favorites"		
  												|-- a list of MealItem, onClick navigate to MealDetail
  				|-- Stack.Screen	"MealsOverview"
  						|-- a list of MealItem, onClick navigate to MealDetail
  				|-- Stack.Screen  "MealDetail"
  ```



```js
import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import MealsList from "../components/MealsList/MealsList";
import { MEALS } from "../data/dummy-data";
import { FavoritesContext } from "../store/context/favorites-context";

function FavoriteScreen() {
    // get app-wide context
  const favoriteMealCtx = useContext(FavoritesContext);

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}> You have no favorite meals yet!</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
}

export default FavoriteScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
```











# 2. Redux

119-122

Alternative to React Context API

有需求再看吧

