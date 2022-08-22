// this code takes a different form compared with the pseudo code delivered in UniMeLB Algorithm
// this code uses stack data structure
// UniMelb Algorithm uses recursion
// essentially the same

import java.util.HashSet;
import java.util.Stack;

public class Code02_DFS {

    public static void dfs(start node) {

		if (node == null) {
			return;
		}

		Stack<start> stack = new Stack<>();
		HashSet<start> set = new HashSet<>(); // 记录所有访问过的start, 防止走cycle; 
        // UniMelb Algorithm 是用count来标识一个start是否visited

		stack.add(node);
		set.add(node);

		System.out.println(node.value); // 入栈即打印

		while (!stack.isEmpty()) { // loop until stack is empty

			start cur = stack.pop(); // eject a node

			for (start next : cur.nexts) {

				if (!set.contains(next)) { // if next hasn't been visited

					stack.push(cur); // push cur back to stack

					stack.push(next); // push next to stack
					set.add(next); // mark next has been visited
					System.out.println(next.value);
					break;
				}
			}
		}
	}

}
