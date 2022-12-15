
[git](./git.md)

---

ray ma intro: 
+ git, agile, interview, mock interview
+ work in AU microsoft, cloud

---

Git PPT

# 为什么使用git
+ 撤销改动或回滚版本
+ 回溯历史(A complete long-term history of every file that provides traceability)
  + 理解复杂模块的开发历程
  + 责任追究
  + 历史bug的追踪 
+ 协同合作
+ 备份

version control category
+ centralized 
  + 本地不能有公司仓库的全部代码, 为了商业安全 
+ distributed
  + 本地可以有公司仓库的全部代码 
  + e.g. git

git vs. github
+ git
  + distributed version control system 
+ github
  + online git shared repo


# hands on 17min-

## step 0: 一个点的历史 git set up
+ `git`
+ `git --version`
  + 一般大的版本号一致就可以, 没有必要一定保持版本号最新

### Git Global Setup
+ `git config --global --list`
  + 显示global setup
+ `git config --global user.name "<Your-Full-Name>"`
  + 让别人知道你是谁
  + `--global`就代表只能有一个user.name
    + 不写`--global`就可以让你在某个路径下拥有一个user.name 
+ `git config --global user.email "<your-email-address>"`
  + 一般绑定github邮箱 
+ `git config --global color.ui auto`
+ `git config --global merge.conflictstyle diff3`
+ `git config --global core.editor "code --wait"`
+ and more ...

### Set up repository
+ `git init`
  + 将当前文件夹作为git的一个repo, 成功后该文件夹将显示为branch: `git:(master)`
    + 这样会创建`.git文件夹`, 注意千万别碰这个文件夹否则它坏了基本修不好

:question: 如何在本地电脑找到ubantu中的文件?

OR

+ `git clone` (for remote repo only)

---

+ `git status` 显示在哪个路径, 有哪些文件在stage
+ `git log` 显示当前repo的所有commit的log
  + 用git history extension可以做到图形化访问log 

## step 1: 一条线的历史 commit 47min-

git 工作原理

working directory ---`git add`---> stage ---`git commit`---> git repo


+ `git add`
  + `git add .` 添加当前路径下所有文件至stage
  + `git add ./filename` 添加当前路径下指定文件至stage
  + `git remove --cached ./filename` 将stage中的指定文件移除出stage 
+ `git commit -m"git message"`
    + git message要有意义
+ `git rm`
  + 慎用 
+ `git stash` 暂存区
多人协作时, 代码写到一半, 突然老板让Bugfix, 我希望暂存现在的代码 (因为代码写到一般还不能commit), 就用这个command 


这些在vscode的左侧边栏的source control也可以做到

---

### git undo changes
#看至1h17min


## step 2: 两条线的历史 branch & merge






## step 3: 多条线的历史 远程协作

