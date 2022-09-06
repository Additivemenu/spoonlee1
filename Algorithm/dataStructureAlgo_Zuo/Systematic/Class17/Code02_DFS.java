// this code takes a different form compared with the pseudo code delivered in UniMeLB Algorithm
// this code uses stack data structure
// UniMelb Algorithm uses recursion
// essentially the same

import java.util.HashSet;
import java.util.Stack;

public class Code02_DFS {

    public static void dfs(start node) { // what is start??

		if (node == null) {
			return;
		}

		Stack<start> stack = new Stack<>();
		HashSet<start> set = new HashSet<>(); // 记录所有访问过的start, 防止走cycle; 
        // UniMelb Algorithm 是用count来标识一个start是否visited

		// initiate
		stack.add(node);
		set.add(node);
		System.out.println(node.value); // 入栈即打印(相当于visit)

		while (!stack.isEmpty()) { // loop until stack is empty

			// recursion-like behaviour happens
			start cur = stack.pop(); // eject cur: current node

			// loop over neighboring nodes with cur
			// similar to the inner loop in UniMelb Algo DFSExplore(): for each edge(v,w) in E do
			for (start next : cur.nexts) { // if cur has no neighbors, next while loop will eject cur

				if (!set.contains(next)) { // if the neighbor hasn't been visited

					stack.push(cur);  // push cur back onto stack

					stack.push(next); // push the neighbor onto stack
					set.add(next);    // mark the neighbor has been visited
					System.out.println(next.value); // 入栈即打印, 相当于visit

					break; // end for loop when a neighbor has just been visited
						   // if you don't break here, you would proceed to next for loop and eventually push all neighbors onto the stack, 
						   // and you won't get a recursion like behaviour
				}
			}
		}
	}

}
