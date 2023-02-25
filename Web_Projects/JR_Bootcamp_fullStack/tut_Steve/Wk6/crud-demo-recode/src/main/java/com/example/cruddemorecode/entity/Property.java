package com.example.cruddemorecode.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.OffsetDateTime;

/**
 * Property entity 作为 service 和 database之间的信息媒介,
 * 在这里定义好entity class (Java的内容) 和 database tuple (database的内容)的映射关系
 *
 * @author xueshuo
 * @create 2023-01-28 10:39 am
 */
@Entity   // 证明这是个Entity, 是要与数据库作用的
@Getter
@Setter
public class Property {

    @Id     // 指定修饰的属性为primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 指定主键自动生成模式： 自增长
    private Long id;

    private String type;

    private Integer landSize;

    // for OOP: a User object should be a member variable in Property entity class
    // 这里就体现了entity和database tuple之间的mapping
    @ManyToOne // FK: property : user --> many to one           默认fetch EAGER
    @JoinColumn(name = "owner_id")  // define how to reference user based on database column "owner_id"
    private UserInfo userInfo;

    @CreationTimestamp      // 指定自动管理
    private OffsetDateTime createdTime;

    @UpdateTimestamp        // 指定自动管理
    private OffsetDateTime updatedTime;


}
