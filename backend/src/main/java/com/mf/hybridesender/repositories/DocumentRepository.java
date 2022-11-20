package com.mf.hybridesender.repositories;

import com.mf.hybridesender.db.Document;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DocumentRepository extends CrudRepository<Document, Integer> {
    Document findById(String id);

    List<Document> findByCaseNumber(String caseNumber);

    List<Document> findAllByOrderByIdDesc();

    Document save(Document document);
}
