Resource: chatGPT

Ask: how many hybrid design patterns that leverages the Gang of Four design patterns? say composite strategy, and is there more hybrid design patterns?





## Adapter Factory

Unimelb week9 workshop





## Composite Strategy

Unimelb week10 workshop







# AOP 

## Intro

Aspect-Oriented Programming (AOP) is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns. It does so by adding additional behavior to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification, such as "log all function calls when the function's name begins with 'set'". This allows for behaviors that are not central to the business logic (such as logging, security, or transaction management) to be added to a program without cluttering the core logic.

Key Concepts in AOP:

1. **Aspect**: This is a modular unit of cross-cutting implementation. It encapsulates behaviors that affect multiple classes into reusable modules.

2. **Join Point**: A point in the control flow of a program, such as the execution of a method or the handling of an exception. In many AOP frameworks, join points can be dynamically determined during runtime.

3. **Advice**: This is the action taken by an aspect at a particular join point. Different types of advice include "before", "after", and "around" that define when the code is executed in relation to the join point.

4. **Pointcut**: A set of criteria to match join points. Pointcuts determine whether advice needs to be executed or not.

5. **Target Object**: Objects on which advices are applied. They are often proxied by AOP frameworks to apply advice.

6. **AOP Proxy**: An object created by the AOP framework in order to implement aspect advices. The proxy will replace the target object in the application, ensuring that the appropriate advices are executed at the correct time.

7. **Weaving**: The process of applying aspects to target objects to create new proxied objects. This can occur at compile time, load time, or runtime.

AOP Usage:
- **Logging**: Automatically adding logging to methods.
- **Transaction Management**: Automatically starting and committing transactions before and after method execution.
- **Security**: Enforcing security checks before method execution.
- **Error Handling**: Adding error handling routines.

AOP can be implemented in various programming languages, with Java being one of the most notable examples through frameworks like Spring AOP and AspectJ. The concept can also be found in other languages, though the implementation details and availability of frameworks vary.



## Involved design patterns 

Aspect-Oriented Programming (AOP) itself can be considered a design pattern that addresses cross-cutting concerns in a modular fashion. However, within the realm of AOP, there are various design patterns and techniques that are commonly used to implement AOP effectively. Some of these patterns include:

1. **Proxy Pattern**: This is a foundational pattern for AOP. It involves creating a proxy object that wraps the original object and intercepts method calls. The proxy can then execute additional code (aspects) before or after the method call. This is typically how AOP frameworks like Spring AOP implement runtime weaving.

2. **Decorator Pattern**: Similar to the Proxy pattern, the Decorator pattern is used to add additional responsibilities to an object dynamically. While it's not a pure AOP implementation, it shares the concept of wrapping objects to add new behavior.

3. **Interceptor Pattern**: This pattern involves an interceptor that is configured to intercept method calls and events, allowing pre-processing and post-processing around the method invocation. This is a common pattern used in AOP to implement aspects such as logging, transaction management, and security checks.

4. **Template Method Pattern**: This pattern can be used in an AOP-like manner where a base method defines the structure of an algorithm, and certain steps of the algorithm can be deferred to subclasses. This allows varying the behavior of the algorithm by overriding certain steps, which is similar to how advices modify the behavior in AOP.

5. **Chain of Responsibility Pattern**: This pattern can be used to implement a chain of processing units (handlers). Each handler decides either to process a request and pass it to the next handler in the chain. AOP uses a similar concept where each aspect can be considered as a link in a chain around method execution.

6. **Strategy Pattern**: This pattern allows defining a family of algorithms, encapsulating each one, and making them interchangeable. Strategy lets the algorithm vary independently from clients that use it. In AOP, this can be related to how different strategies (advices) can be applied to method execution without altering the client code.

7. **Factory Pattern**: In AOP, factory patterns can be used to create proxy objects instead of direct instances of target objects. This aids in implementing AOP proxies transparently.

8. **Observer Pattern**: While not directly an AOP pattern, it shares the principle of adding additional behavior based on certain triggers or events, akin to how aspects work based on join points.

Each of these patterns can be used to implement aspects of AOP in scenarios where a full-fledged AOP framework might not be available or necessary. They help in modularizing cross-cutting concerns in a similar way that AOP frameworks do, but often with a more manual approach.