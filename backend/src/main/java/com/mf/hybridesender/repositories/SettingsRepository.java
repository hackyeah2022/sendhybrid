package com.mf.hybridesender.repositories;

import com.mf.hybridesender.db.FileDB;
import com.mf.hybridesender.db.Settings;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface SettingsRepository extends CrudRepository<Settings, String> {
    Settings save(Settings fileDB);
    Settings getById(String id);
}
