package com.erp.backend.repositories;

import com.erp.backend.entities.RelatedArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RelatedArticleRepository extends JpaRepository<RelatedArticle,Long> {
}
