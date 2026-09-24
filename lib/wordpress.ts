const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || "https://cms.learningwithdzul.com").replace(/\/$/, "");

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

const RETRIES = 3;
const TIMEOUT_MS = 8000;

// Some host-level firewalls (e.g. Hostinger's WAF) 403 requests that don't
// look like a browser — Vercel's build/runtime servers get flagged this way
// even though the exact same request works fine from a regular browser.
const BROWSER_LIKE_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  Accept: "application/json",
};

async function fetchWithRetry(url: string, revalidateSeconds: number): Promise<Response | null> {
  for (let attempt = 0; attempt < RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        headers: BROWSER_LIKE_HEADERS,
        next: { revalidate: revalidateSeconds },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      // WP hosts sometimes throttle bursts of requests with a transient 503,
      // or a WAF momentarily flags the request with a 403; retry both.
      if (!res.ok) {
        // Hostinger's edge CDN (hcdn) is fronting every request; capture its
        // request id so a support ticket can trace exactly which edge rule fired.
        console.error(
          `WordPress fetch non-ok: ${res.status} on ${url} | x-hcdn-request-id=${res.headers.get(
            "x-hcdn-request-id"
          )} | x-hcdn-cache-status=${res.headers.get("x-hcdn-cache-status")}`
        );
      }
      if (res.ok || ![403, 503].includes(res.status) || attempt === RETRIES - 1) return res;
    } catch (err) {
      // Network-level failure (timeout, DNS, connection refused). Retry, then give up.
      if (attempt === RETRIES - 1) {
        console.error(`WordPress fetch failed after ${RETRIES} attempts: ${url}`, err);
        return null;
      }
    }
    await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
  }
  return null;
}

async function wpFetch<T>(path: string, revalidateSeconds = 300): Promise<T> {
  const res = await fetchWithRetry(`${WP_URL}/wp-json/wp/v2${path}`, revalidateSeconds);
  if (!res || !res.ok) {
    throw new WordPressApiError(`WordPress API error ${res?.status ?? "network"} on ${path}`);
  }
  return res.json();
}

export async function getPosts(perPage = 6, page = 1) {
  const res = await fetchWithRetry(
    `${WP_URL}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`,
    300
  );
  // WordPress temporarily unreachable (host firewall, timeout, etc.): degrade to an
  // empty list instead of crashing the whole page/build.
  if (!res || !res.ok) return { posts: [] as WPPost[], totalPages: 0 };
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

export type SitemapPost = { slug: string; modified: string };

// Walks every page of /posts (WordPress caps per_page at 100) to build the
// sitemap. Revalidated hourly since sitemap freshness isn't time-critical.
export async function getAllPostsForSitemap(): Promise<SitemapPost[]> {
  const all: SitemapPost[] = [];
  let page = 1;
  for (;;) {
    const res = await fetchWithRetry(
      `${WP_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}&_fields=slug,modified`,
      3600
    );
    if (!res || !res.ok) break;
    const batch: SitemapPost[] = await res.json();
    if (batch.length === 0) break;
    all.push(...batch);
    const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1");
    if (page >= totalPages) break;
    page++;
  }
  return all;
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
