# PRD - Website Dyvina Bakery & Coffee

**Versi:** 1.1  
**Tanggal:** 2 Oktober 2026  
**Metodologi Pengembangan:** SDLC Waterfall  
**Platform:** Web Responsive

---

## 1. Ringkasan Produk

### 1.1 Nama Produk

**Dyvina Bakery & Coffee Website**

### 1.2 Deskripsi

Website Dyvina Bakery & Coffee merupakan sistem informasi berbasis web yang berfungsi sebagai media informasi, katalog produk, galeri, lokasi outlet, dan pemesanan produk secara online.

Website ditujukan untuk membantu pelanggan memperoleh informasi mengenai Dyvina Bakery & Coffee dengan lebih mudah, sekaligus membantu admin mengelola data produk, kategori, dan pesanan melalui halaman administrasi.

Pengembangan sistem menggunakan metodologi **SDLC Waterfall**, dengan tahapan:

1. Requirement Analysis
2. System Design
3. Implementation
4. Testing
5. Deployment & Maintenance

### 1.3 Tujuan Produk

Website ini bertujuan untuk:

- Menyediakan informasi resmi mengenai Dyvina Bakery & Coffee.
- Menampilkan katalog produk bakery dan coffee.
- Menampilkan detail produk dan harga.
- Memudahkan pelanggan menemukan lokasi outlet.
- Menyediakan sarana pemesanan produk.
- Memudahkan pelanggan menghubungi Dyvina melalui WhatsApp.
- Menyediakan dashboard admin untuk mengelola produk, kategori, dan pesanan.
- Menyediakan website yang responsif pada desktop, tablet, dan perangkat mobile.

---

# 2. Latar Belakang

Dyvina Bakery & Coffee merupakan usaha yang menyediakan berbagai produk bakery, cake, cookies, serta minuman coffee dan non-coffee. Informasi mengenai produk, harga, lokasi, dan layanan perlu disampaikan kepada pelanggan melalui media digital yang mudah diakses.

Website dikembangkan sebagai media informasi dan katalog digital yang dapat membantu pelanggan mengetahui produk yang tersedia serta melakukan pemesanan dengan alur yang sederhana. Dari sisi pengelola, sistem menyediakan halaman administrasi untuk mengelola data produk dan pesanan.

---

# 3. Permasalahan

Permasalahan yang ingin diselesaikan melalui sistem:

1. Informasi produk belum terpusat dalam sebuah website.
2. Pelanggan membutuhkan media yang mudah untuk melihat katalog produk.
3. Informasi produk seperti harga dan ketersediaan perlu dapat diperbarui dengan mudah.
4. Informasi lokasi dan kontak perlu mudah ditemukan oleh pelanggan.
5. Proses pemesanan perlu memiliki alur digital yang lebih terstruktur.
6. Admin membutuhkan sistem untuk mengelola produk, kategori, dan pesanan.

---

# 4. Target Pengguna

## 4.1 Customer

Pengunjung atau pelanggan Dyvina Bakery & Coffee yang ingin:

- Mengetahui informasi Dyvina.
- Melihat produk.
- Melihat harga.
- Melihat detail produk.
- Melihat galeri.
- Mengetahui lokasi dan jam operasional.
- Melakukan pemesanan.
- Menghubungi Dyvina.

## 4.2 Admin

Pengelola website yang bertugas:

- Mengelola produk.
- Mengelola kategori.
- Mengelola pesanan.
- Memperbarui informasi produk.
- Memantau status pesanan.

---

# 5. Scope Produk

## 5.1 In Scope

Fitur yang termasuk dalam versi pertama:

### Public Website

- Homepage
- About
- Menu / katalog produk
- Detail produk
- Filter kategori
- Gallery
- Contact
- Informasi lokasi
- Jam operasional
- WhatsApp
- Keranjang pesanan
- Form data customer
- Konfirmasi pesanan

### Admin

- Login
- Dashboard
- CRUD kategori
- CRUD produk
- Pengelolaan harga
- Pengelolaan ketersediaan produk
- Pengelolaan pesanan
- Perubahan status pesanan

## 5.2 Out of Scope

