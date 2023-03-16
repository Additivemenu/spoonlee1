# 0. Abstract

+ `Domain class diagram` 和 `System sequence diagram` (domain model)都不应涉及到software space, 让一般人都能看懂

+ `Domain class diagram`: 类似数据库设计, 规划整个系统涉及到哪些类以及他们的关系如何
+ `System sequence diagram`: 类似在图形化梳理业务逻辑和流程, 作为implementation时写代码的重要blue print
  + 包含reference, sub-diagram, loop, alt ( 即if-else branching)



# 1. Brief Background:

Before proceeding to build the software system for Tony’s Pizza chain, the engineering team needs to ensure that they have a solid understanding of the domain (i.e., the operations of Tony’s Pizza) before they design the system. This involved identifying all the concepts, attributes and associations between them,  as well as using accurate terminology.

In the following sections, the team summarised the business requirements of Tony's pizza. To formally capture the requirements, the team also created a **Domain Class Diagram** and a  **System Sequence Diagram.**

Content Structure:

In this week, the material provides you an understanding of the construction of a domain class diagram with an example. We also build a system sequence diagram with the help of a particular use case scenario.



# 2. Information about the domain (business requirements)

Domain model: Tony’s Pizza

In addition to the use cases from last week, the team summarised the following information about the operations of Tony’s Pizza:

- Tony’s Pizza is a national chain that has multiple restaurants throughout Australia.
- Each restaurant has a location and a radius that it can deliver orders to.
- Each restaurant has multiple staff members, all of whom have a staff ID number and password to access the system
- Each staff member has one of the following roles: Restaurant Manager, Restaurant Staff or Delivery Staff. These roles determine the type of operations that the staff can perform on the system.
- Every Delivery staff member must provide their vehicle registration number and a copy of their driver’s licence
- All restaurants will serve the same Tony’s Pizza menu. The menu consists of pizzas of different styles, and a range of bottled drinks
- Pizzas and drinks are offered in different sizes. Prices for different sizes are specified in the menu
- Each pizza style is defined by the set of toppings that it has.
- Customers can place an order and select to either pick up from the restaurant or have their order delivered.
- Orders can be paid for with cash on pickup/delivery or pre-paid with a credit card online
- Customers will be emailed an order confirmation upon placing their order, containing their order number
- Each Customer order will be placed at a restaurant that can deliver the order; i.e. a restaurant that is within the delivery range of the customer’s address.
- Each customer order will contain at least one pizza and/or drink. Customers must select the size of pizza or drink that they want when adding it to an order
- Customers can customise the toppings of pizzas that they wish to order, including adding up to 5 additional toppings. Additional charges will be added to the price of the pizza for additional toppings that are not included in the selected pizza style.
- Restaurant staff and managers can confirm orders placed by customers
- Delivery orders that are ready for collection are assigned to delivery staff
- The delivery staff update the order status when the order is delivered.
- Customers can rate their order experience and the delivery driver’s performance
- Each restaurant has an inventory of pizza ingredients (i.e., the pizza toppings) to manage stock levels
- Each ingredient has a supplier specified. Restaurant managers can review the stock levels in the inventory and place orders with the relevant ingredient suppliers

In the following section, the team will utilise the information above to construct a **Domain Class Diagram**.



# 3. :gem: Domain Class Diagram 

