//------------------------------------------
//this c file aims to loop over elements in an array using function and pointer 
//int sump (int*array_start, int*array_end); 
//------------------------------------------
#include <stdio.h>
#define SIZE 10 // use symbolic constant for array length
int sump (int*start, int*end); //announcing funnction

int main(void)
{
    
    int ar[SIZE]={1,2,3,4,5,6,7,8,9,10};
    long answer;

    answer = sump(ar, ar+SIZE); 
    // ar is array name, but also the address of its first element
    // ar + SIZE is the address of the element next to the last element of the array

    printf("the total sum of ar is %ld.\n", answer);
    
    return 0;
}


//------------------sub fucntion---------------------------------------
int sump(int*start, int*end)
{
    int total = 0;
    
    while(start<end)
    {
        total = total + *start;
        start++;      
        
    }
    return total;
}
