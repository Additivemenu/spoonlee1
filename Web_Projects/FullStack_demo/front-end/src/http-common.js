import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api/v1",  // 这个aixos intance想要连接的对应server 的base url
  headers: {
    "Content-type": "application/json"
  }
});