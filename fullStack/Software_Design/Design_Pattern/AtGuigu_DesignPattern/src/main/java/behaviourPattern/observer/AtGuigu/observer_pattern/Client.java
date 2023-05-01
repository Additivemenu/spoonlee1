package behaviourPattern.observer.AtGuigu.observer_pattern;


/**
 * @author xueshuo
 * @create 2023-05-01 9:17 pm
 */
public class Client {
    public static void main(String[] args) {
        // 创建一个WeatherData
        WeatherData weatherData = new WeatherData();

        // 观察者
        CurrentCondition currentCondition = new CurrentCondition();

        // 注册观察者到weatherData
        weatherData.registerObserver(currentCondition);
        weatherData.registerObserver(new Baidu());

        // test1
        System.out.println("notify all observes: ");
        weatherData.setData(10, 100, 30.3f);

        // test2
        System.out.println("notify all observes: ");
        weatherData.removeObserver(currentCondition);
        weatherData.setData(20,150, 33.3f);

    }

}