Fitur berikut tidak termasuk dalam versi pertama:

- Payment gateway
- QRIS otomatis
- Integrasi mesin kasir/POS
- Barcode scanner
- Thermal printer
- Loyalty point
- Membership
- Sistem delivery internal
- Integrasi marketplace
- Sistem akuntansi
- Inventory management kompleks
- AI recommendation
- Multi-outlet management

Fitur tersebut dapat dipertimbangkan pada pengembangan berikutnya.

---

# 6. User Journey

## 6.1 Customer Journey

```text
Homepage
    ↓
Menu
    ↓
Pilih Produk
    ↓
Detail Produk
    ↓
Tambah ke Pesanan
    ↓
Keranjang
    ↓
Data Customer
    ↓
Review Pesanan
    ↓
Konfirmasi
    ↓
WhatsApp
```

## 6.2 Admin Journey

```text
Login
    ↓
Dashboard
    ↓
Pilih Modul
    ├── Products
    ├── Categories
    └── Orders
```

---

# 7. Informasi dan Struktur Website

## 7.1 Homepage

Homepage menjadi halaman utama untuk memperkenalkan Dyvina Bakery & Coffee.

### Section

1. Navbar
2. Hero
3. Featured Products
4. About Dyvina
5. Product Categories
6. Why Choose Dyvina
7. Gallery Preview
8. Location
9. Call to Action
10. Footer

### Hero

Menampilkan:

- Nama Dyvina Bakery & Coffee
- Headline
- Deskripsi singkat
- Tombol "Lihat Menu"
- Tombol "Pesan Sekarang"
- Foto produk atau outlet

---

## 7.2 About

Menampilkan:

- Profil Dyvina
- Sejarah singkat
- Produk yang tersedia
- Nilai atau keunggulan usaha
- Foto outlet / produk

---

## 7.3 Menu

Menampilkan seluruh produk.

### Fitur

- Daftar produk
- Filter kategori
- Pencarian produk
- Harga
- Status ketersediaan
- Tombol detail produk
- Tombol tambah ke pesanan

### Kategori Awal

Kategori dapat disesuaikan berdasarkan data produk aktual.

Contoh:

- Roti
- Bolu
- Cake
- Cookies
- Coffee
- Non-Coffee

---

## 7.4 Product Detail

Menampilkan:

- Foto produk
- Nama produk
- Deskripsi
- Harga
- Kategori
- Status ketersediaan
- Quantity selector
- Tombol "Tambah ke Pesanan"

---

## 7.5 Gallery

Menampilkan foto:

- Produk
- Cake
- Roti
- Minuman
- Outlet
- Suasana

---

## 7.6 Contact

Menampilkan:

- Alamat
- Nomor WhatsApp
- Informasi kontak
- Jam operasional
- Google Maps
- Tombol WhatsApp

---

# 8. Sistem Pemesanan

## 8.1 Cart

Customer dapat:

- Melihat produk yang dipilih.
- Mengubah jumlah.
- Menghapus produk.
- Melihat subtotal.
- Melihat total pesanan.
- Melanjutkan ke checkout.

## 8.2 Checkout

Customer mengisi:

- Nama
- Nomor WhatsApp
- Catatan pesanan

Sistem menampilkan:

- Daftar produk
- Quantity
- Harga
- Subtotal
- Total

## 8.3 Konfirmasi

Sebelum pesanan dikirim, sistem menampilkan ringkasan pesanan.

Customer kemudian dapat mengirim pesanan melalui WhatsApp.

Contoh format pesan:

```text
Halo Dyvina Bakery & Coffee,

Saya ingin melakukan pemesanan:

1. Roti Pisang Cokelat Keju x2
2. Ice Caramel Latte x1

Total: Rp xxx.xxx

Nama:
Nomor WhatsApp:
Catatan:
```

Nomor dan format pesan harus dapat dikonfigurasi oleh admin/developer melalui tabel `Setting`.

---

# 9. Admin Dashboard

## 9.1 Dashboard

Menampilkan ringkasan:

- Total produk
- Total kategori
- Pesanan baru
- Pesanan diproses
- Pesanan selesai

---

