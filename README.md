# Auralia - Full Stack Next.js Ecommerce Website

![Next.js Ecommerce](https://l7ewz3hqkc.ufs.sh/f/LFPunsIWlVM1XSov3XH3kdQXKoJ0FE2RDab5Lycfm6hwlHp1)

## 🚀 Tech Stack & Libraries Used

- **Next.js 15** - React Framework for Server-side Rendering & Static Site Generation
- **React 19** - UI Component Library
- **TypeScript** - Type Safety & Developer Productivity
- **PostgreSQL (Neon DB Serverless)** - Scalable Database Solution
- **Prisma ORM** - Database Management & Query Optimization
- **Zod** - Schema Validation & Type Inference
- **NextAuth.js** - Authentication & Authorization
- **React Hook Form** - Form Management & Validation
- **PayPal & Stripe API** - Secure Payment Integration
- **ShadCN UI** - Pre-built UI Components
- **Tailwind CSS** - Modern & Responsive Styling
- **Recharts** - Data Visualization for Admin Dashboard
- **Uploadthing** - File Uploading for Product Images
- **Jest** - Unit Testing Framework
- **Resend API** - Email Notifications
- **WS** - WebSocket Integration for Real-time Updates
- **Lucide-react** - Icon Library
- **Radix UI Components** - Dropdowns, Dialogs, Checkbox, Select, etc.
- **Query-string** - URL Parsing & Query Parameters
- **Slugify** - SEO-friendly URL Generation
- **Sonner** - Notifications & Alerts
- **Bcrypt-ts-edge** - Secure Password Hashing
- **Clsx** - Conditional Classnames Utility
- **Embla Carousel** - Image Carousel UI

---

## 📌 Core Features Implemented

### **1️⃣ Authentication & User Management**

- Full authentication system using **NextAuth.js**
- Role-based access control for **Admin & Customers**
- Secure **credential-based sign-in & JWT sessions**
- **User profile management** with data persistence
- **Protected routes** for authenticated users
- Callback URL Handling - **Redirects users after authentication**

### **2️⃣ Shopping Cart & Checkout System**

- **Add-to-cart functionality** with real-time updates
- **Session-based cart** for guest users
- **Merging guest cart with user cart** on login
- **Dynamic cart quantity management**
- **Shipping address form & validation**
- **Multiple payment options**: PayPal, Stripe, and COD
- **Secure order placement & transaction handling**

### **3️⃣ Order Management & Processing**

- **Order history tracking** for users
- **Admin dashboard** for managing orders
- Update order status (**processing, shipped, delivered**)
- **PayPal API integration** for secure payments
- **Stripe API integration** for alternative payments
- **Webhook implementation** for Stripe order confirmation

### **4️⃣ Product Catalog & Filtering**

- **Dynamic product listing** with categories & tags
- **Advanced filtering & sorting** (price, rating, category)
- **Search functionality** with query-based results
- **Featured product carousel & category drawer**

### **5️⃣ Admin Panel & Dashboard**

- **Overview dashboard** displaying key stats (monthly sales, orders, users)
- **CRUD operations** for products, orders, and users
- **Image uploading with Uploadthing**
- **Order & user search functionality**
- **Role management & access control** for admin features

### **6️⃣ Reviews & Ratings System**

- **User review submission** for products
- **Ratings system** with aggregated calculations
- **Review moderation & editing** capabilities

### **7️⃣ Email Notifications & Receipts**

- **Integration with Resend API** for email notifications
- **Automated order confirmation emails**
- **Purchase receipt templates**
- **Email preview functionality in the browser**

### **8️⃣ Performance Optimization & Security**

- **Prisma query optimization** for efficient DB interactions
- **Server-side rendering (SSR)** for faster page loads
- **JWT-based authentication** with secure tokens
- **Session & cookie management** for persistent login states
- **Edge functions** for optimized request handling

### **9️⃣ Deployment & Continuous Integration**

- **Deployed on Vercel** for serverless architecture
- **Continuous deployment pipeline** for automated updates
- **Git-based version control** with CI/CD integration
- **Custom domain & DNS config** via Vercel.

---

## 📜 Package.json Scripts

| Script        | Description                               |
| ------------- | ----------------------------------------- |
| `dev`         | Runs the development server               |
| `build`       | Builds the Next.js app for production     |
| `start`       | Runs the production build                 |
| `lint`        | Runs ESLint for code quality checks       |
| `postinstall` | Runs Prisma generate after installation   |
| `test`        | Runs Jest tests                           |
| `test:watch`  | Runs Jest in watch mode for development   |
| `email`       | Copies `.env` and starts email dev server |

---

## 📌 Deployment

This project is deployed on **Vercel** for a seamless serverless experience.

### **📌 Deploy to Vercel**

```sh
vercel deploy
```

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to modify and use it for personal or commercial projects.

---

## ⭐ Contributing

Contributions are welcome! Feel free to fork the repo, create a feature branch, and submit a pull request.

---

## 📬 Contact

For inquiries, reach out via [rkstaraniket34@gmail.com](mailto:rkstaraniket34@gmail.com) or connect on [LinkedIn](https://linkedin.com/in/aniketdebnath/).

---

**🚀 Built with Next.js, Prisma, Tailwind, and ❤️ by Aniket Debnath**
