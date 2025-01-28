# Hyperesume: System Design Overview

The system is based on a **three-tier architecture** with a **React frontend**, a **Spring Boot backend**, and a **MySQL database**.

## I. Architecture Diagram

The architecture diagram is split into three main layers:

1. **Client Layer (Frontend)**
2. **Server Layer (Backend)**
3. **Database Layer (MySQL)**

Each layer contains specific components and functions designed to handle different aspects of the application. Here’s a detailed breakdown of each layer:

### 1. Client Layer (Frontend)
#### a. **Components**:
- **React Application**: The main user interface built with React. It consists of different pages (e.g., Login, Signup, Profile, Resume Builder) where users can interact with the application.
- **Axios for API Requests**: Axios is used to make HTTP requests to the backend. It handles API calls for user authentication, resume management, profile updates, etc.
- **React Router**: Manages navigation within the application, allowing users to move between pages without reloading the app.
- **Local Storage/Cookies**: Stores the JWT token after login for subsequent authenticated requests.

#### b. **Data Flow in the Client Layer**:
- **User Authentication**: The user enters their credentials, which are sent to the backend via Axios. The JWT received from the backend is stored in local storage or cookies.
- **Data Fetching and Submitting**: When a user edits their profile or resume, Axios sends POST, PUT, or GET requests to the backend endpoints.
- **PDF Export**: Uses html2pdf.js or similar libraries to generate a downloadable PDF file of the user’s resume.

#### c. **Interactions**:
- Communicates with the backend (Server Layer) through RESTful API calls to fetch, update, or delete data based on user actions.
- Provides a responsive UI that enables smooth navigation and interaction for both desktop and mobile devices.

### 2. Server Layer (Backend)
The Server Layer is a **Spring Boot** application that acts as the core logic of the system. It processes client requests, manages business logic, handles data validation, and enforces security policies.

#### a. **Components**:  

##### **Controllers**:
- **AuthenticationController**: Manages login and signup endpoints, issuing JWTs for authenticated access.
- **UserController**: Handles user profile management (e.g., getting and updating profile information).
- **ResumeController**: Manages CRUD operations for resumes, allowing users to create, view, edit, and delete resumes.
- **AdminController**: Restricted to ADMI Nusers, allowing them to view, manage, and control user data.

##### **Services**:
- **AuthService**: Handles authentication and authorization, including password hashing and JWT generation/validation.
- **UserService**: Manages all logic related to user profiles, such as updates to user information.
- **ResumeService**: Manages all operations related to resumes, including saving drafts and updates.
- **AdminService**: Handles additional admin functionalities, such as user management and monitoring.

##### **Repositories**:
- **UserRepository**, **ResumeRepository**: Interfaces for interacting with the database, abstracting CRUD operations on tables.

##### **Security**:
- **JWT Authentication**: Verifies JWT tokens on each request to ensure users are authenticated and authorized.
- **Role-Based Access Control (RBAC)**: Differentiates access permissions for USER and ADMI Nroles.

##### **Design Patterns**:
- **Factory Pattern**: Creates instances of resume templates and user profiles.
- **Singleton Pattern**: Manages database connections to ensure efficient resource utilization.

#### b. **Data Flow in the Server Layer**:
- **Authentication**: On login, the backend validates the credentials and, if successful, issues a JWT token. This token is returned to the frontend and used for subsequent API requests.
- **Resume CRUD Operations**: The backend handles all CRUD operations on resume data, with requests validated and processed through the ResumeController and ResumeService.
- **Admin Management**: Admins interact with the AdminController, which validates their role and allows them to view and manage user data.

#### c. **Interactions**:
- Communicates with the Client Layer through RESTful APIs to receive requests and return responses.
- Interacts with the Database Layer to persist and retrieve data related to users, resumes, and roles.

### 3. Database Layer (MySQL)

The Database Layer is the **MySQL database** that stores all application data, ensuring durability and consistency across user sessions. This data includes user credentials, profile information, resumes, and administrative records.

