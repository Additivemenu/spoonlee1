# 1. DFS

## 2.1 Pseudo code of basic DFS
```java
function DFS(<V,E>)
    mark each v in V with 0;
    count <-- 0
    for each v in V do                          // loop over components
        if v is marked with 0 then
            DFSExplore(v)

function DFSExplore(v)
    count <-- count + 1
    mark v with count
    for each edge (v,w) connecting with v do    // loop neighbours with v
        if w is marked with 0 then
            DFSExplore(w)
```

## 2.2 Application of DFS
1. Mark each edge with "tree edge" or "back edge"


2. determine if a graph is cyclic


# 2. BFS

```C
function BFS(<V,E>)

    mark each v in V with 0
    count <-- 0, init(queue)

    for each v in V do                          // still loop over all nodes
        if v is marked with 0 then
            count <-- count + 1
            mark v with count

            inject(queue, v)                   // queue containing just v
                        
            while queue is non-empty do        // make sure all direct neighbouring nodes of v is looped over

                u <-- eject(queue)             // dequeues u
                for each edge (u,w) do         // loop over neighbouring node with u
                    if w is marked with 0 then
                        count <-- count + 1
                        mark w with count
                        inject(queue, w)       // enqueues w
```