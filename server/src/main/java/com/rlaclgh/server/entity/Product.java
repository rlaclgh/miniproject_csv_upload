package com.rlaclgh.server.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(of = {"id", "name", "nameEng", "description"})
public class Product extends BaseEntity{
  @Id
  @GeneratedValue
  private Long id;

  public Product() {
  }

  @Column
  private String name;

  @Column(name = "name_eng")
  private String nameEng;

  @Column
  private String description;

  public Product(String name, String nameEng, String description) {
    this.name = name;
    this.nameEng = nameEng;
    this.description = description;
  }
}
