package com.mf.hybridesender.controller;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mf.hybridesender.db.Document;
import com.mf.hybridesender.db.FileDB;
import com.mf.hybridesender.repositories.DocumentRepository;
import com.mf.hybridesender.repositories.FileRepository;
import com.mf.hybridesender.services.AutoPdfConverter;
import com.mf.hybridesender.services.DocumentValidator;
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

    @Autowired
    private AutoPdfConverter pdfConverter;

    @Autowired
    private DocumentValidator documentValidator;

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

        Document document = new Document();



        boolean pdfValidationFailed = !pdfReader.checkIfPdf(savedFile.getId());

        if (pdfValidationFailed){

            FileDB parsedFromWord = null;

            try {
                parsedFromWord = new FileDB(savedFile.getId()+".pdf","pdf",pdfConverter.convertFromWordtoPDF2(savedFile.getId()));
            } catch (Exception e) {
                System.out.println("Could not parsed from word");
            }

            if(parsedFromWord!=null){
                fileRepository.save(parsedFromWord);
                if(pdfReader.checkIfPdf(parsedFromWord.getId())){
                    document.setCorrectedFileId(parsedFromWord.getId());
                }
            }


        }

        boolean signatureValidationFailed = false;
        boolean fontsValidationFailed = false;
        boolean imagesValidationFailed = false;
        boolean formsValidationFailed = false;
        boolean receiverAddressFailed = false;
        boolean senderAddressFailed = false;
        boolean filenameValidationFailed = false;




        if (!pdfValidationFailed) {
            signatureValidationFailed = !pdfReader.checkSignatures(savedFile.getId());
            //fontsValidationFailed = !pdfReader.checkIfFontsEmbeded(savedFile.getId());
            imagesValidationFailed = !pdfReader.checkImagesRequirements(savedFile.getId());
            formsValidationFailed = !pdfReader.checkIfFreeOfForms(savedFile.getId());
            pdfReader.fillSenderAndReceiverData(savedFile.getId(), document);
            receiverAddressFailed = !documentValidator.validateReceiverAddress(document);
            senderAddressFailed = !documentValidator.validateSenderAddress(document);
        }

        filenameValidationFailed = !documentValidator.validateFilename(savedFile.getName());

        if (!pdfValidationFailed && filenameValidationFailed) {
            FileDB correctedFile = new FileDB();
            correctedFile.setData(savedFile.getData());
            correctedFile.setType(savedFile.getType());
            correctedFile.setName(savedFile.getId() + ".pdf");
            correctedFile = fileRepository.save(correctedFile);
            document.setCorrectedFileId(correctedFile.getId());
        }


        boolean generalValidationFailed = pdfValidationFailed || signatureValidationFailed || fontsValidationFailed || imagesValidationFailed || formsValidationFailed || receiverAddressFailed || senderAddressFailed || filenameValidationFailed;


        document.setValidationPdfFailed(pdfValidationFailed);
        document.setValidationSignatureFailed(signatureValidationFailed);
        document.setValidationFontsFailed(fontsValidationFailed);
        document.setValidationCMYKFailed(imagesValidationFailed);
        document.setValidationFormFieldsFailed(formsValidationFailed);
        document.setValidationGeneralFailed(generalValidationFailed);
        document.setValidationReceiverAddressFailed(receiverAddressFailed);
        document.setValidationSenderAddressFailed(senderAddressFailed);
        document.setValidationFilenameFailed(filenameValidationFailed);

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
