# CodeUnite - Collaborative Coding Platform

CodeUnite is a revolutionary platform designed to streamline collaboration among developers, particularly during hackathons and coding competitions. With its room-based collaboration system, teams can easily work together in dedicated spaces while addressing the common challenges faced by developers using various communication tools.

## Screenshots

### Login Signup
![image](https://github.com/user-attachments/assets/c466a0e8-c358-4bf8-9001-d9e9200cf686)


### Main Interface
![image](https://github.com/user-attachments/assets/26fe9eef-7aec-4f2d-bf95-86865c40f516)


### Room Creation/Joining
![image](https://github.com/user-attachments/assets/6addb2f8-5796-484c-a294-2169f864e1e0)

### Problem Statement View
![image](https://github.com/user-attachments/assets/b9c65fcb-a6fb-4e9b-aa43-b16af470254f)

### View Problem statements and testcases
![image](https://github.com/user-attachments/assets/cebad78e-ae14-4cba-a993-7356d35d7c8a)



### Collaborative Coding Room Solve, Run and Submit the code
![image](https://github.com/user-attachments/assets/a378ae23-59bf-4b77-961b-c5ae99fa97e9)


### Admin Dashboard
![image](https://github.com/user-attachments/assets/2c861f21-d61c-4226-9edc-95ac3a3d1a26)

![image](https://github.com/user-attachments/assets/eab9f827-c084-485d-83b5-bb11cde953c3)




## Features

### Room-Based Collaboration
- **Create or Join Rooms**: Easily create new coding rooms or join existing ones with a room code
- **Real-time Collaboration**: Work simultaneously with team members in the same room
- **Room Chat**: Communicate with room members using integrated chat functionality
- **Room History**: Access your previous rooms and continue where you left off

### Core Features
- **Real-time Collaboration**: CodeUnite enables developers to work on the same code simultaneously, eliminating the need for multiple communication tools like Teams, Discord, or Zoom calls.
- **Problem Statement Integration**: Easily fetch problem statements directly within the platform, simplifying the workflow for competitive programming.
- **Test Case Validation**: Validate your code against test cases to ensure its correctness and reliability.
- **Multi-language Support**: CodeUnite supports code compilation in various programming languages, making it versatile for diverse coding needs.
- **Point System**: Individuals can track their progress and achievements through a points system, motivating users to improve their problem-solving skills.
- **Admin Panel**: Admins can create custom problem statements for coding competitions and evaluate participants' scores based on their points.

## Getting Started

### Environment Setup
1. In the `backend` directory, create a `.env` file with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
```

### Installation and Startup

1. Set up the frontend:
```console
cd frontend
npm install
npm start
```

2. Set up the backend:
```console
cd backend
npm install
npm start
```

3. Start the socket server:
```console
cd socket
node index.js
```

## How to Use Rooms

1. **Create a Room**
   - Click on "Create Room" button
   - Choose room settings (if applicable)
   - Share the generated room code with your team

2. **Join a Room**
   - Click on "Join Room" button
   - Enter the room code provided by the room creator
   - Start collaborating immediately

3. **Inside a Room**
   - Write and edit code in real-time
   - Use the room chat for communication
   - Run and test code together
   - Share problem statements and solutions

## Admin Access
To access the admin panel, use the following credentials:
- Username: admin
- Password: qwerty

## Usage
CodeUnite is ideal for:
- Students participating in hackathons
- Industries requiring collaborative coding projects
- Companies conducting technical interviews
- Educational institutions where teachers and students can work together seamlessly

Boost your team's productivity and coding skills with CodeUnite.
Get started today and experience the future of collaborative coding!
