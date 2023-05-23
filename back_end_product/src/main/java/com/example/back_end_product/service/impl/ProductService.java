package com.example.back_end_product.service.impl;

import com.example.back_end_product.model.Product;
import com.example.back_end_product.repository.IProductRepository;
import com.example.back_end_product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public Page<Product> showAll(Pageable pageable) {
        return productRepository.showAll(pageable);
    }

    @Override
    public void deleteProduct(Integer id) {
        productRepository.deleteProduct(id);
    }

    @Override
    public Product findProduct(Integer id) {
        return productRepository.findProduct(id);
    }

    @Override
    public void createProduct(String name, Double price, String description) {
        productRepository.createProduct(name, price, description);
    }

    @Override
    public void updateProduct(String name, Double price, String description, Integer id) {
        productRepository.updateProduct(name, price, description, id);
    }

    @Override
    public List<Product> findName(String name) {
        return productRepository.findName(name);
    }
}
