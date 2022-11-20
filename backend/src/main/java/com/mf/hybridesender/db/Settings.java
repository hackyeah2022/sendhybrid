package com.mf.hybridesender.db;



import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "settings")
public class Settings {
    public Settings() {
    }

    @Id
    private String id;

    Integer maxSenderSize;
    Integer maxSender2Size;
    Integer maxSenderStreetSize;
    Integer maxSenderZipcodeSize;
    Integer maxSenderCitySize;
    Integer maxSenderHouseSize;
    Integer maxSenderFlatSize;
    Integer maxReceiverSize;
    Integer maxReceiver2Size;
    Integer maxReceiverStreetSize;
    Integer maxReceiverZipcodeSize;
    Integer maxReceiverCitySize;
    Integer maxReceiverHouseSize;
    Integer maxReceiverFlatSize;

    public Settings(String id, Integer maxSenderSize, Integer maxSender2Size, Integer maxSenderStreetSize, Integer maxSenderZipcodeSize, Integer maxSenderCitySize, Integer maxSenderHouseSize, Integer maxSenderFlatSize, Integer maxReceiverSize, Integer maxReceiver2Size, Integer maxReceiverStreetSize, Integer maxReceiverZipcodeSize, Integer maxReceiverCitySize, Integer maxReceiverHouseSize, Integer maxReceiverFlatSize) {
        this.id = id;
        this.maxSenderSize = maxSenderSize;
        this.maxSender2Size = maxSender2Size;
        this.maxSenderStreetSize = maxSenderStreetSize;
        this.maxSenderZipcodeSize = maxSenderZipcodeSize;
        this.maxSenderCitySize = maxSenderCitySize;
        this.maxSenderHouseSize = maxSenderHouseSize;
        this.maxSenderFlatSize = maxSenderFlatSize;
        this.maxReceiverSize = maxReceiverSize;
        this.maxReceiver2Size = maxReceiver2Size;
        this.maxReceiverStreetSize = maxReceiverStreetSize;
        this.maxReceiverZipcodeSize = maxReceiverZipcodeSize;
        this.maxReceiverCitySize = maxReceiverCitySize;
        this.maxReceiverHouseSize = maxReceiverHouseSize;
        this.maxReceiverFlatSize = maxReceiverFlatSize;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getMaxSenderSize() {
        return maxSenderSize;
    }

    public void setMaxSenderSize(Integer maxSenderSize) {
        this.maxSenderSize = maxSenderSize;
    }

    public Integer getMaxSender2Size() {
        return maxSender2Size;
    }

    public void setMaxSender2Size(Integer maxSender2Size) {
        this.maxSender2Size = maxSender2Size;
    }

    public Integer getMaxSenderStreetSize() {
        return maxSenderStreetSize;
    }

    public void setMaxSenderStreetSize(Integer maxSenderStreetSize) {
        this.maxSenderStreetSize = maxSenderStreetSize;
    }

    public Integer getMaxSenderZipcodeSize() {
        return maxSenderZipcodeSize;
    }

    public void setMaxSenderZipcodeSize(Integer maxSenderZipcodeSize) {
        this.maxSenderZipcodeSize = maxSenderZipcodeSize;
    }

    public Integer getMaxSenderCitySize() {
        return maxSenderCitySize;
    }

    public void setMaxSenderCitySize(Integer maxSenderCitySize) {
        this.maxSenderCitySize = maxSenderCitySize;
    }

    public Integer getMaxSenderHouseSize() {
        return maxSenderHouseSize;
    }

    public void setMaxSenderHouseSize(Integer maxSenderHouseSize) {
        this.maxSenderHouseSize = maxSenderHouseSize;
    }

    public Integer getMaxSenderFlatSize() {
        return maxSenderFlatSize;
    }

    public void setMaxSenderFlatSize(Integer maxSenderFlatSize) {
        this.maxSenderFlatSize = maxSenderFlatSize;
    }

    public Integer getMaxReceiverSize() {
        return maxReceiverSize;
    }

    public void setMaxReceiverSize(Integer maxReceiverSize) {
        this.maxReceiverSize = maxReceiverSize;
    }

    public Integer getMaxReceiver2Size() {
        return maxReceiver2Size;
    }

    public void setMaxReceiver2Size(Integer maxReceiver2Size) {
        this.maxReceiver2Size = maxReceiver2Size;
    }

    public Integer getMaxReceiverStreetSize() {
        return maxReceiverStreetSize;
    }

    public void setMaxReceiverStreetSize(Integer maxReceiverStreetSize) {
        this.maxReceiverStreetSize = maxReceiverStreetSize;
    }

    public Integer getMaxReceiverZipcodeSize() {
        return maxReceiverZipcodeSize;
    }

    public void setMaxReceiverZipcodeSize(Integer maxReceiverZipcodeSize) {
        this.maxReceiverZipcodeSize = maxReceiverZipcodeSize;
    }

    public Integer getMaxReceiverCitySize() {
        return maxReceiverCitySize;
    }

    public void setMaxReceiverCitySize(Integer maxReceiverCitySize) {
        this.maxReceiverCitySize = maxReceiverCitySize;
    }

    public Integer getMaxReceiverHouseSize() {
        return maxReceiverHouseSize;
    }

    public void setMaxReceiverHouseSize(Integer maxReceiverHouseSize) {
        this.maxReceiverHouseSize = maxReceiverHouseSize;
    }

    public Integer getMaxReceiverFlatSize() {
        return maxReceiverFlatSize;
    }

    public void setMaxReceiverFlatSize(Integer maxReceiverFlatSize) {
        this.maxReceiverFlatSize = maxReceiverFlatSize;
    }
}

