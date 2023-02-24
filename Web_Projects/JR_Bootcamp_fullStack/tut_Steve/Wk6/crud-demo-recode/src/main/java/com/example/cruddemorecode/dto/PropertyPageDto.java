package com.example.cruddemorecode.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * @author xueshuo
 * @create 2023-02-23 3:54 pm
 */
@Builder
@Getter
public class PropertyPageDto {

    private List<PropertyGetDto> propertyGetDtoList;
    private int totalNumber;
    private int totalPage;

}
