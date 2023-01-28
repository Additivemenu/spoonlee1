package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.PropertyGetDto;
import com.example.cruddemorecode.dto.PropertyPostDto;
import com.example.cruddemorecode.entity.Property;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.exception.ResourceNotFoundException;
import com.example.cruddemorecode.mapper.UserMapper;
import com.example.cruddemorecode.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author xueshuo
 * @create 2023-01-28 10:56 am
 */
@Service
@RequiredArgsConstructor
public class PropertyService {
    private final UserService userService;
    private final PropertyRepository propertyRepository;

    private final UserMapper userMapper;

    public void createProperty(PropertyPostDto propertyPostDto) {
        Property property = new Property();

        // PostDto ---> entity
        property.setType(propertyPostDto.getType());
        property.setLandSize(propertyPostDto.getLandSize());
        // FK
        User user = userService.findUser(propertyPostDto.getUserId());
        property.setUser(user);

        // step: save property entity into database
        propertyRepository.save(property);
    }

    public PropertyGetDto getProperty(Long propertyId){

        Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property " + propertyId));

        PropertyGetDto propertyGetDto = new PropertyGetDto();
        propertyGetDto.setId(property.getId());
        propertyGetDto.setType(property.getType());
        propertyGetDto.setLandSize(property.getLandSize());
        propertyGetDto.setCreateTime(property.getCreatedTime());
        propertyGetDto.setUpdateTime(property.getUpdatedTime());

        propertyGetDto.setUserGetDto(userMapper.mapUserToUserGetDto(property.getUser()));

        return propertyGetDto;
    }

}
