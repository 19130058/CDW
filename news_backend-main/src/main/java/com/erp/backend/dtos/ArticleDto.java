package com.erp.backend.dtos;

import com.erp.backend.entities.Comment;
import com.erp.backend.entities.RelatedArticle;
import com.erp.backend.entities.SearchKeyword;

import java.util.List;

public record ArticleDto(Long articleId , String articleTitle , String articleContent , String category, String author, String url, String articlePublication, List<Comment> listComment, List<String> listSearchKeyword , List<RelatedArticle> listRelatedArticle) {
}
