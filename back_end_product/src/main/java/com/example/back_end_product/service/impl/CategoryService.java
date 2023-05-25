package com.example.back_end_product.service.impl;

import com.example.back_end_product.model.Category;
import com.example.back_end_product.repository.ICategoryRepository;
import com.example.back_end_product.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
}
