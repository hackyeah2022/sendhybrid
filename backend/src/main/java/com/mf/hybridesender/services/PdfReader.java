package com.mf.hybridesender.services;

import com.mf.hybridesender.repositories.FileRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.interactive.digitalsignature.PDSignature;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class PdfReader {
    private final FileRepository fileRepository;

    public PdfReader(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public boolean checkIfPdf(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try (PDDocument doc = PDDocument.load(fileBytes)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(doc);

            if (text.length() > 0 ) {
                return true;
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

}
