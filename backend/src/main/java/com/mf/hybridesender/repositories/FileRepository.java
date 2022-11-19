package com.mf.hybridesender.repositories;

import com.mf.hybridesender.db.FileDB;
import org.springframework.data.repository.CrudRepository;

import java.io.File;
import java.util.List;


public interface FileRepository extends CrudRepository<FileDB, String> {
    FileDB save(FileDB fileDB);
    FileDB getById(String id);
    List<FileDB> findAll();
}
