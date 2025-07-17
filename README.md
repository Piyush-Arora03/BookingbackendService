# BookingService

A Node.js microservice for managing flight bookings, built with Express, Sequelize, and MySQL.

---

## Features

- Create and cancel flight bookings
- Integrates with a Flight Service via REST API
- Robust error handling with custom error classes
- Modular repository and service structure

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) database
- [Flight Service](https://github.com/Piyush-Arora03/FlightAndSearchServices.git) running locally or accessible

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/Piyush-Arora03/BookingbackendService.git
cd BookingService
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3002
FLIGHT_SERVICE_PATH=http://localhost:3000
```

- `PORT`: The port on which BookingService will run.
- `FLIGHT_SERVICE_PATH`: The base URL of your Flight Service.

### 4. Configure Database

Edit `src/config/config.json` with your MySQL credentials:

```json
{
  "development": {
    "username": "your_mysql_user",
    "password": "your_mysql_password",
    "database": "booking_service_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### 5. Run Database Migrations

```sh
npx sequelize-cli db:migrate
```

### 6. Start the Server

```sh
npm start
```

The service will be available at `http://localhost:3002/api/v1/`.

---

## API Endpoints

### Create a Booking

- **POST** `/api/v1/bookings`
- **Body Example:**
  ```json
  {
    "flightId": 1,
    "userId": 42,
    "noOfSeats": 2
  }
  ```

### Cancel a Booking

- **DELETE** `/api/v1/bookings/:id`

---

## Project Structure

```
BookingService/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── repository/
│   ├── routes/
│   ├── services/
│   └── utils/
├── .env
├── package.json
└── README.md
```

---

## Error Handling

- Custom error classes: `AppError`, `DbError`, `ValidationError`, `ServiceError`
- All errors return a consistent JSON structure with `message`, `explanation`, and `statusCode`.

---

## License

This project is licensed under the ISC License.