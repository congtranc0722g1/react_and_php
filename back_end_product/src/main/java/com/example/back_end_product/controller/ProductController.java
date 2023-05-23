package com.example.back_end_product.controller;

import com.example.back_end_product.model.Product;
import com.example.back_end_product.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/")
public class ProductController {

    @Autowired
    private IProductService productService;

    @GetMapping("/products")
    private ResponseEntity<Page<Product>> showProductList(@PageableDefault(size = 2) Pageable pageable){
        Page<Product> productList = null;
        productList = productService.showAll(pageable);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @PostMapping("/create")
    private ResponseEntity<?> createProduct(@RequestBody Product product){
        productService.createProduct(product.getName(), product.getPrice(), product.getDescription());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    private ResponseEntity<?> findProduct(@PathVariable("id") Integer id){
        Product product = productService.findProduct(id);
        if (product != null){
            return new ResponseEntity<>(product, HttpStatus.OK);
        }else {
            return new ResponseEntity<>("errProduct",HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/update")
    private ResponseEntity<?> updateProduct(@RequestBody Product product){
        productService.updateProduct(product.getName(), product.getPrice(), product.getDescription(), product.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    private ResponseEntity<?> delete(@RequestParam("id") Integer id){
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find-name")
    private ResponseEntity<List<Product>> findName(@RequestParam("name") String name){
        List<Product> productList = new ArrayList<>();
        productList = productService.findName(name);
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
}
