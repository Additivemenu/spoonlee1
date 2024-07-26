package com.fiona.weatherapp.service;

import com.fiona.weatherapp.repository.WeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author xueshuo
 * @create 2023-02-09 8:32 pm
 */

@Service
@RequiredArgsConstructor
public class WeatherService {
    private final WeatherRepository weatherRepository;

    @Transactional
    public void updateWeather(){
        // weatherRepository的操作
    }

}
