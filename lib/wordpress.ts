const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || "https://learningwithdzul.com").replace(/\/$/, "");

export type WPTerm = {
  id: number;
  name: string;
  slug: string;
};

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; alt_text: string }[];
    "wp:term"?: WPTerm[][];
  };
};

class WordPressApiError extends Error {}

async function wpFetch<T>(path: string, revalidateSeconds = 300): Promise<T> {
  const url = `${WP_URL}/wp-json/wp/v2${path}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
    if (res.ok) return res.json();
    // WP hosts sometimes throttle bursts of requests with a transient 503; retry once.
    if (res.status !== 503 || attempt === 1) {
      throw new WordPressApiError(`WordPress API error ${res.status} on ${path}`);
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new WordPressApiError(`WordPress API error on ${path}`);
}

export async function getPosts(perPage = 6, page = 1) {
  const res = await fetch(
    `${WP_URL}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) {
    if (res.status === 400) return { posts: [] as WPPost[], totalPages: 0 };
    throw new WordPressApiError(`WordPress API error ${res.status} on /posts`);
  }
  const posts: WPPost[] = await res.json();
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
  return { posts, totalPages };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${encodeURIComponent(slug)}&_embed`);
  return posts[0] ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await wpFetch<{ slug: string }[]>(`/posts?per_page=100&_fields=slug`, 3600);
  return posts.map((p) => p.slug);
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&amp;/g, "&")
    .trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getCategoryLabel(post: WPPost): string {
  const terms = post._embedded?.["wp:term"]?.[0] ?? [];
  const name = terms[0]?.name ?? "Artikel";
  return stripHtml(name).toUpperCase();
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
}
