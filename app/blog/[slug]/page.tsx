import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  formatDate,
  getCategoryLabel,
  getFeaturedImage,
  getPostBySlug,
  stripHtml,
} from "@/lib/wordpress";

// Rendered on-demand (ISR) instead of pre-built for every slug at build time:
// posts get added continuously in WordPress, and generating all of them
// during `next build` overloads the WP host with parallel requests.
export const revalidate = 300;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const image = getFeaturedImage(post);

  return (
    <main className="wrap">
      <article className="page-hero section no-border">
        <Link className="link-arrow" href="/blog" style={{ marginBottom: 24, display: "inline-flex" }}>
          ← Semua tulisan
        </Link>
        <p className="eyebrow" style={{ marginTop: 20 }}>
          {getCategoryLabel(post)} · {formatDate(post.date)}
        </p>
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {image && (
          <img
            src={image}
            alt={stripHtml(post.title.rendered)}
            style={{ borderRadius: 12, marginTop: 32, width: "100%" }}
          />
        )}

        <div
          className="wp-content"
          style={{ marginTop: 40 }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </main>
  );
}
