package com.example.back_end_product.repository;

import com.example.back_end_product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select * from product", nativeQuery = true)
    Page<Product> showAll(Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "delete from product where  id = :id", nativeQuery = true)
    void deleteProduct(@Param("id") Integer id);

    @Query(value = "select * from product where id = :id", nativeQuery = true)
    Product findProduct(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "insert into product(name, price, description) value (:name, :price, :description)", nativeQuery = true)
    void createProduct(@Param("name") String name, @Param("price") Double price, @Param("description") String description);

    @Modifying
    @Transactional
    @Query(value = "update product set name =:name, price =:price, description =:description where id =:id", nativeQuery = true)
    void updateProduct(@Param("name") String name, @Param("price") Double price, @Param("description") String description, @Param("id") Integer id);

    @Query(value = "select * from product where name like concat('%', :name, '%')", nativeQuery = true)
    List<Product> findName(@Param("name") String name);
}
