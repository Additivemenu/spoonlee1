import { ref, onMounted, computed } from "vue";

export default function () {
  // data
  let sum = ref(0);
  let bigSum = computed(() => {
    return sum.value * 10;
  });

  // methods
  function add() {
    sum.value += 1;
  }

  // hooks
  onMounted(() => {
    add();
  });

  // expose the data and methods to the outside
  return {
    sum,
    bigSum,
    add,
  };
}
