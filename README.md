# Employee Leave Management System (ELMS)

[![GitHub issues](https://img.shields.io/github/issues/yourusername/employee-leave-management)](https://github.com/yourusername/employee-leave-management/issues)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/employee-leave-management)](https://github.com/yourusername/employee-leave-management/network)
[![GitHub stars](https://img.shields.io/github/stars/yourusername/employee-leave-management)](https://github.com/yourusername/employee-leave-management/stargazers)
[![License](https://img.shields.io/github/license/yourusername/employee-leave-management)](LICENSE)

---

## Overview

The **Employee Leave Management System (ELMS)** is a full-stack web application that automates employee leave management in organizations.  
It allows employees to **apply for leave**, managers to **approve or reject**, and automatically tracks **leave balance and history**.

This system eliminates manual leave tracking, reduces errors, and improves transparency.

---

## 🔥 Features

- **Authentication & Authorization**
  - Secure login & registration using JWT
  - Role-based access for employees and managers
- **Employee Dashboard**
  - Apply for leave with start/end date and reason
  - View leave history and remaining balance
- **Manager/HR Dashboard**
  - Approve or reject employee leave requests
  - Monitor team leave status
- **Security**
  - Password hashing with `bcryptjs`
  - HTTP-only cookies for session management
- **Database**
  - MySQL relational database using raw SQL queries

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** MySQL  
- **Authentication:** JWT + HTTP-only cookies  
- **Other Libraries:** bcryptjs, cookie-parser, dotenv

---

## 🗂️ Database Structure

**Users Table**
| Column      | Type | Description |
|------------|------|------------|
| id         | INT  | Primary key |
| name       | VARCHAR(100) | Employee/Manager name |
| email      | VARCHAR(100) | Unique email |
| password   | VARCHAR(255) | Hashed password |
| role       | ENUM('employee','admin') | Role |
| created_at | TIMESTAMP | Auto timestamp |

**Leaves Table**
| Column      | Type | Description |
|------------|------|------------|
| id         | INT  | Primary key |
| user_id    | INT  | Foreign key → users.id |
| start_date | DATE | Leave start |
| end_date   | DATE | Leave end |
| reason     | VARCHAR(255) | Leave reason |
| status     | ENUM('pending','approved','rejected') | Leave status |
| created_at | TIMESTAMP | Auto timestamp |

