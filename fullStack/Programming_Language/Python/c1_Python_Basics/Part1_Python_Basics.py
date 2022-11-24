age = 23
message = "happy "+ str(age) + "rd birthday!"
print(message)

print(message[1])

for num in range(2, 10):  
    if num % 2 == 0:
        print("Found an even number", num)
        pass
    print("Found a number", num)
