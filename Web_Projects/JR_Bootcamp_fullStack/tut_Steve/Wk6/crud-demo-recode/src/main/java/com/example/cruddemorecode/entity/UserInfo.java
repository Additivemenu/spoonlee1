package com.example.cruddemorecode.entity;

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
@Table(name = "user")       // entity名和数据库中的table名不同时， 需要用@Table指明映射关系
public class UserInfo {
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

    @OneToMany(mappedBy = "user")       // 对应Property里User的成员变量名, JDBC封装?
    private List<Property> propertyList;
}
