import { defineStore } from "pinia";

export const useCountStore = defineStore("count", {
  state: () => ({
    sum: 6,
  }),
  actions: {
    increment(value: number) {
      if (this.sum < 10) {
        this.sum += value;
      }
    },
    decrement(value: number) {
      if (this.sum > 0) {
        this.sum -= value;
      }
    },
  },
  getters: {
    // like computed
    bigSum(state): number {
      return state.sum * 10;
    },
  },
});
