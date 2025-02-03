# Frontend Documentation

## Project Overview
This is the frontend of the Healthcare App, built using Angular. The application allows patients to submit health issues, which are reviewed by an admin. The admin assigns the issue to a health professional, who provides a recommendation that is sent back to the patient.

## Getting Started
Follow these steps to set up and run the project on your local machine.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Angular CLI](https://angular.io/cli)
- [Git](https://git-scm.com/)

### Installation Steps
1. **Clone the repository**
   ```sh
   git clone <repository-url>
   ```
2. **Navigate to the project directory**
   ```sh
   cd healthcare-frontend
   ```
3. **Install dependencies**
   ```sh
   npm install
   ```
4. **Configure environment variables**
   - Create an `environment.ts` file inside `src/environments/`
   - Define the API base URL and other necessary configurations
   ```ts
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:5000/api'
   };
   ```
5. **Run the application**
   ```sh
   ng serve --open
   ```
   The application should open automatically in your default browser at `http://localhost:4200/`.

## Project Structure
```
healthcare-frontend/
│-- src/
│   │-- app/
│   │   │-- components/   # Reusable UI components
│   │   │-- services/     # API calls and data handling
│   │   │-- pages/        # Application pages (Dashboard, Login, etc.)
│   │   │-- app.module.ts # Main module
│   │-- environments/
│   │   │-- environment.ts # Environment configuration
│   │-- main.ts           # Application entry point
│   │-- index.html        # Main HTML file
│-- angular.json         # Angular configuration
│-- package.json         # Dependencies and scripts
│-- README.md            # Project documentation
```

## Application Flow
### 1. User Authentication
- A new user (patient) signs up.
- The user logs in and gets authenticated.

### 2. Submitting a Health Issue
- Once logged in, the patient submits a health issue via a form.
- The data is sent to the backend via an API request.

### 3. Admin Dashboard
- Admin users can log in and view submitted health issues.
- Each health issue is listed with details.
- The admin assigns the issue to a health professional.

### 4. Health Professional Dashboard
- The assigned health professional views the issue.
- The professional provides a recommendation.
- The recommendation is submitted back to the patient.

### 5. Patient Receives Recommendation
- The patient can view the response from the health professional.
- The process is complete once the patient receives the recommendation.

## Data Display Issue Explanation
Currently, the application does not correctly display the health issues on the admin and health professional dashboards due to potential API response issues or incorrect state management. To resolve this:
1. **Verify API Calls:** Ensure the frontend correctly fetches assigned issues from the backend.
2. **Check State Management:** Use Angular services or state management libraries like NgRx to store and update assigned health issues.
3. **Inspect Backend API Responses:** Debug the backend API to confirm correct data is being sent.

## Conclusion
This frontend integrates with the backend to manage patient health issues efficiently. If you encounter any issues, ensure the API is running correctly and check network requests in the browser console.

For further improvements, consider implementing a global state management solution and refining API error handling for better debugging and reliability.

