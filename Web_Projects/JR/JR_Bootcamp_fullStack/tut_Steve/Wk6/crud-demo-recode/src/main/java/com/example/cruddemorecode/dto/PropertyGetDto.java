package com.example.cruddemorecode.dto;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

/**
 * @author xueshuo
 * @create 2023-01-28 11:11 am
 */
@Getter
@Setter
public class PropertyGetDto {
    private Long id;

    private String type;
    private Integer landSize;

    // don't get User, not safe! (User has password)
    private UserGetDto userGetDto;
    @CreationTimestamp
    private OffsetDateTime createdTime;
    @UpdateTimestamp
    private OffsetDateTime updatedTime;
}
