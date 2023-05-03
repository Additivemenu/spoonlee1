package hybrid_pattern.composite_strategy.container;

/**
 * @author xueshuo
 * @create 2023-05-03 10:35 am
 */
import hybrid_pattern.composite_strategy.strategies.ArithmeticOperation;

import java.util.ArrayList;
import java.util.List;

public class CompositeOperation implements ArithmeticOperation {
    private List<ArithmeticOperation> operations = new ArrayList<>();

    public void addOperation(ArithmeticOperation operation) {
        operations.add(operation);
    }

    @Override
    public int execute(int a, int b) {
        int result = 0;
        for (ArithmeticOperation operation : operations) {
            result += operation.execute(a, b);
        }
        return result;
    }
}

