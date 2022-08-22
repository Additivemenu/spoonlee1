
public class  GraphGenerator {
    
    // 以二位数组表达图作为适配器输入为例:
    // matrix [N][3]
    // [5,0,7]  ==>  [weight, node_start, node_end]
    // [3,0,1]
    //...
    public static Graph createGraph(Integer[][] matrix)
    {
        Graph graph = new Graph(); // at this point, graph.edge & graph.node are both empty

        for(int i =0; i<matrix.length;i++){  // loop over edges, matrix[i]

            // read input 
            Integer weight = matrix[i][0];  // 也可用int型, 不用Integer
            Integer from = matrix[i][1];
            Integer to = matrix[i][2];
            
            // step1: create node if a particular node is not in the hashMap--------------------------------------------
            if(! graph.nodes.containsKey(from)){ // key in hashMap define node represents the index of a node
                graph.nodes.put(from, new Node(from)); // hashMap API: put(key, value) 
            }
    
            if(! graph.nodes.containKey(to)){
                graph.node.put(to, new Node(to));
            }
            
            // get fromNode & toNode
            Node fromNode = graph.nodes.get(from); // return value corresponding to key: here the value is actually a node object
            Node toNode = graph.nodes.get(to);

            // step2: create edge based on fromNode & toNode-------------------------------------------------------------
            Edge newEdge = new Edge(weight, fromNode, toNode);

            // step3: get other fields of node and edge------------------------------------------------------------------
            fromNode.nexts.add(toNode);
            fromNode.out++;

            toNode.in++;

            fromNode.edges.add(newEdge);
            graph.edges.add(newEdge);
        }

        return graph;
    }

}