## 9.2 Product Management

Admin dapat:

- Melihat daftar produk.
- Menambah produk.
- Mengubah produk.
- Menghapus produk.
- Mengubah harga.
- Mengubah gambar.
- Mengubah kategori.
- Mengatur status ketersediaan.

### Data Produk

```text
id
categoryId
name
slug
description
price
image
isAvailable
createdAt
updatedAt
```

---

## 9.3 Category Management

Admin dapat:

- Melihat kategori.
- Menambah kategori.
- Mengubah kategori.
- Menghapus kategori.

### Data Category

```text
id
name
slug
createdAt
updatedAt
```

---

## 9.4 Order Management

Admin dapat:

- Melihat daftar pesanan.
- Melihat detail pesanan.
- Melihat data customer.
- Melihat produk yang dipesan.
- Melihat total.
- Mengubah status pesanan.

### Status Pesanan

```text
PENDING
PROCESSING
COMPLETED
CANCELLED
```

---

# 10. Functional Requirements

| ID | Modul | Requirement | Priority |
|---|---|---|---|
| FR-001 | Homepage | Sistem menampilkan informasi utama Dyvina | Must |
| FR-002 | Homepage | Sistem menampilkan produk unggulan | Must |
| FR-003 | About | Sistem menampilkan informasi profil Dyvina | Must |
| FR-004 | Menu | Sistem menampilkan daftar produk | Must |
| FR-005 | Menu | Sistem menyediakan filter kategori | Must |
| FR-006 | Menu | Sistem menyediakan pencarian produk | Should |
| FR-007 | Product | Sistem menampilkan detail produk | Must |
| FR-008 | Product | Sistem menampilkan harga produk | Must |
| FR-009 | Product | Sistem menampilkan status ketersediaan | Must |
| FR-010 | Cart | Customer dapat menambahkan produk | Must |
| FR-011 | Cart | Customer dapat mengubah quantity | Must |
| FR-012 | Cart | Customer dapat menghapus produk | Must |
| FR-013 | Checkout | Customer dapat mengisi data | Must |
| FR-014 | Order | Sistem membuat data pesanan | Must |
| FR-015 | Order | Sistem menyediakan konfirmasi WhatsApp | Must |
| FR-016 | Gallery | Sistem menampilkan galeri | Should |
| FR-017 | Contact | Sistem menampilkan informasi kontak | Must |
| FR-018 | Location | Sistem menampilkan lokasi outlet | Must |
| FR-019 | Admin | Admin dapat login | Must |
| FR-020 | Admin | Admin dapat mengelola produk | Must |
| FR-021 | Admin | Admin dapat mengelola kategori | Must |
| FR-022 | Admin | Admin dapat mengelola pesanan | Must |
| FR-023 | Admin | Admin dapat mengubah status pesanan | Must |

---

# 11. Non-Functional Requirements

| ID | Kategori | Requirement |
|---|---|---|
| NFR-001 | Performance | Halaman harus dapat dimuat dengan cepat dan efisien |
| NFR-002 | Responsive | Website harus dapat digunakan pada desktop, tablet, dan mobile |
| NFR-003 | Usability | Navigasi harus mudah dipahami |
| NFR-004 | Security | Halaman admin harus dilindungi autentikasi |
| NFR-005 | Security | Password tidak disimpan dalam bentuk plaintext |
| NFR-006 | Compatibility | Website berjalan pada browser modern |
| NFR-007 | Maintainability | Kode menggunakan struktur modular |
| NFR-008 | Scalability | Sistem dapat dikembangkan dengan fitur tambahan |
| NFR-009 | Availability | Website dapat diakses melalui internet |
| NFR-010 | SEO | Halaman publik memiliki metadata dan struktur SEO dasar |

---

# 12. Business Rules

1. Setiap produk harus memiliki satu kategori.
2. Produk yang tidak tersedia tidak dapat ditambahkan ke pesanan.
3. Harga produk harus bernilai lebih besar atau sama dengan 0.
4. Quantity produk dalam pesanan harus minimal 1.
5. Pesanan harus memiliki minimal satu produk.
6. Admin harus login untuk mengakses dashboard.
7. Admin dapat mengubah status pesanan.
8. Produk yang dihapus tidak boleh menyebabkan data pesanan lama kehilangan informasi harga dan item.
9. Total pesanan dihitung berdasarkan harga produk dikalikan quantity.
10. Informasi harga dan ketersediaan pada website mengikuti data yang dikelola admin.

