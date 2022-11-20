package com.mf.hybridesender.db;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    private String name;
    private int age;

    private Date created;

    private String originalFileId;

    private String correctedFileId;

    private String caseNumber;
    private String epuap;

    public String getEpuap() {
        return epuap;
    }

    public void setEpuap(String epuap) {
        this.epuap = epuap;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    private String contactPerson;

    private String receiverName;
    private String receiverSurname;
    private String receiverStreet;
    private String receiverHouseNumber;
    private String receiverFlatNumber;
    private String receiverCity;
    private String receiverZipcode;

    private String senderName;
    private String senderSurname;
    private String senderStreet;
    private String senderHouseNumber;
    private String senderFlatNumber;
    private String senderCity;
    private String senderZipcode;

    private boolean validationPdfFailed;
    private boolean validationSignatureFailed;
    private boolean validationFormFieldsFailed;
    private boolean validationCMYKFailed;
    private boolean validationFontsFailed;
    private boolean validationSenderAddressFailed;
    private boolean validationReceiverAddressFailed;
    private boolean validationFilenameFailed;

    public boolean isValidationFilenameFailed() {
        return validationFilenameFailed;
    }

    public void setValidationFilenameFailed(boolean validationFilenameFailed) {
        this.validationFilenameFailed = validationFilenameFailed;
    }

    public boolean isValidationSenderAddressFailed() {
        return validationSenderAddressFailed;
    }

    public void setValidationSenderAddressFailed(boolean validationSenderAddressFailed) {
        this.validationSenderAddressFailed = validationSenderAddressFailed;
    }

    public boolean isValidationReceiverAddressFailed() {
        return validationReceiverAddressFailed;
    }

    public void setValidationReceiverAddressFailed(boolean validationReceiverAddressFailed) {
        this.validationReceiverAddressFailed = validationReceiverAddressFailed;
    }

    private boolean sent;

    public boolean isSent() {
        return sent;
    }

    public void setSent(boolean sent) {
        this.sent = sent;
    }

    private boolean validationGeneralFailed;

    public Document() {
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getCaseNumber() {
        return caseNumber;
    }

    public void setCaseNumber(String caseNumber) {
        this.caseNumber = caseNumber;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverSurname() {
        return receiverSurname;
    }

    public void setReceiverSurname(String receiverSurname) {
        this.receiverSurname = receiverSurname;
    }

    public String getReceiverStreet() {
        return receiverStreet;
    }

    public void setReceiverStreet(String receiverStreet) {
        this.receiverStreet = receiverStreet;
    }

    public String getReceiverHouseNumber() {
        return receiverHouseNumber;
    }

    public void setReceiverHouseNumber(String receiverHouseNumber) {
        this.receiverHouseNumber = receiverHouseNumber;
    }

    public String getReceiverFlatNumber() {
        return receiverFlatNumber;
    }

    public void setReceiverFlatNumber(String receiverFlatNumber) {
        this.receiverFlatNumber = receiverFlatNumber;
    }

    public String getReceiverCity() {
        return receiverCity;
    }

    public void setReceiverCity(String receiverCity) {
        this.receiverCity = receiverCity;
    }

    public String getReceiverZipcode() {
        return receiverZipcode;
    }

    public void setReceiverZipcode(String receiverZipcode) {
        this.receiverZipcode = receiverZipcode;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderSurname() {
        return senderSurname;
    }

    public void setSenderSurname(String senderSurname) {
        this.senderSurname = senderSurname;
    }

    public String getSenderStreet() {
        return senderStreet;
    }

    public void setSenderStreet(String senderStreet) {
        this.senderStreet = senderStreet;
    }

    public String getSenderHouseNumber() {
        return senderHouseNumber;
    }

    public void setSenderHouseNumber(String senderHouseNumber) {
        this.senderHouseNumber = senderHouseNumber;
    }

    public String getSenderFlatNumber() {
        return senderFlatNumber;
    }

    public void setSenderFlatNumber(String senderFlatNumber) {
        this.senderFlatNumber = senderFlatNumber;
    }

    public String getSenderCity() {
        return senderCity;
    }

    public void setSenderCity(String senderCity) {
        this.senderCity = senderCity;
    }

    public String getSenderZipcode() {
        return senderZipcode;
    }

    public void setSenderZipcode(String senderZipcode) {
        this.senderZipcode = senderZipcode;
    }

    public boolean isValidationPdfFailed() {
        return validationPdfFailed;
    }

    public void setValidationPdfFailed(boolean validationPdfFailed) {
        this.validationPdfFailed = validationPdfFailed;
    }

    public boolean isValidationSignatureFailed() {
        return validationSignatureFailed;
    }

    public void setValidationSignatureFailed(boolean validationSignatureFailed) {
        this.validationSignatureFailed = validationSignatureFailed;
    }

    public boolean isValidationFormFieldsFailed() {
        return validationFormFieldsFailed;
    }

    public void setValidationFormFieldsFailed(boolean validationFormFieldsFailed) {
        this.validationFormFieldsFailed = validationFormFieldsFailed;
    }

    public boolean isValidationCMYKFailed() {
        return validationCMYKFailed;
    }

    public void setValidationCMYKFailed(boolean validationCMYKFailed) {
        this.validationCMYKFailed = validationCMYKFailed;
    }

    public boolean isValidationFontsFailed() {
        return validationFontsFailed;
    }

    public void setValidationFontsFailed(boolean validationFontsFailed) {
        this.validationFontsFailed = validationFontsFailed;
    }

    public String getOriginalFileId() {
        return originalFileId;
    }

    public void setOriginalFileId(String originalFileId) {
        this.originalFileId = originalFileId;
    }

    public String getCorrectedFileId() {
        return correctedFileId;
    }

    public void setCorrectedFileId(String correctedFileId) {
        this.correctedFileId = correctedFileId;
    }

    public boolean isValidationGeneralFailed() {
        return validationGeneralFailed;
    }

    public void setValidationGeneralFailed(boolean validationGeneralFailed) {
        this.validationGeneralFailed = validationGeneralFailed;
    }

}

