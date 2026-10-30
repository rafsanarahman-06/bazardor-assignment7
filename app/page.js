import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
let products = [];

try {
products = await getProducts();
} catch (error) {
console.error("Homepage data loading error:", error);
}

const rising = products
.filter((product) => product.change?.dir === "up")
.slice(0, 6);

const falling = products
.filter((product) => product.change?.dir === "down")
.slice(0, 6);

const today = new Date().toLocaleDateString("bn-BD", {
weekday: "long",
day: "numeric",
month: "long",
year: "numeric",
});

return (
<>
{/* Hero Section */} <section className="hero"> <div className="container"> <div className="hero-box"> <div className="hero-copy"> <p className="hero-date">
{today} </p>

          <h1>
            আজকের বাজারের দাম,
            <br />
             এক নজরে
          </h1>

          <p className="hero-description">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম- বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-
            সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#all-products"
            className="hero-button"
          >
            পণ্যের দাম দেখুন
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="hero-visual">
          <img
            src="/bazar-hero.png"
            alt="বাজারের নিত্যপ্রয়োজনীয় পণ্য"
          />
        </div>
      </div>
    </div>
  </section>

  <div className="container home-content">
    {/* Rising Products */}
    <section className="home-section">
      <div className="section-heading">
        <h2>
          <TrendingUp
            size={19}
            style={{
              display: "inline",
              verticalAlign: "middle",
            }}
          />{" "}
          আজ দাম বেড়েছে
        </h2>
      </div>

      {rising.length > 0 ? (
        <div className="product-grid">
          {rising.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">
          বর্তমানে দাম বৃদ্ধির কোনো তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>

    {/* Falling Products */}
    <section className="home-section">
      <div className="section-heading">
        <h2>
          <TrendingDown
            size={19}
            style={{
              display: "inline",
              verticalAlign: "middle",
            }}
          />{" "}
          আজ দাম কমেছে
        </h2>
      </div>

      {falling.length > 0 ? (
        <div className="product-grid">
          {falling.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">
          বর্তমানে দাম কমার কোনো তথ্য পাওয়া যায়নি।
        </p>
      )}
    </section>

    {/* All Products */}
    <section
      className="home-section"
      id="all-products"
    >
      <div className="section-heading">
        <h2>সব পণ্য</h2>
      </div>

      {products.length > 0 ? (
        <>
          <p className="product-count">
            মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
          </p>

          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="empty-message">
          পণ্যের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>
      )}
    </section>
  </div>
</>
);
}
