package com.erp.backend.controllers;

import com.erp.backend.dtos.ArticleDto;
import com.erp.backend.dtos.SearchDto;
import com.erp.backend.services.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/")
@RequiredArgsConstructor
public class SreachController {
    @Autowired
    ArticleService articleService;

    @GetMapping("/search/")
    public ResponseEntity<List<ArticleDto>> sreachArticle(@Valid @RequestBody SearchDto keyword){
        return ResponseEntity.ok(articleService.sreachArticle(keyword));
    }

}
