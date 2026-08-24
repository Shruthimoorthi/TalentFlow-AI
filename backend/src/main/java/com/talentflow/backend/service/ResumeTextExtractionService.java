package com.talentflow.backend.service;

import com.talentflow.backend.model.Resume;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class ResumeTextExtractionService {

    private final ResumeService resumeService;

    public ResumeTextExtractionService(
            ResumeService resumeService) {

        this.resumeService = resumeService;
    }

    public String extractText(Resume resume) {

        if (resume == null) {
            throw new RuntimeException(
                    "Resume not found");
        }

        if (resume.getFileUrl() == null ||
                resume.getFileUrl().isBlank()) {

            throw new RuntimeException(
                    "Resume file is not available");
        }

        try {

            // Get the PDF through the same backend method
            // used by the PDF viewer.
            byte[] pdfBytes = resumeService.downloadResumeFile(resume);

            if (pdfBytes == null ||
                    pdfBytes.length == 0) {

                throw new IOException(
                        "Downloaded resume is empty");
            }

            try (PDDocument document = Loader.loadPDF(pdfBytes)) {

                PDFTextStripper stripper = new PDFTextStripper();

                String text = stripper
                        .getText(document)
                        .trim();

                if (text.isBlank()) {

                    throw new IOException(
                            "No readable text found in resume PDF");
                }

                return text;
            }

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to extract text from resume: " +
                            e.getMessage(),
                    e);
        }
    }
}