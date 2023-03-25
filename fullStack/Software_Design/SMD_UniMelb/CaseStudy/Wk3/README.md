# Abstract

作为比较核心的步骤, 将domain model 转化为 Design model, 加入很多software space的额外考虑, 

相比Wk2, 明显感到信息量多了很多



# 1. Brief Background:

Last week, the engineering team created a **domain model** and **system sequence diagram,** which allowed them to gain a solid understanding of Tony's Pizza.

The team will now be translating what they have learnt about the domain into the **solution space**. They will begin to create ***design models*** that correspond to how the system will actually be implemented. The following demonstration video will show  how to create a design class diagram based on the conceptual classes in the domain model and how to assign some responsibilities to achieve a use case. 

Content Structure:

In this week, we continue to build a design class diagram based on the domain class diagram of last week. We also delve deeper into objects constructions from the design class model that we build.



# 2. :full_moon: Case study 3.2 - Static Design Model & Tutorial Video

就是UML类图

The **Design Class Diagram** shows a **static** overview of required software classes in the system and the relationships between them.

Figure 1 shows a partial design class diagram for Tony’s pizza ordering system which is derived from the **domain model** in the Week 2 case study document. Note that most of the software classes have been translated directly from the domain model to reduce the **representational gap**. However, we have to be more specific about what the associations are between the classes, and about data types of attributes. For example, the OrderLineItem class was not in the domain model, but it has been added into the design model in order to manage multiple of the same pizza (including customised toppings and selected size) being added to an order. This is a common pattern that allows us to specify quantity as an attribute, rather than needing to create many identical object instances. 

A **key** **difference** between the design model and the domain model is that we are now defining methods, which means that we need to assign responsibilities to the classes involved. Over 3 weeks (Weeks 3 – 5), we will explore in more detail how to effectively assign responsibilities to software classes.

