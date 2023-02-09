package com.fiona.weatherapp.repository;

import com.fiona.weatherapp.entity.Weather;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.OffsetDateTime;
import java.util.List;

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

        // save mock data into database
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

    @Test
    public void testPageQuery() {

        // save mock data into database
        OffsetDateTime now = OffsetDateTime.now();
        Weather syd = Weather.builder().city("Sydney").country("AU").description("Cloudy").updatedTime(now).build();
        Weather mel = Weather.builder().city("Melbourne").country("AU").description("Windy").updatedTime(now).build();
        repository.save(mel);
        repository.save(syd);

        // page index, items per page
        int page = 0, size = 10;
        Sort sort = Sort.by(Sort.Direction.DESC, "id"); // 指定由id降序sort
        Pageable pageable = PageRequest.of(page, size, sort);

        // 分别测试WeatherRepository中的3个方法
        Page<Weather> all = repository.findAll(pageable);       // JPA 自带的findAll()方法
        Page<Weather> countryPage = repository.findByCountry("AU", pageable);
        List<Weather> allCities = repository.findAllByCountry("AU", pageable);

        System.out.println("test");
    }


}