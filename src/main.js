import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
const app = createApp(App);
// 将配置数据注入
app.use(router);
app.use(ElementPlus);
app.mount("#app");
