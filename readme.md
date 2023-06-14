# Project Name

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You will need the following software installed on your local machine:

1. [Node.js](https://nodejs.org/)
2. [MySQL](https://www.mysql.com/)

### Database Setup

This application relies on a MySQL database named 'cuche'. This database contains the following tables:

#### 'users' table

- username: TEXT, primary key, not null
- password: TEXT, not null
- email: TEXT, unique, not null
- UUID: TEXT, unique, not null

#### 'listings' table

- UUID: TEXT, primary key, not null
- created_by: TEXT, not null
- title: TEXT, not null
- address: TEXT, not null
- price: TEXT(10,2), not null
- square_meters: TEXT, not null
- description: TEXT, not null
- image_url: LONGTEXT, not null

### .env File Setup

This project uses dotenv for environment variable management. You need to create a `.env` file in the project root directory with the following structure:

```shell
DB_HOST="localhost"
DB_USER="admin"
DB_PASS="password"
DB_PORT="3306"
DATABASE="cuche"
