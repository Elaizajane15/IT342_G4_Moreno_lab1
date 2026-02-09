package backendApplication.example.backend.controller;

import backendApplication.example.backend.dto.AuthResponse;
import backendApplication.example.backend.model.User;
import backendApplication.example.backend.repository.UserRepository;
import backendApplication.example.backend.security.JwtTokenProvider;
import backendApplication.example.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class UserController {

  private final JwtTokenProvider tokenProvider;
  private final AuthService authService;
  private final UserRepository userRepository;

  public UserController(JwtTokenProvider tokenProvider, AuthService authService, UserRepository userRepository) {
    this.tokenProvider = tokenProvider;
    this.authService = authService;
    this.userRepository = userRepository;
  }

  @GetMapping("/api/me")
  public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    String token = authHeader.substring(7);
    if (!tokenProvider.validateToken(token) || authService.isTokenInvalidated(token)) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    String username = tokenProvider.getUsername(token);
    Optional<User> userOpt = userRepository.findByUsername(username);
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(404).body("User not found");
    }
    User u = userOpt.get();
    return ResponseEntity.ok(new AuthResponse(null, u.getUsername(), u.getEmail(), u.getFullName()));
  }

  @GetMapping("/api/users")
  public ResponseEntity<?> users(@RequestHeader(value = "Authorization", required = false) String authHeader) {
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    String token = authHeader.substring(7);
    if (!tokenProvider.validateToken(token) || authService.isTokenInvalidated(token)) {
      return ResponseEntity.status(401).body("Unauthorized");
    }
    List<AuthResponse> list = userRepository.findAll().stream()
        .map(u -> new AuthResponse(null, u.getUsername(), u.getEmail(), u.getFullName()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(list);
  }
}
