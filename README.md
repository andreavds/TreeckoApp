# TreeckoApp

Simple Trello-like task board with login and register system.

## Setup instructions

1. Clone the repository.
   ```bash
   git clone https://github.com/andreavds/TreeckoApp.git
    ```

## Backend
2. Get to the backend directory.
```bash
cd .\treecko_backend\
```

3. Install backend dependencies:

```bash
npm install
```

4. Create the database manually.
Run this command in the MySQL CLI:
```MySQL
create database treeckoapp;
```
*The database name can be different, as the connection uses environment variables.

5. Configure environment variables.
Create a .env file inside treecko_backend/ with your database credentials.

Example:
```.env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=treeckoapp
```

6. Run the application on /treecko_backend/src:

```bash
node app.js
```

## Frontend
7.  Open a new terminal and go to the frontend directory

```bash
cd .\treecko_frontend\
```

8. Install frontend dependencies:

```bash
npm install
```
9. Run the application on /treecko_frontend/src:

```bash
ng serve
```

10. Open your browser at http://localhost:4200/ to access the app.
Make sure both frontend and backend are running.


# Database's Entity-Relationship Diagram:
https://dbdiagram.io/d/Treecko-Database-680c882e1ca52373f56fff94
* The backend will automatically create these tables once connected to the database.
