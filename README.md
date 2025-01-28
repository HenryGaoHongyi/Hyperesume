# Hyperesume

Hyperesume is a full-featured resume builder application designed to help job seekers create professional, customized resumes. By using Hyperesume, users can streamline the resume-building process through a structured, user-friendly interface that enables them to add, edit, and manage various sections of their resumes, such as contact information, education, work experience, skills, and projects.

The application also supports multiple resume templates, allowing users to select a layout that best fits their professional profile. In addition, users can preview and export their resumes as PDFs for easy sharing with potential employers.

## Contents

- [Description of Project](#description-of-project)
- [Contents](#contents)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Important Functionalities](#important-functionalities)

## Features

1. **User Authentication and Role-Based Access Control**

- Users can securely sign up, log in, and manage their accounts through a JWT-based authentication system.
- The application includes two primary roles: `USER` and `ADMIN`.
  - **Users** can create, edit, and manage their resumes.
  - **Admins** have additional permissions to view and manage all registered users, facilitating control over user-generated content.

2. **Resume Management**

- Users can create multiple resumes within their accounts, with each resume containing various sections (such as education, work experience, skills, and certifications).
- Inline editing allows users to quickly update details directly on the resume view, providing a seamless editing experience.

3. **PDF Export and Draft Saving**

- Users can preview their resume in the selected template format and export it as a PDF for easy sharing.
- The system allows users to save resume drafts, enabling them to make continuous updates without losing progress.

4. **Admin Dashboard**

- Admins can view a dashboard that provides a summary of all registered users and offers options to manage user data and control access.

5. **Responsive Design**

- The application is optimized for mobile and desktop views, ensuring that users can manage their resumes and profile information across devices.

## Tech Stack

### Frontend
- React (JavaScript)
- HTML/CSS
- `html2pdf.js` (for PDF export)

### Backend
- Java Spring Boot
- JWT for authentication
- MySQL (Database)

## Project Structure

```plaintext
hyperesume/
├── backend/                
│   ├── src/main/java
│   ├── src/main/resources
│   └── pom.xml
└── frontend/                
    ├── public
    ├── src
    └── package.json
```

## Important Functionalities

The project includes the following functionalities as required:

- Object-oriented principles: Applied through classes, data types, strings, and enums.
- Inheritance and Polymorphism: Utilized in service interfaces and API abstraction.
- Generics and Collections: Used in list-based data handling and sorting algorithms.
- Inner Classes, Exception Handling, File I/O: Applied for utility functions, handling errors, and file operations.
- SOLID Design Principles: Ensured in service and controller structure.
- Singleton Pattern and Object Factories: Implemented in database connection management and object creation.
- Lambda Expressions and Anonymous Classes: Used in stream operations and event handling.
- Comparators and Comparable Interface: Applied for sorting user or resume data.
- Stream API and Functional Programming: Used for efficient data processing.
- Queue and Stack Data Structures: Utilized for recent actions and request handling.