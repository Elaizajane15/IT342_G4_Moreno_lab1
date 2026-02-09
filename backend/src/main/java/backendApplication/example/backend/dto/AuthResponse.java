package backendApplication.example.backend.dto;

public class AuthResponse {
    private String token;
    private String username;
    private String email;
    private String fullName;
    private boolean me;

    public AuthResponse() {}

    public AuthResponse(String token, String username, String email, String fullName) {
        this.token = token;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public boolean isMe() { return me; }
    public void setMe(boolean me) { this.me = me; }
}
