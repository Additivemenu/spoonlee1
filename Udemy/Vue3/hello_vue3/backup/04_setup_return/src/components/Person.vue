<template>
  <div class="person">
    <h2>name: {{ name }}</h2>
    <p>age: {{ age }}</p>
    <button @click="changeName">modify name</button>
    <button @click="changeAge">modify age</button>
    <button @click="showTel">check out tel</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person", // component name

  setup() {
    // ! setup()'s this is undefined, vue 3 has been weakening 'this'

    // data, data was written in 'data' in vue 2 options api and being reactive, but here they are not reactive
    let name = "tommy"; // now name is not reactive
    let age = 18; // now age is not reactive
    let tel = "12315552"; // now tel is not reactive

    // methods
    function changeName() {
      name = "alice"; // this won't change the name in the UI
    }
    function changeAge() {
      age += 1;
    }
    function showTel() {
      alert(tel);
    }

    return { name, age, changeName, changeAge, showTel }; // make data available to template

    // setup()'s return could also be a  render function
    // return () => 'hello'
  },
};
</script>

<style scoped>
.person {
  background-color: skyblue;
  box-shadow: 0 0 10px;
  border-radius: 10px;
  padding: 20px;
}

button {
  margin: 0 5px;
}
</style>