This page also contains [a tutorial video](https://canvas.lms.unimelb.edu.au/courses/153221/pages/case-study-3-dot-2-static-design-model-and-tutorial-video?module_item_id=4589460#tutorial_video) describing how to create a design class diagram.



信息的含量上: Association < aggregation < composition, 下图其实没必要去画上 表示association的箭头, 所以



下图基于workshop2 的 domain model

![designClassDiagram1](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk3/Src_md/designClassDiagram1.png)



*Figure 1: A partial **design class diagram** for Tony’s pizza ordering system. This model focuses on classes required for adding a pizza to an order and customising its toppings. Note that delivery functionality and ordering additional items has been omitted from scope for now.*  

:question: why store addedToppings and removedToppings in `Pizza ` seperately?

感觉上图中addedToppings 和 removedToppings有点重复了, 我的话只会保留Toppings作为用户当前加入的topping的容器, 之后CRUD直接对容器操作就行了.

see video 25min- 但是没怎么听懂 

> :bangbang: **IMPORTANT NOTE**: When assigning responsibilities, we need to differentiate the (human) customer from the Customer class. For example, in the real world, a (human) customer has many responsibilities, such as navigating the website and ordering the pizzas. But in the software system that we are designing, the Customer class (Software class) most likely will not be assigned those responsibilities, as we want the software system to be highly cohesive. The Customer class is likely only responsible for maintaining data about the customer entity, such as name, address, phone number, etc. Whereas other responsibilities of a customer will be delegated to other software classes in the system. To sum it up, the Customer class should not have the full responsibilities of a real-world customer. 
>
> 理解Class Pizza的intance和现实的Pizza所代表的信息不一样,  Class Pizza的instance 代表的是一类Pizza的信息, 不是指现实里一个Pizza



---

## My notes of the video:

:bangbang: 技巧:

start from 'tangible entity' to formulate the design model (also apply to domain model), then model intermidiate class e.g. `Line Item`, which allows for the recording of additional information about how an item relatesd to the parent collection, such as quantity or tax applicability.  

+ E.g.上图中的  `OrderLineItem`, 一个OrderLineItem对象其实就相当于下面表里的1个row. 而下表就是`Order`内的lineItems属性

|             | Pizza  | Quantity |
| ----------- | ------ | -------- |
| lineItem[0] | Pizza1 | 5        |
| lineItem[1] | Pizza2 | 2        |
| lineItem[2] | Pizza3 | 4        |
| ...         | ...    | ...      |



Notations:
+ **black solid diamond**: composition relationship, child cannot exist independent of  parent, ( pointing from child to parent)
+ **open diamon**: aggregation relationship, the child can exist independently of the parent (pointing from child to parent)
+ :star: **Arrow**: dependency relationship, indicating the parent has the child (pointing from the parent to the child). 依赖关系反过来就是composition或者aggregation关系 
  + **text**: 表示parent将child作为attribute存在自己内部 (<u>直接存</u>(attribute name往往是单数)或者<u>放在容器里存</u>(attribute name往往是复数)).  但是Design class diagram中Parent box里往往不写这个attribute, 只是在dependency relationship的箭头线上标注这个attribute , 等到implementation时再加进去
    +  e.g. OrderLineItem 里有一个名为item的 attribute, 类型是Pizza
  + **multipliicity**: 也说明了child 在 parent内是怎么存的
    + parent : child = 1:1, 往往就是直接把child作为parent属性
    + Parent : child = 1: n, 往往是把child 放容器里作为parent属性



:gem: 从Order里面getTotal(), 信息是如何流动的? 

Order.getTotal() 里loop over `lineItems`:  lineItem.getTotal()  in which we calculate  `quantity * item.getPrice()`

+ 计算 `item.getPrice()`: 这个case里难点在于如何计算一个特定种类Pizza的单价, Pizza的单价又取决于Pizza的特征：style, size & toppings (这两者并不只是简单String类型来描述Pizza特征而是用户可以自定义size和toppings , 需求相对复杂, 所以在domain model我们把它独立成class来描述) 

  + pizza.style + pizza.size -----> pizza base price

  + pizza.addedToppings + pizza.removedToppings ----> total addon price

  + pizza price = pizza base price + total addon price



:bangbang: 最后可以看到, Design class diagram 和 Domain class Diagram是相当不同的! 因为在Design class diagram中有相当多的software concept出现 (e.g. enum, map, Line Item ...) 最后Design class diagram画出来可能会和Domain class diagram长的很不一样. 所以不能说, domain class diagram就是simplified version of Design class diagram

---



# 3. :full_moon: Case study 3.3 - Dynamic Design Model & Tutorial Video

相当于在写code了, model class interactions within a system

The **Design Sequence Diagram** below illustrates how a pizza can be added to an order, further customised, and how the total price can be retrieved. In contrast to the System Sequence Diagram, we are now modelling the actual implementation of the system by showing methods being called on classes. 

The static and dynamic models were developed **in tandem** (协同, 一起) to help ensure that the assignment of responsibilities can achieve the required behaviour. You might find yourself going back-and-forth between the two diagrams iteratively, because sometimes a design might look good on the (static) **Design Class Diagram**, but when you try to develop the (dynamic) **Design Sequence Diagram**, you might realise that some details of the Design Class Diagram is missing / inappropriate. If done well, these models will become useful artefacts as the software team works collaboratively on the implementation and adds future features. 

At this point, we don’t need to be too concerned about where the *found messages* are coming from – but they do correspond closely to the system operations that we expect the customer actor to perform as part of this interaction: adding a pizza, adding toppings, removing toppings, editing pizza size, quantity, and retrieving the order total.

This page also contains [a tutorial video ](https://canvas.lms.unimelb.edu.au/courses/153221/pages/case-study-3-dot-3-dynamic-design-model-and-tutorial-video?module_item_id=4589461#tutorial_video)which demonstrates how to create a design sequence diagram.

![designSequenceDiagram1](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk3/Src_md/designSequenceDiagram1.png)



*Figure 2: Design sequence diagram for adding a pizza to an order and customise it. Note that the functionality for editing a pizza has been moved into a subdiagram in order to aid readability.*

> **Note:** You might recall learning about **System Sequence Diagram** in week 2, which is very similar to the **Design Sequence Diagram** that we are learning today. The major difference between the two diagrams is that System Sequence Diagram is a **dynamic** representation of the **domain model**, whereas the Design Sequence Diagram is a **dynamic** representation of the **design model**.
>
> Because of this difference, System Sequence Diagrams are often relatively *relaxed*. You might notice that messages can be written in plain English. This is very different from the Design Sequence Diagram that we are learning today, which has to be 100% consistent with the **Design Class Diagram**. This means all the messages has to be method names (no more plain English!). This is because we are trying to show the actual implementation of the system. In addition, if code were to be written based on this diagram, then there will be no ambiguity about what the method names are. 



---

## My notes of the video:

画图顺序: 按Top down来画, 因为sequence diagram是在按时间顺序modelling class interactions



Notation:

+ :bangbang: 方法被实心箭头指向的类的对象调用
+ exe bar 内部其实就是一个方法体内执行的逻辑flow

:gem: order.getTotal() 这个found message是如何得到tota返回l的? 数据流向的过程？ 



:bangbang: system sequence diagram中的actor不要出现在design sequence diagram中

# 4. Case study 3.4 - Implementation

Now that the team has the static and dynamic design models for ordering pizza, a system can be implemented based on these design models. The Java source code below is an example of how we implement the system based on the domains. The diagrams are also attached below to help you associate the diagrams with the code.



代码见Wk3 workshop