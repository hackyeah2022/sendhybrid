package com.mf.hybridesender.controller;


import com.mf.hybridesender.db.Document;
import com.mf.hybridesender.repositories.DocumentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    DocumentRepository documentRepository;

    @GetMapping("/getById/{name}")
    Document getById(String name){
       return documentRepository.findByName(name);
    }

    @GetMapping("/health")
    String health(){
        return "OK";
    }
}
