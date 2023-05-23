package com.example.back_end_product.service;

import com.example.back_end_product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    Page<Product> showAll(Pageable pageable);

    void deleteProduct(Integer id);

    Product findProduct(Integer id);

    void createProduct(String name, Double price, String description);

    void updateProduct(String name, Double price, String description, Integer id);

    List<Product> findName(String name);
}
