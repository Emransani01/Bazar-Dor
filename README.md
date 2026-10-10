# 🛒 Bazar Dor — বাজার দর

### প্রতিদিনের প্রয়োজনীয় পণ্যের বাজারদর এক নজরে

Bazar Dor is a Bengali-first market price web application that helps users explore essential product prices, compare market-based prices, track price increases and decreases, and browse products by category. It provides a responsive interface, Bengali price formatting, secure authentication, and detailed product information.

বাজার দর একটি বাংলা-ভিত্তিক বাজারদরের ওয়েব অ্যাপ্লিকেশন। এখানে প্রয়োজনীয় পণ্যের বর্তমান দাম, দাম বৃদ্ধি ও হ্রাস, বিভিন্ন বাজারের মূল্য এবং ক্যাটাগরি অনুযায়ী পণ্যের তথ্য দেখা যায়।

---

## 📸 Project Screenshot

![Bazar Dor Homepage Screenshot](./Bazar-Dor.PNG)

---

## ✨ Key Features

- 🏠 **Responsive Homepage** — Browse essential products through a clean, responsive interface.
- 📈 **Price Increase Section** — Explore products whose prices have increased.
- 📉 **Price Decrease Section** — Explore products whose prices have decreased.
- 🛍️ **All Products** — View product cards with names, units, prices, and price-change indicators.
- 🏷️ **Category Browsing** — Explore products by category.
- ↕️ **Price Sorting** — Sort products by default order, lowest price, or highest price, including Bengali numeral values.
- 🇧🇩 **Bengali Price Formatting** — Display product prices using Bengali digits.
- 📊 **Product Details** — View minimum, maximum, average, and market-based prices.
- 🔐 **Authentication** — Sign in and sign up using email and password.
- 🌐 **Social Login** — Support Google and GitHub authentication.
- 🛡️ **Protected Product Details** — Require authentication to access product detail pages.
- 👤 **Profile Update** — Update profile information through a dedicated page.
- 🔔 **Toast Notifications** — Show feedback for authentication and relevant actions.
- ⏳ **Loading States** — Display loading indicators while data is being fetched.
- 🚫 **Custom 404 Pages** — Provide a friendly way back to the homepage for invalid routes.
- 📱 **Mobile-Friendly Design** — Support mobile, tablet, and desktop screen sizes.

---

## 🧰 Technologies Used

| Technology                                         | Purpose                                      |
| -------------------------------------------------- | -------------------------------------------- |
| ⚛️ [React](https://react.dev/)                     | Build reusable UI components                 |
| ▲ [Next.js](https://nextjs.org/)                   | Application framework and rendering          |
| 🧭 Next.js App Router                              | File-based routing and page navigation       |
| 📘 [TypeScript](https://www.typescriptlang.org/)   | Type-safe application development            |
| 🎨 [Tailwind CSS](https://tailwindcss.com/)        | Utility-first styling and responsive layouts |
| 🌼 [DaisyUI](https://daisyui.com/)                 | Reusable UI styling components               |
| 🔐 [Better Auth](https://www.better-auth.com/)     | Authentication and session management        |
| 🍃 [MongoDB](https://www.mongodb.com/)             | Database integration                         |
| 🔔 [React Hot Toast](https://react-hot-toast.com/) | Success and error notifications              |
| 🎯 [Lucide React](https://lucide.dev/)             | Icons for the user interface                 |
| 🚀 [Vercel](https://vercel.com/)                   | Application deployment                       |

---

## 🔌 API Integration

Bazar Dor uses the following API to retrieve product and category information.

**Main API**

`https://openapi.programming-hero.com/api/bazardor`

**Alternative API**

`https://api.api-store.workers.dev/api/bazardor`

**Alternative API**

`https://api.abcz.workers.dev/api/bazardor`

### Available Endpoints

| Endpoint                  | Description                   |
| ------------------------- | ----------------------------- |
| `/products`               | Retrieve all products         |
| `/products?category=chal` | Retrieve products by category |
| `/products/1`             | Retrieve a single product     |
| `/categories`             | Retrieve all categories       |
| `/categories/chal`        | Retrieve a single category    |

---

## ⚙️ Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/Emransani01/Bazar-Dor.git
```

### 2. Navigate to the project directory

```bash
cd Bazar-Dor
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by your local Better Auth and MongoDB configuration.

Use your own valid credentials and follow the configuration used by the project. **Never commit your `.env` file or publish secret keys.**

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build for Production

Check the production build before deployment:

```bash
npm run build
```

To run the production server after a successful build:

```bash
npm run start
```

---

## 🚀 Deployment

The application can be deployed to a supported hosting platform such as Vercel.

- **Live Website:** [https://bazar-dor-sage.vercel.app/](https://vercel.com/)
- **GitHub Repository:** [Emransani01/Bazar-Dor](https://github.com/Emransani01/Bazar-Dor)

Make sure the required environment variables are configured in the hosting platform before deployment.

---

## 📋 Assignment Requirements

This project README documents the main assignment requirements:

- ✅ Project name and description
- ✅ Technology stack
- ✅ More than five key features
- ✅ API endpoints
- ✅ Local installation instructions
- ✅ Environment configuration guidance
- ✅ Production build and deployment information
- ✅ GitHub repository link

---

<p align="center">
  🛒 <strong>Bazar Dor — বাজার দর</strong><br/>
  প্রয়োজনীয় পণ্যের দাম এক নজরে।<br/><br/>
  <em>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</em>
</p>
