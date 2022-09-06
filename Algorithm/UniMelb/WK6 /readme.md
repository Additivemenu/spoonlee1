Divide-and-conquer
# 1. Master theorem

# 2. Merge sort
To sort and array (or a list), cut it into two halves, sort each half, and merge the two results.

```java
procedure MERGESORT(A[], n)
    if n > 1 then
        for i<--0 to [n/2]-1 do     // copy left half of A to B
            B[i] <-- A[i]
        for i<--0 to [n/2]-1 do     // copy right half of A to C
            C[i] <-- A[(n/2)+i]
        
        MERGESORT(B, n/2)           // sort B
        MERGESORT(C, n/2)           // sort C
        MERGE(B, n/2, C, n/2, A)    // merge B and C into A


procedure MERGE(B[], p, C[], q, A[])
    i<--0
    j<--0
    k<--0
    // fill A using B or C elements
    while i < p and j < q do            // loop over A's slot
        if B[i] <= C[j] then            // this guarantees stability of mergesort 
            A[k] <-- B[i]
            i <-- i+1
        else
            A[k] < C[j]
            j <-- j+1
        k <-- k+1
    //if either of B or C is exhausted first, copy what left in the other into A
    if i=p then
        copy C[j]...C[q-1] to A[k]...A[p+q-1]
    else
        copy B[i]...B[p-1] to A[k]...A[p+q-1]
    
```




# 3. Quick sort

# 4. Binary Tree Traversal
## 4.1 Pre-order

Use recursion

Use stack

## 4.2 In-order

## 4.3 Post-order

## 4.4 Level order

Use queue

similar to BFS

# 5. Closest pair 