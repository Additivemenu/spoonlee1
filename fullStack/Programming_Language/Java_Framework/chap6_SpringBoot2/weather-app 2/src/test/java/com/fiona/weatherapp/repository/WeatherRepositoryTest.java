package com.fiona.weatherapp.repository;

import com.fiona.weatherapp.entity.Weather;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.OffsetDateTime;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * @author xueshuo
 * @create 2023-02-03 10:47 am
 */
@SpringBootTest
public class WeatherRepositoryTest {

    @Autowired
    private WeatherRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testRepositoryFunctions() {
        OffsetDateTime now = OffsetDateTime.now();
        Weather mel = Weather.builder().city("Melbourne").country("AU").description("Windy").updatedTime(now).build();
        Weather syd = Weather.builder().city("Sydney").country("AU").description("Cloudy").updatedTime(now).build();
        repository.save(mel);
        repository.save(syd);

        // 比对
        assertEquals(2, repository.findAll().size());
        assertThat(repository.findByCityAndCountry("Melbourne", "AU").get())
                .usingRecursiveComparison().ignoringAllOverriddenEquals().isEqualTo(mel);   // 用assertThat()就不用重写equals()了
        repository.deleteAll();

        assertEquals(0, repository.findAll().size());
    }
}