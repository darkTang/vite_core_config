# vite 启动项目初体验
开箱即用（out of box）：你不需要做任何额外配置就可以使用 vite 来帮你处理构建工作

在默认情况下，我们的 esm 导入资源的时候，要么是绝对路径，要么是相对路径

cjs 运行在服务端，可以规避这个问题

# vite的预加载

## 开发环境
```js
import _ from 'lodash'  // lodash会帮我们将路径进行补全
import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=9bd8283e"
```
寻找依赖的过程是自当前目录依次向上查找的过程，直到找到根目录或对应依赖为止

## 生产环境
vite会交给rollup来完成打包

**依赖预构建**：首先vite找到对应的依赖，然后调用esbuild，将其他规范代码转换为esm规范，然后放到当前目录下的node_modules/.vite/deps，同时对esm规范的各个模块进行统一集成

解决了3个问题：
    1. 规范转化，统一转化为esm
    2. 路径处理
    3. 网络多包传输的性能问题 将esm转化为function函数形式，减少网络多包传输的性能问题，因为只要你import...，就会加载资源，有了依赖预构建，vite都会尽可能的将他们进行集成最后只生成一个或几个模块

# vite的配置文件
1. vite配置文件的语法提示
   1. defineConfig

2. 配置环境
3. vite在开发环境用的是自己的一套方案，而在生产环境下用的是rollup的方案，因为它在生产环境必须要做一些兼容性处理
   
# vite环境变量
> 环境变量：会根据当前的代码环境产生值的变化的变量就叫做环境变量
代码环境：
1. 开发环境
2. 测试环境
3. 预发布环境
4. 灰度环境
5. 生产环境

APP_KEY: 测试环境、生产环境、开发环境是不一样的key
- 开发环境：110
- 生产环境：111
- 测试环境：112

在vite中环境变量的处理
vite内置dotenv第三方库，会自动读取.env文件，并解析这个文件对应的环境变量，并将其注入到process（node）对象下，但是vite考虑到和其他配置的冲突问题，他不会直接注入到process对象下，涉及到vite.config.js中的一些配置
- root
- envDir：用来配置当前环境的文件地址

vite给我们提供了一些补偿措施，我们可以调用vite的loadEnv来手动确认env文件

为什么vite.config.js可以写esm形式，因为node会进行解析，将其全部替换为cmj形式

process.cwd()方法：返回当前node进程的工作目录（终端启动目录）

.env 所有环境都能用到的环境变量
.env.development 开发环境（vite默认会将开发环境命名为development）
.env.production 生产环境（vite默认会将开发环境命名为production）

yarn dev --mode development 会将 mode设置为development传递进来，默认yarn dev会自动帮我们加上

当我们调用loadEnv时，会做
1. 找到.env文件并解析环境变量
2. 会将传进来的mode这个变量的值进行拼接， `.env.development`，并根据我们提供的目录去取对应的配置文件并进行解析，并放进一个对象
3. 可以理解为
    ```js
    const baseEnvConfig = 读取.env的配置
    const modeEnvConfig = 读取env相关配置
    const lastEnvConfig = {...baseEnvConfig, ...modeEnvConfig}
    ```

如果是客户端，vite会将环境变量注入到import.meta.env中，vite做了拦截，环境变量必须要以 VITE_ 开头

**补充：**ES6新增import.meta，常用import.meta.env|import.meta.url

# vite中处理css
vite天生就支持对css文件的处理

1. vite读取到main.js中引用到了index.css
2. 直接去使用fs模块读取index.css文件内容
3. 直接创建style标签，将index.css内容插入到style标签中
4. 将style标签插入到index.html中
5. 将该css文件中的内容直接替换为JS脚本（方便热更新和css模块化），同时设置Content-Type为js，从而让浏览器以JS脚本的形式来执行该css

但是这种做法可能会导致类名相同而出现样式冲突问题。
cssmodule就是用来解决这个问题 
1. module.css会自动开启css模块化
2. 并且将类名进行一定规则的替换
3. 替换后会将其默认导出
4. 然后将替换好后的内容塞进style标签里

# vite.config.js中css配置（modules篇）

- localsConvention：修改生成的配置对象的key的展示形式（驼峰还是中划线）
- scopeBehaviour：配置当前的模块化行为是模块化还是全局化，local表示开启模块化，global表示不开启
- generateScopedName：生成类名的规则（可以配置为函数或字符串规则：https://github.com/webpack/loader-utils#interpolatename）
- hashPrefix
- globalModulePaths

# vite.config.js中css配置（preprocessorOptions篇）

用来配置css预处理的一些全局参数

# sourceMap

文件之间的索引：

假设我们的代码被压缩或者被编译过了，这个时候假设程序出错，它将不会产生正确错误信息的位置，如果设置了sourceMap，它就会有一个索引文件

# postcss

vite天生对postcss有非常良好的支持
postcss可以对浏览器做兼容性处理

## 使用postcss
1. 安装依赖
```
yarn add postcss-cli postcss -D
```
2. 书写描述文件
- postcss.config.js
- .postcssrc

3. 业内称为 postcss后处理器

# vite配置文件中css配置流程（postcss篇）

- postcss-preset-env：支持css变量和一些未来的css语法，自动补全等

# node端路径问题

- 相对路径都会与process.pwd() 进行拼接，形成绝对路径，而process.pwd()是node的执行目录

# vite加载静态资源
除了服务器帮你加载的动态资源以外（如请求等），其他的都是静态资源。
vite对静态资源基本上是开箱即用的
1. 支持json文件开箱即用，已经帮你进行json的解析，并且还支持按需导入（Tree Shaking：打包工具会自动帮你移除你没有用到的变量或方法）
2. svg不会失真，尺寸小，但是没法很好表示层次丰富的图片信息，一般来说在前端用来做图标

# resolve.alias的别名
```js
resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src"),
        "@assets": path.resolve(__dirname, "./src/assets"),
    },
},
```

# vite在生产环境对静态资源的处理
浏览器自带缓存机制，当名字相同时，浏览器可能就会读取缓存，因此我们要保证每次产生的js文件名不同（hash算法）

# vite插件
插件是什么？
> vite会在不同的生命周期中去调用不同的插件以达到不同的目的
1. 生命周期：vite从开始到结束，就是vite的生命周期
2. vite插件名称特点：vite-plugin-xxx
3. vite插件最好用cjs，因为它是运行在服务端，浏览器端可以用esm

### vite-aliases插件
可以帮助我们自动生成别名，检测当前目录包括src在内的所有文件夹，并帮助我们生成别名

### 手写vite-aliases插件
我们去手写vite-aliases其实就是抢在vite执行配置文件之前去修改配置文件

通过vite.config.js返回出去的配置对象以及我们在插件的config生命周期中返回的对象都不是最终的一个配置对象，vite会自动把几个配置对象进行merge合并

### vite-plugin-html
可以使用ejs语法，主要用于服务端html中某些数据的经过变更 <%= user.name %>

### vite-plugin-mock
mock数据：模拟数据
vite-plugin-mock插件的依赖项mockjs


