package com.mf.hybridesender.controller;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mf.hybridesender.db.Document;
import com.mf.hybridesender.db.FileDB;
import com.mf.hybridesender.repositories.DocumentRepository;
import com.mf.hybridesender.repositories.FileRepository;
import com.mf.hybridesender.services.PdfReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
@JsonSerialize
public class FileController {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private PdfReader pdfReader;

    @PostMapping("/upload")
    public Document uploadFile(@RequestParam("file") MultipartFile file) {
        FileDB fileDB = null;
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            fileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Could not load file", e);
        }
        FileDB savedFile = fileRepository.save(fileDB);
        boolean pdfValidationFailed = !pdfReader.checkIfPdf(savedFile.getId());
        boolean signatureValidationFailed = !pdfReader.checkSignatures(savedFile.getId());
        boolean fontsValidationFailed = !pdfReader.checkIfFontsEmbeded(savedFile.getId());
        boolean imagesValidationFailed = !pdfReader.checkImagesRequirements(savedFile.getId());
        boolean formsValidationFailed = !pdfReader.checkIfFreeOfForms(savedFile.getId());

        boolean generalValidationFailed = pdfValidationFailed || signatureValidationFailed || fontsValidationFailed || imagesValidationFailed || formsValidationFailed;

        Document document = new Document();
        document.setValidationPdfFailed(pdfValidationFailed);
        document.setValidationSignatureFailed(signatureValidationFailed);
        document.setValidationFontsFailed(fontsValidationFailed);
        document.setValidationCMYKFailed(imagesValidationFailed);
        document.setValidationFormFieldsFailed(formsValidationFailed);
        document.setValidationGeneralFailed(generalValidationFailed);

        document.setCreated(new Date());

        document.setOriginalFileId(savedFile.getId());

        Document savedDocument = documentRepository.save(document);

        //return new FileModel(savedFile.getId(), savedFile.getName(), savedFile.getType(), savedFile.getCaseNumber(), savedFile.getReceiverName(), savedFile.getReceiverSurname(), savedFile.getReceiverStreet(), savedFile.getReceiverHouseNumber(), savedFile.getReceiverFlatNumber(), savedFile.getReceiverCity(), savedFile.getReceiverZipcode(), savedFile.getSenderName(), savedFile.getSenderSurname(), savedFile.getSenderStreet(), savedFile.getSenderHouseNumber(), savedFile.getSenderFlatNumber(), savedFile.getSenderCity(), savedFile.getSenderZipcode(), savedFile.isValidationPdfFailed(), savedFile.isValidationSignatureFailed(), savedFile.isValidationFormFieldsFailed(), savedFile.isValidationCMYKFailed(), savedFile.isValidationFontsFailed(), savedFile.isValidationGeneralFailed());
        savedFile.setData(new byte[0]);

        return savedDocument;
    }

    @GetMapping
    public List<String> getListFiles() {
        List<String> files = fileRepository.findAll().stream().map(FileDB::getId).collect(Collectors.toList());


        return files;
    }

    @GetMapping("/content/{id}")
    public ResponseEntity<?> getContent(@PathVariable String id) {
        FileDB fileDB = fileRepository.getById(id);


        ByteArrayResource resource = new ByteArrayResource(fileDB.getData());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(fileDB.getData().length)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(fileDB.getName())
                                .build().toString())
                .body(resource);
    }

    @GetMapping("/details/{id}")
    public FileDB getDetails(@PathVariable String id) {
        FileDB fileDB = fileRepository.getById(id);

        return fileDB;
        //return new FileModel(fileDB.getId(), fileDB.getName(), fileDB.getType(), fileDB.getCaseNumber(), fileDB.getReceiverName(), fileDB.getReceiverSurname(), fileDB.getReceiverStreet(), fileDB.getReceiverHouseNumber(), fileDB.getReceiverFlatNumber(), fileDB.getReceiverCity(), fileDB.getReceiverZipcode(), fileDB.getSenderName(), fileDB.getSenderSurname(), fileDB.getSenderStreet(), fileDB.getSenderHouseNumber(), fileDB.getSenderFlatNumber(), fileDB.getSenderCity(), fileDB.getSenderZipcode(), fileDB.isValidationPdfFailed(), fileDB.isValidationSignatureFailed(), fileDB.isValidationFormFieldsFailed(), fileDB.isValidationCMYKFailed(), fileDB.isValidationFontsFailed(), fileDB.isValidationGeneralFailed());
    }
}
