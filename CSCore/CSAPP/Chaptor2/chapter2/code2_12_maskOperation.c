#include <stdio.h>

int main(){

    int x =0x87654321;

    printf("mask test 1: %.8x\n", x & 0xFF);
    printf("mask test: %.8x\n", x & 0xFFF);

    printf("mask test 2: %.8x\n", x ^ ~0xFF);
    printf("~x is: %.8x\n", ~x);

    printf("mask test 3: %.8x\n", x | 0xFF);

    printf("\n----------------");
}