#### a. **Tables and Relationships**:

##### **Users Table**:
- Stores user-specific data such as id, username, email, hashed\_password, role (either USER or ADMIN), and other contact information.
  - Relationships:
    - Each user can have multiple resumes, creating a one-to-many relationship between the Users and Resumes tables.

##### **Sys\_role\_user Table**:
- Serves as a junction table to manage the many-to-many relationship between users and roles. This table links each user to their assigned roles, allowing users to have multiple roles, and each role to be assigned to multiple users.
  - Relationship:
    - Each entry in this table represents an association between a user and a role, creating a many-to-many relationship between Sys\_User and Sys\_Role.
    
##### **Sys\_Role Table**:
- Stores role-specific data such as role\_id and role\_name, which defines the different roles available in the system, such as USER or ADMIN.
  - Relationships:
    - Each role can be associated with multiple users through the Sys\_role\_user table, creating a many-to-many relationship between the Sys\_Role and Sys\_User tables.
   
##### **Sys\_menu\_role Table**:
- Serves as a junction table that links roles and menu items, allowing roles to have access to multiple menus and menus to be accessible by multiple roles.
  - Relationships:
    - Each entry in this table represents an association between a role and a menu, creating a many-to-many relationship between Sys\_Role and Sys\_menu.
   
##### **Sys\_menu Table**:
- Stores menu or permission-specific data, including menu\_id, menu\_name, description, and url, which represent different access points or functionalities within the system.
  - Relationships:
    - Each menu can be associated with multiple roles through the Sys\_menu\_role table, creating a many-to-many relationship between the Sys\_menu and Sys\_Role tables.

##### **Resumes Table**:
- Contains details of each resume, including fields for id, user\_id (foreign key), title, and created\_at timestamp.
- Contains references to various sections (e.g., education, work\_experience) that are part of the resume.
  - Relationships:
    - Linked to Users by the user\_id foreign key.
    - Linked to resume sections by foreign keys, enabling flexibility in resume structure.

##### **Resume Sections Tables** (e.g., Education, Experience, Skills):
- Stores each individual section of a resume. For example, the Education table would include fields like institution, degree, and date\_range.
- Separate tables for each section type allow detailed data handling and organization.

#### b. **Data Flow in the Database Layer**:
- **User Data**: When a new user registers or updates their profile, the Users table is updated accordingly.
- **Resume Data**: Each resume and its associated sections are stored in respective tables, providing structured storage and easy retrieval.
- **Admin Actions**: If needed, an optional admin logs table can store details of actions performed by admins for auditing purposes.

#### c. **Interactions**:
- Communicates with the Server Layer using SQL queries issued by Spring Data JPA repositories (e.g., UserRepository, ResumeRepository).
- Ensures data persistence for user sessions, resume drafts, and profile updates.

### Summary of Architecture Diagram

To summarize, the architecture can be visualized as:

1. **Client Layer (Frontend)**:
   - React app with components for user interaction.
   - Uses Axios for API requests to the backend.
   - Handles JWT storage and basic routing with React Router.
2. **Server Layer (Backend)**:
   - Spring Boot server with controllers, services, repositories, and security configurations.
   - Controllers expose RESTful API endpoints for frontend interaction.
   - Services handle business logic, while repositories interact with the database.
3. **Database Layer (MySQL)**:
- MySQL database with tables for Users, Resumes, and Resume Sections.
- Manages relationships between users and their resumes, storing and organizing resume sections for easy retrieval.

## II. Component Breakdown
### 1. Frontend (React)
#### a. **Components**:
- **Login / Signup Pages**: Provides user authentication and account creation.
- **Profile Page**: Allows users to add or update their personal and contact information.
- **Resume Builder Page**: The main interface for creating and editing resumes. Includes fields for contact info, work experience, skills, education, etc.
- **Admin Dashboard**: For admins to view and manage registered users.
- **PDF Export Feature**: Allows users to preview and download their resumes as PDFs.
#### b. **State Management**:
- The frontend uses React’s state management to store UI states and Axios for HTTP requests to the backend. Optional: Redux for complex state management.
#### c. **Routing**:
- React Router handles routing between pages (Login, Profile, Resume Builder, etc.).
#### d. **API Integration**:
- Axios is used to make authenticated API calls to the backend.

