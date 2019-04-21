# Google Books Search

### This app enables users to search for books using the Google Books API and save book information to be referenced later.

## Contents
* [Links](#links)
* [Project Goals](#project-goals)
* [Project Features](#project-features)
* [Technologies Used](#technologies-used)
* [Instructions for Use](#instructions-for-use)
* [Developer](#developer)

## Links
* GitHub repository: [github.com/djknit/Google-Books-Search](https://github.com/djknit/Google-Books-Search)
* Deployed page: [daves-book-search.herokuapp.com](https://daves-book-search.herokuapp.com)

## Project Goals
* Create an app that allows the user to search for books using the Google Books API.
* Use React for the front end. (This is my first major project built with React.)
* Include separate views for searching for titles and viewing saved titles.
* Allow book information to be saved and viewed later.
* Serve the app from a Node/Express server and store saved information in a Mongo database.
* Implement proper user authentication with password encryption.

## Project Features
* Allows users to enter a search term (title, author, publisher, etc.) to search for books using the Google Books API.
* The top 10 matches for the query are displayed to the user.
* Users can save books to the database.
* Users can create an account or use the site as a guest.
* Any user can save books to the "Public List" which is shared by all site visitors.
* Users who are logged in can also save books to their personal list which can not be viewed by other users.
* Privacy settings can be adjusted so that users can choose to share their username or email address or remain anonymous when they post to the Public List.
* User authentication is verified on the server side each time a user tries to interact with their data. This prevents users from accessing other users' data even if they modify the front end code in an attempt to do so.
* Users who are logged in can comment on books saved to the public list. They can also leave notes on books in their private list.
* Comments can be deleted by the comment author.
* Users can remove books and notes from their private list.
* Passwords are hashed using Bcrypt before they are stored in the database.
* Routes are protected on the back end so that users are unable to access data they do not have permission for.
* In case of a forgotten password, users can request a reset link.
  * A token is generated on the server (using Crypto package) and is saved with the user's information in the database. An expiration time is also set and saved with the user's data.
  * The link is emailed to the user using Nodemailer with Gmail SMPT transport. This link contains the token.
  * The link takes the user to the password reset page. If the user clicks the link and enters a new password, the token is matched to the user and the password is reset if and only if the token is valid and has not expired.
* The app is automatically deployed to Heroku from the master branch of the Github repo.

## Technologies Used
#### Front End
* React
* Bulma
* Axios
* Moment
* react-router-dom package
* create-react-app package

#### Back End
* Passport Local Strategy
* Express
* Node
* MongoDB
* Mongoose
* Bcrypt
* Nodemailer
* Other npm packages used:
  * googleapis (for OAuth2 authentication for Gmail)
  * axios
  * iso-639-1
  * async
  * morgan
  * path
  * dotenv
  * connect-ensure-login
  * cookie-parser
  * connect-flash

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

This project is based on a homework assignment for the KU Coding Bootcamp Full Stack Flex program and uses some specifications laid out by the homework requirements.