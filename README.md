# Project Title

KATHAN_NEWS

## Introduction

Introducing Kathan News,built for masai construct week block 34 . An innovative online news application offering seamless access to the latest headlines. With user-friendly features including robust registration and authentication, responsive design, and intuitive search capabilities, Kathan News provides an immersive news browsing experience for users worldwide.

## Project Type

Frontend

## Deplolyed App

Frontend: https://kathan-news.netlify.app/ <br>
Backend: https://code-kathan-api.vercel.app

## Directory Structure

bash
code-kathan-2345
├── backend/
│   └── .gitignore
│   └── .prettierrc
│   ├── api/
│   │   └── server.js
│   └── db.json
│   └── package-lock.json
│   └── package.json
│   └── vercel.json
├── frontend/
│   └── .gitignore
│   └── .prettierrc
│   └── README.md
│   └── package-lock.json
│   └── package.json
│   ├── public/
│   │   └── favicon.ico
│   │   └── index.html
│   │   └── logo192.png
│   │   └── logo512.png
│   │   └── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   └── .prettierrc
│   │   └── App.css
│   │   └── App.test.tsx
│   │   └── App.tsx
│   │   ├── assets/
│   │   │   └── .dummy
│   │   ├── components/
│   │   │   └── .dummy
│   │   ├── context/
│   │   │   └── .dummy
│   │   ├── hooks/
│   │   │   └── .dummy
│   │   └── index.css
│   │   └── index.tsx
│   │   └── logo.svg
│   │   ├── pages/
│   │   │   └── .dummy
│   │   │   ├── Admin/
│   │   │   │   └── Admin.tsx
│   │   │   ├── Login/
│   │   │   │   └── Login.tsx
│   │   │   ├── buisness/
│   │   │   │   └── Buisness.tsx
│   │   │   ├── culture/
│   │   │   │   └── Culture.tsx
│   │   │   ├── earth/
│   │   │   │   └── Earth.tsx
│   │   │   ├── home/
│   │   │   │   └── Home.tsx
│   │   │   ├── innovation/
│   │   │   │   └── Innovation.tsx
│   │   │   ├── news/
│   │   │   │   └── News.tsx
│   │   │   ├── searchPage/
│   │   │   │   └── SearchPage.tsx
│   │   │   ├── signup/
│   │   │   │   └── Signup.tsx
│   │   │   ├── sports/
│   │   │   │   └── Sports.tsx
│   │   │   ├── travel/
│   │   │   │   └── Travel.tsx
│   │   │   ├── video/
│   │   │   │   └── Video.tsx
│   │   └── react-app-env.d.ts
│   │   ├── redux/
│   │   │   └── .dummy
│   │   └── reportWebVitals.ts
│   │   ├── routes/
│   │   │   └── .dummy
│   │   │   └── Allroutes.tsx
│   │   │   └── ProtectedRoutes.tsx
│   │   └── setupTests.ts
│   │   ├── utils/
│   │   │   └── .dummy
│   │   │   ├── baseUrl/
│   │   │   │   └── index.ts
│   │   │   ├── layoutRoute/
│   │   │   │   └── index.ts
│   └── tsconfig.json
└── package.json
└── .DS_Store
└── .gitignore
└── README.md


## Video Walkthrough of the project

[Project Presentation Video](https://youtu.be/a-GFdCgTQms)

## Features

- User and admin registration and authentication functionality
- Responsive design for seamless user experience across devices
- User profile creation and management
- Search functionality to easily find desired news articles
- Scroll-to-top feature for convenient navigation 
- admin dashboard displays metrics of user distribution across the globe , total clicks reseived on the website and other key information
- ability for the admin to perform crud on news articles and users 

## design decisions or assumptions

At Kathan News, we're committed to delivering an exceptional user experience that seamlessly combines aesthetic appeal with functionality. To achieve this goal, we've implemented two key features: an attractive user interface with toggling theme and interactive toast functionality.

Intuitive Theming for Enhanced Visual Experience

Design Goal: Our primary objective is to offer users a visually engaging experience that aligns with their preferences and surroundings.

Solution: We've integrated a sleek theming system that allows users to effortlessly switch between light and dark modes. Whether users prefer a brighter interface for daytime browsing or a darker one for nighttime reading, they can easily toggle between the two options with a simple click.

## Installation & Getting started

Detailed instructions on how to install, configure, and get the project running.
bash
clone the repo
cd into Code-kathan-2345
npm run install
npm run start_fe to start the frontend




## Usage

Provide instructions and examples on how to use your project.

bash
npm install
npm run start_fe
npm run start_be


#### Light Mode

[![light theme](./frontend/src//assets/img1.png)](<[link_url](https://code-kathan.vercel.app/)>)

#### Dark Mode

[![dark theme](./frontend/src//assets/img2.png)](<[link_url](https://code-kathan.vercel.app/)>)

#### Light Theme

## Credentials

Admin Credentials

bash
email- admin@mail.com
password- admin


User Credential

Bash
email- user@mail.com
password- password



## API Endpoints

GET /posts - retrieve all items
POST /posts - create a new item
PATCH /posts/:id - Patch an item 
DELETE /posts/:id  - Delete an item
POST /sign - sign in a user
POST /register - create a user account
PATCH /users/id - Patch a user
DELETE /users/id - Delete a user

## Technology Stack

- React
- TypeScript
- Chakra UI
- Axios
- Google Charts
- JSON server
