package com.example.cruddemorecode.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.OffsetDateTime;

/**
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

    // FK: property : user --> many to one
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User user;

    @CreationTimestamp      // 指定自动管理
    private OffsetDateTime createdTime;

    @UpdateTimestamp        // 指定自动管理
    private OffsetDateTime updatedTime;


}
