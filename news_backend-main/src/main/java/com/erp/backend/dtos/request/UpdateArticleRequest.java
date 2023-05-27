package com.erp.backend.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateArticleRequest {
    private Long id;
    private String title;
    private String content;
    private Long idCategory;
    private String authorName;
    private String descriptionAuthor;
    private String url;
    private Long idUserCreate;
    private String publicationName;
    private List<String> SearchKeywords;
      private List<Long> idRelatedArticle;
}
