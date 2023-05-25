package com.example.back_end_product.service;

import com.example.back_end_product.model.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> findAll();
}
