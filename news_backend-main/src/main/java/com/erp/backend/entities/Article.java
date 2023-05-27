package com.erp.backend.entities;

import com.erp.backend.entities.base.AuditableBase;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.List;
import javax.persistence.Table;
import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "article")
@SQLDelete(sql = "UPDATE article SET is_deleted = true WHERE bookId = ?")
@Where(clause = "is_deleted = false")
public class Article extends AuditableBase {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String content;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
    private String url;
    @OneToMany(mappedBy = "article")
    private List<Comment> comments;
   @ManyToOne
    @JoinColumn(name = "publication_id")
    private  Publication publication;
    @ManyToMany
    private List<SearchKeyword> searchKeywords;
    @OneToMany(mappedBy = "article")
    private List<RelatedArticle> relatedArticles;
    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User userCreate;

    // getters and setters
}
