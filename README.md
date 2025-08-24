# 🔐 Password Generator & Manager

A web-based application that allows users to **sign up, log in, generate strong passwords, and manage their credentials** securely.  
The project is built using **HTML/CSS, JavaScript, Firebase Authentication, and Firestore Database**.

---

## 🚀 Features

- **User Authentication**
  - Sign up with username and email
  - System generates a permanent password automatically
  - Login with email + password

- **Account Settings**
  - Manage profile details (name, email, mobile, gender)

- **Password Generator**
  - Auto-generate strong passwords
  - Generate with constraints (length, symbols, numbers, etc.)
  - Password strength checker

- **Password Manager**
  - Save and manage multiple website credentials
  - View stored credentials in a structured table
  - Export credentials as **Excel file**
  - Share credentials via **Email**

- **Secure Backend**
  - Firebase Authentication for login/signup
  - Firestore for storing user profiles & credentials

---

## 🛠️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript  
- **Backend / Database:** Firebase (Auth + Firestore)  
- **Hosting:** Firebase Hosting / Netlify  
- **Tools:** GitHub, GitHub Actions (for CI/CD)

---

## 📂 Project Structure

/public
│── index.html # Login page
│── signup.html # Signup page
│── home.html # Dashboard with navigation
│── password-manager.html # Manage credentials
│── css/
│ └── style.css # Common styles
│── js/
│ ├── firebase-config.js
│ ├── signup.js
│ ├── login.js
│ ├── password-manager.js
│ └── utils.js


---

## ⚡ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/password-manager.git
   cd password-manager

2. Setup Firebase

Go to Firebase Console

Create a new project

Enable Authentication → Email/Password

Enable Cloud Firestore

Copy the Firebase config into js/firebase-config.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

3. Run locally with Firebase

firebase serve

Open http://localhost:5000
.

4. Deploy to Firebase Hosting

firebase deploy

✅ Requirements

Web browser (Chrome/Edge/Firefox recommended)

Firebase account

Node.js + Firebase CLI (for hosting)

