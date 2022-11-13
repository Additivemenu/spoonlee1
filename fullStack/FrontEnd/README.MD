
# 快捷键
+ vscode的setting中搜索save,勾选保存时格式化，这样按Ctrl + S自动保存时会格式化代码比如换行
+ 使用 ctrl + / 可以注释
+ 使用ctrl + f 可以打开vscode的搜索bar
+ 按住ctrl + z可以返回指令原来的样子，按ctrl + shift + z再切换回去
+ ctrl + shift + p
+ 快速打字:
  + 输入!按tap, 出现一个html模板
  + 快速写: 键入“section.main-structure” + tap:
    ```html
    <section class="main-strucuture"></section>  
    ```
  + 快速写:键入”a>div.logo” + tap:
    ```html
    <a href="">
        <div class="logo"></div>
    </a>
    ```
+ Shift+点击收缩代码可以逐层收缩
+ Ctrl + f 检索代码，还可以据此replace 代码中的关键词
  + Aa: 搜索结果是否对大小写敏感
  + ab:搜索结果是否必须严格是粘连在一起的
  + GitHub上使用类似的检索功能(也是ctrl + f启动快捷寻找, 甚至word里也是ctrl + f)
+ 加标签：选中HELLO WROLD, ctrl + p打开搜索框，输入>wrap回车，再输入想wrap的标签 (来自js lesson1 3h44min)
+ HTML快速创建多重标签:
  ```html
  div.block1*7, then hit tap
  ```

# 代码模板
vscode: File ---> preferences ---> configure user snippets ---> define a JSON file

[vscode snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

+ Tabstops:
With tabstops, you can make the editor cursor move inside a snippet. Use $1, $2 to specify cursor locations. The number is the order in which tabstops will be visited, whereas $0 denotes the final cursor position.


+ Placeholder:
With tabstops, you can make the editor cursor move inside a snippet. Use $1, $2 to specify cursor locations. The number is the order in which tabstops will be visited, whereas $0 denotes the final cursor position.