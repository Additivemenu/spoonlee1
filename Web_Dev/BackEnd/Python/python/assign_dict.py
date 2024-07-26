dict1 = {'name':'shawn', 'age':24, 'height':176 }
print(dict1)

dict1.update({'hobby':'coding', 'major':'IT'}) # add  elements
print(dict1)

dict1.pop('age') # remove element as per key
print(dict1)

print(dict1.get('hobby')) # get value of specified key

print(dict1.keys()) # get the key of dictionary

dict1.clear() # remove all items 
print(dict1)
