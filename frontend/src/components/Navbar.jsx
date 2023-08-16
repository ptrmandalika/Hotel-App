import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 flex justify-between px-16">
      <Link className="btn btn-ghost normal-case text-xl font-bold" href="/">
        Blueddoorz
      </Link>
      <Link className="btn btn-outline btn-sm" href="/user/cek-pemesanan">
        Cek Pemesanan
      </Link>
    </nav>
  );
}
