Experiences I've learned from P3



# Git 相关

1. 注意每次在main branch pull下来之后, 跑一下yarn install 去安装所有新添加的依赖

2. - 一般来说我们只会在main branch上git pull, 因为main branch是生产环境. 而自己的branch一直就在本地不需要git pull, 别人的branch就更不需要git pull了
   - 一般只需要关注main branch和自己的branch即可
   - 在自己的branch commit 之后, 再返回main branch才会发现刚刚在自己的branch写的代码在main branch不见了

3. 只在自己的branch上工作, 别碰别人的branch

4. 在自己的branch commit, 将来merge到main branch后, 也会出现在main branch的commit 记录里

   



---

问题一：

⚠️如果自己的branch, 是落后于最新的main branch好几个版本开始写的，而我现在要使我的branch在最新的main branch基础上写代码该如何操作？

1. Git stash stash-name 返回到上此commit, 把自上次commit之后写的代码都放到stash区

2. 跑回到main branch, git pull保证main最新

3. 再跑会到自己的branch, git merge main-branch, 这样就保证自己的branch和最新的main branch保持一致了 

4. - 尽量避免这种操作, 因为你会在自己的branch新增加很多main branch已有的commit, 当你在自己的branch盖好后merge到main branch后会出现非常多的没有必要的commit

5. 接着在自己的branch, git stash pop, 将刚才暂存的代码merge进来, 现在会先进行auto-merging, 自己解决下conflict



还有其他方法处理这种问题吗?

:star: 最好使用git rebase而不是git merge: 先git pull保证main branch最新, 然后跳转到自己的branch去git rebase main, 这样就把main那段在公共祖先之后的部分嫁接到自己的branch上了, 我们自己的branch上后于公共祖先的commit 在嫁接过来的main 的commits的后面, 这样保证时间顺序不被打乱



— 一般一个branch只去做一件事情, 如果你已经merge到main了, 然后发现某个地方需要再修缮下, 这时就再去new一个branch然后修改, 一定注意kanban上 be blocked by, 如果你的任务是被前置任务block的, 那么你最好等那个前置任务完成了, 被merge到main了之后再去new 自己的branch完成自己的卡



# 项目代码规范

使用eslint来做代码规范检查, 甚至不让用`i++`



# Vscode extension

- Git lens 插件做各种merge, git add . 的操作, 会很方便
- Pretteir 插件自动做format. 右键format ducument 选择prettier来自动修改格式; 右键选择format document with来指定用哪个formatter. 另外, 可以在vscode中设置format on save



## :moon: 关于pull request:

两种pull request的方式

+ Ally教的方法: 感觉有危险, 如果我在本地merge好的main branch上做测试期间(还未将main push到remote), remote 的main branch又更新了该怎么办?

+ 方式二(preferred): 先把自己的完成好任务的branch push到remote, 然后再github上pull request申请合并到main branch. 第一次pull request就是用这种方式.

- - 如何保证local我自己的branch是基于最新的main而写的: 参考问题一



Pull request, reviewer可以在自己的本地git checkout到提交者的branch去test, 看他的代码效果如何



:bangbang: 别人对你的pull request给出建议后, 尽快respond改好, 因为后面可能有人排队 pull request, 如果你太慢了跳过你先merge别人的代码， 那你有得回去你的branch 去merge main, 解决confict很麻烦的



:gem: 2023-02-18 完成人生第一次pull request, 基本上就在自己的branch coding, main branch不会去动它, 卡写完后那条branch就废弃掉了, 如果有bug接新的卡new 新的branch去debug





——————————————————————

# **React 相关**

- 注意hooks只能被写在functional component内部, initial state可以写在外部

- 注意处理eslint提示的不规范代码写法, 要都处理掉才能commit， 同时要关注browser的console的提示信息, 两者结合debug

- Array —> html-like code时, 注意要给标签加上key, react的virtual dom需要这个

  

Axios模拟数据, 不需要mock data



使用theme provider中提供的css变量

- 参考components > posts 怎么写, 其实就直接在styled component中写就好, 原理好像是themeprovider把它的属性注入到styled component里了不太懂原理



将hook返回的东西作为props通过functional components 向下传递给后代

n React functional components, you can pass state as props to child components. To pass state with TypeScript, you'll need to define the shape of the state using an interface. Here's an example:

```ts
import React, { useState } from 'react';

const Parent = () => {
  const [text, setText] = useState('');

  return (
    <Child text={text} setText={setText} />
  );
}

// ----
interface ChildProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const Child = ({ text, setText }: ChildProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
    </div>
  );
}

```



