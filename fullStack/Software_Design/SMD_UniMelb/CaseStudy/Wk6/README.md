This week the team will be focusing in more depth on the order and delivery processes in the system. We aim to learn more about what happens to an Order object throughout its life and then create a state machine model to document these events and inform our implementation of methods on the Order and Delivery classes.    

Content Structure:

In this week, we discuss the state machine, also known as the finite automata which is widely used in programming world. We show you how we use them to design object logic when working on creating a complicated software (using our case study of course!).



# Case study 6.2 - State transition for orders

After careful examination of the system, the team summarised the state transitions for orders

- A customer accesses the online ordering system for Tony’s Pizza and starts a new order

- The customer adds and edits the contents of the order until they are ready to submit the order

- Upon submitting an order, it is assigned to the restaurant that will prepare the order

- - If the customer chose to pay by credit card, submitting the order will also place a pending charge on the customer’s credit card

- Submitted orders then need to be accepted by staff at the restaurant

- If a staff member rejects a submitted order, they will need to provide a note to the customer to explain why it was rejected, e.g. “We are out of capsicum”. The customer will then need to edit their order and resubmit.

- If the order is accepted, restaurant staff will began preparing the order

- Once the order is fully prepared, staff will mark the order as ready for pick up

- - If it is a pickup order, the system will notify the customer to come and collect the order
  - If it is a delivery order, the system will try to assign an available delivery staff member. If there are no available delivery staff members, the system will continue to wait for a staff member to assign the delivery to

- When a pick up order is collected by the customer, the payment will be finalised (either by paying cash, or finalising the charge on the customer’s credit card). At this point, the order is completed.

- When a delivery order is assigned to a delivery staff member, the delivery staff will be notified to come and collect the order from the restaurant

- The customer will be notified when the order has been marked as collected by the delivery staff.

- When the delivery staff delivers the order to the customer, the charge on the customer’s credit card will be finalised.

- Delivery orders will not immediately be considered to be completed after they have been delivered. This is because it is possible that the customer may make a complaint; e.g. if the order was incorrect; or there were items missing.

- - If no complaint has been made within an hour, the order will be considered to be completed
  - If a customer does make a complaint, restaurant staff must resolve the complaint (eg. by issuing a refund) before the order is considered to be completed.

- At any point during preparation or delivery, a staff member may cancel an order. This could be for any reason (e.g. delivery staff gets a flat tyre; restaurant has a fire; customer calls restaurant to cancel their order). The customer will be notified in the case of cancellation.



# Case study 6.3 - State Machine for Order & Tutorial Video

The system description on the previous page has been used to create the below state model that describes the life cycle of an Order object (Figure 1). This model captures all of the relevant events that happen to an order, as well as any additional actions that must be performed when these events occur. Notably though, we are also documenting the legal state transitions that can occur in the system. For example, we can move from ‘Draft’ to ‘Submitted’, but cannot transition directly from ‘Draft’ to ‘Delivered’.

This page contains [a tutorial video](https://canvas.lms.unimelb.edu.au/courses/153221/pages/case-study-6-dot-3-state-machine-for-order-and-tutorial-video#tutorial_video) for creating a state machine model for an order which will capture the order's entire lifecycle .

In the model, we can see that states relevant to delivery have been sub-states on the super-state ‘Delivery’. This allows us to capture higher level transition logic, such as being able to cancel from any point in the delivery. This also provides a greater level of cohesion to the state model, as delivery sub-states are all conceptually related and are only applicable in some circumstances (i.e. can be ignored for pickups).

Figure 1 below shows a state machine model showing the life cycle of Order objects in the Tony’s Pizza system. Note that this is a ***domain-level*** model describes the real-life events and actors involved in transitioning the Order and Delivery domain entities through various states. The design-level state machine model will be shown in the next subsection.



![stateMachineForDomainLevel](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk6/Src_md/stateMachineForDomainLevel.png)



*Figure 1: A domain-level state machine model showing the life cycle of Order objects in the Tony’s Pizza system.* 





# Case study 6.4 - Design model based on the State Machine

We can see that these state transitions form quite a complex model, which indicates that the Order is a good candidate to actually be implemented as a state machine. That is, the states can be implemented as enum values (see Figure 2) and we can check the order’s state to determine that only legal state transitions are performed.

We can use the domain-level model above to inform the design of the system (see Figures 2 and 3) and ensure that all of the functionality is met. Each event in the state model should correspond to an implementable method in the Order or Delivery class. Note that the guards may also reference attributes of Order (Figure 3).





![stateMachineOnDesignModel1](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk6/Src_md/stateMachineOnDesignModel1.png)

*Figure 2: A partial design class diagram, updated with methods to act as events for transitioning states, and enumerated values for OrderState and DeliveryState*



![stateMachineOnDesignModel2](/Users/lixueshuo/spoonlee/GitHub_Repo/spoonlee1/fullStack/Software_Design/SMD_UniMelb/CaseStudy/Wk6/Src_md/stateMachineOnDesignModel2.png)



*Figure 3:This design-level state model has been updated such that events correspond to methods and attributes of the Order and Delivery classes in the design class diagram (Figure 2)* 