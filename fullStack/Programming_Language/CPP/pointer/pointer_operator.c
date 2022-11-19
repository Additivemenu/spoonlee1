//------------------------------------------
// this file extracts from "C Prime Plus" 10.5 Pointer Operator Page 295 to deomstrate pointer operators 
//------------------------------------------
#include<stdio.h>
int main(void)
{
    int urn[5] = {100, 200, 300, 400, 500};
    int *ptr1, *ptr2, *ptr3;

    ptr1 = urn;
    ptr2 = &urn[2]; // pointer to the thrid element of urn

    printf("pointer value, dereferenced pointer, pointer address: \n");
    printf("ptr1=%p, *ptr1=%d, &ptr1=%p\n", ptr1, *ptr1, &ptr1); 
    // print value of pointer1 (an address), value of pointer1 pointing to, address of pointer1(also an address)

    // add an int to a pointer---------------------------------------------
    ptr3 = ptr1 +4;
    printf("\nadding an int to a pointer: \n");
    printf("ptr1 + 4 = %p, *(ptr1+4)=%d\n", ptr1 +4, *(ptr1+4));
    // print value of (ptr1+4), value of (ptr1 +4) pointing to

    // increamenting a pointer---------------------------------------------
    ptr1++;
    printf("\nvalues after ptr1++:\n");
    printf("ptr1 = %p, *ptr1 = %d, &ptr1 = %p\n", ptr1, *ptr1, &ptr1);
    // 

    // decrementing a pointer-----------------------------------------------
    ptr2--;
    printf("\nvalues after --ptr2:\n");
    printf("ptr2 = %p, *ptr2 = %d, &ptr2 = %p\n", ptr2, *ptr2, &ptr2);
    //

    // reset ---------------------------------------------------------------
    --ptr1; // reset ptr1 pointing to element 1
    ++ptr2; // reset ptr2 pointing to element 3
    printf("\n Pointers reset to original values: \n");
    printf("ptr1 = %p, ptr2 =%p\n", ptr1, ptr2);

    // substracting one pointer from another--------------------------------
    printf("\nsubtracting one pointer from another: \n");
    printf("ptr2 = %p, ptr1 = %p, ptr2 - ptr1 = %td\n", ptr2, ptr1, ptr2-ptr1);
    // ptr2-ptr1 = 2, indicating the distance of the elements these two pointers pointing to 
    // as address is expressed in hexadecimal in Byte, note difference bewteen ptr2 and ptr1 is actually 8 (Bytes),
    // as we are using int, so ptr2 - ptr1 = 8/4 = 2

    // subtracting an int from a pointer-------------------------------------
    printf("\nsubtracting an int from a pointer:\n");
    printf("ptr3 = %p, ptr3-2 = %p\n", ptr3, ptr3 -2);
    // the same as the above, as address is expressed in hexadecimal in Byte, 
    //as we are using int (SIZEOF(int)=4),  ptr3 - 2 = (ptr3-2*4)hex, so that you see an 8 reduction from ptr3 orignal value  


    printf("\n---------------------------------------------------------------------\n");
    return 0;
}