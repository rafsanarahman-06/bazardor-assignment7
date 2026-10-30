# বাজার দর (BazarDor)

BazarDor is a Next.js-based market price tracking website that helps users explore daily prices of essential products in Bangladesh. Users can browse product categories, compare prices, view price changes, and manage their profiles.

## Live Website

Add your deployed website URL here.

## Technologies Used

* Next.js (App Router)
* React
* JavaScript
* Tailwind CSS
* Axios
* Better Auth
* Lucide React
* React Hot Toast
* Programming Hero BazarDor API

## Key Features

1. **Daily Market Prices:** View updated prices of essential products.
2. **Price Change Tracking:** Explore products whose prices have increased or decreased.
3. **Product Categories:** Browse products by categories such as rice, lentils, oil, vegetables, and fish.
4. **Product Details:** View individual product information and price history.
5. **Market Comparison:** Explore available market price information.
6. **User Authentication:** Sign up and sign in using email and password.
7. **User Profile:** View account information and update your name.
8. **Responsive Design:** Access the website on desktop, tablet, and mobile devices.
9. **Price Ticker:** Quickly view product price changes.

## API

This project uses the Programming Hero BazarDor API:

https://openapi.programming-hero.com/api/bazardor

## Getting Started

First, clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project directory:

```bash
cd bazardor-assignment7
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Build for Production

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Project Structure

```text
app/
  api/
  category/
  product/
  profile/
  signin/
  signup/
  page.js
  layout.js
  globals.css

components/
  Navbar.jsx
  Footer.jsx
  PriceTicker.jsx
  ProductCard.jsx
  LoadingSkeleton.jsx

lib/
  api.js
  auth.js
  auth-client.js
```

## Author

Rafsan Rahman

## Assignment

Programming Hero - Assignment 7
Project Name: BazarDor
