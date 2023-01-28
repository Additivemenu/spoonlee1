package com.example.cruddemorecode.controller;

import com.example.cruddemorecode.dto.PropertyGetDto;
import com.example.cruddemorecode.dto.PropertyPostDto;
import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * @author xueshuo
 * @create 2023-01-28 10:51 am
 */
@RestController
@RequestMapping("properties")
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createProperty(@RequestBody PropertyPostDto propertyPostDto){
        propertyService.createProperty(propertyPostDto);
    }

    @GetMapping("/{propertyId}")     // 接URL中/api/v1/users
    public PropertyGetDto getProperty(@PathVariable Long propertyId){
        return propertyService.getProperty(propertyId);
    }




}
