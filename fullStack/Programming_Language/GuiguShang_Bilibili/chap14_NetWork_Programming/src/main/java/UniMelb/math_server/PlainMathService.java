package UniMelb.math_server;

/**
 * @author xueshuo
 * @create 2023-03-22 3:48 pm
 */
// PlainMathService.java: An implementation of the MathService interface.
public class PlainMathService implements MathService {
    public double add(double firstValue, double secondValue) {
        return firstValue+secondValue;
    }
    public double sub(double firstValue, double secondValue) {
        return firstValue-secondValue;
    }
    public double mul(double firstValue, double secondValue) {
        return firstValue * secondValue;
    }
    public double div(double firstValue, double secondValue) {
        if (secondValue != 0)
            return firstValue / secondValue;
        return Double.MAX_VALUE;
    }
}
