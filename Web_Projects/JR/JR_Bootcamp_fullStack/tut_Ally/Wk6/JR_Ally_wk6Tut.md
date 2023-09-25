Ally wk5 tut: git

---

上节课继续 0-21min





---

revision 21min-1h17min


git command(常用)

```js
git init 				// 创建git repo

// 分3部分:
// 工作区
// 暂存区 (stage)
// 本地仓库

git add . // 选中当前路径下所有文件, add到暂存区

git remote add origin [giturl]		// 为本地repo添加remote repo
git remote -v // 查看连接的remote repo的地址
git remote rm origin  // 断开与remote repo的连接
git remote origin set-url [giturl]		// 修改remote repo

git push -u origin master// 关联remote master

// 本地分支 branch
git branch 		// 查看本地分支
git branch -d	[branchName]		// 删除本地分支, 只有merge完全的branch才能被删除
git branch -D [branchName]		// 不管merge完成没, 一定删除
git checkout	[branchName]		// 切换到指定分支
git checkout -b [branchName]	// 在当前branch上, 创建并切换到指定分支

// 查看git提示信息
git status			// 查看文件状态
git diff		// 查看该文件的改动情况; 用github desktop来查看会更加直观
git log			// 查看所有commits, 但版本回退的commits看不到
git rerlog 	// 查看所有commits, 包括版本回退的commits

// merge vs. rebase -------------------------
// rebase: 不方便查看合并分支时的先后顺序
// rebase, merge不要混用: 就是如果一个project刚开始就用rebase, 之后一直用rebase; 一开始用merge, 之后一直用merge

// 课上有俩图demonstration

// 不要在公共分支上执行rebase操作.
// e.g. feature --> master的6步操作
git checkout master
git pull					// make sure local master up to date
git checkout feature1
git rebase master		//	在feature branch上rebase mater
git checkout master		// git merge feature1
git merge feature1
//... then do tests on local master

// merge的操作：
git checkout master
git pull                // make sure local master is up to date
git merge feature1
// ... then do tests on local master

// reset &  ---------------------
git rest HEAD^			// 回退所有内容到最近一次commit,最近i次commit的内容回到工作区
git reset --soft HEAD~1		// 回退所有内容到上个版本, 当前的内容回到暂存区
git reset --hard HEAD~1		// 回退所有内容到上一个版本, 最后一次commit的东西就都没有了.
git reset [commitID]		//回退到指定的commit

// stash ------------------------
git stash save 'feature3'		//
git stash list			// 查看stash栈有的stash提交
git stash pop				// 弹出最近的一次stash栈的代码
git stash@{n}				// 取出
git stash drop@{n}	// 删除stash栈中指定index的元素
git stash clear			// clear stash栈中所有元素

```

---
hands on 1h17min- 2h13min

`git init` 之后可以看到vscode左下角显示main 或者master 


---
1h17min-

基础的add, commit, push

1h28min-1h33min 歇息

---
1h33min-1h53min

git reset HEAD^

git reset --soft HEAD~1

---
1h53min- 

scenario: manager ask me to debug on feature-branch, but i haven't finish my code on my branch

stash: 暂存一下现在的进度

checkout switch to another branch and do debug

checkout main

stash pop: 恢复我之前暂存的进度

---
2h03min- 2h08min
merge feature branch on main branch

站在main branch上, merge feature branch

if conflict:
+ accept current change: accept main branch code
+ accept incoming change: accept feature branch code
+ accept both change: both

---
2h08min-
剩下的下节课接着练
