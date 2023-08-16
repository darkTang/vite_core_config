module.exports = function (options = {}) {
  return {
    // 应该将这个插件的执行时机提前，否则会解析错误
    // transformIndexHtml(html, ctx) {
    //   // ctx 当前整个请求的一个执行上下文
    //   console.log(html);
    //   console.log(ctx);
    //   html = html.replace(/<%= title %>/g, options.inject.data.title);
    //   return html;
    // },

    // 对象写法的生命周期钩子，可以增加额外配置项
    transformIndexHtml: {
      enforce: "pre",
      transform(html, ctx) {
        console.log(html);
        console.log(ctx);
        html = html.replace(/<%= title %>/g, options.inject.data.title);
        return html;
      },
    },
  };
}
/*
插件顺序
一个 Vite 插件可以额外指定一个 enforce 属性（类似于 webpack 加载器）来调整它的应用顺序。enforce 的值可以是pre 或 post。解析后的插件将按照以下顺序排列：
    Alias
    带有 enforce: 'pre' 的用户插件
    Vite 核心插件
    没有 enforce 值的用户插件
    Vite 构建用的插件
    带有 enforce: 'post' 的用户插件
    Vite 后置构建插件（最小化，manifest，报告）
*/
