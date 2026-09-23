import Link from "next/link";
import type { Metadata } from "next";
import { getCategoryLabel, getPosts, stripHtml } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Tulisan",
  description: "Semua tulisan tentang SEO, digital marketing, dan trading forex.",
};

const PER_PAGE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, Number(resolvedSearchParams.page ?? "1") || 1);
  const { posts, totalPages } = await getPosts(PER_PAGE, page);

  return (
    <main className="wrap">
      <section className="page-hero section no-border">
        <p className="eyebrow">Semua Tulisan</p>
        <h1>Catatan belajar, dari eksperimen ke eksperimen.</h1>
        <p>
          SEO, digital marketing, dan jurnal trading — ditulis dari proses belajar sehari-hari,
          bukan teori kelas.
        </p>
      </section>

      <section className="section">
        <div className="article-list">
          {posts.map((post) => (
            <Link className="article-row" href={`/blog/${post.slug}`} key={post.id}>
              <span className="article-tag">{getCategoryLabel(post)}</span>
              <div className="article-main">
                <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p>{stripHtml(post.excerpt.rendered).slice(0, 160)}…</p>
              </div>
              <span className="article-cta link-arrow">Baca →</span>
            </Link>
          ))}
          {posts.length === 0 && <p>Tidak ada tulisan di halaman ini.</p>}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            {page > 1 && (
              <Link className="btn btn-ghost" href={`/blog?page=${page - 1}`}>
                ← Sebelumnya
              </Link>
            )}
            <span className="mono" style={{ alignSelf: "center", fontSize: 13, color: "var(--muted)" }}>
              Halaman {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link className="btn btn-ghost" href={`/blog?page=${page + 1}`}>
                Selanjutnya →
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
