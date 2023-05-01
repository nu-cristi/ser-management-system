# User Management System Overview

This is a simple user management system that allows users to register, log in, view a list of users, and perform basic CRUD operations on those users using the MERN stack.
  
## Install and run the project

1. Clone the project:

```bash
$ git clone git@github.com:nu-cristi/user-management-system.git
$ cd user-management-system/
```

2. Go to the backend folder, install dependencies and run the api server:

```bash
$ cd backend/
$ npm install
$ npm run dev
```
Now the server should be up and running and the console output should be:

```bash
> user-management-system@1.0.0 dev
> nodemon index.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server is running on port 4000
```

3. After the server started, open a new terminal window and navigate to the frontend folder inside the project:

```bash
$ cd ../user-management-system/frontend
```

4. Install dependencies and run the client side application:

```bash
$ npm install
$ npm start
```

## If everything worked, you should be prompted to the main page of the application that looks like this:

<img width="1056" alt="Screenshot 2023-05-01 at 21 39 13" src="https://user-images.githubusercontent.com/101981056/235509187-3820904b-c73d-4704-b0a2-53737c8fbc8f.png">

## Database

  The database was created and hosted on Atlas.
