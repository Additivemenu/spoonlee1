import { reactive, onMounted } from "vue";
import axios from "axios";

export default function () {
  // data
  let dogList = reactive([
    "https://images.dog.ceo/breeds/shihtzu/n02086240_12650.jpg",
  ]);

  // methods
  async function getDog() {
    try {
      let res = await axios.get("https://dog.ceo/api/breeds/image/random");
      dogList.push(res.data.message);
    } catch (error) {
      alert(error);
    }
  }

  onMounted(() => {
    getDog();
  });

  // expose the data and methods to the outside
  return {
    dogList,
    getDog,
  };
}
