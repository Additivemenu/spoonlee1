package hybrid_pattern.composite_strategy.strategies;

/**
 * @author xueshuo
 * @create 2023-05-03 10:34 am
 */
public class Subtraction implements ArithmeticOperation {
    @Override
    public int execute(int a, int b) {
        return a - b;
    }
}
