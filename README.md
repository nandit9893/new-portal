Job Portal Backend


A robust backend system for a job portal with authentication, job management, resumes, payments, and an admin panel.

🚀 Features

✅ User Authentication (NextAuth.js with JWT)
✅ Job Posting & Management (Admin & User roles)
✅ Resume Upload & Builder (Cloudinary/AWS S3)
✅ Secure API Routes (JWT, OAuth, Hash Password)
✅ Payment Integration (Razorpay/Stripe)
✅ Admin Panel (Manage users, jobs, applications)
✅ Scalable & Optimized for Performance

🛠️ Tech Stack

---

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT & OAuth

Storage: Cloudinary / AWS S3 (for resumes)

Payments: Razorpay 

Security: JWT, Hash Password


---

📌 Prerequisites

Ensure you have the following installed before starting:

Node.js (Latest LTS version)

MongoDB (Local or cloud database)

Cloudinary / AWS S3 Account (For resume storage)

Razorpay / Stripe Account (For payments)





---

💻 Getting Started

1️⃣ Clone the repository:

git clone <repository-url>
cd back-end

2️⃣ Install dependencies:

npm install

3️⃣ Configure environment variables:

Copy .env.example to .env

Fill in the required environment variables


4️⃣ Run the development server:

npm run dev

🔗 Open http://localhost:3000 in your browser


---

📌 Environment Variables

Create a .env file with these variables:

# Database
MONGODB_URI=

# Authentication
JWT_SECRET=

# Cloud Storage
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Payment Gateway
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

---

📜 Available Scripts


---

back-end/
│── config/                # Configuration files
│── controllers/           # Business logic (API controllers)
│   ├── adminController.js
│   ├── applicationController.js
│   ├── authController.js
│   ├── blogController.js
│   ├── hrController.js
│   ├── jobController.js
│   ├── jobdashboard.js
│   ├── paymentController.js
│   ├── profileController.js
│   ├── reportController.js
│   ├── resumeBuilderController.js
│   ├── resumeController.js
│   ├── settingsController.js
│   ├── testController.js
│   ├── userController.js
│── middlewares/           # Middleware functions (auth, validation)
│── models/                # MongoDB models (User, Job, Resume, etc.)
│── public/                # Static assets
│── routes/                # API route handlers
│── uploads/               # Uploaded resumes & images
│── index.js               # Main entry point


---

📧 Contact & Support

For issues or feature requests, feel free to open an issue or contact me at:

📩 Email: your-email@example.com
💼 LinkedIn: Your LinkedIn Profile


---


Job Portal Frontend

A modern React.js (Next.js) frontend for a job portal, designed for job seekers, recruiters, and administrators with a seamless UI/UX.

🚀 Features

✅ User Authentication (Login, Register, JWT)
✅ Job Listings & Applications
✅ Admin Dashboard (Manage Users, Jobs, Payments)
✅ Resume Upload & Profile Management
✅ Payment Integration (Razorpay/Stripe)
✅ Email Notifications (Nodemailer for OTPs & alerts)
✅ Fully Responsive UI (Optimized for mobile & desktop)
✅ Modern UI/UX (Tailwind CSS + React Components)


---

🛠️ Tech Stack

Frontend: React.js, Next.js

Styling: Tailwind CSS, Custom Components

State Management: Context API / Redux

Authentication: JWT + NextAuth

Payments: Razorpay 





---

📂 Folder Structure

src/
│── app/                  # Application source code
│   ├── AboutUs/          # About page
│   ├── AdminEmployer/    # Employer dashboard
│   ├── AdminLogin/       # Admin login page
│   ├── AdminSignUp/      # Admin signup page
│   ├── Components/       # Reusable UI components
│   ├── ContactUs/        # Contact page
│   ├── Emails/           # Email templates
│   ├── fonts/            # Custom fonts
│   ├── HelpSupport/      # Help & Support page
│   ├── Home/             # Homepage
│   ├── JobDetails/       # Job details page
│   ├── Jobs/             # Job listings
│   ├── Login/            # User login page
│   ├── MyApplication/    # User job applications
│   ├── Payment/          # Payment processing
│   ├── Profile/          # User profile
│   ├── Register/         # User registration
│   ├── Resume/           # Resume upload & builder
│   ├── UserManagement/   # Manage users (Admin)
│── favicon.ico           # Website icon


---

💻 Getting Started

1️⃣ Clone the repository:

git clone <repository-url>
cd frontend

2️⃣ Install dependencies:

npm install

3️⃣ Run the development server:

npm run dev

🔗 Open http://localhost:3000 in your browser

