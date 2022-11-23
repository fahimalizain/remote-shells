# Authentication API

- ## Signup

  Request

  ```http
  POST /auth/signup HTTP/1.1
  Content-Type: application/json

  {
      "email": "john@gmail.com",
      "password": "Test_test123",
      "first_name": "John",
      "last_name": "Doe"
  }
  ```

  Response

  ```json
  {
    "id": "25585b38-496e-4c58-bcd0-c07fa58a1503",
    "email": "john@gmail.com",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```

- ## Login

  Request

  ```http
  POST /auth/login HTTP/1.1
  Content-Type: application/json

  {
      "email": "john@gmail.com",
      "password": "Test_test123"
  }
  ```

  Response

  ```json
  {
    "access_token": "<token>",
    "email": "john@gmail.com"
  }
  ```

- ## Profile
  Request
  ```http
  GET /auth/profile HTTP/1.1
  Authorization: Bearer <token>
  ```
  Response
  ```json
  {
    "id": "25585b38-496e-4c58-bcd0-c07fa58a1503",
    "email": "john@gmail.com",
    "first_name": "John",
    "last_name": "Doe"
  }
  ```
