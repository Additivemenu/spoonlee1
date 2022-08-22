
public class  GraphGenerator {

    public static Graph createGraph(Integer[][] matrix)
    {
        Graph graph = new Graph();

        for(int i =0; i<matrix.length;i++){  // loop over edges, matrix[i]

            Integer weight = matrix[i][0];  // 也可用int型, 不用Integer
            Integer from = matrix[i][1];
            Integer to = matrix[i][2];
            
            if(! graph.nodes.containsKey(from)){
                graph.nodes.put(from, new Node(from));
            }
    
            if(! graph.nodes.containKey(to)){
                graph.node.put(to, new Node(to));
            }
    
            Node fromNode = graph.nodes.get(from);
            Node toNode = graph.nodes.get(to);

            // construct node
            Edge newEdge = new Edge(weight, fromNode, toNode);

            fromNode.nexts.add(toNode);
            fromNode.out++;
            toNode.in++;

            fromNode.edges.add(newEdge);
            graph.edges.add(newEdge);
        }

        return graph;
    }

}