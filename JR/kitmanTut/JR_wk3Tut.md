今天内容: Git
+ Git commands recap
+ Merge conflicts
+ Gitflow workflow
+ Trunk-based workflows

---
3min-
Recap 问答
+ what is git?
+ Difference between google drive
+ What is branch?
+ Merge vs. rebase
+ stage
  + 暂时保存. staging area 
+ Git add
+ Git commit
+ Git push

---
13min-
merge conflicts

**Alway communicate to your co-workers while resolving conflicts in P3**

Three options on merge conflicts
+ Accept your change
+ Accept other's change
+ Custom changes

After resolve, add, commit and push

---
gitflow 15min-

An alternative git branching model that involves the use of feature branches and multiple primary branches

**wk4 Ally tut如果不讲git再看**

---
Trunk-based workflow 1h04min-

Gitflow has fallen in popularity in favor of trunk-based workflows, which are now considered best practices for modern continuous software development, 保证得写测试保证无Bug

git flow and thunkbased flow both can write test but thunkbased flow must write test since it is merging to master

现在大部分公司还是用gitflow, P3建议还是先用gitflow



trunk-based workflow 和 git flow的根本区别是: trunk flow has less branch, but trade-off is develop feature slower because  must write test. Git flow is a little bit safer compare to trunk-based workflow if you have test


---
1h29min-1h55min

选一个同学作为collaborator展示merge 

讲的好乱, 浪费时间

---
1h55min-

force 不要用






