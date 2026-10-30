import axios from "axios";

const api = axios.create({
  baseURL: "https://openapi.programming-hero.com/api/bazardor",
  timeout: 15000,
});

export async function getProducts() {
  const { data } = await api.get("/products");

  if (!Array.isArray(data)) {
    throw new Error("Invalid products response from API");
  }

  return data;
}

export async function getCategories() {
  const { data } = await api.get("/categories");

  if (!Array.isArray(data)) {
    throw new Error("Invalid categories response from API");
  }

  return data;
}

export async function getProductBySlug(slug) {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) || null;
}

export async function getCategoryBySlug(slug) {
  const categories = await getCategories();

  return categories.find((category) => category.slug === slug) || null;
}

export function formatPrice(price) {
  return `${Number(price).toLocaleString("bn-BD")} টাকা`;
}

export function formatUnit(unit) {
  const units = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return units[unit] || `প্রতি ${unit}`;
}