---

# 13. Data Model

## 13.1 User

```text
User
├── id
├── name
├── email
├── password
├── role
├── createdAt
└── updatedAt
```

## 13.2 Category

```text
Category
├── id
├── name
├── slug
├── createdAt
└── updatedAt
```

## 13.3 Product

```text
Product
├── id
├── categoryId
├── name
├── slug
├── description
├── price
├── image
├── isAvailable
├── createdAt
└── updatedAt
```

## 13.4 Order

```text
Order
├── id
├── orderNumber
├── customerName
├── phone
├── note
├── total
├── status
└── createdAt
```

## 13.5 OrderItem

```text
OrderItem
├── id
├── orderId
├── productId
├── productName
├── price
├── quantity
└── subtotal
```

Penyimpanan `productName` dan `price` pada `OrderItem` digunakan sebagai snapshot transaksi sehingga perubahan produk di kemudian hari tidak mengubah histori pesanan.

`productId` pada `OrderItem` bersifat nullable (`onDelete: SetNull`). Produk yang dihapus tidak menghapus histori pesanan.

## 13.6 Setting

```text
Setting
├── key
├── value
└── updatedAt
```

Menyimpan nilai yang dapat dikonfigurasi, misalnya `whatsapp_number` dan `whatsapp_template`.

## 13.7 Catatan Implementasi Model

- `price`, `subtotal`, dan `total` disimpan sebagai integer (Rupiah, tanpa desimal).
- `User.role` menggunakan enum `Role` (`ADMIN`). Better Auth juga membuat tabel `session`, `account`, dan `verification`.
- `Order.status` menggunakan enum `OrderStatus`.
- Total pesanan dihitung ulang di server dari harga produk di database; harga dari client tidak dipercaya.

---

# 14. Relasi Database

```text
Category
    │
    │ 1
    │
    │ *
Product
    │
    │ 1
    │
    │ *
OrderItem
    │
    │ *
    │
    │ 1
Order
```

Relasi:

```text
Category 1 ──── * Product

Product 1 ──── * OrderItem

Order 1 ──── * OrderItem
```

---

# 15. Use Case

## Customer

```text
Customer
├── Melihat Homepage
├── Melihat About
├── Melihat Menu
├── Mencari Produk
├── Filter Produk
├── Melihat Detail Produk
├── Menambahkan Produk ke Cart
├── Mengubah Cart
├── Checkout
├── Membuat Pesanan
├── Mengirim Pesanan via WhatsApp
├── Melihat Gallery
└── Melihat Contact & Location
```

## Admin

```text
Admin
├── Login
├── Melihat Dashboard
├── Mengelola Produk
├── Mengelola Kategori
├── Melihat Pesanan
├── Melihat Detail Pesanan
└── Mengubah Status Pesanan
```

---

# 16. Teknologi

Seluruh dependensi menggunakan versi stabil terbaru pada saat setup (Oktober 2026). Package manager: **Bun**.

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript 7
- Tailwind CSS 4
- shadcn/ui
- React Hook Form + Zod (validasi form)
- Zustand (state cart, disimpan di localStorage)

## Backend

- **tRPC 11** (API type-safe end-to-end) dengan fetch adapter pada `/api/trpc`
- TanStack React Query 5 (data fetching di client, prefetch di Server Component)
- superjson (serialisasi `Date`)
- Zod (validasi input di server)

Prosedur tRPC dibagi menjadi:

- `publicProcedure` untuk halaman publik dan pembuatan pesanan.
- `adminProcedure` untuk seluruh operasi admin; menolak request tanpa sesi.

## Database

- PostgreSQL (Neon atau Supabase)

## ORM

- Prisma ORM 7 dengan driver adapter `pg`

## Authentication

- Better Auth (adapter Prisma), email dan password
- Pendaftaran publik dinonaktifkan; akun admin dibuat melalui seed script

