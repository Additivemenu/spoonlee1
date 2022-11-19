list1=[1,2,3,4,5,6]
print(list1)

list1.append(7)
print(list1)

list1.pop(6) # delete element whose index =6
print(list1)

list2=[7,8,9,10]
list1.extend(list2) # merge list2 into list1
print(list1)

list1.insert(0,11) # insert 11 at index=0
print(list1)

print(list1.index(11)) # get the index of the element specified

