package com.example.backend.entity;

import lombok.*;

import javax.persistence.*;

/**
 * @author xueshuo
 * @create 2023-03-06 10:15 pm
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tutorial")
public class Tutorial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private Boolean published;

}