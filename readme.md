# Cuche Fiverr Project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You will need the following software installed on your local machine:

1. [Node.js](https://nodejs.org/)
2. [MySQL](https://www.mysql.com/)

## Database Setup

### Setup

Import the cuche.sql file to your own MySQL server, the file can be found at `./server/cuche.sql`. This file can be importet using.
```
mysql -u your_username -p -h localhost cuche < ./server/cuche.sql

```

You will now have a databse available called `cuche` with the relevant tables and data, there will be a preset user:

username: `benoitcuche`

password: `password`

You can use this user to login and create listings on the website, you are also able to create new users, which will automatically be saved in the database.

### Tables

This application relies on a MySQL database named 'cuche'. This database contains the following tables:

#### 'users' table
- `UUID: TEXT, unique, not null`
- `username: TEXT, primary key, not null`
- `password: TEXT, not null`
- `email: TEXT, unique, not null`


#### 'listings' table

- `UUID: TEXT, primary key, not null`
- `created_by: TEXT, not null`
- `title: TEXT, not null`
- `address: TEXT, not null`
- `price: TEXT, not null`
- `square_meters: TEXT, not null`
- `description: TEXT, not null`
- `image_url: LONGTEXT, not null`

### .env File Setup

This project uses dotenv for environment variable management. You need to create a `.env` file in the project root directory with the following structure:

```shell
DB_HOST="localhost"
DB_USER="admin"
DB_PASS="password"
DB_PORT="3306"
DATABASE="cuche"
````

### Image Uploading to "/creer_annonce"
Please utilize the preset images for your convenience and efficiency. Given the storage restrictions of our MySQL database, we have carefully selected three optimal images for you. You can find these images listed [HERE](https://github.com/brandonbondig/cuche_fiverr/tree/master/client/src/photos/annonces)
