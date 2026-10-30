"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, formatPrice } from "@/lib/api";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let active = true;

    getProducts()
      .then((data) => {
        if (active) {
          setProducts(Array.isArray(data) ? data : []);
        }
      })
      .catch((error) => {
        console.error("Failed to load price ticker:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!products.length) return null;

  const items = [...products, ...products];

  return (
    <div className="price-ticker">
      <div className="ticker-track">
        {items.map((product, index) => {
          const direction = product.change?.dir;

          return (
            <Link
              href={`/product/${product.slug}`}
              key={`${product.id}-${index}`}
              className="ticker-item"
            >
              <span>{product.image}</span>

              <span>{product.nameBn}</span>

              <strong>{formatPrice(product.today)}</strong>

              <span
                className={
                  direction === "up"
                    ? "price-increase"
                    : direction === "down"
                      ? "price-decrease"
                      : "price-unchanged"
                }
              >
                {direction === "up"
                  ? "▲"
                  : direction === "down"
                    ? "▼"
                    : "—"}{" "}
                {Math.abs(
                  Number(product.change?.pct || 0)
                ).toLocaleString("bn-BD")}
                %
              </span>
            </Link>
          );
        })}
      </div>

      <style>{`
        .ticker-track {
          display: flex;
          width: max-content;
          animation: bazardor-ticker 50s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes bazardor-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}