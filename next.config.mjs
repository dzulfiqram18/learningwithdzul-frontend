/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "learningwithdzul.com",
      },
      {
        protocol: "https",
        hostname: "cms.learningwithdzul.com",
      },
    ],
  },
  async redirects() {
    return [
      // Old WordPress pages that moved to a hand-built route.
      { source: "/about", destination: "/tentang", permanent: true },
      { source: "/portfolio", destination: "/portofolio", permanent: true },
      {
        source: "/portfolio/dzul-fiqram-portfolio-career",
        destination: "/portofolio",
        permanent: true,
      },
      {
        source: "/portofolio/menjadi-mentor-dan-speaker",
        destination: "/portofolio",
        permanent: true,
      },
      // Legal pages: not rebuilt on the new frontend yet, keep them reachable on WordPress.
      {
        source: "/disclaimer",
        destination: "https://cms.learningwithdzul.com/disclaimer",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "https://cms.learningwithdzul.com/privacy-policy",
        permanent: true,
      },
      // Old post permalinks were "/:category/:slug/" (WordPress category-based
      // permalinks); the new site serves every post at "/blog/:slug" regardless
      // of category. Exclude "blog" itself so this doesn't loop on /blog/:slug,
      // which is already a real route.
      {
        source: "/:category((?!blog).*)/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
