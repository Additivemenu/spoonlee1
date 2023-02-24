package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.PropertyGetDto;
import com.example.cruddemorecode.dto.PropertyPageDto;
import com.example.cruddemorecode.dto.PropertyPostDto;
import com.example.cruddemorecode.entity.Property;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.exception.ResourceNotFoundException;
import com.example.cruddemorecode.mapper.PropertyMapper;
import com.example.cruddemorecode.mapper.UserMapper;
import com.example.cruddemorecode.repository.PropertyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * service这块是业务逻辑最多的地方
 *
 * @author xueshuo
 * @create 2023-01-28 10:56 am
 */
@Service
@RequiredArgsConstructor
public class PropertyService {
    private final UserService userService;
    private final PropertyRepository propertyRepository;

    private final UserMapper userMapper;
    private final PropertyMapper propertyMapper;

    /**
     *
     * @param propertyPostDto
     */
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

    /**
     *
     * @param propertyId:
     * @return PropertyGetDto
     */
    public PropertyGetDto getProperty(Long propertyId){

        // step1:  look up database to find property entity given propertyId
        Property property = propertyRepository.findById(propertyId).orElseThrow(() -> new ResourceNotFoundException("Property " + propertyId));

//        // step2: property entity ----> propertyGetDto for safety
//        PropertyGetDto propertyGetDto = new PropertyGetDto();
//        propertyGetDto.setId(property.getId());
//        propertyGetDto.setType(property.getType());
//        propertyGetDto.setLandSize(property.getLandSize());
//        propertyGetDto.setCreateTime(property.getCreatedTime());
//        propertyGetDto.setUpdateTime(property.getUpdatedTime());
//        // ! 注意我们如何处理和FK相关的成员变量 !
//        propertyGetDto.setUserGetDto(userMapper.mapUserToUserGetDto(property.getUser()));
//
//        // step3: return propertyGetDto
//        return propertyGetDto;


        // 一行顶上面step2 & step3
        return propertyMapper.mapPropertyToPropertyGetDto(property);
    }

    public List<PropertyGetDto> getPropertyByUserId(Long userId) {
        // get property list from database given userId
        List<Property> propertyList = propertyRepository.findByUser_Id(userId);

        // property list ---> propertyGetDto list
        return propertyList.stream()
                .map(property -> propertyMapper.mapPropertyToPropertyGetDto(property))
                .toList();
    }


    public PropertyPageDto getPropertyByUserId(Long userId, int page, int size) {
        Pageable paging = PageRequest.of(page, size);

        Page<Property>  properties = propertyRepository.findByUser_Id(userId, paging);

        // 拿到page里的list
        List<Property> propertyList = properties.getContent();

        return PropertyPageDto.builder()
                .totalPage(properties.getTotalPages())
                .totalNumber(properties.getNumberOfElements())
                .propertyGetDtoList(properties.stream().map(property -> propertyMapper.mapPropertyToPropertyGetDto(property)).toList())
                .build();
    }




}
