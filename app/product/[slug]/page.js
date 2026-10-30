import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";

import {
  getProductBySlug,
  getProducts,
  formatPrice,
  formatUnit,
} from "@/lib/api";

export async function generateStaticParams() {
  try {
    const products = await getProducts();

    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    return [];
  }
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const direction = product.change?.dir || "flat";
  const changeValue = Number(product.change?.pct || 0);

  const ChangeIcon =
    direction === "up"
      ? TrendingUp
      : direction === "down"
        ? TrendingDown
        : Minus;

  const changeColor =
    direction === "up"
      ? "detail-change-up"
      : direction === "down"
        ? "detail-change-down"
        : "detail-change-flat";

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  return (
    <main className="container page-content">
      <Link href="/" className="back-link">
        <ArrowLeft size={17} />
        হোম পেজে ফিরে যান
      </Link>

      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">হোম</Link>
        <span>/</span>

        <Link href={`/category/${product.category}`}>
          {product.categoryNameBn || "পণ্যের বিভাগ"}
        </Link>

        <span>/</span>
        <span>{product.nameBn}</span>
      </nav>

      <section className="product-detail-card">
        <div className="product-detail-icon">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="product-detail-info">
          <p className="product-detail-category">
            {product.categoryNameBn || "নিত্যপ্রয়োজনীয় পণ্য"}
          </p>

          <h1>{product.nameBn}</h1>

          <p className="product-detail-unit">
            {formatUnit(product.unit)}
          </p>

          <div className="detail-price-row">
            <span>আজকের দাম</span>
            <strong>{formatPrice(product.today)}</strong>
          </div>

          <div className={`detail-change ${changeColor}`}>
            <ChangeIcon size={17} />

            <span>
              {Math.abs(changeValue).toLocaleString("bn-BD", {
                maximumFractionDigits: 1,
              })}
              %{" "}
              {direction === "up"
                ? "দাম বেড়েছে"
                : direction === "down"
                  ? "দাম কমেছে"
                  : "দামের পরিবর্তন নেই"}
            </span>
          </div>
        </div>
      </section>

      <section className="price-history-section">
        <h2>দামের সারসংক্ষেপ</h2>

        <div className="price-history-grid">
          <article className="price-history-card">
            <span>আজকের দাম</span>
            <strong>{formatPrice(product.today)}</strong>
          </article>

          <article className="price-history-card">
            <span>গতকালের দাম</span>
            <strong>{formatPrice(product.yesterday)}</strong>
          </article>

          <article className="price-history-card">
            <span>গত সপ্তাহের দাম</span>
            <strong>{formatPrice(product.lastWeek)}</strong>
          </article>
        </div>
      </section>

      <section className="market-price-section">
        <div className="market-section-heading">
          <div>
            <h2>বাজারভিত্তিক আজকের দাম</h2>
            <p>বাজার অনুযায়ী সর্বনিম্ন, সর্বোচ্চ ও গড় দাম</p>
          </div>

          <span className="market-count">
            {markets.length.toLocaleString("bn-BD")}টি বাজার
          </span>
        </div>

        {markets.length > 0 ? (
          <div className="market-table-wrapper">
            <table className="market-table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বোচ্চ</th>
                  <th>গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const min = Number(market.min);
                  const max = Number(market.max);

                  const average =
                    Number.isFinite(min) && Number.isFinite(max)
                      ? (min + max) / 2
                      : null;

                  return (
                    <tr key={`${market.market}-${index}`}>
                      <td>{market.market}</td>
                      <td>{market.division || "—"}</td>
                      <td>{formatPrice(market.min)}</td>
                      <td>{formatPrice(market.max)}</td>
                      <td>
                        {average !== null
                          ? formatPrice(average)
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>
              এই পণ্যের বাজারভিত্তিক তথ্য বর্তমানে পাওয়া যাচ্ছে না।
            </p>
          </div>
        )}
      </section>

      <div className="detail-back-action">
        <Link href="/" className="signup-button">
          সব পণ্য দেখুন
        </Link>
      </div>
    </main>
  );
}