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
  // below vue 2 syntax
  data() {
    return {
      name: "max",
      age: 18,
      tel: "12315552",
    };
  },
  // below vue 2 syntax
  methods: {
    changeName() {
      this.name = "tom";
    },
    changeAge() {
      this.age += 1;
    },
    showTel() {
      alert(this.tel);
    },
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
