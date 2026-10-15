import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex sticky item-center justify-between h-500px bg-white p-1 text-neutral-700 ">
      <div><Link href="/" className="text-2xl font-bold">ELEVN</Link></div>
      <div className="hidden md:flex justify-between gap-10"  >
        <Link href={"/shop"} className="hover:opacity-60 ">HOME</Link>
        <Link href={"/shop"} className="hover:opacity-60">SHOP</Link>
      </div>
      <div className="hidden md:flex justify-between gap-10">
        <Link href={"/"} className="hover:opacity-60">CONTACT</Link>
      </div>

      <div className="md:hidden pr-5 font-bold">
        <button><h3>X</h3></button>
      </div>
    </nav>
  );
}