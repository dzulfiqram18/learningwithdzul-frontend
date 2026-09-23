import Link from "next/link";

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="wrap">
        <Link className="brand" href="/">
          <span className="brand-mark">LWD</span>
          Learning with Dzul
        </Link>
        <ul className="navlinks">
          <li>
            <Link href="/tentang">Tentang</Link>
          </li>
          <li>
            <Link href="/portofolio">Portofolio</Link>
          </li>
          <li>
            <Link href="/blog">Tulisan</Link>
          </li>
        </ul>
        <div className="navcta">
          <a
            className="btn btn-primary"
            href="https://wa.me/6285341997941"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hubungi Saya
          </a>
        </div>
      </nav>
    </header>
  );
}
