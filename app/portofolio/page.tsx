import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio",
  description: "Ekosistem profesional Dzul Fiqram Nur — consulting, karier, mentoring, dan trading.",
};

const items = [
  {
    tag: "CONSULT",
    title: "Digital Consultant",
    desc: "Bukan sekadar saran — sebuah roadmap transformasi digital yang realistis untuk bisnis Anda, dari audit sampai eksekusi.",
    cta: "Hubungi Saya",
    href: "https://wa.me/6285341997941",
  },
  {
    tag: "CAREER",
    title: "Career & Experience",
    desc: "Rekam jejak profesional, business impact, dan keahlian teknis di bidang SEO & digital marketing.",
    cta: "Lihat Rekam Jejak",
    href: "https://wa.me/6285341997941",
  },
  {
    tag: "SHARE",
    title: "Mentoring & Webinar",
    desc: "Pengalaman berbagi wawasan, memandu talenta digital dalam bootcamp, dan menjadi pembicara di berbagai acara.",
    cta: "Minta Portofolio",
    href: "https://wa.me/6285341997941",
  },
  {
    tag: "FX",
    title: "Forex Analyst & Trader",
    desc: "Kedisiplinan dan pengambilan keputusan berbasis data — probabilitas adalah kunci segalanya di dunia trading.",
    cta: "Minta Portofolio",
    href: "https://wa.me/6285341997941",
  },
];

export default function PortofolioPage() {
  return (
    <main className="wrap">
      <section className="page-hero section no-border">
        <p className="eyebrow">Portofolio</p>
        <h1>Satu ekosistem, empat peran yang saling terhubung.</h1>
        <p>
          Dari konsultasi digital, rekam jejak karier, hingga panggung mentoring dan trading —
          semuanya berangkat dari proses belajar yang sama: konsisten dan berbasis data.
        </p>
      </section>

      <section className="section">
        <div className="focus-grid cols-2">
          {items.map((item) => (
            <div className="focus-card" key={item.tag} style={{ minHeight: 200 }}>
              <span className="focus-tag">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.cta} →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section no-border" style={{ paddingBottom: 96 }}>
        <div className="contact-card">
          <div>
            <h2>Butuh portofolio lengkap atau proposal kerja sama?</h2>
            <p>Kirim pesan lewat WhatsApp, saya kirimkan detail lengkapnya.</p>
          </div>
          <a
            className="btn btn-primary"
            href="https://wa.me/6285341997941"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minta Portofolio →
          </a>
        </div>
      </section>
    </main>
  );
}
