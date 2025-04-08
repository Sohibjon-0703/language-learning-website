# Language Learning App

This is a Node.js web application for learning languages using flashcards.

## Features
- **Create, view, edit, and delete flashcards**: Users can manage their flashcards for various language learning purposes.
- **Organize flashcards by category**: Flashcards are categorized, making it easier to study by topic or language.
- **MongoDB database**: Supports both local and cloud-based databases (MongoDB Atlas or local MongoDB server).
- **Clean UI with Pug templating**: The application uses the Pug templating engine for dynamic views and a user-friendly interface.


## Installation

To get started with the application, follow these steps:

1. Clone the repository

```bash
git clone https://github.com/Sohibjon-0703/language-learning-website
cd language-learning-app
npm install
```
2. Navigate to the project directory:

```bash
cd 00018680
```
3. Install the necessary dependencies:

```bash
npm install
```

## Running the App

To run the app locally, use the following command:

```bash
node app.js
```

This will start the server, and you can open the application in your browser at http://localhost:3000.


## Project Structure

00018680/
│
├── controllers
    └── users
    └── index.js
├── models
├── public/              # Static files such as styles and images
    └── styles.css       # Custom styles for the app
├── routes/              # All route definitions for different parts of the app
│   └── flashcards.js    # Routes related to flashcards (CRUD operations)
├── services/
    └── flashcards
    └── users 
├── app.js               # Main entry point for the application

├── views/               # Contains all the Pug templates for the app's UI
│   ├── layout.pug       # Base layout template
│   ├── flashcards/      # Templates for flashcard views
│   └── partials/        # Reusable components like header
├── app.js               # Main entry point for the application
├── package-lock.json    # 
├── package.json         # Project metadata and dependencies



## Tech stack

The application is built with the following technologies:

* Node.js - JavaScript runtime for building the server-side application.
* Express.js - Web framework to handle routing and HTTP requests.
* MongoDB - NoSQL database for storing flashcards.
* Mongoose - ODM (Object Document Mapper) to interact with MongoDB using JavaScript.
* Pug (for templates) - Templating engine to render dynamic HTML views.



### Key Sections:

1. **Features**: Explains the core features of your app.
2. **Installation**: Provides clear instructions for setting up the app locally.
3. **Running the App**: Gives instructions on how to run the app after installation.
4. **Project Structure**: Describes the organization of the project, including important directories and files.
5. **Tech Stack**: Lists the main technologies used in the project.

