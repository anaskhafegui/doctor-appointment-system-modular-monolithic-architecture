# Doctor Appointment Management System

## Overview

This project is a backend system for managing doctor appointments, designed for a single doctor. It provides APIs to handle doctor availability, appointment booking, confirmation, and management, built with modular architecture using **NestJS**.

## Key Features

- **Doctor Availability**: Manage and retrieve available slots.
- **Appointment Booking**: Book appointments with validations.
- **Appointment Confirmation**: Log appointment confirmations for patients and doctors.
- **Doctor Appointment Management**: View, cancel, and complete appointments.

## Architecture

The application is structured using modular monolith principles, with each module following a specific architectural pattern:

| Module                            | Architecture Pattern   | Responsibilities                              |
| --------------------------------- | ---------------------- | --------------------------------------------- |
| **Doctor Availability**           | Traditional Layered    | Manage and retrieve doctor's available slots. |
| **Appointment Booking**           | Clean Architecture     | Book appointments with proper validations.    |
| **Appointment Confirmation**      | Simplest Architecture  | Trigger notification confirmation events.     |
| **Doctor Appointment Management** | Hexagonal Architecture | Manage appointments (view, cancel, complete). |

---

## Modules

### 1. Doctor Availability Module

**Responsibilities**:

- Create, update, and delete available slots.
- Fetch all available slots.

**Architecture**: Traditional Layered Architecture.

**API Endpoints**:

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| GET    | `/slots`     | Retrieve all available slots. |
| POST   | `/slots`     | Create a new slot.            |
| PATCH  | `/slots/:id` | Update a slot.                |
| DELETE | `/slots/:id` | Delete a slot.                |

---

### 2. Appointment Booking Module

**Responsibilities**:

- Book appointments on available slots.
- Validate bookings (e.g., slot must not be reserved, date must be in the future).

**Architecture**: Clean Architecture.

**API Endpoints**:

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| GET    | `/appointments/slots` | Retrieve available slots. |
| POST   | `/appointments`       | Book an appointment.      |

---

### 3. Appointment Confirmation Module

**Responsibilities**:

- Trigger notification confirmation events for appointments.

**Architecture**: Simplest Architecture.

**Implementation**:

- This module no longer includes a controller.
- A service handles the logic for triggering notification events.

---

### 4. Doctor Appointment Management Module

**Responsibilities**:

- View all appointments.
- Cancel or complete appointments.

**Architecture**: Hexagonal Architecture.

**API Endpoints**:

| Method | Endpoint                     | Description                   |
| ------ | ---------------------------- | ----------------------------- |
| GET    | `/appointments`              | View all appointments.        |
| PATCH  | `/appointments/:id/cancel`   | Cancel an appointment.        |
| PATCH  | `/appointments/:id/complete` | Mark an appointment complete. |

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd doctor-appointment-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run start
   ```

4. Access the API at:

   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
src/
├── doctor-availability/          # Handles doctor slot management
│   ├── domain/
│   ├── infrastructure/
│   ├── doctor-availability.controller.ts
│   ├── doctor-availability.service.ts
│   ├── doctor-availability.module.ts
├── appointment-booking/          # Handles appointment booking
│   ├── core/
│   ├── infrastructure/
│   ├── appointment-booking.controller.ts
│   ├── appointment-booking.module.ts
├── appointment-confirmation/     # Handles confirmation events
│   ├── appointment-confirmation.service.ts
│   ├── appointment-confirmation.module.ts
├── doctor-appointment-management/ # Handles appointment management
│   ├── core/
│   ├── shell/
│   ├── doctor-appointment-management.module.ts
```

---

## Development

### Prerequisites

- Node.js 16+
- NestJS CLI
- npm or yarn

### Running Tests

To run unit tests:

```bash
npm run test
```

To run e2e tests:

```bash
npm run test:e2e
```

---

## Future Enhancements

1. **Database Integration**:
   - Replace in-memory repositories with a database (e.g., PostgreSQL, MongoDB).
2. **Authentication**:
   - Add authentication and authorization to secure APIs.
3. **Notifications**:
   - Replace confirmation logging with email or SMS notifications.
4. **Event-Driven Architecture**:
   - Use event-driven communication between modules for better decoupling.
5. **Separation of NestJS Libraries**:
   - Explore ways to separate `@nestjs` dependencies from the business domain to create a more domain-centric architecture.
6. **DTO Mapping**:
   - Implement separate DTOs for request and response objects, distinct from repository and business domain models, and use mappers to map between them.

---

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for discussion.

---

## License

This project is licensed under the MIT License.
