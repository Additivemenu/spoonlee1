package hybrid_pattern.composite_strategy.strategies;

/**
 * @author xueshuo
 * @create 2023-05-03 10:35 am
 */
public class Multiplication implements ArithmeticOperation {
    @Override
    public int execute(int a, int b) {
        return a * b;
    }
}
