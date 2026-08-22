package com.talentflow.backend.service;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Resume;

@Service
public class ResumeTextExtractionService {

    public String extractText(Resume resume) {

        if (resume == null) {
            throw new RuntimeException("Resume not found");
        }

        if (resume.getFileUrl() == null ||
                resume.getFileUrl().isBlank()) {

            throw new RuntimeException(
                    "Resume file is not available");
        }

        String fileName = Paths.get(resume.getFileUrl())
                .getFileName()
                .toString();

        Path filePath = Paths.get("uploads/resumes")
                .resolve(fileName);

        if (!java.nio.file.Files.exists(filePath)) {
            throw new RuntimeException(
                    "Resume file does not exist");
        }

        try (PDDocument document = Loader.loadPDF(filePath.toFile())) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document).trim();

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to extract text from resume",
                    e);
        }
    }
}