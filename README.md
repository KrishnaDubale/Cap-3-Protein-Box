# 🥗 Protein Box (FitEats)
### Smart Food & Fitness Platform

---

## 📌 Overview

**Protein Box (FitEats)** is a **smart food and fitness platform** designed for health-conscious individuals, gym-goers, and fitness enthusiasts who want to maintain a balanced diet without compromising convenience.

It bridges the gap between **food delivery apps** and **fitness tracking platforms** by combining:
- 🥦 Healthy food delivery  
- 🤖 AI-based calorie and nutrition tracking  
- 💪 Fitness and progress monitoring  

All in one **data-driven ecosystem** that helps users eat smarter, track better, and achieve their fitness goals effectively.

---

## 🚩 Problem Statement

Fitness-focused users often struggle to find healthy, high-protein meals that match their calorie and macro goals.  
While existing delivery apps like **Swiggy** or **Zomato** offer convenience, they lack:
- Nutritional tracking  
- Personalized AI recommendations  
- Integration with fitness data  

**Protein Box** solves this by offering a **smart recommendation engine**, **nutritional insights**, and **goal-oriented meal options** — merging health, food, and data science.

---


### Example Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | Postgres |
| **Authentication** | Auth0 / JWT (User, Restaurant, Admin) |
| **AI/Nutrition Engine** | FastAPI, Nutrition APIs |
| **Payments** | Razorpay / Stripe |
| **Hosting** | Vercel (Frontend), Render/Railway (Backend)|

---

## ⚙️ Key Features

| Category | Feature Description |
|-----------|---------------------|
| 🍱 **Healthy Food Delivery** | Browse curated healthy meals from partnered restaurants. |
| 🏋️ **Meal Customization** | Choose fitness goals like “Muscle Gain,” “Fat Loss,” or “Maintenance.” |
| 🧮 **Calorie & Macro Tracking** | Meals display calories, protein, carbs, and fats using Nutrition APIs. |
| 🤖 **AI Meal Recommendation** | Personalized meal suggestions based on past orders, calorie goals, and workouts. |
| 📊 **Progress Dashboard** | Track daily calorie intake, workouts, and weight changes visually. |
| 📸 **Meal Scanner (Optional)** | Upload a photo — AI estimates the meal’s nutritional content. |

---

## 🧠 Advanced Functionalities

### 🔁 Full CRUD Operations
- Users, meals, and orders support **Create, Read, Update, Delete** through RESTful APIs.  
- Admins and restaurants can manage meals and orders.  
- Users can update profiles, manage favorites, and view history.

### 🔍 Search, Sort, Filter, and Pagination
- Search meals by name, category, or goal.  
- Sort by calories, protein content, or popularity.  
- Paginated results for smooth browsing.  
- Optimized queries in Node.js + MySQL ensure scalability and performance.

---

## 🧩 API Overview

| Endpoint | Method | Description | Access |
|-----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register a new user | Public |
| `/api/auth/login` | POST | User login | Public |
| `/api/meals` | GET | Get all available healthy meals | Public |
| `/api/meals/:id` | GET | Get specific meal details | Public |
| `/api/meals` | POST | Add a new meal | Admin |
| `/api/meals/:id` | PUT | Update an existing meal | Admin |
| `/api/meals/:id` | DELETE | Delete a meal | Admin |
| `/api/users/:id` | GET | Get user profile | Authenticated |
| `/api/users/:id` | PUT | Update user profile | Authenticated |
| `/api/order` | POST | Place a new order | Authenticated |
| `/api/order/:id` | GET | Get order details | Authenticated |
| `/api/order/:id` | PUT | Update order status | Admin |
| `/api/order/:id` | DELETE | Cancel order | Authenticated |

---

## 🛠️ Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | React.js, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | Postgres |
| **Authentication** | Auth0 / JWT |
| **AI Engine** | Python (Flask / FastAPI), Nutrition APIs |
| **Payments** | Razorpay / Stripe |
| **Hosting** | Vercel, Render |


