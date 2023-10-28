package com.fiona.weatherapp.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;     // Spring data jpa enabled
import java.time.OffsetDateTime;

/**
 * @author xueshuo
 * @create 2023-01-30 9:36 pm
 */
@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "weather")        // refer to database table: "weather"
public class Weather {
    @Id         // PK
    @GeneratedValue( strategy = GenerationType.IDENTITY)        // auto-generation strategy
    @Column(name = "id", updatable = false, nullable = false)       // constraint
    private Long id;

    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String country;
    @Column
    private String description;
    @Column
    private OffsetDateTime updatedTime;
}
