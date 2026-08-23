package com.talentflow.backend.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Schema;
import com.google.genai.types.Type;

@Service
public class GeminiAiService {

    private static final String MODEL = "gemini-2.5-flash";

    private final Client client;
    private final ObjectMapper objectMapper;

    public GeminiAiService() {

        String apiKey = System.getenv("GEMINI_API_KEY");

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                    "GEMINI_API_KEY environment variable is not set");
        }

        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.objectMapper = new ObjectMapper();
    }

    // ============================================================
    // AI RESUME ANALYSIS
    // ============================================================

    public Map<String, Object> analyzeResume(
            String resumeText) {

        if (resumeText == null || resumeText.isBlank()) {
            throw new IllegalArgumentException(
                    "Resume text cannot be empty");
        }

        String prompt = """
                You are an ATS resume analysis engine.

                Analyze the following resume carefully.

                Evaluate these areas from the actual resume content:

                1. Skills and keyword coverage
                2. Experience relevance and quality
                3. Projects relevance and quality
                4. Resume completeness
                5. ATS readiness and readability

                Score EACH category from 0 to 100.

                Also provide:
                - Professional summary
                - Detected skills
                - Strengths
                - Weaknesses
                - Missing or weak ATS keywords
                - Practical improvement suggestions
                - Overall recommendation

                Scoring guidance:

                skillsScore:
                Consider technical skills, role-relevant skills,
                keyword coverage, and evidence of using the skills.

                experienceScore:
                Consider relevant experience, responsibilities,
                technologies used, achievements, and depth.

                projectsScore:
                Consider project relevance, technical complexity,
                technologies, implementation details, and outcomes.

                completenessScore:
                Consider presence and quality of summary, skills,
                education, experience, projects, certifications,
                and other important resume sections.

                atsReadinessScore:
                Consider keyword clarity, section structure,
                readability, concise wording, and ATS-friendly content.

                IMPORTANT:
                - Do not invent information.
                - Only use information present in the resume.
                - Do not give high scores just because a section exists.
                - Judge the QUALITY and RELEVANCE of the content.
                - Scores must be between 0 and 100.
                - Return JSON matching the requested schema.

                RESUME:
                --------------------
                %s
                --------------------
                """.formatted(resumeText);

        Map<String, Schema> resumeProperties = new HashMap<>();

        resumeProperties.put(
                "summary",
                Schema.builder()
                        .type(Type.Known.STRING)
                        .build());

        resumeProperties.put(
                "skills",
                stringArraySchema());

        resumeProperties.put(
                "strengths",
                stringArraySchema());

        resumeProperties.put(
                "weaknesses",
                stringArraySchema());

        resumeProperties.put(
                "missingKeywords",
                stringArraySchema());

        resumeProperties.put(
                "suggestions",
                stringArraySchema());

        resumeProperties.put(
                "recommendation",
                Schema.builder()
                        .type(Type.Known.STRING)
                        .build());

        resumeProperties.put(
                "skillsScore",
                scoreSchema());

        resumeProperties.put(
                "experienceScore",
                scoreSchema());

        resumeProperties.put(
                "projectsScore",
                scoreSchema());

        resumeProperties.put(
                "completenessScore",
                scoreSchema());

        resumeProperties.put(
                "atsReadinessScore",
                scoreSchema());

        Schema schema = Schema.builder()
                .type(Type.Known.OBJECT)
                .properties(resumeProperties)
                .required(
                        "summary",
                        "skills",
                        "strengths",
                        "weaknesses",
                        "missingKeywords",
                        "suggestions",
                        "recommendation",
                        "skillsScore",
                        "experienceScore",
                        "projectsScore",
                        "completenessScore",
                        "atsReadinessScore")
                .build();
        GenerateContentConfig config = GenerateContentConfig.builder()
                .responseMimeType("application/json")
                .candidateCount(1)
                .responseSchema(schema)
                .build();

        GenerateContentResponse response = client.models.generateContent(
                MODEL,
                prompt,
                config);

        return parseJson(response.text());
    }

    // ============================================================
    // AI JOB MATCHING
    // ============================================================

    public Map<String, Object> matchResumeToJob(
            String resumeText,
            String jobTitle,
            String jobDescription) {

        if (resumeText == null || resumeText.isBlank()) {
            throw new IllegalArgumentException(
                    "Resume text cannot be empty");
        }

        if (jobDescription == null || jobDescription.isBlank()) {
            throw new IllegalArgumentException(
                    "Job description cannot be empty");
        }

        String prompt = """
                You are an AI recruitment and ATS matching engine.

                Compare the candidate resume against the job.

                Analyze:
                1. Required technical skills
                2. Relevant professional skills
                3. Experience relevance
                4. Projects relevance
                5. Keywords
                6. Overall semantic fit

                Calculate a realistic match score from 0 to 100.

                IMPORTANT:
                - Do not invent candidate experience.
                - Only use evidence from the resume.
                - Distinguish between matched and missing skills.
                - Score based on actual relevance, not just keyword overlap.
                - Scores must be between 0 and 100.
                - Return JSON matching the requested schema.

                JOB TITLE:
                %s

                JOB DESCRIPTION:
                --------------------
                %s
                --------------------

                CANDIDATE RESUME:
                --------------------
                %s
                --------------------
                """.formatted(
                jobTitle != null ? jobTitle : "",
                jobDescription,
                resumeText);

        Schema schema = Schema.builder()
                .type(Type.Known.OBJECT)
                .properties(Map.of(

                        "matchScore",
                        scoreSchema(),

                        "matchedSkills",
                        stringArraySchema(),

                        "missingSkills",
                        stringArraySchema(),

                        "matchingStrengths",
                        stringArraySchema(),

                        "gaps",
                        stringArraySchema(),

                        "recommendation",
                        Schema.builder()
                                .type(Type.Known.STRING)
                                .build(),

                        "explanation",
                        Schema.builder()
                                .type(Type.Known.STRING)
                                .build()))
                .required(
                        "matchScore",
                        "matchedSkills",
                        "missingSkills",
                        "matchingStrengths",
                        "gaps",
                        "recommendation",
                        "explanation")
                .build();

        GenerateContentConfig config = GenerateContentConfig.builder()
                .responseMimeType("application/json")
                .candidateCount(1)
                .responseSchema(schema)
                .build();

        GenerateContentResponse response = client.models.generateContent(
                MODEL,
                prompt,
                config);

        Map<String, Object> result = parseJson(response.text());

        // Keep the model output within valid score boundaries.
        Object scoreObject = result.get("matchScore");

        if (scoreObject instanceof Number number) {

            double score = number.doubleValue();

            score = Math.max(0, Math.min(100, score));

            result.put("matchScore", score);

        } else {

            result.put("matchScore", 0);
        }

        return result;
    }

    // ============================================================
    // SCHEMA HELPERS
    // ============================================================

    private Schema stringArraySchema() {

        return Schema.builder()
                .type(Type.Known.ARRAY)
                .items(
                        Schema.builder()
                                .type(Type.Known.STRING)
                                .build())
                .build();
    }

    private Schema scoreSchema() {

        return Schema.builder()
                .type(Type.Known.NUMBER)
                .build();
    }

    // ============================================================
    // JSON PARSER
    // ============================================================

    private Map<String, Object> parseJson(
            String json) {

        if (json == null || json.isBlank()) {
            throw new RuntimeException(
                    "Gemini returned an empty response");
        }

        try {

            return objectMapper.readValue(
                    json,
                    new TypeReference<Map<String, Object>>() {
                    });

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse Gemini response",
                    e);
        }
    }
}