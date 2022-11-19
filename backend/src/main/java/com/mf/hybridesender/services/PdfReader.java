package com.mf.hybridesender.services;

import com.mf.hybridesender.repositories.FileRepository;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.graphics.PDXObject;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.apache.pdfbox.pdmodel.interactive.digitalsignature.PDSignature;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.util.Matrix;
import org.apache.tomcat.util.codec.binary.Base64;
import org.bouncycastle.asn1.cms.Attribute;
import org.bouncycastle.asn1.pkcs.PKCSObjectIdentifiers;
import org.bouncycastle.cert.X509CertificateHolder;
import org.bouncycastle.cms.SignerInformation;
import org.bouncycastle.tsp.TimeStampToken;
import org.bouncycastle.util.encoders.Hex;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.bouncycastle.cms.CMSSignedData;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class PdfReader {

    Logger log = LoggerFactory.getLogger(PdfReader.class);
    private final FileRepository fileRepository;

    public PdfReader(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }


    public boolean checkIfPdf(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try (PDDocument doc = PDDocument.load(fileBytes)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(doc);

            if (text.length() > 0) {
                return true;
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    public boolean checkIfFontsEmbeded(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try (PDDocument doc = PDDocument.load(fileBytes)) {

            for (PDPage page : doc.getPages())
                for (COSName font : page.getResources().getFontNames()) {
                    PDFont fontObject = page.getResources().getFont(font);
                    if (fontObject == null || !fontObject.isEmbedded())
                        return false;
                }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    public boolean checkImagesRequirements(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try (PDDocument doc = PDDocument.load(fileBytes)) {

            for (PDPage page : doc.getPages())
                for (COSName name : page.getResources().getXObjectNames()) {
                    PDXObject xobject = page.getResources().getXObject(name);
                    if (xobject instanceof PDImageXObject) {
                        PDImageXObject image = (PDImageXObject) xobject;
                        //check if image is CMYK
                        if (image.getColorSpace().getName().equals("DeviceCMYK"))
                            return false;

                    }
                }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    public boolean checkIfFreeOfForms(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try (PDDocument doc = PDDocument.load(fileBytes)) {

            PDAcroForm form = doc.getDocumentCatalog().getAcroForm();
            if(form==null)
                return true;

            if(!form.getFields().isEmpty()) {
                System.err.println("File contains form fields!");
                return false;
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    public boolean checkSignatures(String fileId) {
        byte[] fileBytes = fileRepository.getById(fileId).getData();
        try (PDDocument doc = PDDocument.load(fileBytes)) {
            List<PDSignature> signatureDictionaries = doc.getSignatureDictionaries();
            List<Boolean> checkSignatures = new ArrayList();
            for (PDSignature signatureDictionary : signatureDictionaries) {
                checkSignatures.add(processSignature(signatureDictionary, fileBytes));
            }
            return !checkSignatures.contains(false);
        } catch (Exception e) {
            log.error("Signature checking error: ", e);
        }
        return false;
    }

    private byte[] getByteRangeData(byte[] file, int[] byteRange) {
        int length1 = byteRange[1] + byteRange[3];
        byte[] contentSigned = new byte[length1];
        ByteArrayInputStream bis = new ByteArrayInputStream(file);
        bis.skip(byteRange[0]);
        bis.read(contentSigned, 0, byteRange[1]);
        bis.skip(byteRange[2] - byteRange[1] - byteRange[0]);
        bis.read(contentSigned, byteRange[1], byteRange[3]);
        bis.reset();
        return contentSigned;
    }

    private boolean processSignature(PDSignature signature,
                                     byte[] pdfBytes) throws Exception {
        byte[] contentToSigned = getByteRangeData(pdfBytes, signature.getByteRange());
        String filter = signature.getFilter();
        String subFilter = signature.getSubFilter();
        String contactInfo = Optional.ofNullable(signature.getContactInfo()).orElse("N/A");
        String reason = Optional.ofNullable(signature.getReason()).orElse("N/A");


        if (!filter.trim().equalsIgnoreCase("Adobe.PPKLite")) {
            log.error("Cannot process PDF Signature {} with filter {}", signature.getName(),
                    filter);
            return false;
        }
        if (!subFilter.trim().contains("ETSI.CAdES.detached") &&
                !subFilter.trim().contains("adbe.pkcs7.detached") &&
                !subFilter.trim().contains("ETSI.RFC3161")
        ) {
            log.error("Cannot process PDF Signature {} with subFilter {}", signature.getName(),
                    subFilter);
            return false;
        }

        log.info("Signature {} Filter:{}", signature.getName(), filter);
        log.info("Signature {} SubFilter:{}", signature.getName(), subFilter);
        log.info("Signature {} ContactInfo:{}", signature.getName(), contactInfo);
        log.info("Signature {} Reason:{}", signature.getName(), reason);

        //Get PKCS#7 Data
        CMSSignedData signedData = new CMSSignedData(signature.getContents());
        //Get SignerInfo
        SignerInformation signerInfo = signedData.getSignerInfos().iterator().next();


        //Get Attribute
        Attribute attribute1 = signerInfo.getSignedAttributes().get(PKCSObjectIdentifiers.pkcs_9_at_messageDigest);
        Attribute attribute2 = null;
        if (signerInfo.getUnsignedAttributes() != null) {
            attribute2 = signerInfo.getUnsignedAttributes().get(PKCSObjectIdentifiers.id_aa_signatureTimeStampToken);
        }


        //Get MD in CMS
        String messageDigest = "";
        if (subFilter.contains("ETSI.RFC3161")) {
            TimeStampToken timeToken = new TimeStampToken(signedData);
            messageDigest = Base64.encodeBase64String(
                    timeToken.getTimeStampInfo().getMessageImprintDigest());
        } else {
            messageDigest = Base64.encodeBase64String(
                    Hex.decode(attribute1.getAttributeValues()[0].toString().substring(1)));
        }
        MessageDigest digest = MessageDigest.getInstance(signerInfo.getDigestAlgOID());
        log.info("Digest Algorithm used:{}", digest.getAlgorithm());

        String signatureSID = signerInfo.getSID().getSerialNumber().toString(16);
        //Check timestamp token
        if (attribute2 != null && attribute2.getAttributeValues().length > 0) {
            log.info("Signature ID {} contains timestamp", signatureSID);
        }

        //Getting PublicKey
        Collection<X509CertificateHolder> matches = signedData.getCertificates().getMatches(signerInfo.getSID());
        byte[] pubByte = matches.iterator().next().getSubjectPublicKeyInfo().getEncoded();

        X509EncodedKeySpec keySpec = new X509EncodedKeySpec(pubByte);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        PublicKey pubKey = kf.generatePublic(keySpec);

        //Check signature
        String encAlgo = null;
        if (signerInfo.getEncryptionAlgOID().trim().equals("1.2.840.113549.1.1.1")) {
            encAlgo = "RSA";
        }
        if (encAlgo != null) {
            if (digest.getAlgorithm().equals("1.3.14.3.2.26")) {
                encAlgo = "SHA1withRSA";
            } else if (digest.getAlgorithm().equals("2.16.840.1.101.3.4.2.1")) {
                encAlgo = "SHA256withRSA";
            } else if (digest.getAlgorithm().equals("2.16.840.1.101.3.4.2.2")) {
                encAlgo = "SHA384withRSA";
            } else if (digest.getAlgorithm().equals("2.16.840.1.101.3.4.2.3")) {
                encAlgo = "SHA512withRSA";
            }

        } else {
            encAlgo = signerInfo.getEncryptionAlgOID();
        }
        Signature rsaSign = Signature.getInstance(encAlgo);
        rsaSign.initVerify(pubKey);
        rsaSign.update(signerInfo.getEncodedSignedAttributes());
        boolean cmsSignatureValid = rsaSign.verify(signerInfo.getSignature());


        if (cmsSignatureValid) {
            log.info("Signature ID {} have VALID CMS Signature", signatureSID);
        } else {
            log.error("Signature ID {} have INVALID CMS Signature", signatureSID);
            return false;
        }

        //Calculate MD in PDF
        String mdPdf = Base64.encodeBase64String(digest.digest(contentToSigned));
        log.info("Message Digest Signature ID {} in CMS:{}", signatureSID, messageDigest);
        log.info("Message Digest Signature ID {} in PDF:{}", signatureSID, mdPdf);

        if (mdPdf.equals(messageDigest)) {
            log.info("Message Digest Signature ID {} is valid, data integrity is OK", signatureSID);
            return true;
        } else {
            log.info("Message Digest Signature ID {} is invalid, data integrity is NOT OK", signatureSID);
            return false;
        }

    }

}
