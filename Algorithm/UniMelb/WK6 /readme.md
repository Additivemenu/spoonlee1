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



# 3.5 Comparison of sorting algorithms
Algorithm | idea | Best case | worst case | applicability |stable | in-place
------ | ------ | ----- | -----| ----- |-----|-----
Selection sort   | brute force   | independent of array condition $$\theta(n^2)$$ | independent of array condition $$\theta(n^2)$$ | for small array testing | no | yes
Insertion sort   | decrease-and-conquer   |  array is almost sorted $$\theta(n)$$  | an array in descending order:  new element to be inserted always go to the left most $$\theta(n^2)$$ | when array is almost sorted |yes|yes
shell sort | make array almost sorted | ss| ss | very good on medium-sized array(up to size 10000 or so)| no | yes
Merge sort   | divide-and-conquer   | a   | when the largest and second-largest elements are in different sub-arrays $$\theta(nlogn)$$ | for linked list and for very large collections of data | yes | no
Quick sort   | divide-and-conquer   | when pivot is the median $$\theta(nlogn)$$   | when array is already sorted $$\theta(n^2)$$|  average-performance is close to the best-case performance | no | yes

Although merge sort has a better performance guarantee, quick sort is faster on average


### Recurrence relations:

C<sub>b</sub> stands for C<sub>best</sub>
C<sub>w</sub> stands for C<sub>worst</sub>


#### 1. Merge sort:

Worst-case: 

if the largest and second-largest elements are in different arrays, then n-1 comparisons need to be made in MERGE

$$ C_w(n)=\begin{cases}
0 & if n<2 \\
2C_w(n/2)+n-1 & otherwise   
\end{cases}$$

#### 2. Quick sort:

Best-case: 

when pivot is the median, that results in two sub-tasks of equal size

$$ C_b=\begin{cases}
0 & if n<2 \\
2C_b(n/2)+n & otherwise   
\end{cases}$$

Worst-case: 

Array is already sorted. In this case, we don't really have divide-and-conquer, because each recursive call deals with a problem size that has only been decremented by 1

$$ C_w(n)=\begin{cases}
0 & if n<2 \\
2C_w(n-1)+n & otherwise   
\end{cases}$$



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