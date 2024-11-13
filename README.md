# Movie & TV Show Rating and Discussion Platform

A full-stack web application that allows users to browse, rate, and discuss movies and TV shows. Built using Node.js, Express, Handlebars.js, PostgreSQL, and Sequelize ORM, this platform integrates with the OMDb API to fetch detailed information about movies and TV shows. Users can sign up, log in, post reviews, and engage in discussions with others.

Table of Contents
Features
Technologies Used
Setup Instructions
Usage
Screenshots
Future Development
License
Features
User Authentication: Sign up, log in, and log out functionality for secure access.
Movie and TV Show Information: Fetches movie and show details from the OMDb API.
Rating System: Users can rate movies and TV shows, and view average ratings.
Discussion Feature: Users can post comments on movies and TV shows, creating a community discussion.
Responsive Design: A clean, responsive UI optimized for both desktop and mobile use.
Technologies Used
Backend:

Node.js
Express.js
PostgreSQL
Sequelize ORM
OMDb API (for movie and TV show data)
Frontend:

Handlebars.js (templating engine)
HTML5/CSS3
JavaScript (for interactivity)
Authentication:

express-session
bcrypt
Deployment:

Render
Setup Instructions
To run this application locally, follow these steps:

Prerequisites
Node.js and npm installed on your machine
PostgreSQL installed and running
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/movie-platform.git
cd movie-platform
Install dependencies:

bash
Copy code
npm install
Set up environment variables:

Create a .env file in the root of the project and add the following variables:

plaintext
Copy code
OMDB_API_KEY=your_omdb_api_key
SESSION_SECRET=your_session_secret
Configure the database:

Update /config/config.json with your PostgreSQL credentials, or modify the database connection in config.json to use environment variables.

Create the database and tables:

bash
Copy code
npx sequelize-cli db:create
npx sequelize-cli db:migrate
Start the application:

bash
Copy code
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

Usage
Main Features:
Browse Movies and TV Shows:

The home page displays a list of movies fetched from the OMDb API.
Users can click on a movie to view more details, including a description, poster, and IMDb rating.
Sign Up / Log In:

Users must create an account and log in to post ratings and comments.
Rate Movies and TV Shows:

Users can leave a rating (1-5 stars) for each movie or TV show.
The average rating is displayed on each movie's detail page.
Post Comments and Discuss:

Users can post comments on movie pages to start discussions.
Comments are displayed in a threaded format on each movie's detail page.
Screenshots
Home Page

Movie Detail Page

User Authentication

Future Development
Planned enhancements for the platform include:

Recommendation System: Suggest movies or shows based on user ratings and preferences.
Advanced Search and Filter Options: Add genre, release date, and rating filters.
Social Features: Allow users to follow others and view a feed of their friends' ratings and comments.
Admin Panel: For moderation of comments and management of content.
License
This project is licensed under the MIT License.

Authors:

Matt Vogelsang- GitHub Profile,

Kadeem King - GitHub Profile,

Brian Soto - GitHub Profile

Acknowledgments
OMDb API for providing movie data.
The Full-Stack Bootcamp for guidance and support.
This README provides a professional summary of the Movie & TV Show Rating and Discussion Platform, with easy-to-follow setup instructions and descriptions of key features.