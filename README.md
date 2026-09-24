# Learning with Dzul — Frontend

Frontend Next.js untuk learningwithdzul.com. WordPress dipindah ke
`cms.learningwithdzul.com` dan dipakai sebagai CMS (nulis & upload konten
lewat wp-admin seperti biasa); situs ini menarik data lewat REST API bawaan
WordPress (`/wp-json/wp/v2/...`) — tidak perlu plugin tambahan.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Environment variable

| Variable | Default | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_WP_URL` | `https://cms.learningwithdzul.com` | Base URL WordPress yang jadi sumber data. |

Salin `.env.local.example` ke `.env.local` untuk override saat development.

## Struktur

- `app/page.tsx` — Home, menarik 4 artikel terbaru dari WordPress
- `app/blog/` — daftar tulisan + halaman detail (`[slug]`), ISR 5 menit
- `app/tentang/`, `app/portofolio/` — konten statis (ditulis manual, bukan dari WP)
- `lib/wordpress.ts` — semua fungsi fetch ke WordPress REST API
