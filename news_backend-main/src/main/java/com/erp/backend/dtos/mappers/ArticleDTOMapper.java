package com.erp.backend.dtos.mappers;

import com.erp.backend.dtos.ArticleDto;
import com.erp.backend.entities.Article;
import com.erp.backend.entities.SearchKeyword;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ArticleDTOMapper implements Function<Article, ArticleDto> {

    @Override
    public ArticleDto apply(Article article) {
        return new ArticleDto(article.getId(),article.getTitle(),article.getContent(),article.getCategory().getName(),article.getAuthor().getName(),article.getUrl(),article.getPublication().getName(),article.getComments(),article.getSearchKeywords().stream().map(SearchKeyword::getKeyword).collect(Collectors.toList()), article.getRelatedArticles());
    }
}
