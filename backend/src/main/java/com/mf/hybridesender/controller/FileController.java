package com.mf.hybridesender.controller;

import com.mf.hybridesender.controller.model.FileModel;
import com.mf.hybridesender.db.FileDB;
import com.mf.hybridesender.repositories.FileRepository;
import com.mf.hybridesender.services.PdfReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private PdfReader pdfReader;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            FileDB fileDB = new FileDB(fileName, file.getContentType(), file.getBytes());
            FileDB savedFile = fileRepository.save(fileDB);
            pdfReader.checkIfPdf(savedFile.getId());
            pdfReader.checkSignatures(savedFile.getId());
            pdfReader.checkIfFontsEmbeded(savedFile.getId());
            pdfReader.checkImagesRequirements(savedFile.getId());
            pdfReader.checkIfFreeOfForms(savedFile.getId());
            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
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
    public FileModel getDetails(@PathVariable String id) {
        FileDB fileDB = fileRepository.getById(id);

        return new FileModel(fileDB.getId(), fileDB.getName(), fileDB.getType());
    }
}
