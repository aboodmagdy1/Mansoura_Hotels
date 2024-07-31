# MansourHotels.com

## Description

Booking.com Clone for Mansoura Hotels Build with Mern Stack

## Table of Contents

- [Features](#featuers)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#Tech-Tools)

## Featuers

- Authintication And Authorization with JWT
- Hotels Dashboard for hotel owners
- Admin Dashboard for website admin
- revision system (review hoteles after create and update )
- Mail service For admin
- Image , Video hosting with Cloudinary
- Searching , Pagination , Filtering
- Booking and Pay with Stripe
- E2E Testing with PlayWright

## TODO Features :

- payment plans for hotel owners
- notification service for admin and owner

## Usage

important Configration for environment :

- Backend env :

  - <img src="https://github.com/aboodmagdy1/Mansoura_Hotels/blob/master/images/backendDev.png" width="300" high="300" alt="backend env variables"/>

- Testing env :

  - <img src="https://github.com/aboodmagdy1/Mansoura_Hotels/blob/master/images/testing.png" width="300" high="300" alt="testing env variables"/>

- Frontend env :
  - <img src="https://github.com/aboodmagdy1/Mansoura_Hotels/blob/master/images/frontendDev.png" width="300" high="300" alt="frontend env variables"/>

## Installation

```cmd
# Run dev
cd .\backend\
1) npm i
2) npm run dev

cd .\frontend\
1) npm i
2) npm run dev


#Run e2e tests
1) cd ./backend/
2) npm run e2e

1) cd .\frontend\
2) npm run dev

#build
npm i && npx tsx

# start production
npm run start
```

## Technologies

- Backend :
  - [NodeJS](https://nodejs.org/en/)
  - [Express](http://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Mongoose](https://mongoosejs.com/)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [JSON Web Token](https://jwt.io/)
  - [Stripe](https://stripe.com/)
  - [PlayWright](playwright.dev) for testing
  - [Cloudinary](https://cloudinary.com/) img and video hosting
- FrontEnd :
  - [Vite](https://vitejs.dev/)
  - [ReactJs](https://react.dev/)
  - [React Router](https://reactrouter.com/en/main)
  - [React Forms](https://react-hook-form.com/)
  - [Material Ui](https://mui.com/material-ui/)
