import path from "path";
import fs from "fs";

function diffDirAndFile(dirFileArr = [], basePath = "") {
  const diffResult = {
    dirs: [],
    files: [],
  };
  dirFileArr.forEach((name) => {
    const currentFileStat = fs.statSync(
      path.resolve(__dirname, basePath + "/" + name)
    );
    if (currentFileStat.isDirectory()) {
      diffResult.dirs.push(name);
    } else {
      diffResult.files.push(name);
    }
  });
  return diffResult;
}

function getTotalSrcDir(keyName) {
  const result = fs.readdirSync(path.resolve(__dirname, "../src"));
  const diffResult = diffDirAndFile(result, "../src");
  const resolveAliasesObj = {};
  resolveAliasesObj[keyName] = path.resolve(__dirname, "../src");
  diffResult.dirs.forEach((dirName) => {
    let key = keyName + dirName;
    resolveAliasesObj[key] = path.resolve(__dirname, "../src", dirName);
  });
  return resolveAliasesObj;
}

module.exports = function (options = { keyName: "@" }) {
  let { keyName } = options;
  return {
    // config是 Vite 独有钩子
    // config会原封不动的传过来，env配置环境
    // 在解析 Vite 配置前调用
    config(config, env) {
      console.log("config:", config);
      console.log("env:", env);
      return {
        // 返回这个对象会合并到config对象上
        resolve: {
          alias: getTotalSrcDir(keyName),
        },
      };
    },
  };
};
