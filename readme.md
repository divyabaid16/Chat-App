# Chat Application

<img width="500" alt="image" src="https://github.com/divyabaid16/Chat-App/assets/32747809/42649fc7-ab23-4353-b86b-884243d4ab45"> <img width="500" alt="image" src="https://github.com/divyabaid16/Chat-App/assets/32747809/bfdbde11-45c5-4393-9b68-572c147fbc9c">

**Note: I have also added a video demonstrating its functionality in the root folder.**

## Overview
This is a simple chat application built using ReactJS for the client-side, Node.js for the server-side, and MongoDB as the database. Real-time communication is facilitated through Socket.io.

## Prerequisites
- Node.js installed on your machine
- MongoDB installed and running
- Basic knowledge of ReactJS and Node.js

## Installation

### Server
1. Clone the repository:
    ```bash
    git clone https://github.com/divyabaid16/Chat-App.git
    ```
2. Navigate to the server directory:
    ```bash
    cd server
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the server directory and configure the following environment variables:
    ```plaintext
    PORT=3001
    MONGODB_URI=mongodb://localhost:27017/chat
    CLIENT_URL="http://localhost:3000"
    ```
    Adjust the values as needed.

5. Seed the database with initial data by running the seed script:
    ```bash
    node seed.js
    ```
    
6. Start the server:
    ```bash
    npm start
    ```

### Client
1. Open another terminal.

2. Navigate to the client directory:
    ```bash
    cd client
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the client:
    ```bash
    npm start
    ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to use the chat application.
- Sign up or log in to start chatting.
- Start messaging in real-time!

**Note: Since this is a development application, console logs have been added at various places for debugging purposes.**

## Features
- Real-time messaging
- User authentication
- Group chat functionality
- Message history
- Responsive design
