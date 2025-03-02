# SideSprint

SideSprint is a web application developed during the UNL Hackathon to help people find minimal jobs quickly and efficiently. The platform connects job seekers with employers looking to fill short-term or part-time positions.

## Features

- **User Authentication**: Secure user registration and login using JWT and Google OAuth.
- **Job Posting**: Employers can post job listings with details such as job title, company, location, job type, salary, and description.
- **Job Search**: Job seekers can search for jobs based on various criteria and apply for positions.
- **Application Management**: Users can view and manage their job applications.
- **Real-time Notifications**: Real-time updates and notifications using Socket.IO.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, React Router, Tailwind CSS
- **Authentication**: JWT, Google OAuth
- **Real-time Communication**: Socket.IO
- **Development Tools**: Nodemon, Vercel

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/SideSprint.git
   cd SideSprint
   ```

2. Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   PORT=3000
   MONGODB_URL=your-mongodb-url
   JWT_SECRET=your-jwt-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   FRONTEND_URL=http://localhost:5173
   ```

## Usage

1. Start the backend server:
   ```sh
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```sh
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173` to use the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the ISC License.