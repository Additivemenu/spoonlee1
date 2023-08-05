import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native"; // note this
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  // hooks  -------------------------------------------
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    console.log("useEffect: ", courseGoals);
  }, [courseGoals]);

  // handlers  ----------------------------------------
  function addGoalHandler(enteredGoalText) {
    console.log(enteredGoalText);
    // setCourseGoals([...courseGoals, enteredGoalText]);    // not best way to update if new state depends on prev state
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() }, // for FlatList to generate key
    ]); // best practice

    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    console.log("Item to be deleted: id", id);

    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => {
        return goal.id !== id;
      }); // filter keeps what satisfies the checking criteria
    });
  }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  return (
    // View is the container component that is used to contain elements, not pure text
    <>
      <StatusBar style="light" />

      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler} // show the modal
        />

        {modalIsVisible && (
          <GoalInput
            onAddGoal={addGoalHandler}
            visible={modalIsVisible}
            onCancel={endAddGoalHandler}
          />
        )}

        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }} // extract something as a key
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1, // appContainer uses all available space
    paddingTop: 50,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "#1e085a",
  },

  goalsContainer: {
    flex: 3,
  },
});