**Domain Class Diagrams** are often used to summarise information about the domains. A good Domain Class Diagram not only provides a holistic visual overview of the system being modelled but also provides a strong foundation for the software design that follows. This page also contains [a tutorial video](https://canvas.lms.unimelb.edu.au/courses/153221/pages/case-study-2-dot-3-domain-class-diagram-and-tutorial-video#tutorial_video) of how to create a domain model from scratch.



Below is the Domain Class Diagram based on the business requirements that we outlined in section2. The business requirements from the previous section are also included at the bottom of this page in case you want to compare it to the diagram.

![tonyDomainModel](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk2/Src_md/tonyDomainModel.png)



*Figure 1: A domain model constructed from the information gathered about Tony's Pizza. Note that care has been taken to use terminology from the use cases specified in order to minimise the representational gap. Description classes have been used to represent the distinction between pizzas as they appear in the menu vs how they are actually ordered and customised.* 

:bangbang: 注意其中descriptive class 的使用



> You might notice that all the **associations** in the diagram do not have arrows. Associations without arrows are called **bi-directional associations**. The associations in a Domain Class Diagram is most likely bi-directional, as relationships between objects are often established in both directions **in the real world**.  For example, Staff works at the Restaurant, Restaurant employs Staff.

> You might also notice that in the diagram, Restaurant Manager, Restaurant Staff and Delivery Staff each have a blank arrow that points at Staff. This might remind you of **inheritance** that you learnt back in Object-Oriented Software Development. However, a blank arrow **does not** denote inheritance in this context, because inheritance is a software concept, which cannot be included in a Domain Class Diagram. In a Domain Class Diagram, a blank arrow denotes **generalisation/specialisation** (not a software concept). In this case, Restaurant Manager, Restaurant Staff and Delivery Staff are **specialisations** of Staff and Staff is a **generalisation** of these three classes. This enables us to avoid repeating the same attributes in each of the three classes. In addition, when we move on to designing the software, blank arrows like these suggest that using inheritance would be an appropriate choice in our design.





# 4. :gem: System Sequence Diagram & Tutorial Video

Besides the Domain Class Diagram, the team is also very interested in how different aspects of Tony's Pizza interacts with one another. This can be achieved by a **System Sequence Diagram**, <u>*which covers the dynamic interaction between different conceptual classes*</u> (event-driven). Please note that System Sequence Diagrams are meant to cover specific scenarios instead of being general. You can also have flexibility to control the level of detail in System Sequence Diagrams and you should always bear readability in mind.

This page contains [a tutorial video](https://canvas.lms.unimelb.edu.au/courses/153221/pages/case-study-2-dot-4-system-sequence-diagram-and-tutorial-video?module_item_id=4589448#tutorial_video) for creating the system sequence diagram for a particular scenario of our use case.

Refer to the use case ‘Place order’ in Week 1 of the case study.

> **Use case name:** **Place order**
>
> **Scope:** Tony’s Pizza - Online Ordering System
>
> **Level:** User goal
>
> **Primary actor:** Customer
>
> **Preconditions:** The current time is within operating hours for the restaurants
>
> **Success Guarantee:** An order has been placed and is pending confirmation from the selected restaurant
>
> **Special Requirements:** Seamless user experience Optimisation for mobile devices Reliable communication with payment service
>
> **Main success scenario**:
>
> ​	1. Customer selects pizza style from menu
>
> ​	2. System informs the customer of toppings included in the selected style
>
> ​	3. Customer selects pizza size
>
> ​	4. Customer adds pizza to order
>
> Repeat steps 1-4 until done
>
> ​	5. Customer selects drink from menu
>
> ​	6. Customer selects bottle size
>
> ​	7. Customer adds drink to cart
>
> Repeat steps 5-7 until done
>
> ​	8. Customer selects a collection method
>
> ​	9. Customer selects the restaurant location
>
> ​	10. Customer confirms the total price of the order
>
> ​	11. Customer selects a payment method
>
> ​	12. Customer receives confirmation that their order has been placed
>
> ​	13. Staff at selected restaurant location are notified of incoming order
>
> **Alternate scenarios**:
>
> ​	2a. Customer edits pizza toppings: Include Edit Pizza.
>
> ​	4-7. Customer removes item from cart
>
> ​	8a. Pick up from store
>
> ​		1. Customer selects the restaurant location to pick up from
>
> ​		2. System gives customer pick up instructions
>
> ​	8b. Delivery
>
> ​		1. Customer adds their delivery address
>
> ​		2. System selects nearest restaurant location to fulfil the order
>
> ​		3. Delivery fee is added to their total price
>
> ​	9a. Delivery address is outside of the range for any restaurant locations
>
> ​		1. Customer is notified that their order cannot be placed
>
> ​		2. Order process is terminated
>
> ​	11a. Cash on pick up/delivery
>
> ​	11b. Pay by credit card online
>
> ​		1. Customer enters cardholder name, card number and expiry
>
> ​		2a. Pending charge is placed on Customer’s account
>
> ​		2b. Payment is declined / Customer directed back to step 11
>
> *a. At any time, customer terminates the order process



This scenario involves the customer interacting with the system in order to add items to their order, customise pizzas, and confirm delivery and payment details. All of these actions are system operations that can be represented sequentially in a system sequence diagram. In the diagram below, we can see the necessary inputs and outputs between the customer and the system in order to achieve the use case.

![tonySSD](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk2/Src_md/tonySSD.png)

 *Figure 2: A system sequence diagram of the 'Customer places order' scenario. The diagram illustrates interactions between the primary actor (Customer) and the system itself over the course of the scenario. The system is illustrated as a “black box” – at this point we are focusing on the system operations, rather than knowing the details of how the system will perform those operations. Messages and attributes have been named to match those in the domain model and use case descriptions. Frames have been used to manage the complexity of loops and conditional statements in the sequence.* 

虚线头上是名词 (虚线并不代表是response)

实线头上是动词



其实上述的SSD中也包含了对 loop 和if-else逻辑 以及sub function的处理

> sd: sub-diagram - 相当于sub function
>
> Alt: alternative - 相当于if-esle, :bangbang:  注意需要加上if () 通过的条件 (上图中edit pizza 里alt忘加了)
>
> Ref: reference- 指像一个sub diagram
>
> loop: 指代loop, :bangbang: 注意需要加上for()通过的条件