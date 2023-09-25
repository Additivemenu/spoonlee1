package com.example.cruddemorecode.repository;

import com.example.cruddemorecode.entity.Property;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * @author xueshuo
 * @create 2023-01-28 10:50 am
 */
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByUser_Id(Long userId);  // 注意方法名一定是 findByUser_Id(), 最后的部分要和数据库里的tuple的column name一致

    Page<Property> findByUser_Id(Long userId, Pageable pageable);
}
