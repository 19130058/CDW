package com.erp.backend.controllers;

import com.erp.backend.dtos.request.CategoryRequest;
import com.erp.backend.dtos.request.UpdateCategoryRequest;
import com.erp.backend.repositories.ArticleRepository;
import com.erp.backend.repositories.CategoryRepository;
import com.erp.backend.services.ArticleService;
import com.erp.backend.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class CategoryController {
@Autowired
    private CategoryRepository repository;
@Autowired
    private CategoryService service;
@Autowired
    ArticleRepository articleRepository;
@Autowired
    ArticleService articleService;
@PostMapping("/category/create")
public ResponseEntity<?>createCategory(@Valid @RequestBody CategoryRequest request){
return ResponseEntity.ok(service.createCategory(request));
}

@PutMapping("/category/update")
    public ResponseEntity<?> updateCategory(@Valid @RequestBody UpdateCategoryRequest request){
    return ResponseEntity.ok(service.updateCategory(request));
}
@DeleteMapping("/category/delete/{id}")
    public  ResponseEntity deleteCategory(@PathVariable(value = "id") Long idCategory){
return  ResponseEntity.ok(service.deleteCategory(idCategory));


}
    @GetMapping("/category/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAllCategory());
    }




}
