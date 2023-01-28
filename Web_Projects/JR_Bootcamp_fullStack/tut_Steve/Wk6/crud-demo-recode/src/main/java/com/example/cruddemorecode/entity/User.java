package com.example.cruddemorecode.entity;

import com.fasterxml.jackson.databind.annotation.JsonAppend;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-01-25 12:01 pm
 */

// 注意和sql定义的User属性要一致
@Entity   // 证明这是个Entity, 是要与数据库作用的
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id     // 指定修饰的属性为primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 指定主键自动生成模式： 自增长
    private Long id;
    private String email;
    private String name;
    private String password;

    @CreationTimestamp      // 指定自动管理
    private OffsetDateTime createdTime;

    @UpdateTimestamp        // 指定自动管理
    private OffsetDateTime updatedTime;

    @OneToMany(mappedBy = "user")       // 对应Property里User的成员变量名
    private List<Property> propertyList;
}
