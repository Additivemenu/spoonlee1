package com.example.backend.dto;

import lombok.*;

/**
 * @author xueshuo
 * @create 2023-03-06 10:08 pm
 */
@Getter    // lombok enabled
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TutorialPostDto {
    private String name;
    private String description;
    private Boolean published;
}


