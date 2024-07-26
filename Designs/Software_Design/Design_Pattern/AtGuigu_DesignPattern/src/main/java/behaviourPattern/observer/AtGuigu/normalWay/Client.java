package behaviourPattern.observer.AtGuigu.normalWay;

/**
 * @author xueshuo
 * @create 2023-05-01 8:37 pm
 */
public class Client {
    public static void main(String[] args) {
        // 创建接入方
        CurrentConditions currentConditions = new CurrentConditions();

        // 创建WeatherData, 并将接入方currentCondtions传递到WeatherData中
        WeatherData weatherData = new WeatherData(currentConditions);

        // 更新天气信息
        weatherData.setData(30,150,40);

        // 天气情况变了
        System.out.println("weather changed: ");
        weatherData.setData(40,160,20);
    }
}
