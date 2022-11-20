package com.mf.hybridesender.db;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

//Sorry, lombok doesn't work with my Intellij

@Entity
@Table(name = "files")
public class FileDB {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;

    private String caseNumber;

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

    private boolean validationGeneralFailed;

    @Lob
    private byte[] data;

    public FileDB() {
    }

    public FileDB(String name, String type, byte[] data) {
        this.name = name;
        this.type = type;
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public void setId(String id) {
        this.id = id;
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

    public boolean isValidationGeneralFailed() {
        return validationGeneralFailed;
    }

    public void setValidationGeneralFailed(boolean validationGeneralFailed) {
        this.validationGeneralFailed = validationGeneralFailed;
    }


}