## Penyimpanan Gambar

- Vercel Blob atau Cloudinary (filesystem Vercel tidak dapat ditulis)

## Tooling

- Biome (lint dan format)
- Vitest (unit test logika kritis, seperti perhitungan total dan snapshot OrderItem)

## Deployment

- Vercel

## Version Control

- Git
- GitHub

---

# 17. Struktur Aplikasi

```text
src/
├── app/
│   ├── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── menu/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── gallery/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── order/
│   │   └── page.tsx
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── products/
│   │   ├── categories/
│   │   └── orders/
│   └── api/
│       ├── auth/[...all]/route.ts
│       └── trpc/[trpc]/route.ts
│
├── components/
│   ├── navbar/
│   ├── footer/
│   ├── hero/
│   ├── product/
│   ├── cart/
│   └── ui/
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── auth-client.ts
│   └── utils.ts
│
├── trpc/
│   ├── init.ts
│   ├── query-client.ts
│   ├── client.tsx
│   ├── server.tsx
│   └── routers/
│       ├── _app.ts
│       ├── product.ts
│       ├── category.ts
│       └── order.ts
│
└── generated/
    └── prisma/

prisma/
├── schema.prisma
└── seed.ts
```

---

# 18. SDLC Waterfall Plan

## Phase 1 - Requirement Analysis

### Aktivitas

- Identifikasi masalah
- Identifikasi stakeholder
- Identifikasi pengguna
- Pengumpulan kebutuhan
- Penentuan scope
- Penyusunan functional requirements
- Penyusunan non-functional requirements

### Output

- Dokumen kebutuhan sistem
- Product Requirements Document
- Functional Requirements
- Non-Functional Requirements
- Business Rules

---

## Phase 2 - System Design

### Aktivitas

- Perancangan arsitektur sistem
- Perancangan database
- Perancangan ERD
- Perancangan Use Case
- Perancangan Activity Diagram
- Perancangan UI/UX
- Perancangan navigation flow

### Output

- System Architecture
- Use Case Diagram
- Activity Diagram
- ERD
- Class Diagram
- Wireframe
- UI Design
- Database Schema

---

## Phase 3 - Implementation

### Aktivitas

- Setup project Next.js
- Setup TypeScript
- Setup Tailwind CSS
- Setup Biome
- Setup PostgreSQL
- Setup Prisma
- Setup tRPC
- Implementasi authentication
- Implementasi public website
- Implementasi katalog
- Implementasi cart
- Implementasi order
- Implementasi admin dashboard
- Implementasi CRUD

### Output

- Source Code
- Database
- Functional Website

---

## Phase 4 - Testing

### Metode

**Black Box Testing**

Pengujian dilakukan berdasarkan input dan output sistem tanpa melihat implementasi internal kode.

Selain itu, logika kritis (perhitungan total, snapshot OrderItem, validasi quantity) diuji dengan unit test menggunakan Vitest.

### Area Testing

- Authentication
- Homepage
- Menu
- Search
- Filter
- Product detail
- Cart
- Checkout
- Order
- WhatsApp
- Admin product
- Admin category
- Admin order
- Responsive UI

### Output

- Test Case
- Test Result
- Bug List
- Bug Fix Report

---

## Phase 5 - Deployment & Maintenance

### Aktivitas

- Build production
- Deployment
- Konfigurasi environment
- Database production
- Domain configuration
- Monitoring
- Bug fixing
- Content update

### Output

- Production Website
- Deployment Documentation
- Maintenance Documentation

---

# 19. Testing Requirements

## Contoh Test Case

