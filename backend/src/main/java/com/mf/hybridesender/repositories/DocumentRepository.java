package com.mf.hybridesender.repositories;

import com.mf.hybridesender.db.Document;
import org.springframework.data.repository.CrudRepository;

public interface DocumentRepository extends CrudRepository<Document, Integer> {
    Document findByName(String name);

    Document save(Document document);
}