### 2. Backend (Spring Boot)
#### a. **Controllers**:
- **AuthenticationController**: Manages user login and signup, issuing JWTs upon successful login.
- **UserController**: Manages user profile information, including CRUD operations on user data.
- **ResumeController**: Handles creation, update, deletion, and retrieval of resumes for each user.
- **AdminController**: Manages admin-specific functionalities, like viewing and managing all users.
#### b. **Services**:
- **AuthService**: Handles authentication logic, including JWT generation and validation.
- **UserService**: Manages user data and operations like profile updates.
- **ResumeService**: Manages CRUD operations for resumes, allowing users to create multiple resumes with different templates.
- **AdminService**: Provides additional admin functions for user management and data monitoring.
#### c. **Security**:
- **JWT Authentication**: Secures API endpoints, with different permissions for USER and ADMI Nroles.
- **CORS Configuration**: Allows the frontend to make API requests to the backend from different domains.
#### d. **Design Patterns**:
- **Factory Pattern**: Used to create resume templates and user profiles.
- **Singleton Pattern**: Applied to manage database connections.
- **SOLID Principles**: Ensures well-structured, maintainable code with loosely coupled components.

### 3. Database (MySQL)

#### **Tables**:

- **Users**: Stores user data, including credentials (hashed), contact info, and roles (USER or ADMI N).
- **Resumes**: Stores resume data, including references to user profiles, resume sections (education, experience, skills), and the selected template.
- **Resume Sections**: Stores detailed resume sections such as work experience, education, skills, projects, and certifications. Each section is linked to a resume.
- **Admin Logs** (optional): Keeps a record of admin actions for audit and monitoring purposes.

## III. Data Flow
### 1. **User Authentication**:
- Users sign up or log in through the frontend.
- The frontend sends login/signup requests to AuthenticationController on the backend.
- The backend validates credentials and, on success, issues a JWT token, which is stored on the frontend (in local storage or cookies) for authenticated requests.
### 2. **Resume Creation and Management**:
- The frontend sends requests to ResumeController to create, update, retrieve, or delete resume data.
- **Data Model**: Each resume is composed of multiple sections (education, experience, skills, etc.), allowing users to customize their resumes.
- **Inline Editing**: Users can edit resume fields directly, with changes sent via API requests to update the backend in real time.
### 3. **PDF Export**:
- The frontend uses a library (e.g., html2pdf.js) to generate a PDF version of the resume.
- Alternatively, an API endpoint in the backend could generate and serve PDFs.
### 4. **Admin Operations**:
- Admins log in through the frontend and access the Admin Dashboard.
- The dashboard uses the AdminController to retrieve user data and manage users.
- Admin actions (e.g., banning users or reviewing profiles) are tracked in the backend.

## IV. Technologies Used

### 1. Frontend
- **React** for UI
- **Axios** for API requests
- **React Router** for navigation
- **html2pdf.js** for PDF export
### 2. Backend
- **Java Spring Boot** for REST API
- **JWT** for authentication
- **Spring Security** for role-based access control
### 3. **Database**:
- **MySQL** for storing user, resume, and admin data

## V. Additional Design Considerations  
1. **Error Handling**
- Error handling in the backend and frontend layers to ensure smooth user experience
2. **Data Security and Compliance**
- Measures like data encryption, SQL injection prevention, and GDPR compliance.
3. **Testing Strategy**
- Details on unit, integration, and end-to-end testing frameworks and methodologies.
4. **API Documentation**
- Using Swagger for live API documentation to streamline development and testing.
