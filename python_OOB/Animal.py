class Animal:

    def __init__(self, age, gender, name):
        self.age = age
        self.gender = gender
        self.name = name

    def greeting(self):
        print("hello, I am", self.name)

    def eat(self, food):
        print("I want to eat", food)

horry = Animal(5,"male","horry")
horry.greeting()
horry.eat("apple")


class Dog(Animal):

    def __init__(self, age, gender, name, price):
        super().__init__(age, gender, name) # inherent from parent
        self.price = price
    
    def bark(self):
        print("My price is", self.price)

larry=Dog(3,'female','larry', 50)
larry.bark()