wk8 tut

Class Descriptions
Town class
Your Town class should manage a collection of entities and will provide some simple functionality for displaying information about the town, and for interacting with the entities inside the town.

A description of the Town class is shown below.

Town

name - name of the town (string).

entities - the entities in the town (array or ArrayList).

add() - add an entity to the town.

displayDescription() - prints out the town name, the total number of entities in the town and a description of each of the entities.

"The town '[town name]' has [number of entities] entities in it."

For every entity, in the town, print: "It has... a [description of entity]"

displayInteraction() - prints out a description of the interaction with every entity in the down.

"You tried interacting with the [description of entity]... [description of interaction]"

Entity classes
Entities are the "things" inside a town. Entities have similarities, but also differences. Every entity should have functionality (ie methods) to allow the entity to describe itself, and to allow the entity to be interacted with. The behaviour of these methods are, however, different depending on the exact type of the entity, so it would make sense to implement the different entities using inheritance and then override some of the methods.

A description of the Entity class and inheriting classes (including their required instance variables and methods) are shown below.

Entity (Note: This class has been implemented for you)

describe() - returns a string describing the entity.

interact() - returns a string describing the result of interacting with the entity. By default when you interact with an entity the string "(nothing happened)" should be returned.

Building (inherits from Entity)

color - the color of the building (string).

height - the number of floors on the building (int).

describe() - should return a string describing the building in the following form: "[color] building with [height] floor(s)"

Tip! There are a lot of different classes to handle in this exercise, so it's best to implement the system part by part, rather than implementing everything in one go.

One way you could approach building this system is to first create the Town class and have the driver program print the description of the currently empty town.

Then, you can move on to implementing the Building class, so that you can add buildings to your town.

Once you see that buildings can be properly printed out, you can then start implementing the remainder of the classes.

Resident (inherits from Entity)

name - the name of the resident

Cat (inherits from Resident)

describe() -  returns a string describing the cat: "cat named [name]".

interact() - returns the string "meowwww".

Dog (inherits from Resident)

describe() -  returns a string describing the dog: "dog named [name]".

interact() - returns the string "woof woof".

Person (inherits from Resident)

describe() -  returns a string describing the person: "person named [name]".

interact() - returns the string "Hi, my name is [name], it's nice to meet you!".