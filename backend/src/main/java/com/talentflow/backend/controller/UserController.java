package com.talentflow.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentflow.backend.dto.user.UpdateUserRequest;
import com.talentflow.backend.dto.user.UserResponse;
import com.talentflow.backend.model.User;
import com.talentflow.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers()
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser() {

        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        String email = authentication.getName();

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with email: " + email));

        return ResponseEntity.ok(toResponse(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable String id) {

        User user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with id: " + id));

        return ResponseEntity.ok(toResponse(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable String id,
            @Valid @RequestBody UpdateUserRequest request) {

        User user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with id: " + id));

        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());

        if (request.getRole() != null &&
                !request.getRole().isBlank()) {
            user.setRole(request.getRole().toUpperCase());
        }

        User updatedUser = userService.updateUser(user);

        return ResponseEntity.ok(toResponse(updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable String id) {

        if (userService.getUserById(id).isEmpty()) {
            throw new RuntimeException(
                    "User not found with id: " + id);
        }

        userService.deleteUser(id);

        return ResponseEntity.noContent().build();
    }

    private UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole());
    }
}