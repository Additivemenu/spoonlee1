class Student:
    name = 'tom'
    
    def __init__(self,age):
        self.age = age # assign input to self.age

tom = Student(18) # this is not calling function, this is to build instance using built-in python instance funtion __init__ (instance variable)
ollie = Student(20)

print(tom.age)
print(ollie.age)

