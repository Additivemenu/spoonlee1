package com.example.cruddemo.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
//import org.springframework.data.annotation.Id;

import javax.persistence.Id;        // use this one
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.OffsetDateTime;

/**
 * @author xueshuo
 * @create 2023-01-13 9:04 pm
 */
@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String name;
    private String password;
    @CreationTimestamp
    private OffsetDateTime createdTime;
    @UpdateTimestamp
    private OffsetDateTime updatedTime;
}
