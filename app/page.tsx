import Link from "next/link";
import { getCategoryLabel, getPosts, stripHtml } from "@/lib/wordpress";

export default async function HomePage() {
  const { posts } = await getPosts(4);

  return (
    <main className="wrap" id="top">
      <section className="hero section no-border">
        <p className="eyebrow">Jurnal belajar — SEO / Digital Marketing / Trading</p>
        <h1>
          Belajar in public,
          <br />
          <em>satu insight</em> per tulisan.
        </h1>
        <p className="hero-sub">
          Saya Dzul — mendokumentasikan proses belajar SEO, digital marketing, dan forex
          trading. Bukan teori dari textbook, tapi catatan dari eksperimen dan kesalahan saya
          sendiri.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/blog">
            Baca Tulisan Terbaru
          </Link>
          <Link className="btn btn-ghost" href="/portofolio">
            Lihat Fokus Belajar
          </Link>
        </div>

        <div className="stat-strip">
          <div className="stat">
            <b>50+</b>
            <span>Tulisan dipublikasikan</span>
          </div>
          <div className="stat">
            <b>3</b>
            <span>Fokus: SEO, Marketing, Trading</span>
          </div>
          <div className="stat">
            <b>2021</b>
            <span>Mulai menulis &amp; berbagi</span>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-head">
          <p className="eyebrow">Tentang</p>
        </div>
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
                <span>Status kolaborasi</span>
                <span className="up">Terbuka</span>
              </div>
            </div>
          </div>
          <div className="about-body">
            <p className="lede">Empowering growth through consistency.</p>
            <p>
              Website ini adalah catatan perjalanan saya mengeksplorasi strategi teknikal SEO,
              digital marketing, dan analisis pergerakan harga di financial market — ditulis apa
              adanya, dari sudut pandang orang yang masih terus belajar.
            </p>
            <blockquote>
              &ldquo;Because the best way to master a skill is to share it with others.&rdquo;
            </blockquote>
            <Link className="link-arrow" href="/tentang">
              Kenalan lebih jauh →
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="focus">
        <div className="section-head">
          <h2>Apa yang bisa saya bantu — atau kita pelajari bareng.</h2>
        </div>
        <div className="focus-grid">
          <div className="focus-card">
            <span className="focus-tag">SEO</span>
            <h3>Strategi SEO &amp; Digital Marketing</h3>
            <p>Audit teknis, riset konten, dan strategi trafik organik dari nol.</p>
            <Link href="/blog">Baca eksperimennya →</Link>
          </div>
          <div className="focus-card">
            <span className="focus-tag">CONSULT</span>
            <h3>Digital Consultant</h3>
            <p>Roadmap transformasi digital yang realistis untuk bisnis Anda.</p>
            <a href="https://wa.me/6285341997941" target="_blank" rel="noopener noreferrer">
              Hubungi saya →
            </a>
          </div>
          <div className="focus-card">
            <span className="focus-tag">SHARE</span>
            <h3>Mentoring &amp; Webinar</h3>
            <p>Berbagi wawasan lewat bootcamp, kelas, dan panggung bicara.</p>
            <Link href="/portofolio">Minta portofolio →</Link>
          </div>
          <div className="focus-card">
            <span className="focus-tag">FX</span>
            <h3>Forex Analyst &amp; Trader</h3>
            <p>Analisa teknikal, manajemen risiko, dan disiplin berbasis data.</p>
            <Link href="/blog">Lihat jurnal trading →</Link>
          </div>
        </div>
      </section>

      <section className="section" id="articles">
        <div className="section-head">
          <h2>Tulisan Terbaru</h2>
          <Link className="link-arrow" href="/blog">
            Lihat semua tulisan →
          </Link>
        </div>

        <div className="article-list">
          {posts.map((post) => (
            <Link className="article-row" href={`/blog/${post.slug}`} key={post.id}>
              <span className="article-tag">{getCategoryLabel(post)}</span>
              <div className="article-main">
                <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p>{stripHtml(post.excerpt.rendered).slice(0, 140)}…</p>
              </div>
              <span className="article-cta link-arrow">Baca →</span>
            </Link>
          ))}
          {posts.length === 0 && <p>Belum ada tulisan yang bisa ditampilkan.</p>}
        </div>
      </section>

      <section className="section" id="faq">
        <div className="section-head">
          <h2>Pertanyaan yang Sering Ditanyakan</h2>
        </div>
        <div>
          <details className="faq" open>
            <summary>Siapa Dzul Fiqram Nur?</summary>
            <p>
              Fulltime learner yang menekuni dunia digital marketing dan trading forex (CFD).
              Saat ini berkarier sebagai digital marketer, aktif jadi tutor/mentor, sekaligus
              investor dan analis forex.
            </p>
          </details>
          <details className="faq">
            <summary>Di mana Dzul menetap?</summary>
            <p>Berasal dari Barru, Sulawesi Selatan — saat ini berdomisili di Jakarta Pusat.</p>
          </details>
          <details className="faq">
            <summary>Apakah Dzul terbuka untuk bekerja sama?</summary>
            <p>
              Ya. Terbuka sebagai consultant digital marketing &amp; SEO, content writer, maupun
              tutor/speaker.
            </p>
          </details>
          <details className="faq">
            <summary>Bagaimana cara menghubungi Dzul?</summary>
            <p>Lewat LinkedIn, Instagram, atau WhatsApp di +62 853-4199-7941.</p>
          </details>
        </div>
      </section>

      <section className="section no-border" id="contact" style={{ paddingBottom: 96 }}>
        <div className="contact-card">
          <div>
            <h2>Punya proyek, atau cuma mau ngobrol soal SEO &amp; trading?</h2>
            <p>Terbuka untuk kolaborasi consulting, kelas/webinar, maupun sekadar diskusi santai.</p>
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
