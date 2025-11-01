module.exports = class FileListPlugin {
  constructor(filename = "filelist.txt") {
    this.filename = filename;
  }

  apply(compiler) {
    //emit event: 生成文件到输出directory之前
    compiler.hooks.emit.tap("FileListPlugin", (complation) => {
      var fileList = [];

      // get each assets size and name as string, push to fileList array
      for (const key in complation.assets) {
        var content = `【${key}】
大小：${complation.assets[key].size() / 1000}KB`;
        fileList.push(content);
      }

      // 将收集的assets string 合并, 然后加入到新的文件中输出
      var str = fileList.join("\n\n");
      complation.assets[this.filename] = {
        source() {
          return str;
        },
        size() {
          return str.length;
        },
      };
    });
  }
};
