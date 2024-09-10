import axios from "axios";

const testInstance = axios.create({
  baseURL: "https://rust-chalk-rowboat.glitch.me",
});

export default testInstance;
