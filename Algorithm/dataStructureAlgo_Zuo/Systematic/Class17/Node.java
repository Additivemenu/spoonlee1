import java.util.ArrayList;


// 点结构的描述
public class Node {
    public int value;
	public int in; // 有多少别的Node是直接指向this Node的
	public int out; // this Node直接指向多少别的Node
	public ArrayList<Node> nexts; // 从this Node出发, 能直接reference哪些相邻Node(reference不到的不算)
	public ArrayList<Edge> edges; // 从this Node出发, 能直接reference到哪些edge(reference不到的不算)

	public Node(int value) {
		this.value = value;
		in = 0;
		out = 0;
		nexts = new ArrayList<>();
		edges = new ArrayList<>();
	}
}
