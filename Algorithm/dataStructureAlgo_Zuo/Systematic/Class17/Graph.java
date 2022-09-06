
import java.util.HashMap; // see beginner class 3 for hashMap in Java
import java.util.HashSet;

public class Graph {
	// fields---------------------------------------------------------------
    // 图由点集和边集组成
    public HashMap<Integer, Node> nodes;  // Node的集合: (Integer, Node) 表示Node Integer, Integer相当于Node的index
	// 这里key可以用Integer, 也可以用int
	// 通过查找key, 可以查找Node

	public HashSet<Edge> edges; // Edge的集合
	
	// constructors---------------------------------------------------------
	public Graph() {
		nodes = new HashMap<>();
		edges = new HashSet<>();
	}   

}
