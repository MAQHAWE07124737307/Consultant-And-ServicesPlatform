# Consultation & Services Platform

## Overview

The Consultation & Services Platform is a full-stack web application designed to connect clients with consultants.

The system allows users to:
- Register and log in securely
- Book consultations
- Manage appointments
- View available services
- Perform role-based actions (Admin / Consultant / Client)

This project demonstrates full-stack development using ASP.NET Core Web API and React.

---

## Tech Stack

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- JWT Authentication
- Role-Based Access Control (RBAC)

### Frontend
- React
- React-Bootstrap
- Axios

---

## Features

- Secure authentication using JWT
- Role-based authorization:
  - Admin (Full system control)
  - Consultant (Manage services and appointments)
  - Client (Book and manage consultations)
- CRUD operations for:
  - Users
  - Services
  - Appointments
- RESTful API architecture
- Frontend and backend integration

---

## Important Configuration

This repository does NOT include the `appsettings.json` file for security reasons.

To run the backend, you must manually create an `appsettings.json` file inside the API project and include your own:

- SQL Server connection string
- JWT configuration settings

Example structure:

{
  "ConnectionStrings": {
    "DefaultConnection": "Your_Connection_String_Here"
  },
  "Jwt": {
    "Key": "Your_Secret_Key_Here",
    "Issuer": "Your_Issuer",
    "Audience": "Your_Audience"
  }
}

---

## How to Run the Project

### Backend Setup
1. Clone the repository
2. Create your own `appsettings.json` file with a valid connection string
3. Run database migrations:
   dotnet ef database update
4. Start the API:
   dotnet run

### Frontend Setup
1. Navigate to the client folder
2. Install dependencies:
   npm install
3. Start the application:
   npm start

---

## Project Status

This project is currently under active development.  
Additional features and improvements are still being implemented.

Planned improvements include:
- Payment integration
- Email notifications
- Calendar scheduling
- Deployment to cloud infrastructure

---

## Author

Machawe Dube  
Bachelor of Information Technology (BIT) Graduate  
ASP.NET | React | SQL Server Developer  
Open to internship and junior developer opportunities
