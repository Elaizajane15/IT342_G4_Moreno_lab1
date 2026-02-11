# IT342_G4_Moreno_lab1

## Today’s Completed Work
- Backend runs on http://localhost:8080 with MariaDB config in `application.properties`
- Added `/api/auth/hash` helper to generate BCrypt hashes for password resets
- Created Maven `pom.xml` for backend alongside Gradle and pushed to GitHub
- Removed unused H2/MariaDB profile files; kept a single clear datasource config
- Resolved “Failed to fetch” by starting both servers; verified Tomcat binds to 8080
- Frontend UI polish:
  - Redesigned Register and Login to matching card layouts with avatar initials
  - Added cross-links: Register → “Already have an account? Sign in”; Login → “Sign up”
  - Hid top nav on Login/Register; kept nav only on Dashboard
  - Profile view shows username, full name, and email with improved layout
- Both servers live:
  - Frontend: http://localhost:5174/
  - Backend: http://localhost:8080/

## How to Run
- Backend (Gradle): `./gradlew.bat bootRun`
- Backend (Maven): `mvn spring-boot:run`
- Frontend: `npm --prefix frontend run dev`

