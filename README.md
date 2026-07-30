# UIS Lunch

UIS Lunch is a full-stack web application designed to digitize the purchase and delivery workflow of the **Universidad Industrial de Santander student meal program**.

The system allows students to access the service online, review available meal options, register purchases, receive notifications, and use a QR code when collecting an order. It also provides an administrative interface for managing information and reviewing operational reports.

This project was developed in the **Software Engineering II** course at Universidad Industrial de Santander during the 2025-1 academic semester.

## Problem

The traditional in-person process can create long waiting times, uncertainty about meal availability, and difficulties validating whether a student is eligible to purchase a meal.

UIS Lunch explores a digital workflow that can:

- Make meal purchases accessible remotely
- Check availability before confirming a purchase
- Associate purchases with an authenticated student
- Support limits such as one meal per student per day
- Generate a digital QR code for order collection
- Provide notifications and reminders
- Give administrators access to reports and operational information

## Implemented Modules

- Student and administrator login
- Role-based navigation for student and administrative interfaces
- Student registration and management
- Meal-combo management
- Purchase registration and history
- QR-code generation for purchases
- Notification management and email support
- Purchase-value configuration
- Administrative reports with date-based queries
- Responsive Angular interfaces
- REST API backed by PostgreSQL

## Technology Stack

### Frontend

- Angular 19
- TypeScript
- Bootstrap 5
- RxJS
- HTML and CSS

### Backend

- Java 17
- Spring Boot 3.4
- Spring Web
- Spring Data JPA
- Hibernate
- Maven
- ZXing for QR-code generation
- Spring Mail
- BCrypt password hashing

### Database

- PostgreSQL

## Architecture

```text
Angular client
     │
     │ HTTP / JSON
     ▼
Spring Boot REST API
     │
     ├── Business services
     ├── QR-code generation
     ├── Email notifications
     └── JPA repositories
              │
              ▼
          PostgreSQL
```

## Repository Structure

```text
uis-lunch/
├── frontend/     # Angular web application
├── backend/      # Spring Boot API
├── vercel.json   # Frontend deployment configuration
└── README.md
```

The backend follows a layered structure:

```text
Controller → Service → Repository → PostgreSQL
```

Its principal entities include users, roles, purchases, meal combos, QR codes, notifications, purchase values, and reports.

## Requirements

- Node.js 18 or later
- npm
- Java 17
- PostgreSQL

The backend includes Maven Wrapper scripts, so a separate Maven installation is optional.

## Configuration

The application reads database and email credentials from environment variables. Real credentials must never be committed to the repository.

| Variable | Purpose | Example |
|---|---|---|
| `DB_URL` | PostgreSQL JDBC connection | `jdbc:postgresql://localhost:5432/lunchuis` |
| `DB_USERNAME` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `your-local-password` |
| `MAIL_HOST` | SMTP server | `smtp.gmail.com` |
| `MAIL_PORT` | SMTP port | `587` |
| `MAIL_USERNAME` | SMTP account | `account@example.com` |
| `MAIL_PASSWORD` | SMTP application password | `your-app-password` |

### PowerShell example

```powershell
$env:DB_URL="jdbc:postgresql://localhost:5432/lunchuis"
$env:DB_USERNAME="postgres"
$env:DB_PASSWORD="your-local-password"
$env:MAIL_USERNAME="account@example.com"
$env:MAIL_PASSWORD="your-app-password"
```

### macOS or Linux example

```bash
export DB_URL="jdbc:postgresql://localhost:5432/lunchuis"
export DB_USERNAME="postgres"
export DB_PASSWORD="your-local-password"
export MAIL_USERNAME="account@example.com"
export MAIL_PASSWORD="your-app-password"
```

Email variables are only required when testing email notifications.

## Run the Backend

From the repository root:

### Windows

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

### macOS or Linux

```bash
cd backend
./mvnw spring-boot:run
```

The API runs by default at [http://localhost:8080](http://localhost:8080).

## Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

Then open [http://localhost:4200](http://localhost:4200).

## Frontend Deployment

The root `vercel.json` configures Vercel to install and build the Angular workspace inside `frontend/`. The generated static application is served from `frontend/dist/uis-lunch/browser`.

The public deployment includes a non-persistent demonstration API so recruiters can explore the student and administrator interfaces without access to the original database.

Demo credentials:

- Student: `2202045` / `demo1234`
- Administrator: `admin` / `admin1234`

The Spring Boot backend remains the reference implementation for a database-backed environment. During local development, Angular proxies `/api` requests to `http://localhost:8080`.

## Main API Areas

| Area | Base route |
|---|---|
| Authentication | `POST /api/auth/login` |
| User registration | `POST /register` |
| Purchases | `/api/buy` |
| Meal combos | `/api/combos` |
| QR codes | `/api/qrcode` |
| Notifications | `/api/notifications` |
| Purchase values | `/api/purchase-value` |
| Reports | `/api/reports` |

Authentication credentials are sent in the request body and are not included in the URL. New passwords are stored with BCrypt. Existing development users are migrated to BCrypt after their first successful login.

## Development Status

UIS Lunch is an academic prototype. The repository demonstrates a full-stack architecture and the principal workflows, but it is not currently presented as a production service.

Before a real deployment, the project would require:

- Spring Security with session or token-based authorization
- Database migrations
- More comprehensive automated tests
- Production CORS and HTTPS configuration
- Stronger validation and centralized error handling
- Secure infrastructure and secret management
- Review of UIS policies and personal-data requirements

## Academic Context

The project applies software-engineering concepts including requirements analysis, layered architecture, REST API design, relational persistence, frontend/backend integration, role-based workflows, and iterative development with Scrum.
