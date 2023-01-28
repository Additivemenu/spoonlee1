package com.example.cruddemorecode.mapper;

import com.example.cruddemorecode.dto.PropertyGetDto;
import com.example.cruddemorecode.entity.Property;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * @author xueshuo
 * @create 2023-01-28 11:45 am
 */
@Mapper(componentModel = "spring", uses = {UserInfoMapper.class})       // 指明利用UserInfoMapper中的 User <--> UserGetDto方法
public interface PropertyMapper {

    // Property entity{ User }  ----> PropertyGetDto{ UserGetDto }
    @Mapping(source = "user", target="userGetDto")
    PropertyGetDto mapPropertyToPropertyGetDto(Property property);

}
