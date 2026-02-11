package backendApplication.example.backend.controller;

import backendApplication.example.backend.dto.AuthResponse;
import backendApplication.example.backend.dto.LoginRequest;
import backendApplication.example.backend.dto.RegisterRequest;
import backendApplication.example.backend.model.User;
import backendApplication.example.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthService authService, PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        try {
            User u = authService.registerUser(req);
            return ResponseEntity.ok(u.getUsername());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            AuthResponse resp = authService.authenticate(req);
            return ResponseEntity.ok(resp);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(401).body(ex.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) return ResponseEntity.badRequest().body("No token provided");
        String token = authHeader.substring(7);
        authService.invalidateToken(token);
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/hash")
    public ResponseEntity<?> hash(@RequestParam("password") String password) {
        String hashed = passwordEncoder.encode(password);
        return ResponseEntity.ok(hashed);
    }
}
