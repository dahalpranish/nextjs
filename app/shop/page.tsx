"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "../../components/nav";
import Card, { Product } from "../../components/product_card";

const API = "/api";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // which product's popup is open (null = no popup)
  const [selected, setSelected] = useState<Product | null>(null);

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

  // close popup with Escape key (listener only exists while popup is open)
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);

    // cleanup: remove listener when popup closes
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

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

      <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-9">
        {products.map((p) => (
          <Card
            key={p.id}
            name={p.name}
            price={p.price}
            image_url={p.image_url}
            onClick={() => setSelected(p)}
          />
        ))}
      </div>

      {/* product popup */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl bg-white p-6 text-black shadow-xl"
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-3 text-2xl font-bold"
            >
              ✕
            </button>

            <Image
              src={selected.image_url}
              alt={selected.name}
              width={400}
              height={350}
              className="h-64 w-full object-contain"
            />
            <h2 className="mt-4 text-xl font-bold">{selected.name}</h2>
            <p className="mt-1 text-lg text-neutral-600">
              ${selected.price.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
