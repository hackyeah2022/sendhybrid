package com.mf.hybridesender.services;

import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import com.mf.hybridesender.repositories.FileRepository;
import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
import fr.opensagres.xdocreport.converter.ConverterRegistry;
import fr.opensagres.xdocreport.converter.ConverterTypeTo;
import fr.opensagres.xdocreport.core.document.DocumentKind;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class AutoPdfConverter {
    Logger log = LoggerFactory.getLogger(PdfReader.class);
    private final FileRepository fileRepository;

    public AutoPdfConverter(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void convertFromWordtoPDF(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try {
            InputStream is = new ByteArrayInputStream(fileBytes);
            XWPFDocument document = new XWPFDocument(is);

            PdfOptions options = PdfOptions.create();

            OutputStream out = new FileOutputStream(new File("C:\\Users\\m.skala\\Documents\\MtgMin.pdf"));
            PdfConverter.getInstance().convert(document, out, options);
        } catch (Exception e) {
            log.error("Error during convertion", e);
        }
    }

    public byte[] convertFromWordtoPDF2(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try {
            InputStream in = new ByteArrayInputStream(fileBytes);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            IConverter converter = LocalConverter.builder().build();
            converter.convert(in).as(DocumentType.DOCX).to(out).as(DocumentType.PDF).execute();
            out.close();
            return out.toByteArray();

        } catch (Exception e) {
            log.error("Error during convertion", e);
        }
        return new byte[0];
    }
/*
    public void convertFromOdtToPDF(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try {
            InputStream is = new ByteArrayInputStream(fileBytes);

            Options options = Options.getFrom(DocumentKind.DOCX).to(ConverterTypeTo.PDF);
            IConverter converter = ConverterRegistry.getRegistry().getConverter(options);

            OutputStream out = new FileOutputStream(new File("C:\\Users\\m.skala\\Documents\\MtgMin.pdf"));
            converter.convert(is, out, options);
        } catch (Exception e) {
            log.error("Error during convertion", e);
        }
    }
*/
}
