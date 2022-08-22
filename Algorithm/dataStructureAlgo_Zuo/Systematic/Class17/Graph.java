
import java.util.HashMap;
import java.util.HashSet;

public class Graph {

    // 图由点集和边集组成
    public HashMap<Integer, Node> nodes;  // Node的集合: (Integer, Node) 表示Node Integer, Integer相当于Node的index
	public HashSet<Edge> edges; // Edge的集合
	
	public Graph() {
		nodes = new HashMap<>();
		edges = new HashSet<>();
	}   

}
