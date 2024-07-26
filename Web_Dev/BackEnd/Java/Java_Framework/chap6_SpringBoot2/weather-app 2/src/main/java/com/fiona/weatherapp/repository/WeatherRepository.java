package com.fiona.weatherapp.repository;

/**
 * @author xueshuo
 * @create 2023-02-03 10:29 am
 */

import com.fiona.weatherapp.entity.Weather;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository                                           // <entity, pk data type>
public interface WeatherRepository extends JpaRepository<Weather, Long> {
    Optional<Weather> findByCityAndCountry(String city, String country); // Optional class避免nullPointer

    // Optional<Weather> findByCityLike(String city);

    Page<Weather> findByCountry(String country, Pageable pageable);
    List<Weather> findAllByCountry(String country, Pageable pageable);
}