| ID | Fitur | Kondisi | Expected Result |
|---|---|---|---|
| TC-001 | Login | Email/password valid | Admin masuk dashboard |
| TC-002 | Login | Password salah | Sistem menampilkan error |
| TC-003 | Menu | Membuka menu | Daftar produk tampil |
| TC-004 | Filter | Memilih kategori | Produk sesuai kategori tampil |
| TC-005 | Search | Memasukkan nama produk | Produk yang sesuai tampil |
| TC-006 | Detail | Membuka produk | Detail produk tampil |
| TC-007 | Cart | Menambahkan produk | Produk masuk cart |
| TC-008 | Cart | Mengubah quantity | Total diperbarui |
| TC-009 | Cart | Menghapus produk | Produk dihapus |
| TC-010 | Checkout | Data valid | Pesanan dapat dibuat |
| TC-011 | Order | Pesanan dibuat | Nomor pesanan terbentuk |
| TC-012 | WhatsApp | Klik konfirmasi | WhatsApp terbuka dengan pesan |
| TC-013 | Admin | Tambah produk | Produk tersimpan |
| TC-014 | Admin | Edit produk | Data produk berubah |
| TC-015 | Admin | Hapus produk | Produk tidak tersedia di katalog |
| TC-016 | Admin | Ubah status | Status pesanan diperbarui |

---

# 20. Responsive Requirements

Website harus mendukung:

### Mobile

- 320px+
- Navigasi mobile
- Product grid 1-2 kolom
- Checkout mudah digunakan dengan satu tangan

### Tablet

- Product grid 2-3 kolom
- Navigasi tablet

### Desktop

- Product grid 3-4 kolom
- Layout maksimal dan terstruktur
- Dashboard admin menggunakan sidebar

---

# 21. SEO Requirements

Halaman publik harus memiliki:

- Page title
- Meta description
- Open Graph metadata
- Semantic HTML
- SEO-friendly URL
- Product metadata
- Sitemap
- Robots configuration
- Optimized images
- Local business information

Contoh URL:

```text
/
 /about
 /menu
 /menu/roti-pisang-cokelat-keju
 /gallery
 /contact
 /order
```

---

# 22. Security Requirements

1. Admin harus melakukan login.
2. Password harus di-hash.
3. Halaman admin tidak boleh dapat diakses tanpa authorization.
4. Validasi input harus dilakukan pada server.
5. Data pesanan harus divalidasi.
6. Environment variable tidak boleh dimasukkan ke repository.
7. Database credentials tidak boleh diekspos ke client.
8. Seluruh prosedur tRPC untuk operasi admin harus menggunakan `adminProcedure` sehingga authorization diperiksa di server.
9. Input pengguna harus disanitasi/ditangani secara aman.
10. Dependency harus diperbarui secara berkala.

---

# 23. Success Criteria

Produk dianggap memenuhi kebutuhan versi pertama apabila:

- Customer dapat membuka website.
- Customer dapat melihat informasi Dyvina.
- Customer dapat melihat katalog.
- Customer dapat memfilter produk.
- Customer dapat melihat detail produk.
- Customer dapat menambahkan produk ke cart.
- Customer dapat melakukan checkout.
- Customer dapat mengirim pesanan melalui WhatsApp.
- Admin dapat login.
- Admin dapat melakukan CRUD produk.
- Admin dapat melakukan CRUD kategori.
- Admin dapat melihat pesanan.
- Admin dapat mengubah status pesanan.
- Website responsive.
- Tidak terdapat bug kritis pada fitur utama.
- Website dapat di-deploy ke production.

---

# 24. Acceptance Criteria

## Homepage

- [ ] Hero tampil dengan benar.
- [ ] CTA menuju menu berfungsi.
- [ ] Produk unggulan tampil.
- [ ] Informasi Dyvina tampil.
- [ ] Location section tampil.
- [ ] Footer tampil.

## Menu

- [ ] Semua produk dapat ditampilkan.
- [ ] Filter kategori berfungsi.
- [ ] Search berfungsi.
- [ ] Harga tampil.
- [ ] Status produk tampil.

## Product

- [ ] Detail produk dapat dibuka.
- [ ] Quantity dapat diubah.
- [ ] Produk dapat ditambahkan ke cart.

## Cart

- [ ] Produk dapat ditambah.
- [ ] Quantity dapat diubah.
- [ ] Produk dapat dihapus.
- [ ] Total dihitung dengan benar.

## Order

- [ ] Customer dapat mengisi data.
- [ ] Pesanan tervalidasi.
- [ ] Nomor pesanan terbentuk.
- [ ] Pesanan tersimpan.
- [ ] WhatsApp dapat dibuka.

