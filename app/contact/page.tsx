"use client";
import { useState } from "react";
import Nav from "../../components/nav";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send `form` to an API route or email service
    console.log(form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat">
      <Nav />

      <main className="mx-auto w-full max-w-lg px-5 py-12">
        <h1 className="mb-2 text-3xl font-bold tracking-widest text-black">
          CONTACT
        </h1>
        <p className="mb-8 text-neutral-700">
          Questions about an order or a product? Send us a message.
        </p>

        {sent ? (
          <div className="rounded-xl bg-white p-6 text-black">
            <p className="font-semibold">Thanks! We got your message.</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl bg-white p-6 text-black"
          >
            <label className="flex flex-col gap-1 text-sm">
              Name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-black"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-black"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="rounded-lg border border-neutral-300 px-3 py-2 outline-none focus:border-black"
              />
            </label>

            <button
              type="submit"
              className="w-fit bg-[#111111] px-7 py-3 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-[#333333]"
            >
              SEND
            </button>
          </form>
        )}
      </main>
    </div>
  );
}