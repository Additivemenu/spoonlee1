package hybrid_pattern.composite_strategy;

import hybrid_pattern.composite_strategy.container.CompositeOperation;
import hybrid_pattern.composite_strategy.strategies.Addition;
import hybrid_pattern.composite_strategy.strategies.ArithmeticOperation;
import hybrid_pattern.composite_strategy.strategies.Multiplication;
import hybrid_pattern.composite_strategy.strategies.Subtraction;

/**
 * composite strategy:
 * This example demonstrates the use of the composite strategy pattern in Java.
 * The Calculator class can work with both individual strategies (like Addition,
 * Subtraction, or Multiplication) and composite strategies (like CompositeOperation).
 *
 * 核心思想是composite pattern的leaf定义为各种strategy, 
 *
 * 感觉有点像wow的宏, 或者是网页游戏里配置自动战斗时的技能释放序列
 *
 * @author xueshuo
 * @create 2023-05-03 10:35 am
 */
public class Calculator {
    private ArithmeticOperation operation;      // container

    public Calculator(ArithmeticOperation operation) {
        this.operation = operation;
    }

    public int compute(int a, int b) {
        return operation.execute(a, b);
    }

    public static void main(String[] args) {
        // Creating composite operation
        CompositeOperation compositeOperation = new CompositeOperation();
        compositeOperation.addOperation(new Addition());
        compositeOperation.addOperation(new Subtraction());

        // Using composite strategy
        Calculator calculator = new Calculator(compositeOperation);
        int result = calculator.compute(10, 5);
        System.out.println("Result of composite operation (Addition + Subtraction): " + result);

        // Using single strategy
        calculator = new Calculator(new Multiplication());
        result = calculator.compute(10, 5);
        System.out.println("Result of single operation (Multiplication): " + result);
    }
}

