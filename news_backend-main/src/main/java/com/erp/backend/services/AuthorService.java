package com.erp.backend.services;

import com.erp.backend.dtos.AuthorDto;
import com.erp.backend.dtos.mappers.AuthorDtoMapper;
import com.erp.backend.dtos.request.AuthorRequest;
import com.erp.backend.dtos.request.UpdateAuthorRequest;
import com.erp.backend.entities.Author;
import com.erp.backend.models.Response;
import com.erp.backend.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthorService {
    @Autowired
    AuthorRepository repository ;
    @Autowired
    AuthorDtoMapper mapper;

public AuthorDto createAuthor(AuthorRequest request){
    Author author= Author.builder().name(request.getName()).build();
Author save= repository.save(author);
return mapper.apply(save);

}
    public AuthorDto updateAuthor(UpdateAuthorRequest request){
        Optional<Author> optionalAuthor=repository.findById(request.getId());
        Author author=optionalAuthor.get();
        author.setName(request.getName());
        Author save=repository.save(author);
        return mapper.apply(save);
    }
    public Response deleteAuthor (Long idAuthor){
        Optional<Author> optionalAuthor=repository.findById(idAuthor);
        Author author=optionalAuthor.get();
        repository.delete(author);
        return new Response(200,null,null);
    }
    public List<AuthorDto> getAll(){
        List<Author> list=repository.findAll();
        List<AuthorDto> listResult=list.stream().map(mapper::apply).collect(Collectors.toList());
        return listResult;
    }




}
