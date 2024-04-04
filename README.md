# Welcome To The Teaser

Welcome To The Teaser

# Install

## Symfony API

### Open Terminal in project : 

```bash
cd api_wttt
```

### Create a new file named .env. It must look like this : 

```env
###> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=6ee4959d812aaacbddeb2ae9f8da2c87
###< symfony/framework-bundle ###

###> doctrine/doctrine-bundle ###

DATABASE_URL="mysql://your_username:your_password@127.0.0.1:3306/your_db_name(exemple:wttt_db)?serverVersion=8.0.32&charset=utf8mb4"

###< doctrine/doctrine-bundle ###

###> nelmio/cors-bundle ###
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'
###< nelmio/cors-bundle ###

###> lexik/jwt-authentication-bundle ###
JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
JWT_PASSPHRASE=d75a324afc9398e7b0abb64b9dbff2407c3d428ff20c87acb3f2cb61d2faf108
###< lexik/jwt-authentication-bundle ###

```

### Now install dependance in the Project : 

```bash
composer install
```

### Now get the Database and fill it with data :

#### The first command will create your database.
```bash 
symfony console d:d:c
```
#### The second one will create all tables in your database.
```bash 
symfony console d:m:m
```
#### The last one to load all fakes data in the database.
```bash 
symfony console d:f:l
```

### Generate JWT Keys : 

The following command will generate private/public keys in /config/jwt and in your .env file.
```bash
php bin/console lexik:jwt:generate-keypair
```

## React APP

#### Open a new terminal at the root of the repository

```bash
cd front_wttt
```

#### Install dependencies :
```bash
npm install
```

# Start all projects

## Launch API 

Be sure you are in /T-WEB-501-PAR_6/app_wttt in your terminal.

```bash 
symfony server:start
```
or if you don't have Symfony CLI installed :
```bash 
php -S localhost:8000 -t public
```
It will open the API.

## Launch React APP

Be sure you are /T-WEB-501-PAR_6/front_wttt in your terminal.

```bash 
npm start
```
