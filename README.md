# Rent A Car Application

A modern and user-friendly car rental web application developed with the assistance of Cursor IDE's AI pair programming capabilities.

## Features

### User Features

- Browse and view detailed car listings
- Create rental requests
- View rental history
- Update profile information
- Change password settings

### Admin Features

- Vehicle management (add, edit, delete)
- Rental request management (approve/reject)
- View vehicle and rental statistics
- Monitor booking status

## Technologies

### Frontend

- React with TypeScript
- Chakra UI for modern and responsive design
- React Router for navigation
- Axios for API requests
- date-fns for date formatting
- Cursor IDE for AI-assisted development

### Backend

- Node.js
- Express framework
- PostgreSQL database
- JWT Authentication
- Sequelize ORM

## Development Environment

This project was developed using Cursor IDE, leveraging its AI pair programming features for:

- Code generation and completion
- Real-time code suggestions
- Bug detection and fixes
- Best practices implementation
- Code refactoring

## Installation

1. Clone the repository:

```bash
git clone https://github.com/oktayparlak/pern-stack-rent-a-car.git
```

2. Backend setup:

```bash
cd server
npm install
```

3. Frontend setup:

```bash
cd client
npm install
```

4. Configure environment variables:

- Create `server/.env` file
- Create `client/.env` file

5. Set up PostgreSQL database:

- Create a PostgreSQL database
- Update database configuration in `server/.env`

6. Start the application:

For backend:

```bash
cd server
npm run dev
```

For frontend:

```bash
cd client
npm run dev
```

## Usage

### Regular User

1. Register or login to your account
2. Browse available vehicles on the homepage
3. Create rental requests from vehicle detail pages
4. Track your rental requests in the "My Rentals" section

### Admin User

1. Login with admin credentials
2. Manage vehicles through the admin panel
3. Process rental requests (approve or reject)
4. View system statistics

## Key Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant status updates for bookings
- **Secure Authentication**: JWT-based user authentication
- **Role-based Access**: Separate interfaces for users and admins
- **Interactive UI**: Modern and intuitive user interface
- **Data Validation**: Comprehensive input validation and error handling

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service integrations
│   │   ├── contexts/     # React contexts
│   │   └── hooks/        # Custom React hooks
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   ├── middlewares/  # Custom middlewares
    │   └── schemas/      # Validation schemas
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
