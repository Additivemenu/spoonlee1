package behaviourPattern.observer.AtGuigu.normalWay;

/**
 * 核心类,
 * 1. 包含最新的天气信息
 * 2. 含有CurrentConditions对象作为成员变量
 * 3. 当数据有更新时, 就主动调用currentConditions对象的update方法 (含display) 相当于向currentConditions对象推送更新的天气信息
 *
 * @author xueshuo
 * @create 2023-05-01 8:30 pm
 */
public class WeatherData {
    private float temperatrue;
    private float pressure;
    private float humidity;
    private CurrentConditions currentConditions;        //

    public WeatherData(CurrentConditions currentConditions) { this.currentConditions = currentConditions; }
    public float getTemperature() { return temperatrue; }
    public float getPressure() { return pressure; }
    public float getHumidity() {
        return humidity;
    }
    public void dataChange() {
        currentConditions.update(getTemperature(), getPressure(), getHumidity());
    }

    //当数据有更新的时候, 就调用setData
    public void setData(float temperature, float pressure, float humidity) {
        this.temperatrue = temperature;
        this.pressure = pressure;
        this.humidity = humidity;

        // 将刚刚更新好的天气信息推送给接入方
        dataChange();
    }
}
