# List ------------------------------------------------------------------
fruits = ["apple", "orange", "banana", "grapes", "strawberry"]
empty_list = []
empty_list = list()

# access elements
print(fruits[0])
print(fruits[1])
print(fruits[2])
print(fruits[-1])
print(fruits[-2])

# add elements
print(fruits)
fruits.append("cherry")
print(fruits)

# delete elements
print(fruits)
fruits.remove("banana")
print(fruits)
fruits.pop()
fruits.pop(0)
print(fruits)
del fruits[-1]
print(fruits)