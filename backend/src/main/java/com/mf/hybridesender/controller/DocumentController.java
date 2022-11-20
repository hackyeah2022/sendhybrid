package com.mf.hybridesender.controller;


import com.mf.hybridesender.db.Document;
import com.mf.hybridesender.repositories.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    DocumentRepository documentRepository;

    @GetMapping("/getById/{id}")
    Document getById(@PathVariable String id) {
        return documentRepository.findById(id);
    }

    @PutMapping("/markSentById/{id}")
    Document markSentById(@PathVariable String id) {
        Document document = documentRepository.findById(id);
        document.setSent(true);
        documentRepository.save(document);

        return document;
    }

    @GetMapping("/getAll")
    List<Document> getAll() {
        return documentRepository.findAllByOrderByIdDesc();
    }


    @GetMapping("/getByCaseNumber/{caseNumber}")
    List<Document> getByCaseNumber(@PathVariable String caseNumber) {
        return documentRepository.findByCaseNumber(caseNumber);
    }

    @GetMapping("/health")
    String health() {
        return "OK";
    }
}
