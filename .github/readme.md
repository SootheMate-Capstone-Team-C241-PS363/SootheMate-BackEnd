# SootheMate - Backend API Documentation 🧑‍💻

## API URL 🔗
[SootheMate API](https://soothemate-capstone.et.r.appspot.com/)

### Public Endpoints

| Endpoint | Method | Input | Description | JWT Token |
| --- | --- | --- | --- | --- |
| `/auth/register` | POST | `{ "name": "string", "email": "string", "password": "string", "password_confirmation": "string" }` | Register a new user | &#9744; |
| `/auth/login` | POST | `{ "email": "string", "password": "string" }` | Login and generate JWT Token | &#9744; |

### Protected Endpoints ( User Profile )

| Endpoint | Method | Input | Description | JWT Token |
| --- | --- | --- | --- | --- |
| `/user/detail` | GET | - | Get user detail | &#9745; |
| `/user/avatar` | POST | `multipart/form-data` with `avatar` field | Update user avatar | &#9745; |
| `/user/update` | PUT | `{ "name": "string", "gender": "string", "birth_date": "string" }` | Update user profile | &#9745; |

## Protected Endpoints ( ML Predictions )
` Coming Soon `

### Root Endpoint

| Endpoint | Method | Input | Description | JWT Token |
| --- | --- | --- | --- | --- |
| `/` | GET | - | Accessing our root endpoint | &#9744; |

## How to run this API on your local machine 💻
If you want to run this API Server on your local machine, you need to do this steps:
- First, clone this repository. `git clone https://github.com/SootheMate-Capstone-Team-C241-PS363/SootheMate-BackEnd.git`
- Second, open terminal and go to this project's root directory.
- Third, type `npm install` in your terminal and hit enter button.
- Fourth, type `npm run start:dev` in your terminal and hit enter button.
- Finally, the server will run on your http://localhost:3000

## Tech Used 🔧
Our Cloud Computing project is created with:
* Express.js
* Cloud FireStore
* App Engine
* Cloud Storage