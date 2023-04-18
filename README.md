# DatabaseProject
A To Do List web application built with Node.js and MongoDB.

## Installation
* Clone the repository: 
git clone https://github.com/your_username/todo-list.git
* Install dependencies:
cd todo-list
npm install
* Start the server: npm start
* Open your web browser and navigate to http://localhost:3000/

## Usage
* To create a new item, type a task in the input field and click the "Add" button.
* To delete an item, click the checkbox next to the item and click the "Delete" button.
* To create a new list, type a list name in the URL (e.g. http://localhost:3000/mylist) and press Enter.
* To switch between lists, click the list name in the navigation bar.

## Code Overview
This application is built using the following technologies:
* Node.js
* Express.js
* MongoDB
* EJS templating engine

The main code for the application is in the app.js file. file. The application uses Express.js to handle HTTP requests and responses,  and MongoDB as a database to store the To Do List items and lists.

The app.js file contains the following sections:
* Dependencies: The required Node.js modules are imported.
* Database Connection: A connection to the MongoDB database is established.
* Data Models: Two Mongoose models, Item and List, are defined.
* Routes: The routes for the application are defined using Express.js.
* Views: The views for the application are defined using EJS templating engine.
