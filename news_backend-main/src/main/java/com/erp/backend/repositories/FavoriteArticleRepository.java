package com.erp.backend.repositories;

import com.erp.backend.entities.FavoriteArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteArticleRepository extends JpaRepository<FavoriteArticle,Long> {
}
