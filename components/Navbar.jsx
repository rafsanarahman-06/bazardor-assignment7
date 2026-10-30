"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getCategories } from "@/lib/api";

export default function Navbar() {
const [categories, setCategories] = useState([]);
const [date, setDate] = useState("");
const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
setDate(
new Date().toLocaleDateString("bn-BD", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric",
})
);

getCategories()
  .then(setCategories)
  .catch((error) => {
    console.error("Failed to load categories:", error);
  });

}, []);

const categoryIcons = {
chal: "🍚",
dal: "🫘",
tel: "🫗",
sobji: "🥬",
mach: "🐟",
mangsho: "🥩",
dim: "🥚",
dudh: "🥛",
moshla: "🌶️",
};

function getIcon(category) {
return categoryIcons[category.slug] || category.icon || "🛒";
}

return ( <header className="site-header"> <div className="container navbar-layout"> <div className="brand-area"> <Link href="/" className="brand"> <img
           src="/logo-icon.png"
           alt=""
           className="brand-logo"
         /> <span>বাজার দর</span> </Link>

      <p className="brand-date">
        {date || "আজকের বাজারদর"}
      </p>

      <nav
        className="category-nav"
        aria-label="পণ্যের বিভাগ"
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
          >
            {getIcon(category)} {category.nameBn}
          </Link>
        ))}
      </nav>
    </div>

    <div className="auth-actions">
      <Link href="/signin" className="signin-link">
        সাইন ইন
      </Link>

      <Link href="/signup" className="signup-button">
        সাইন আপ
      </Link>
    </div>

    <button
      type="button"
      className="mobile-menu-toggle"
      aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((open) => !open)}
    >
      {menuOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  </div>

  {menuOpen && (
    <nav
      className="mobile-category-nav"
      aria-label="মোবাইল নেভিগেশন"
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          onClick={() => setMenuOpen(false)}
        >
          {getIcon(category)} {category.nameBn}
        </Link>
      ))}

      <Link href="/signin" onClick={() => setMenuOpen(false)}>
        সাইন ইন
      </Link>

      <Link href="/signup" onClick={() => setMenuOpen(false)}>
        সাইন আপ
      </Link>
    </nav>
  )}
</header>

);
}
