package com.example.cruddemorecode.repository;

import com.example.cruddemorecode.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author xueshuo
 * @create 2023-01-28 10:50 am
 */
public interface PropertyRepository extends JpaRepository<Property, Long> {

}
