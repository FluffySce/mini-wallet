# Mini Wallet Backend

A robust digital wallet backend system built with Go, Gin, GORM, and PostgreSQL. Enables secure user authentication, wallet management, and peer-to-peer transfers with transaction tracking.

## Features

- **User Management**: Registration and login with secure password hashing
- **JWT Authentication**: Token-based authentication for protected routes
- **Wallet Management**: Create wallets, check balance, and perform top-ups
- **Transfers**: Secure peer-to-peer wallet transfers with validation
- **Transaction History**: Track all wallet transactions
- **Protected Routes**: API endpoints secured with JWT middleware

## Architecture

```text
+-------------+
|  Frontend   |
|  Next.js    |
+------+------+ 
       |
       v
+-------------+
| Gin Server  |
| REST APIs   |
+------+------+ 
       |
       v
+-------------+
| PostgreSQL  |
+-------------+
```

## Tech Stack

- **Language**: Go
- **Web Framework**: Gin
- **ORM**: GORM
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

## Database Schema

```text
+---------+
|  Users  |
+---------+
| id      |
| name    |
| email   |
| password|
+----+----+
     |
     | 1 : 1
     |
+----v----+
| Wallets |
+---------+
| id      |
| user_id |
| balance |
+----+----+
     |
     | 1 : N
     |
+----v-----------+
| Transactions   |
+----------------+
| id             |
| sender_wallet  |
| receiver_wallet|
| amount         |
| type           |
| status         |
| description    |
+----------------+
```

## Authentication Flow

```text
Register
    |
    v
Hash Password
    |
    v
Store User
    |
    v
Create Wallet

----------------

Login
    |
    v
Verify Password
    |
    v
Generate JWT
    |
    v
Protected Routes
```

## Wallet Flow

```text
User
  |
  +------> Wallet
                |
                +------> Balance
                |
                +------> Transactions
```

## Transfer Process

```text
Sender Wallet
      |
      | Verify Balance
      v
Database Transaction
      |
      +---- Deduct Sender
      |
      +---- Credit Receiver
      |
      +---- Create Transaction Record
      |
      v
Commit Transaction
```

## Project Structure

```
.
├── cmd/
│   └── server/
│       └── main.go
├── config/
│   └── config.go
├── internal/
│   ├── constants/
│   │   └── transaction.go
│   ├── database/
│   │   └── db.go
│   ├── handlers/
│   │   ├── auth.go
│   │   ├── health.go
│   │   ├── transaction.go
│   │   ├── user.go
│   │   └── wallet.go
│   ├── middleware/
│   │   └── jwt.go
│   ├── models/
│   ├── routes/
│   │   └── routes.go
│   └── utils/
├── go.mod
└── README.md
```

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT token

### User
- `GET /me` - Get authenticated user profile

### Wallet
- `GET /wallet` - Get wallet details and balance
- `POST /wallet/topup` - Add funds to wallet
- `POST /wallet/transfer` - Transfer funds to another user

### Transactions
- `GET /transactions` - Get transaction history

### Health
- `GET /health` - Check API status

## Getting Started

### Prerequisites
- Go 1.16+
- PostgreSQL 12+

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd mini-wallet
```

2. Install dependencies
```bash
go mod tidy
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

4. Start PostgreSQL
```bash
# Make sure PostgreSQL is running
```

5. Run the server
```bash
go run cmd/server/main.go
```

The server will start on `http://localhost:8080`

## Testing the API

### Register a User
```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get User Profile (requires token)
```bash
curl -X GET http://localhost:8080/me \
  -H "Authorization: Bearer <your-jwt-token>"
```

## Future Improvements

- **Transaction Export**: Export transaction statements in CSV/PDF format
- **Admin Dashboard**: Analytics and user management interface
- **Pagination**: Add pagination to transaction history
- **Wallet Freezing**: Temporary wallet lock functionality
- **Multiple Wallets**: Support multiple wallets per user
- **Audit Logs**: Detailed logging of all system actions
- **Rate Limiting**: Implement rate limiting for API endpoints
- **Two-Factor Authentication**: Enhanced security with 2FA
- **Notifications**: Email/SMS notifications for transactions
