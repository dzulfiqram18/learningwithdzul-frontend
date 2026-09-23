export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>&copy; {new Date().getFullYear()} Dzul Fiqram Nur &mdash; Learning with Dzul</span>
        <ul className="foot-links">
          <li>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://wa.me/6285341997941" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
