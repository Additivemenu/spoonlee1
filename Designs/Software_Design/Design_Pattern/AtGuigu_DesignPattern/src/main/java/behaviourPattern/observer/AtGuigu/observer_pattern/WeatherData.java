package behaviourPattern.observer.AtGuigu.observer_pattern;

import behaviourPattern.observer.AtGuigu.normalWay.CurrentConditions;

import java.util.ArrayList;

/**
 *  核心类,
 *  1. 包含最新的天气信息
 *  2. 含有Observer的集合, 使用ArrayList来管理
 *  3. 当数据有更新时, 就会遍历Observer list, 主动调用Observer的update方法 (含display) 相当于向所有的Observer对象推送更新的天气信息
 *  *
 * @author xueshuo
 * @create 2023-05-01 9:09 pm
 */
public class WeatherData implements Subject{
    private float temperature;
    private float pressure;
    private float humidity;
    private ArrayList<Observer> observerList;

    public WeatherData() {
        observerList = new ArrayList<Observer>();
    }
    public float getTemperature() { return temperature; }
    public float getPressure() { return pressure; }
    public float getHumidity() {
        return humidity;
    }

    public void dataChange() {
        notifyAllObserver();
    }

    //当数据有更新的时候, 就调用setData
    public void setData(float temperature, float pressure, float humidity) {
        this.temperature = temperature;
        this.pressure = pressure;
        this.humidity = humidity;

        // 将刚刚更新好的天气信息推送给接入方
        dataChange();
    }

    @Override
    public void registerObserver(Observer o) {
        observerList.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        if(observerList.contains(o)){
            observerList.remove(o);
        }
    }

    // 遍历所有的观察者, 并通知
    @Override
    public void notifyAllObserver() {
        for(int i = 0; i < observerList.size(); i++){
            observerList.get(i).update(temperature, pressure, humidity );       // 包含observer的display()
        }
    }
}