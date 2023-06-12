# clinicadental API project

## Back-end project for GeeksHubs Academy

The functional requirements of the project require a database capable of holding several movies and shows, users with distinct roles and the loans made by the users.

As the concept is a Netflix-style API, every loan can only hold one item, be it a movie or a show, aside from the ID of the user making the loan and the start and end dates of said transaction.

![image](https://user-images.githubusercontent.com/109754827/200190031-fb1d4d0c-3804-45b6-b0c4-42b8c7d5ada0.png)

## Technologies used

<img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" height="120"/><img src="https://miro.medium.com/max/560/1*hAAm71eC0mIg3RIA6S4-DQ.png" height="120"/><img src="https://thumbs.dreamstime.com/b/icono-logo-design-ui-o-ux-app-de-la-base-de-datos-sql-96841969.jpg" height="120"/><img src="https://cdn.buttercms.com/4XpulFfySpWyYTXuaVL2" height="100"/><img src="https://seeklogo.com/images/S/sequelize-logo-9A5075DB9F-seeklogo.com.png" height="120"/>

## Instructions for the correct use of the project

* We need to have NodeJS installed, download from [their official page](https://nodejs.org/).
  
* Clone this repository using your terminal of choice
  > `$git clone https://github.com/MaraScampini/Weekly-04.git`

* Install dependencies
  > npm i

* Create a .env file following the template provided and type in the private credentials. If you cannot get them, change the parameters for your own local database set up run in docker.
  
* Run the server
  > npm run start  

* If you are running the database locally, make use of the sequelize-cli to migrate and seed it.
  > npx sequelize-cli db:migrate  
  > npx sequelize-cli db:seed:all

## Use of the API

Use this button to use a set of pre-done queries to the database.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/24034971-35f497e0-614b-4d05-906d-0999e9e4cfdf?action=collection%2Ffork&collection-url=entityId%3D24034971-35f497e0-614b-4d05-906d-0999e9e4cfdf%26entityType%3Dcollection%26workspaceId%3D575fae1e-0ea4-48f2-9118-b9c123e9f1bc)

## Project CRUD explained

This project includes 23 endpoints, both public and private, with an authentication system based on JSON Web Tokens.

### Public endpoints

* **Get all movies** - GET petition to see every movie currently in the database.
* **Get top rated movies** - GET petition to see every movie in the database with an average vote rating above 8.
* **Get movies by ID** - GET petition to see a movie sending its ID by URL parameters.
* **Get movies by title** - GET petition to see a movie sending its title by URL parameters.
* **Get movies by genre** - GET petition to see every movie in the database that fits into a genre sent by URL parameters.


* **Get all shows** - GET petition to see every show currently in the database.
* **Get top rated shows** - GET petition to see every show in the database with an average vote rating above 8.
* **Get shows by ID** - GET petition to see a show sending its ID by URL parameters.
* **Get shows by title** - GET petition to see a show sending its title by URL parameters.
* **Get shows with episodes airing next week** - GET petition that makes use of the next_episode column in the shows model to display every show that has an episode airing within 7 days of the petition.
* **Get shows with theater passes** - GET petition that displays shows with theater passes.

### Public user endpoints

* **User register** - POST petition to register a new user in the database. The information is passed via body in a JSON containing the name, email, password and role of said user. The password is encrypted using the crypto library, native to NodeJS, and then sent to the database as a hash.
* **User login** - POST petition to log in. Returns a JSON Web Token, used for all the private endpoints. This token contains information about the user, such as their email, role and ID. This information is stored and will be used throughout the rest of the private endpoints.

### Private endpoints

For all of these endpoints the API makes use of the JSON Web Token and its payload. The token must be manually introduced in the headers for every petition.

* **Get my info** - GET petition that uses the token to display the information stored for that user in the database.
* **Update my info** - PATCH petition that uses the token and the email provided in the URL to update information. The new information should be introduced in the body as a JSON object. Any user can change their name, email or password. If they change their email, they will need to log-in again to use the private endpoints.
* **Loan a movie** - POST petition that allows the user to loan a movie from the database. The information must be passed via JSON object in the body of the petition, including the email of the user and the name of the movie they want to rent. This loan will start with an automatic start date and a null end-date.
* **Loan a show** - POST petition that allows the user to loan a show from the database. The information must be passed via JSON object in the body of the petition, including the email of the user and the name of the show they want to rent. This loan will start with an automatic start date and a null end-date.
* **See my loans** - GET petition that uses the token to allow the user to see what loans they have active. The email must be introduced via URL parameter.
* **Update a loan** - PATCH petition that allows the user to terminate a loan. The information about the loan must be introduced via body in a JSON object, providing the email of the user and the movie or show they want to return. This sets an automatic end-date for the loan.

### Admin endpoints

* **Delete user** - DELETE petition that allows the Admin to delete a user with no loans.
* **Get all loans** - GET petition for the admin to see every loan in the database.
* **Get all active loans** - GET petition for the admin to see every active loan in the database.
* **Get all loans for a user** - GET petition to see every loan that a user has, sending the email of said user by URL.

## Project structure

The project is divided in folders and files, as follows:

* **config**  
  Has the connection information for the database. It is not committed.
* **controllers**  
  Has all the functions responsible for returning a response to the user.
  * AuthControllers.js > to login and register new users.
  * LoansControlleres.js > CRUD of loans
  * MoviesControllers.js > CRUD of movies
  * ShowsControllers.js > CRUD of shows
  * UsersControllers.js > get and update user info, delete user info for admins
* **db**  
  Access to the database.
* **middlewares**  
  Manages tokens for authentication and authorization of users across the page.
* **migrations**  
  Files that allow to make a full migration of the database.
* **models**
  * index.js > manages all of the models and connects to the database
  * articles.js > information for the articles table
  * loans.js > information and structure for the loans table
  * movies.js > information and structure for the movies table
  * shows.js > information and structure for the shows table
  * roles.js > information about the available roles for the users
  * users.js > information and structure for the table that stores all the users registered to our website
* **node_modules**  
  Folder containing all the files that NodeJS and its dependencies need to run.
* **seeders**  
  Files with all the movies and shows available in the database.
* **services**  
  Functions used by the controllers to run the logic needed to provide the adequate response to the user.
* **views**  
  Files with the individual routes for each endpoint.
* **.env**  
  File with the JSON Web Token secret and the information needed to connect to the database.
* **app.js**  
  Main file where we call and instance express and make the app listen to the port we choose for our local environment.
* **package.json**  
  File with information about the Node project, dependencies and metadata.
* **router.js**  
  File with general routes for each model.
