# Basic node and express project

### Following course by Maximilian Schwarzmüller

## Tech stack

- Node
- Express
- Pug
- As a plus, project coded with `Typescript`

### For the database was used

- File System | [Branch](https://github.com/isacdav/express-basics/tree/filesystem)
- MySQL & Sequelize | [Branch](https://github.com/isacdav/express-basics/tree/sequelize)
- MongoDB | [Branch](https://github.com/isacdav/express-basics/tree/mongo)
- Mongoose | [Branch](https://github.com/isacdav/express-basics/tree/mongoose)

4. Run `npm run dev`

## Project structure

```
public
  ├─ css
  └─ js
src
  ├─ controllers
  ├─ interfaces
  ├─ middlewares
  ├─ models
  ├─ routes
  ├─ services
  ├─ util
  ├─ views
  └─ index.ts
```

## Run the project

1. Clone the project
2. Run `npm install`
3. Create a .env file with the following variables
   - `PORT`
   - `SENDGRID_APY_KEY` (optional) to use the email service
   - `MONGO_CONN_STRING` url to connect to the database
