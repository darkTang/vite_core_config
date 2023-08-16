// 如何加载静态图片资源
import highPic from "@/assets/images/high.jpg";

const img = document.createElement("img");
img.src = highPic;
document.body.appendChild(img);
