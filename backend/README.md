# Backend Layer

## How to run the backend

1. Make sure to have go by `go version` and the database using PostgreSQL
2. Copy the .env.example

```
cp .env.example .env
```

3. Configure the database env in the env file
4. Initial database setup for enabling UUID and Enum

    ```
    go run main.go --uuid --enum
    ```

5. Run the backend app
    - Make sure that you are in the `/backend` level when runing the app

```
go run main.go
```

## Database migration and seeder configuration

For running migrate

```
go run main.go --migrate
```

For running migrate fresh

```
go run main.go --migrate-fresh
```

For running the seeder

```
go run main.go --seed
```
