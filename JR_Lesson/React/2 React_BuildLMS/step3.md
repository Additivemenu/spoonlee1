龙哥3-5 lec





# 课前 Q&A

```java
英语水平对于developer的职业发展的帮助? 龙哥觉得自己的英语不好
  -- 英语不会成为技术路线的职业发展瓶颈, 一般交流的是技术方面的词汇, 所以技术上的英语不能有问题 
  		-- 但是面试时还是考验英语的. 只要能面上通过, 基本不用担心英语方面的问题
  -- 转管理层英语要求要高一些

可以夸大， 但不可以撒谎
夸大是个普遍现象
别人做的 = 你做的 = 你的个人功劳 = 你的解决方案 + 理想中的好的解决方案
但是注意: 夸大 !== 撒谎
    
如果你做过项目 + 你的参与度较高 + 你在项目中想的比较深远 == 完美的简历, 完美的故事

最聪明的做法去快速积累经验: P3中多review别人的代码, 就能更多的学到别人的长处, 短处, 搜集更多素材, 把别人的故事拿来构建自己的故事 (也不算完全编造啊)
  
```



```java
// -------------------------------------------
简历是干什么的?
公司需要招人 ---> 如果来求职的每个人都满足基本要求  ---> 不需要简历了， 直接面试 ---> 技术面 ---> HR面
公司需要找人 ---> 如果来求职的人都满足所有要求 ---> 直接final round HR面

面试官觉得好的简历是什么? 满足JD(Job Description)上每一条需求的
JD-Oriented Resume: 看市场需要什么, 想去的公司需要什么人才再去针对性, 功利性地学习

千万不要拿1份简历海投

// Resume的部分 ---------------------------------------------------------------------------------
// 论点的部分一定要在论据中体现, 参考JD来选择论点(论点和JD的匹配度越高越好, 至少得有60%吧. 这也意味着我们需要根据市场来自发主动地去学习popular的技术栈, 才能提升你的match度. JD-oriented learning . 能帮你找到工作的技能才值得学习, 学习到值得学习的技能就体现到CV上), 单有论点是没用的

// Part1 论点:
Introduction (soft skills)
  - 会CI/CD, 有Agile的经验(持续开发, 持续部署)达到快速迭代 --> 快速验证产品
  - working closely with Lead, PM and designer
  - Team work
  - Communicating skills
Hard skills
  - React
  - SpringBoot

// Part2 论据:
Experience (不一定是工作经验, 只要是能证明你会论点中提到的skills的经验就可以)
  - 哪个项目中， 哪个功能中, 你用了react / SpringBoot
  - 在哪个项目中, 你有Agile经验
  - 哪个项目体现你team work programming能力
  
Education
  - 你懂的
```



```java
快速验证产品的几个思想:
- CICD (Continuous Integration and Continuous Delivery/Deployment): AWS Devops -> UAT(User Acceptance Testing), Production environment
- MVP (Minimum Viable Product) 先做出最小可行的产品, 然后投放市场做产品验证. 然后根据市场反馈调整后续的产品开发
- Agile
```

```java
找工作是一件serious的事情, 采用Agile思想来不断更新自己的简历. 从你开始看JD迭代简历和选择性学习开始就算开始找工作了
  
  上午: 投简历 + 根据JD更新简历
  下午: 根据更新的简历写代码 + 根据代码更新简历
  
简历版本控制
------ | ------ | ------
   JD | 版本的简历 | 回复
    
当你根据JD迭代写出10份，20分简历后并依据更新的简历来学习后, 你的skillset基本就可以应对绝大部分公司的要求了
此时就是你挑offer的时候了
```



不要抗拒review, 你可以提前跟组员说好， 我该reivew就review, 如果你觉得很赶, 可以忽略我的review去merge, 但我至少自己是针对别人的问题思考过的, 

# 写代码 22:04-

https://github.com/KieraDOG/gamera

写login 的modal (pop up window) 里的内容

还是follow react 哲学



##  static page 

期间注意css变量管理, 而不是hard code

### :star: 对于Input组件的复用:

提取共同点为props + conditionally show component in jsx

还是值得看看的



```css

.Item~.Item{
	margin: 10px  
}
```





对于input标签的onChange, onBlur, onFocus属性

```react
<Input / onChange onBlur onFocus>
```



### 对于Button的复用 22:38-22:44



## dynamic page











