
def add_lists(list1, list2):
    """_summary_

    Args:
        list1 (_type_): the first input list
        list2 (_type_): the second input list

    Returns:
        _type_: element-wise sum  of list1 & list2 
    """    
    len_list1 = len(list1)
    len_list2 = len(list2)

    if len_list1 != len_list2:
        print('Error: length of two lists must be the same!')
    
    list3=[0]*len_list1 # initialize list3, it has to be done otherwise error 
    for i in range(0, len_list1):
        list3[i] = list1[i] + list2[i]
        print(i)

    return list3


a=[3,6,9,12,15]
b=[2,4,6,8,10]
c = add_lists(a,b)
print(c)