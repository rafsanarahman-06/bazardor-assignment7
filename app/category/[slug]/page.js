"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true);
        setError("");

        const [allProducts, allCategories] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        const selectedCategory = allCategories.find(
          (item) => item.slug === slug
        );

        setCategory(selectedCategory || null);

        const filteredProducts = allProducts.filter(
          (product) => product.category === slug
        );

        setProducts(filteredProducts);
      } catch (err) {
        console.error("Category loading failed:", err);
        setError("পণ্য লোড করা যায়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadCategory();
    }
  }, [slug]);

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-low") {
      result.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sort === "price-high") {
      result.sort((a, b) => Number(b.today) - Number(a.today));
    } else if (sort === "name") {
      result.sort((a, b) =>
        a.nameBn.localeCompare(b.nameBn, "bn")
      );
    }

    return result;
  }, [products, sort]);

  return (
    <main className="container page-content">
      <Link href="/" className="back-link">
        <ArrowLeft size={17} />
        হোম পেজে ফিরে যান
      </Link>

      <section className="category-banner">
        <span className="category-banner-icon">
          {category?.icon || category?.categoryIcon || "🛒"}
        </span>

        <div>
          <h1>{category?.nameBn || category?.categoryNameBn || "পণ্যের বিভাগ"}</h1>

          <p>
            {loading
              ? "পণ্য লোড হচ্ছে..."
              : `${sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য`}
          </p>
        </div>
      </section>

      <section className="category-products-section">
        <div className="category-toolbar">
          <div>
            <h2>এই বিভাগের পণ্য</h2>
            <p>আজকের বাজারদর দেখুন</p>
          </div>

          <label className="sort-control">
            <SlidersHorizontal size={17} />

            <span>সাজান:</span>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="পণ্য সাজান"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
              <option value="name">নাম অনুযায়ী</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="loading-skeleton" key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="empty-state">
            <p>{error}</p>

            <button
              type="button"
              className="signup-button"
              onClick={() => window.location.reload()}
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : !category ? (
          <div className="empty-state">
            <h2>বিভাগটি পাওয়া যায়নি</h2>
            <Link href="/">হোম পেজে ফিরে যান</Link>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="empty-state">
            <h2>এই বিভাগে কোনো পণ্য নেই</h2>
            <p>অন্য বিভাগ থেকে পণ্য দেখুন।</p>
            <Link href="/">সব পণ্য দেখুন</Link>
          </div>
        ) : (
          <div className="product-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}