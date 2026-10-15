"use client";
import { useEffect, useState } from "react";
import Nav from "../../components/nav";
import Card, { Product } from "../../components/product_card";

const API = "/api";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // runs on mount and whenever `query` changes (debounced 300ms)
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API}/products?search=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setProducts(await res.json());
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("Could not load products");
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    // cleanup: cancel pending timer + in-flight request
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <Nav />

      <div className="px-9 pt-9">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-sm rounded-lg bg-white px-4 py-2 text-black outline-none"
        />
      </div>

      {loading && <p className="px-9 pt-4 text-black">Loading...</p>}
      {error && <p className="px-9 pt-4 text-red-600">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="px-9 pt-4 text-black">No products found.</p>
      )}

      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 p-9">
        {products.map((p) => (
          <Card
            key={p.id}
            name={p.name}
            price={p.price}
            image_url={p.image_url}
          />
        ))}
      </div>
    </div>
  );
}