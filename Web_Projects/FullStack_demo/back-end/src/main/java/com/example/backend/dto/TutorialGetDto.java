package com.example.backend.dto;

import lombok.*;

/**
 * @author xueshuo
 * @create 2023-03-07 6:25 am
 */
@Getter    // lombok enabled
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TutorialGetDto {
    // private Long id;
    private String name;
    private String description;
    private Boolean published;

}
