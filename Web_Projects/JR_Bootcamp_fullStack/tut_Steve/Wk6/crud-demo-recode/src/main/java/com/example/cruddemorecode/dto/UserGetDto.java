package com.example.cruddemorecode.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

/**
 * @author xueshuo
 * @create 2023-01-25 2:17 pm
 */

@Getter
@Setter
@Builder
public class UserGetDto {
    private Long id;
    private String name;
    private String email;
    private OffsetDateTime createdTime;
    private OffsetDateTime updatedTime;

}
