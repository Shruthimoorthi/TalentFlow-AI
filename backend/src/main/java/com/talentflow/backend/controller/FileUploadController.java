package com.talentflow.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private final Path uploadDirectory =
            Paths.get("uploads/resumes");

    @PostMapping("/resume")
    public ResponseEntity<String> uploadResume(
            @RequestParam("file") MultipartFile file) {

        try {

            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Please select a file");
            }

            String originalFileName =
                    file.getOriginalFilename();

            if (originalFileName == null ||
                    !originalFileName.toLowerCase().endsWith(".pdf")) {

                return ResponseEntity.badRequest()
                        .body("Only PDF files are allowed");
            }

            Files.createDirectories(uploadDirectory);

            String fileName =
                    UUID.randomUUID() + "_" + originalFileName;

            Path filePath =
                    uploadDirectory.resolve(fileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            String fileUrl =
                    "/uploads/resumes/" + fileName;

            return ResponseEntity.ok(fileUrl);

        } catch (IOException e) {

            return ResponseEntity.internalServerError()
                    .body("Failed to upload resume");
        }
    }
}