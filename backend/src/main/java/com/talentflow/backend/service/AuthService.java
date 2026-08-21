package com.talentflow.backend.service;

import com.talentflow.backend.dto.auth.AuthResponse;
import com.talentflow.backend.dto.auth.LoginRequest;
import com.talentflow.backend.dto.auth.RegisterRequest;
import com.talentflow.backend.model.User;
import com.talentflow.backend.repository.UserRepository;
import com.talentflow.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException(
                    "An account with this email already exists");
        }

        String role = request.getRole().toUpperCase();

        if (!role.equals("CANDIDATE") &&
                !role.equals("RECRUITER")) {

            throw new RuntimeException(
                    "Role must be CANDIDATE or RECRUITER");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        User savedUser = userRepository.save(user);

        String token = jwtService.generateToken(
                savedUser.getEmail(),
                savedUser.getRole());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole());
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(
                request.getEmail().toLowerCase()).orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole());

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole());
    }
}