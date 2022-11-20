package com.mf.hybridesender.services;

import com.mf.hybridesender.db.Document;
import com.mf.hybridesender.db.Settings;
import com.mf.hybridesender.repositories.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class DocumentValidator {

    @Autowired
    SettingsRepository settingsRepository;

    public boolean validateSenderAddress(Document document) {
        Settings settings = settingsRepository.getById("1");

        if (document.getSenderName() == null || document.getSenderName().isEmpty() || document.getSenderName().length() > settings.getMaxSenderSize())
            return false;

        if (document.getSenderSurname() != null && document.getSenderSurname().length() > settings.getMaxSender2Size())
            return false;

        if (document.getSenderStreet() == null || document.getSenderStreet().isEmpty() || document.getSenderStreet().length() > settings.getMaxSenderStreetSize())
            return false;

        if (document.getSenderZipcode() == null || document.getSenderZipcode().isEmpty() || document.getSenderZipcode().length() > settings.getMaxSenderZipcodeSize())
            return false;

        if (document.getSenderHouseNumber() == null || document.getSenderHouseNumber().isEmpty() || document.getSenderHouseNumber().length() > settings.getMaxSenderHouseSize())
            return false;

        if (document.getSenderFlatNumber() != null && document.getSenderFlatNumber().length() > settings.getMaxSenderFlatSize())
            return false;

        return true;
    }

    public boolean validateReceiverAddress(Document document) {
        Settings settings = settingsRepository.getById("1");

        if (document.getReceiverName() == null || document.getReceiverName().isEmpty() || document.getReceiverName().length() > settings.getMaxReceiverSize())
            return false;

        if (document.getReceiverSurname() != null && document.getReceiverSurname().length() > settings.getMaxReceiver2Size())
            return false;

        if (document.getReceiverStreet() == null || document.getReceiverStreet().isEmpty() || document.getReceiverStreet().length() > settings.getMaxReceiverStreetSize())
            return false;

        if (document.getReceiverZipcode() == null || document.getReceiverZipcode().isEmpty() || document.getReceiverZipcode().length() > settings.getMaxReceiverZipcodeSize())
            return false;

        if (document.getReceiverHouseNumber() == null || document.getReceiverHouseNumber().isEmpty() || document.getReceiverHouseNumber().length() > settings.getMaxReceiverHouseSize())
            return false;

        if (document.getReceiverFlatNumber() != null && document.getReceiverFlatNumber().length() > settings.getMaxReceiverFlatSize())
            return false;

        return true;
    }

    public boolean validateFilename(String filename) {
        filename = filename.replace(".pdf", "");

        try {
            filename.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            return false;
        }

        if (filename.contains("~"))
            return false;

        if (filename.contains("\""))
            return false;
        if (filename.contains("\\"))
            return false;
        if (filename.contains("#"))
            return false;
        if (filename.contains("%"))
            return false;
        if (filename.contains("&"))
            return false;
        if (filename.contains("*"))
            return false;
        if (filename.contains(":"))
            return false;
        if (filename.contains("<"))
            return false;
        if (filename.contains(">"))
            return false;
        if (filename.contains("?"))
            return false;
        if (filename.contains("!"))
            return false;
        if (filename.contains("/"))
            return false;
        if (filename.contains("{"))
            return false;
        if (filename.contains("}"))
            return false;
        if (filename.contains("|"))
            return false;

        if (!filename.trim().equals(filename))
            return false;

        if (filename.length() > 255)
            return false;


        return true;
    }
}
