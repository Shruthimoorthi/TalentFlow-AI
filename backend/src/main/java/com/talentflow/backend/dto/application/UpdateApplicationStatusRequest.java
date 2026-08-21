package com.talentflow.backend.dto.application;

import jakarta.validation.constraints.NotBlank;

public class UpdateApplicationStatusRequest {

    @NotBlank(message = "Status is required")
    private String status;

    public UpdateApplicationStatusRequest() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}