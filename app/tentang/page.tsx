import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Saya",
  description: "Profil Dzul Fiqram Nur — digital marketer, mentor, dan forex trader.",
};

export default function TentangPage() {
  return (
    <main className="wrap">
      <section className="page-hero section no-border">
        <p className="eyebrow">Tentang Saya</p>
        <h1>Fulltime learner yang senang berbagi apa yang sedang dipelajari.</h1>
        <p>
          Akrab disapa Dzul — seorang digital marketer, mentor, dan analis forex yang percaya
          cara terbaik menguasai sesuatu adalah dengan membagikannya.
        </p>
      </section>

      <section className="section">
        <div className="about-grid">
          <div className="signal-card">
            <p className="eyebrow" style={{ marginBottom: 2 }}>
              Profil singkat
            </p>
            <div className="rows">
              <div className="signal-row">
                <span>Nama</span>
                <span>Dzul Fiqram Nur</span>
              </div>
              <div className="signal-row">
                <span>Asal</span>
                <span>Barru, Sulawesi Selatan</span>
              </div>
              <div className="signal-row">
                <span>Domisili</span>
                <span>Jakarta Pusat</span>
              </div>
              <div className="signal-row">
                <span>Peran</span>
                <span>Digital Marketer</span>
              </div>
              <div className="signal-row">
                <span>Peran lain</span>
                <span>Mentor, Investor &amp; Analis Forex</span>
              </div>
              <div className="signal-row">
                <span>Status kolaborasi</span>
                <span className="up">Terbuka</span>
              </div>
            </div>
          </div>
          <div className="about-body">
            <p className="lede">Empowering growth through consistency.</p>
            <p>
              Dzul merupakan laki-laki Bugis asal Kabupaten Barru, Provinsi Sulawesi Selatan,
              yang kini berdomisili di Jakarta Pusat. Kesehariannya diisi dengan mengulik dunia
              digital, aktif melakukan trading forex (CFD), mengikuti tren psikologi populer,
              dan gemar membaca buku self development.
            </p>
            <p>
              Saat ini berkarier sebagai digital marketer, aktif menjadi tutor/mentor digital
              marketing, sekaligus investor dan analis forex. Website ini adalah catatan
              perjalanan belajarnya mengeksplorasi strategi teknikal SEO, digital marketing, dan
              analisis pergerakan harga di financial market.
            </p>
            <blockquote>
              &ldquo;Because the best way to master a skill is to share it with others.&rdquo;
            </blockquote>
            <p>
              Terbuka untuk kolaborasi dalam bentuk apa pun — sebagai consultant digital
              marketing &amp; SEO, content writer, hingga tutor/speaker.
            </p>
          </div>
        </div>
      </section>

      <section className="section no-border" style={{ paddingBottom: 96 }}>
        <div className="contact-card">
          <div>
            <h2>Mau ngobrol atau kolaborasi bareng?</h2>
            <p>Hubungi lewat WhatsApp, LinkedIn, atau Instagram — respon paling cepat lewat WhatsApp.</p>
          </div>
          <a
            className="btn btn-primary"
            href="https://wa.me/6285341997941"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat via WhatsApp →
          </a>
        </div>
      </section>
    </main>
  );
}
