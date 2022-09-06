// 这个code就和UniMelb讲的很类似了

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;

public class Code01_BFS {

    // 从node出发，进行宽度优先遍历
	public static void bfs(Node start) {
		if (start == null) {
			return;
		}

		Queue<Node> queue = new LinkedList<>();
		HashSet<Node> set = new HashSet<>();

		queue.add(start);
		set.add(start); // 防止某个node反复进入queue, 比如graph有cycle时
		// UniMelb这里是用count计数来检查一个Node是否已被访问过
		
		while (!queue.isEmpty()) {

			Node cur = queue.poll(); // eject a node
			System.out.println(cur.value); // 弹出即打印(相当于visit)

			for (Node next : cur.nexts) { // loop over every node that is directly connected with cur
				if (!set.contains(next)) {  // if next isn't been visited before
					set.add(next);
					queue.add(next);
				}
			}
		}
	}
}
