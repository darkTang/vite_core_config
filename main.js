import { count } from "./counter.js";
import "./variable.css";
import "./index.css";
import A from "./a.module.css";
import B from "./b.module.css";
import "./c.less";
import "./src/imageLoader";
import jsonFile from "./src/assets/json/db.json";

// tree shaking
import { name, age } from "./src/assets/json/db.json";

console.log(jsonFile); // 其他构建工具下，json文件导入可能就是json字符串格式

console.log(A);
// {app-css: '_app-css_mc7s2_1', appCss: '_app-css_mc7s2_1'}

console.log(count);

fetch("/api/users", {
  method: "post",
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
