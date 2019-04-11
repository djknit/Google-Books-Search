# Google Books Search

### This app uses the Google Books API to search for books and allow the user to save titles in a Mongo database.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* GitHub Repository: [github.com/djknit/Google-Books-Search](https://github.com/djknit/Google-Books-Search)

## Project Goals
* Create an app that allows the user to search for books using the Google Books API.
* Use React (with React components where appropriate) for the front end.
* Include separate views for searching for titles and viewing saved titles.
* Serve the app from a Node/Express server and store saved information in a Mongo database.

## Project Features
* Allows users to enter a search term (title, author, publisher, etc.) to search for books using the Google Books API.
* The top 10 matches for the query are displayed to the user.
* Users can save books to the database.
* Users can create an account or use the site as a guest.
* Any user can save books to the "Public List" which is shared by all site visitors.
* Users who are logged in can also save books to their personal list which can not be viewed by other users.
* Privacy settings can be adjusted so that users can choose to share their username or email address or remain anonymous when they post to the Public List.


## Technologies Used
#### Front End
* React
* Bulma
* Axios
* Moment

#### Back End
* Passport.js Local Strategy
* Express
* Node
* MongoDB
* Mongoose ORM
* Other npm packages used:
  * iso-639-1
  * Morgan
  * Path
  * Dotenv
  * Connect-ensure-login
  * Cookie-parser

#### Public APIs
* Google Books API

## Instructions for Use
### (Coming Soon...)

## Developer
This project is developed and maintained by David Knittel. Any and all questions, comments, suggestions, or proposed contributions are welcome.
* Email: [djknit@gmail.com](mailto:djknit@gmail.com)
* Portfolio: [djknit.github.io](https://djknit.github.io/)
* GitHub: [github.com/djknit](https://github.com/djknit)
* LinkedIn: [linkedin.com/in/djknit](https://www.linkedin.com/in/djknit/)

This project was originally developed as a homework assignment for the KU Coding Bootcamp Full Stack Flex program and uses specifications laid out by the homework requirements.
