import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center overflow-hidden bg-white px-5 md:px-[5%]">
      {/* Text: on top of image on mobile */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-1 flex-col justify-end gap-4 pb-10 max-md:items-center max-md:text-center md:min-h-0 md:justify-center md:pb-0">
        <p className="max-w-xs text-sm text-neutral-700 md:text-base">
          Minimal fashion designed for everyday confidence
        </p>
        <Link
          href="/shop"
          className="w-fit bg-[#111111] px-7 py-3 text-xs font-semibold tracking-widest text-white transition-colors hover:bg-[#333333]"
        >
          SHOP NOW
        </Link>
      </div>

      {/* Image: full background on mobile, right column on desktop */}
      <div className="absolute inset-0 md:relative md:inset-auto md:h-[calc(100vh-80px)] md:flex-1">
        <Image
          src="/hero.png"
          alt="Create a fashion vibe model"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    </section>
  );
}