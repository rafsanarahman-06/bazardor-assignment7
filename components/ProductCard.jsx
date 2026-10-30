import Link from "next/link";
import { Star, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { formatPrice, formatUnit } from "@/lib/api";

export default function ProductCard({ product }) {
  const direction = product.change?.dir || "flat";

  const percentage = Math.abs(
    Number(product.change?.pct || 0)
  );

  return (
    <Link
      href={`/product/${product.slug}`}
      className="product-card"
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত`}
    >
      <div className="product-card-top">
        <span className="product-icon">
          {product.image || product.categoryIcon || "🛒"}
        </span>

        <span
          className={`price-change ${
            direction === "up"
              ? "price-increase"
              : direction === "down"
                ? "price-decrease"
                : "price-unchanged"
          }`}
        >
          {direction === "up" ? (
            <TrendingUp size={13} />
          ) : direction === "down" ? (
            <TrendingDown size={13} />
          ) : (
            <Minus size={13} />
          )}

          {percentage.toLocaleString("bn-BD", {
            maximumFractionDigits: 1,
          })}
          %
        </span>
      </div>

      <h3 className="product-name">{product.nameBn}</h3>

      <p className="product-unit">{formatUnit(product.unit)}</p>

      <div className="product-price-area">
        <span className="product-price-label">আজকের দাম</span>
        <strong className="product-price">
          {formatPrice(product.today)}
        </strong>
      </div>

      {typeof product.rating === "number" && (
        <div className="product-rating">
          <Star size={14} fill="currentColor" />
          <span>{product.rating.toLocaleString("bn-BD")}</span>
        </div>
      )}
    </Link>
  );
}