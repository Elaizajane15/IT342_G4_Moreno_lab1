# IT342_G4_Moreno_lab1
# DailyThoughts

 Project Description

DailyThoughts is a straightforward social web and mobile application that allows users to register, log in, and share short text-based thoughts similar to a Twitter-style feed. Users can create, edit, and delete their own thoughts, comment on other users’ posts, view public posts, and browse user profiles.

The system is built with a Spring Boot backend API, a React web application, and an Android mobile application, providing a consistent and user-friendly experience across platforms.

Technologies Used

Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security (JWT Authentication)
- MySQL
- Gradle

Web Frontend
- React (Vite)
- JavaScript
- Axios
- HTML / CSS

Mobile App
- Android Studio
- Kotlin
- REST API Integration

Tools
- Git & GitHub
- VS Code
- IntelliJ IDEA
- MySQL Workbench
- Postman

 Steps to Run Backend (Spring Boot)
- Open a terminal in the project root.
- Navigate to the backend folder:

cd backend
- Run the Spring Boot application:
./gradlew bootRun
- or (Windows PowerShell):
gradlew bootRun
- Backend will run at:
  - http://localhost:8080

Steps to Run Web App (React)
- Open a new terminal.
- Navigate to the frontend folder:

```
cd frontend
```

- Install dependencies:

```
npm install
```

- Start the development server:

```
npm run dev
```

- Open the browser:
  - http://localhost:5173

Steps to Run Mobile App (Android)
- Open Android Studio.
- Open the mobile project folder.
- Sync Gradle files.
- Configure the backend base URL (e.g. `http://10.0.2.2:8080` for emulator).
- Run the app using an emulator or physical device.

 List of API Endpoints

Authentication
- POST /api/auth/register – Register new user
- POST /api/auth/login – User login
- POST /api/auth/logout – User logout

Posts (Daily Thoughts)
- GET /api/posts – Get all posts
- POST /api/posts – Create a new post
- PUT /api/posts/{id} – Update own post
- DELETE /api/posts/{id} – Delete own post

Comments
- GET /api/posts/{id}/comments – Get comments for a post
- POST /api/posts/{id}/comments – Add comment to a post

Profile
- GET /api/users/{id} – View user profile
- GET /api/users/{id}/posts – View posts by user
