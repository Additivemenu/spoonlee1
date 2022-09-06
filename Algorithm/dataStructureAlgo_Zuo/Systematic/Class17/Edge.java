public class Edge {
    
    // field-------------------------------------------
    public int weight;
    public Node from; 
    public Node to;

    // constructor-------------------------------------
    public Edge(int weight, Node from, Node to) {
        this.weight = weight;
        this.from = from;
        this.to = to;
    }
}
