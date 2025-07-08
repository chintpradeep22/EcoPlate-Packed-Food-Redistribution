# 🍽️ EcoPlate - Packed Food Redistribution Platform

EcoPlate is a MERN stack web application that helps reduce food waste by redistributing packed food nearing expiration. It allows users to browse and order surplus food affordably, while admin users can manage the platform from the same website.

---

## 🌐 Live Demo

🔗 **Website**: [EcoPlate on Render](https://ecoplate-packed-food-redistribution-pgz1.onrender.com)

---

## ⚙️ Features

### 👥 User Features
- 🔐 JWT Authentication
- 📝 Login / Signup / Logout
- 🔍 Search and Filter Food Items
- 🛒 Add to Cart / Place Orders
- 📦 View My Orders
- 💬 Help & Support Page
- 📱 Fully Responsive on All Devices

### 🛠️ Admin Features (via same site)
When logged in as an admin, the site reveals extended functionality:
- ➕ Add New Products
- ✏️ Edit / Delete Existing Products
- 👤 Manage All Users
- 📦 View and Manage All Orders
- 🔁 Infinite Scrolling for Product Lists
- 🔔 Real-Time Feedback via `react-toastify`

> 🧠 Admins use the same website as users. Based on the role (admin/user), different capabilities are enabled after login.

---

## 🔐 Authentication & Security

- 🔑 Password hashing using **Bcrypt**
- 📲 Token-based login using **JWT**
- 🔒 Role-based Access Control
- 🧪 Protected API routes for secure access

---

## 📧 Email Functionality

EcoPlate integrates with **EmailJS** for sending support requests and contact messages without needing a backend mail server.

---

## 🧰 Tech Stack

| Technology       | Purpose                      |
|------------------|------------------------------|
| **React.js**     | Frontend UI Framework        |
| **Node.js**      | Backend Runtime Environment  |
| **Express.js**   | Backend API Framework        |
| **MongoDB**      | NoSQL Database               |
| **JWT**          | Secure User Authentication   |
| **EmailJS**      | Send Emails from Frontend    |
| **React Toastify** | In-app Notifications      |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js
- MongoDB Atlas or Local MongoDB
- Git

---

### 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/EcoPlate
cd EcoPlate
```
2. **Setup the Server**
```bash
cd ../server
npm install
nodemon server.js
```
4. **Setup the Client**
```bash
cd client
npm install
npm start
``` 
