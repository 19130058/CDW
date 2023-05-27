package com.erp.backend.services;

import com.erp.backend.dtos.ArticleDto;
import com.erp.backend.dtos.SearchDto;
import com.erp.backend.dtos.mappers.ArticleDTOMapper;
import com.erp.backend.dtos.request.ArticleRequest;
import com.erp.backend.dtos.request.UpdateArticleRequest;
import com.erp.backend.entities.*;
import com.erp.backend.models.Response;
import com.erp.backend.repositories.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticleService {
@Autowired
    ArticleRepository articleRepository;
@Autowired
    ArticleDTOMapper articleDTOMapper;
@Autowired
    CategoryRepository categoryRepository;
@Autowired
    AuthorRepository authorRepository;
@Autowired
    UserRepository userRepository;
@Autowired
    PublicationRepository publicationRepository;
@Autowired
    SearchKeywordRepository searchKeywordRepository;
@Autowired
    FavoriteArticleRepository favoriteArticleRepository;



public List<ArticleDto> getAll(){
List<Article> articles = articleRepository.findAll();
List<ArticleDto> articleDtos =articles.stream().map(articleDTOMapper::apply).collect(Collectors.toList());
return articleDtos;
}

public List<ArticleDto> topArticle(){
    List<Article> articles= articleRepository.findFirst10ByOrderByCreatedAtDesc();
    List<ArticleDto> articleDtos =articles.stream().map(articleDTOMapper::apply).collect(Collectors.toList());
    return articleDtos;
}
public ArticleDto uploadArticle(ArticleRequest request){
    ObjectMapper mapper=new ObjectMapper();

      //  ArticleRequest request= mapper.readValue(jsonObject,ArticleRequest.class);
        Category category= categoryRepository.findById(request.getIdCategory()).get();
        Optional<Author> optionalAuthor=authorRepository.findByName(request.getAuthorName());
        Author author;
        if(!optionalAuthor.isPresent()){
            author = Author.builder()
                    .name(request.getAuthorName())
                    .description(request.getDescriptionAuthor())
                    .build();
            author=authorRepository.save(author);
        }else {
            author =optionalAuthor.get();
        }
        User user= userRepository.findById(request.getIdUserCreate()).get();
        Optional<Publication> optionalPublication= publicationRepository.findByName(request.getPublicationName());
        Publication publication ;
        if(!optionalPublication.isPresent()){
            publication = Publication.builder()
                    .name(request.getPublicationName())
                    .build();
            publication=publicationRepository.save(publication);
        }else
        {
            publication=optionalPublication.get();
        }
        List<SearchKeyword> keywords = new ArrayList<>();

        List<String> searchKeywords = request.getSearchKeywords();
        searchKeywords.stream()
                .filter(keyword ->!keyword.isEmpty())//loai bo tu khoa rong
                .forEach(keyword -> {
                    Optional<SearchKeyword> searchKeyword = searchKeywordRepository.findByKeyword(keyword);
                    SearchKeyword newkey;
                    if (!searchKeyword.isPresent()){
                        newkey = SearchKeyword.builder()
                                .keyword(keyword)
                                .build();
                        newkey=searchKeywordRepository.save(newkey);
                        keywords.add(newkey);
                    }
                    else{
                        keywords.add(searchKeyword.get());
                    }
                });
        Article article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .category(category)
                .author(author)

                .url(request.getUrl())
                .userCreate(user)
                .publication(publication)
                .searchKeywords(keywords)
                .build();
        articleRepository.save(article);

    return articleDTOMapper.apply(article);
}
    @Transactional
public Response deleteArticle(Long idArticle){
Optional<Article> optionalArticle=articleRepository.findById(idArticle);
Article article = optionalArticle.get();
articleRepository.delete(article);
return new Response(200,null,null);
}
    @Transactional
public Article favorite(String email, Long idArticle){
    User user = userRepository.findByEmail(email).get();
    Article article = articleRepository.findById(idArticle).get();
    List<FavoriteArticle> favoriteArticles = user.getFavoriteArticles();
        for (FavoriteArticle favoriteArticle : favoriteArticles) {
            if (favoriteArticle.getArticle().getId().equals(idArticle)) {
                return article;
            }
        }
        FavoriteArticle favoriteArticle = FavoriteArticle.builder()
                .user(user)
                .article(article)
                .build();
        favoriteArticleRepository.save(favoriteArticle);

        favoriteArticles.add(favoriteArticle);
        user.setFavoriteArticles(favoriteArticles);
        userRepository.save(user);

return article;
    }
    @Transactional
    public Article unfavorite(String email,Long idArticle) {
        User user=userRepository.findByEmail(email).get();
        Article article = articleRepository.findById(idArticle).get();
// Kiểm tra xem bài viết đã được yêu thích hay chưa
        List<FavoriteArticle> favoriteArticles = user.getFavoriteArticles();
        FavoriteArticle favoriteArticleToRemove = null;
        for (FavoriteArticle favoriteArticle : favoriteArticles) {
            if (favoriteArticle.getArticle().getId().equals(idArticle)) {
                // Bài viết đã được yêu thích, xóa khỏi danh sách yêu thích
                favoriteArticleToRemove = favoriteArticle;
                break;
            }
        }
        if (favoriteArticleToRemove != null) {
            favoriteArticles.remove(favoriteArticleToRemove);
            user.setFavoriteArticles(favoriteArticles);
            userRepository.save(user);
            // Xóa đối tượng FavoriteArticle khỏi cơ sở dữ liệu
            favoriteArticleRepository.delete(favoriteArticleToRemove);
        }
        // Trả về bài viếtđã bỏ yêu thích
        return article;
    }
    public ArticleDto getArticle(Long idArticle){
    Article article= articleRepository.findById(idArticle).get();
return articleDTOMapper.apply(article);

    }
    public List<ArticleDto> findArticleByCategory(Long idCategory){
    List<Article> articles = articleRepository.findByCategoryId(idCategory);
    List<ArticleDto> articleDtos = articles.stream().map(articleDTOMapper::apply).collect(Collectors.toList());
    return  articleDtos;
    }
    public List<ArticleDto> findArticleByCategory(String nameCategory){
        List<Article> articles = articleRepository.findByCategoryNameIgnoreCase(nameCategory);
        List<ArticleDto> articleDtos = articles.stream().map(articleDTOMapper::apply).collect(Collectors.toList());
        return  articleDtos;
    }
    public List<ArticleDto> sreachArticle(SearchDto keyword){
        List<Article> articles = articleRepository.findByTitleContainingIgnoreCaseOrAuthorNameContainingIgnoreCaseOrPublicationNameContainingIgnoreCaseOrSearchKeywordsKeywordContainingIgnoreCase(keyword.getKeyword(),keyword.getKeyword(),keyword.getKeyword(),keyword.getKeyword());
        List<ArticleDto> articleDtos = articles.stream().map(articleDTOMapper::apply).collect(Collectors.toList());
        return  articleDtos;
    }
    /*public ArticleDto updateArticle (UpdateArticleRequest request){
        Article article = articleRepository.findById(request.getId()).get();
        if (article != null) {
            if (request.getTitle() != null) {
                article.setTitle(request.getTitle());
            }
            if (request.getContent() != null) {
                article.setContent(request.getContent());
            }
            if (request.getIdCategory() != null) {
                article.setCategory();
            }
            if (request.getAuthorName() != null) {
                // Cập nhật authorName
                // ...
            }
            // Tiếp tục cập nhật các thuộc tính khác của article từ request tương ứng

            articleRepository.save(article);
            return articleDTOMapper.apply(article);
        }
        return null;
    }*/

}
