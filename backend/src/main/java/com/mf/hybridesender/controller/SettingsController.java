package com.mf.hybridesender.controller;


import com.mf.hybridesender.db.Settings;
import com.mf.hybridesender.repositories.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;

@RestController
@RequestMapping("/settings")
public class SettingsController {

    @Autowired
    SettingsRepository settingsRepository;

    @GetMapping
    Settings getById() {
        return settingsRepository.findById("1").get();
    }

    @PutMapping
    void updateSettings(@RequestBody Settings settings) {
        settings.setId("1");
        settingsRepository.save(settings);
    }

    @PostConstruct
    void init() {
        Settings settings = new Settings("1", 50, 100, 35, 6, 30, 10, 10, 50, 100, 35, 6, 30, 10, 10);
        settingsRepository.save(settings);
    }
}
