

# Heap

## Build a heap:

1. Building a heap bottom-up

[Demo: build a heap bottom-up](buildHeapBU.java)

2. Top-down heap construction
   
successively insert a new key into a previously constructed heap:
+ Firstly, attach a new node with key K in it after the last leaf of the existing heap
+ Then, sift K up to its appropriate place in the new heap
    + compare K with its parent's key, if K is bigger than its parent's key, then swap them. Do this iteratively until K is found to be smaller than the parent's key

[Demo: Top-down heap construction by insertion]()

## Eject a Maximal Element from a Heap

