import { useLayoutEffect } from "react";
import { MEALS, CATEGORIES } from "../data/dummy-data";

import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
  //  route.params:  object containing params which is defined while navigating
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    // check if meals's categoryIds contain this meal category id
    return mealItem.categoryIds.indexOf(catId) >= 0; // check model -> meal.js
  });

  useLayoutEffect(() => {
    // set screen title is a side effect, callback run after init rendering is done
    const catTitle = CATEGORIES.find((cat) => cat.id === catId).title;
    navigation.setOptions({
      title: catTitle,
    });
  }, [catId, navigation]);

  // function renderMealItem(itemData) {
  //   const item = itemData.item;
  //   const mealItemProps = {
  //     id: item.id,
  //     title: item.title,
  //     imageUrl: item.imageUrl,
  //     affordability: item.affordability,
  //     complexity: item.complexity,
  //     duration: item.duration,
  //   };

  //   return <MealItem {...mealItemProps} />;
  // }

  return <MealsList items={displayedMeals}/>
}

export default MealsOverviewScreen;


