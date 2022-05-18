//------------------------------------------
//this c file aims to loop over elements in an array using function and pointer 
// int sump(int*array_start, int array_length); 
//------------------------------------------
#include <stdio.h>
//#define SIZE 10 // use symbolic constant for array length
int sump(int*, int); //announcing funnction

int main(void)
{
    
    int ar[]={1,2,3,4,5,6,7,8,9,10};
    long answer;

    int ar_length = sizeof(ar)/sizeof(int);
    printf("the length of ar is %d\n", ar_length);
    answer = sump(ar, ar_length); 
    // ar is array name, but also the address of its first element
    // ar + SIZE is the address of the element next to the last element of the array

    printf("the total sum of ar is %ld.\n", answer);
    
    return 0;
}

//-------------------------------------------
int sump(int*start, int length)
{
    int total =0;
    for (int i=0;i<length;i++){
        total = total + *(start+i);
    }


    return total;
}