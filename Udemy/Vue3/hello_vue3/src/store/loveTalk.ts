import { defineStore } from "pinia";
import axios from "axios";
import { nanoid } from "nanoid";

// ! option api style
// export const useTalkStore = defineStore("talk", {
//   state: () => ({
//     talkList: JSON.parse(localStorage.getItem("talkList") as string) || [],
//   }),

//   actions: {
//     async getTalkList() {
//       let result = await axios.get(
//         "https://api.uomg.com/api/rand.qinghua?format=json"
//       );
//       console.log(result.data.content);
//       this.talkList.unshift({ id: nanoid(), title: result.data.content });
//     },
//   },
// });

// !composition api style. Equivalent to the option api style above. More like custom hook
import { reactive } from "vue";
export const useTalkStore = defineStore("talk", () => {
  // data
  const talkList = reactive(
    JSON.parse(localStorage.getItem("talkList") as string) || []
  );

  // methods
  async function getTalkList() {
    let result = await axios.get(
      "https://api.uomg.com/api/rand.qinghua?format=json"
    );
    console.log(result.data.content);
    talkList.unshift({ id: nanoid(), title: result.data.content });
  }

  // return
  return {
    talkList,
    getTalkList,
  };
});
