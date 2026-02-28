# Secure Assessment Project

This project demonstrates the difference between a vulnerable REST API and a secured version of the same API.

## Project Structure

```
secure-assessment-project/
├── vulnerable-bank-api/
└── secure-bank-api/
```

---

## 🔴 Vulnerable API

Demonstrates common security issues:

- Plaintext password storage
- Hardcoded JWT secret
- No input validation
- No authorization middleware
- Broken access control (admin routes unprotected)

---

## 🟢 Secure API

Implements security best practices:

- Password hashing with bcrypt
- JWT authentication with environment variables
- Role-based access control (admin-only routes)
- Input validation with express-validator
- Security headers with Helmet
- Password field excluded from responses

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- Helmet

---

## How to Run

### 1. Install Dependencies
```
npm install
```

### 2. Create .env File (for secure version)
```
JWT_SECRET=your_super_secret_key
```

### 3. Start Server
```
node server.js
```

---

## Purpose

This project was created to demonstrate:
- Identification of common API vulnerabilities
- Implementation of secure authentication and authorization
- Secure coding best practices in Node.js

---

## Author

Your Name