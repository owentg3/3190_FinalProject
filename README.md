#  Album Collection Web App

A full-stack music album collection app built with **React**, **Express**, and **MongoDB**. Users can browse, add, and confirm the addition of albums with a clean and responsive interface.

---

##  Features

- Sign-Up and Login functionality that doesn't allow you to navigate unless you are logged in
- View a list of albums with details like artist, rating, genre, and cover image
- Add a new album through a form with validation
- Confirm before an album is added to the database
- Can edit any album from the homepage
- Navigation between album archive and personal collection
- Responsive UI using **Tailwind CSS**

---

##  Tech Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running locally

### Folder Structure

/backend
    Final_project.js
/frontend
    /src
        /assets
        /pages (Where all jsx code is)
        App.jsx
        main.jsx
    tailwind.config.js
/documents

### API Endpoints

- Get:
    - Main home page to get albums
    - My collection page to get albums in collection
- Post:
    - Add Album
    - Sign Up
    - Adding to My Collection
- Put:
    - Edit from main page
- Delete:
    Delete from mycollection