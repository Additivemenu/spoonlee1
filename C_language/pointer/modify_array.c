//------------------------------------------
// This C file aims to add 1 to each element of an array using fucntion
// as we function is creating a copy of the variables in the main function, and such copy cannot be return to the main function 
// we can only use pointer to do manipulation on orginal variables in the main function 
//------------------------------------------
#include <stdio.h>
#define SIZE 11 // use symbolic constant for array length
int add1_each(int*, int); //announcing funnction

int main(void)
{
    
    int ar[]={1,2,3,4,5,6,7,8,9,10,11,12};
    long answer;

    int ar_length = sizeof(ar)/sizeof(int);
    printf("the length of ar is %d\n", ar_length);
    printf("the size of ar is %d Byte\n", sizeof(ar));

    add1_each(ar, ar_length); 
    // ar is array name, but also the address of its first element
    // ar + SIZE is the address of the element next to the last element of the array

    for(int i =0; i<ar_length;i++){
        printf("ar%d is %d\n", i, *(ar+i));
               
    }
    
    return 0;
}

//-------------------------------------------
int add1_each(int*start, int length)
{
    for(int i=0; i<length; i++){
        *(start+i)= *(start+i)+1; 
        
    }


    return 0;
}