## Admin

- [ ] Login berfungsi.
- [ ] Dashboard dapat diakses.
- [ ] CRUD produk berfungsi.
- [ ] CRUD kategori berfungsi.
- [ ] Order dapat dilihat.
- [ ] Status order dapat diperbarui.

---

# 25. Roadmap Pengembangan

## Version 1.0

- Company profile
- Product catalog
- Product detail
- Cart
- Order
- WhatsApp
- Admin dashboard
- Product management
- Category management
- Order management

## Version 2.0

Fitur yang dapat dipertimbangkan:

- Payment gateway
- QRIS
- Customer account
- Order tracking
- Online pickup scheduling
- Inventory
- Discount / voucher
- Promo management
- Notification
- Customer review

## Version 3.0

Kemungkinan pengembangan:

- Multi-outlet
- POS integration
- Inventory management
- Sales analytics
- Loyalty program
- Delivery integration
- Mobile application

---

# 26. Timeline Pengembangan

| Minggu | Aktivitas | Output |
|---|---|---|
| 1 | Requirement Analysis | PRD & requirements |
| 2 | System Design | UML, ERD, architecture |
| 3 | UI/UX Design | Wireframe & UI |
| 4 | Setup & Database | Project + database |
| 5 | Public Website | Homepage, About, Menu |
| 6 | Order & Admin | Cart, Order, Dashboard |
| 7 | Integration | Integrasi seluruh fitur |
| 8 | Testing | Test case & bug fixing |
| 9 | Deployment | Production website |
| 10 | Documentation | Dokumentasi akhir |

---

# 27. Risiko Proyek

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data produk tidak lengkap | Tinggi | Gunakan data yang telah dikonfirmasi |
| Harga berubah | Sedang | Harga dapat dikelola admin |
| Foto produk belum tersedia | Sedang | Gunakan placeholder sementara |
| Perubahan requirement | Tinggi | Requirement dikunci sebelum implementation |
| Bug saat deployment | Sedang | Lakukan staging/testing sebelum production |
| Database bermasalah | Tinggi | Backup database |
| WhatsApp berubah | Rendah | Nomor dibuat configurable |

---

# 28. Definition of Done

Sebuah fitur dianggap selesai apabila:

1. Requirement fitur telah disetujui.
2. UI telah dibuat.
3. Logic telah diimplementasikan.
4. Database/API yang dibutuhkan telah tersedia.
5. Validasi telah diterapkan.
6. Responsive telah diuji.
7. Black Box Testing telah dilakukan.
8. Tidak terdapat bug kritis.
9. Fitur telah terintegrasi dengan sistem.
10. Dokumentasi telah diperbarui.

---

# 29. Catatan Implementasi

Data bisnis seperti:

- Nama produk
- Harga
- Deskripsi
- Foto
- Nomor WhatsApp
- Jam operasional
- Alamat
- Informasi promo

harus dikonfirmasi dengan pihak Dyvina sebelum website production dipublikasikan.

Data dari sumber publik dapat digunakan untuk tahap analisis atau development awal, tetapi tidak boleh dianggap sebagai sumber kebenaran tunggal untuk informasi bisnis yang dapat berubah.

---

# 30. Ringkasan

Website Dyvina Bakery & Coffee akan dikembangkan sebagai website informasi dan katalog produk dengan kemampuan pemesanan sederhana. Sistem memiliki dua sisi utama, yaitu **Public Website** untuk customer dan **Admin Dashboard** untuk pengelola.

Metodologi pengembangan yang digunakan adalah **SDLC Waterfall** dengan tahapan Requirement Analysis, System Design, Implementation, Testing, serta Deployment & Maintenance.

Versi pertama difokuskan pada kebutuhan inti agar sistem dapat selesai, diuji, dan digunakan tanpa memperluas scope secara berlebihan.

**Core flow:**

```text
Customer
   ↓
Website
   ↓
Menu
   ↓
Product
   ↓
Cart
   ↓
Checkout
   ↓
Order
   ↓
WhatsApp

Admin
   ↓
Login
   ↓
Dashboard
   ↓
Products / Categories / Orders
```
