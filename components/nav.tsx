"use client";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-30 flex h-20 items-center justify-between bg-white px-5 text-neutral-700">
        <Link href="/" className="text-2xl font-bold">
          ELEVN
        </Link>

        {/* desktop links */}
        <div className="hidden gap-10 md:flex">
          <Link href="/" className="hover:opacity-60">HOME</Link>
          <Link href="/shop" className="hover:opacity-60">SHOP</Link>
          <Link href="/contact" className="hover:opacity-60">CONTACT</Link>
        </div>

        {/* mobile open button */}
        <button
          className="text-2xl font-bold md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* overlay: click to close */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* side drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-white p-6 shadow-xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="mb-8 text-2xl font-bold"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <div className="flex flex-col gap-6 text-lg text-neutral-700">
          <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>SHOP</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>CONTACT</Link>
        </div>
      </aside>
    </>
  );
}