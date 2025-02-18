# Chapter 2: HTML Fundamentals 🌐

## Pengenalan Web Development

Sebelum kita mulai belajar HTML, yuk kenalan dulu sama dunia web development! Ibarat bikin rumah, kita perlu tau dulu apa aja sih bahan-bahannya dan gimana cara kerjanya.

### Cara Kerja Website 🤔

Website itu sebenernya kayak ngobrol antara dua teman:
1. **Client** (Browser kamu) - Yang minta sesuatu
2. **Server** (Komputer jauh sana) - Yang ngasih yang diminta

Contoh sederhananya gini:
```
Kamu (Client)  : "Bro, minta halaman Google dong!"
Server Google  : "Oke nih, tak kasih file HTML, CSS, sama JavaScript-nya ya!"
Browser kamu   : "Nah, sekarang aku tampilkan ke layar ah~"
```

### Client-side vs Server-side 🆚

Biar gampang, kita ibaratin restoran ya:
- **Client-side**: Yang terjadi di meja kamu (browser)
  - HTML = Piring dan makanannya
  - CSS = Cara makanan ditata
  - JavaScript = Interaksi kamu sama makanannya

- **Server-side**: Yang terjadi di dapur (server)
  - PHP, Python, dll = Juru masaknya
  - Database = Kulkas penyimpanan bahan

## Struktur Dasar HTML 📝

### Apa sih HTML itu?

HTML itu bahasa yang dipake buat bikin struktur website. Kalo dibandingin sama tubuh manusia:
- HTML = Kerangka tubuh
- CSS = Baju dan aksesoris
- JavaScript = Gerakan dan tingkah laku

### Anatomi HTML Sederhana

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Website Pertamaku!</title>
  </head>
  <body>
    <h1>Halo Dunia! 👋</h1>
    <p>Ini website pertama aku!</p>
  </body>
</html>
```

Penjelasan singkatnya:
- `<!DOCTYPE html>`: Memberitahu browser kalo ini file HTML5
- `<html>`: Awal mula dokumen HTML
- `<head>`: Tempat info tentang website
- `<body>`: Tempat konten yang keliatan di browser

### Tag dan Element HTML 🏷️

Tag HTML itu kayak container yang bungkus konten. Formatnya gini:
```html
<tag>Konten di sini</tag>

<!-- Contoh tag -->
<p>Ini paragraf</p>
<h1>Ini judul</h1>
<button>Ini tombol</button>
```

Ada juga tag yang nggak perlu ditutup (self-closing):
```html
<img src="foto.jpg">
<br>
<hr>
```

## Elements HTML Dasar 📦

### 1. Text Formatting ✍️

```html
<!-- Headings -->
<h1>Judul Utama</h1>
<h2>Sub Judul</h2>
<h3>Sub Sub Judul</h3>

<!-- Paragraphs -->
<p>Ini paragraf biasa.</p>
<p>Ini paragraf dengan <strong>text tebal</strong> dan <em>text miring</em>.</p>

<!-- Text styling -->
<b>Text Tebal</b>
<i>Text Miring</i>
<u>Text Bergaris Bawah</u>
<mark>Text Disorot</mark>
```

### 2. Lists 📝

```html
<!-- Unordered List (Pake bullet) -->
<ul>
  <li>Nasi Goreng</li>
  <li>Mie Goreng</li>
  <li>Sate</li>
</ul>

<!-- Ordered List (Pake nomor) -->
<ol>
  <li>Bangun tidur</li>
  <li>Cuci muka</li>
  <li>Sarapan</li>
</ol>
```

### 3. Links dan Images 🔗

```html
<!-- Links -->
<a href="https://google.com">Ke Google</a>
<a href="about.html">Tentang Kami</a>
<a href="tel:08123456789">Telepon Kami</a>

<!-- Images -->
<img src="kucing.jpg" alt="Foto kucing lucu">
<img src="https://placekitten.com/200/200" alt="Random kitten">
```

### 4. Tables 📊

```html
<table border="1">
  <tr>
    <th>Nama</th>
    <th>Umur</th>
  </tr>
  <tr>
    <td>Budi</td>
    <td>20</td>
  </tr>
  <tr>
    <td>Ani</td>
    <td>19</td>
  </tr>
</table>
```

### 5. Forms 📝

```html
<form action="/proses.php" method="POST">
  <!-- Text input -->
  <label for="nama">Nama:</label>
  <input type="text" id="nama" name="nama">

  <!-- Email input -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email">

  <!-- Password -->
  <label for="password">Password:</label>
  <input type="password" id="password" name="password">

  <!-- Radio buttons -->
  <p>Jenis Kelamin:</p>
  <input type="radio" id="pria" name="gender" value="pria">
  <label for="pria">Pria</label>
  <input type="radio" id="wanita" name="gender" value="wanita">
  <label for="wanita">Wanita</label>

  <!-- Checkbox -->
  <p>Hobi:</p>
  <input type="checkbox" id="coding" name="hobi" value="coding">
  <label for="coding">Coding</label>
  <input type="checkbox" id="gaming" name="hobi" value="gaming">
  <label for="gaming">Gaming</label>

  <!-- Select dropdown -->
  <label for="kota">Kota:</label>
  <select id="kota" name="kota">
    <option value="jakarta">Jakarta</option>
    <option value="bandung">Bandung</option>
    <option value="surabaya">Surabaya</option>
  </select>

  <!-- Text area -->
  <label for="pesan">Pesan:</label>
  <textarea id="pesan" name="pesan" rows="4" cols="50"></textarea>

  <!-- Submit button -->
  <button type="submit">Kirim</button>
</form>
```

## Form Input Types & Validation 📝

### Jenis-jenis Input dan Validasinya
```html
<!-- Basic Inputs dengan Validasi -->
<input 
    type="text"      
    required             <!-- ✨ Wajib diisi -->
    minlength="3"       <!-- ✨ Minimal 3 karakter -->
    pattern="[a-zA-Z]+" <!-- ✨ Hanya huruf -->
>

<!-- Email dengan Validasi -->
<input 
    type="email"
    required
    placeholder="email@domain.com"
    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
>
```

## HTML Best Practices & Tips 💡

### 1. Struktur & Dokumentasi
```html
<!-- 1. Gunakan Indentasi yang Rapi -->
<div>
    <p>Konten</p>
</div>

<!-- 2. Dokumentasi yang Jelas -->
<!-- @section: Header Navigation -->
<nav>
    <!-- @desc: Main menu items -->
    <ul>...</ul>
</nav>

<!-- 3. Semantic Markup -->
<article>
    <h1>Judul</h1>
    <time datetime="2024-01-20">20 Jan 2024</time>
    <p>Konten...</p>
</article>
```

### 2. Accessibility & SEO
```html
<!-- 1. Semantic Structure -->
<main>
    <h1>Judul Utama</h1>
    <article>...</article>
</main>

<!-- 2. ARIA Labels -->
<button aria-label="Close menu">×</button>

<!-- 3. Meta Tags untuk SEO -->
<head>
    <meta name="description" content="Deskripsi singkat halaman">
    <meta name="keywords" content="kata kunci">
</head>
```

## HTML Entities & Special Characters 🔣

### Karakter Spesial yang Sering Dipake
```html
&copy;    <!-- © (copyright) -->
&trade;   <!-- ™ (trademark) -->
&reg;     <!-- ® (registered) -->
&nbsp;    <!-- Spasi yang tidak patah -->
&lt;      <!-- < (less than) -->
&gt;      <!-- > (greater than) -->
&amp;     <!-- & (ampersand) -->
&quot;    <!-- " (quote) -->
&apos;    <!-- ' (apostrophe) -->
```

### Contoh Penggunaan:
```html
<footer>
    <p>&copy; 2024 Website Keren</p>
</footer>

<p>Ini contoh tag HTML: &lt;p&gt;Hello&lt;/p&gt;</p>

<p>Harga: Rp&nbsp;150.000</p>
```

## Metadata dan Head Elements 📋

### Apa itu Metadata?
Metadata itu kayak "KTP"-nya website kamu. Isinya info penting tentang website yang dikasih tau ke browser.

```html
<head>
    <!-- Karakter encoding -->
    <meta charset="UTF-8">
    
    <!-- Viewport untuk responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO metadata -->
    <meta name="description" content="Deskripsi website kamu di sini">
    <meta name="keywords" content="kata kunci, website, kamu">
    <meta name="author" content="Nama Kamu">
    
    <!-- Title yang muncul di tab browser -->
    <title>Nama Website Kamu</title>
    
    <!-- Link ke file CSS -->
    <link rel="stylesheet" href="style.css">
    
    <!-- Link ke favicon -->
    <link rel="icon" href="favicon.ico">
</head>
```

### Kenapa Metadata Penting?
1. SEO jadi lebih bagus
2. Website jadi responsive
3. Social media sharing lebih cantik
4. Browser bisa tampilkan konten dengan benar

## Semantic HTML 🏗️

### Apa itu Semantic HTML?

Semantic HTML itu tag HTML yang punya "makna", bukan cuma buat tampilan. Ibarat bikin rumah:
- `<header>` = Bagian atap
- `<nav>` = Lorong/jalan
- `<main>` = Ruang utama
- `<footer>` = Fondasi bawah

### Kenapa Pake Semantic HTML?
1. SEO lebih bagus (Google suka!)
2. Accessibility lebih baik (Ramah difabel)
3. Kode lebih rapi dan mudah dibaca

### Contoh Semantic HTML:
```html
<!-- KURANG BAGUS -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>
<div class="footer">...</div>

<!-- LEBIH BAGUS -->
<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Judul Artikel</h1>
    <p>Konten artikel...</p>
  </article>
</main>
<footer>
  <p>&copy; 2024 Website Keren</p>
</footer>
```

### Tag Semantic yang Sering Dipake:
- `<header>`: Bagian atas halaman/section
- `<nav>`: Menu navigasi
- `<main>`: Konten utama
- `<article>`: Konten yang bisa berdiri sendiri
- `<section>`: Bagian dari konten
- `<aside>`: Konten sampingan
- `<footer>`: Bagian bawah halaman/section

## HTML Comments dan Dokumentasi 📑

### Cara Nulis Komentar
```html
<!-- Ini komentar satu baris -->

<!-- 
    Ini komentar
    yang lebih
    dari satu baris
-->

<!-- TODO: Nanti tambahin fitur login -->

<!-- FIXME: Ada bug di form ini -->

<!-- 
    @author: Nama Kamu
    @date: 2024-01-20
    @desc: Halaman login website 
-->
```

### Best Practices Dokumentasi
1. **Jelaskan Struktur Complex**
```html
<!-- Header Section -->
<header>
    <!-- Navigation Menu -->
    <nav>
        <!-- Menu items -->
    </nav>
</header>

<!-- Main Content Section -->
<main>
    <!-- Article list -->
    <article>
        <!-- Article content -->
    </article>
</main>
```

2. **Tandai Temporary Code**
```html
<!-- TEMPORARY: Fake data for testing -->
<ul>
    <li>Test User 1</li>
    <li>Test User 2</li>
</ul>

<!-- DEBUG: Remove in production -->
<div class="debug-info">
    <p>Debug information here</p>
</div>
```

## Accessibility Best Practices ♿

### Bikin Website Ramah Difabel
```html
<!-- Pake aria-label buat element yang nggak jelas -->
<button aria-label="Tutup popup">×</button>

<!-- Kasih alt text yang jelas -->
<img src="logo.png" alt="Logo Perusahaan ABC">

<!-- Struktur heading yang benar -->
<h1>Judul Utama</h1>
  <h2>Sub Judul</h2>
    <h3>Sub sub judul</h3>

<!-- Form yang accessible -->
<form>
    <label for="nama">Nama:</label>
    <input 
        type="text" 
        id="nama" 
        name="nama"
        aria-required="true"
        aria-label="Masukkan nama lengkap"
    >
</form>
```

## Interactive Code Examples 💻

### 1. Simple Button dengan Alert
```html
<!-- Coba klik tombolnya! -->
<button onclick="alert('Halo!')">Klik Aku!</button>

<!-- Tombol dengan konfirmasi -->
<button onclick="confirm('Yakin mau lanjut?')">
    Konfirmasi Dulu
</button>
```

### 2. Form dengan Validasi Real-time
```html
<!-- Coba submit tanpa isi form! -->
<form onsubmit="return validateForm()">
    <input 
        type="text" 
        id="nama"
        oninput="checkName(this.value)"
    >
    <span id="nameError"></span>
    <button type="submit">Kirim</button>
</form>
```

## 🎯 Mini Project: Bikin Website Profil

### Tugas:
Bikin website profil sederhana yang isinya:
1. Foto profil
2. Biodata singkat
3. Hobi dan kesukaan
4. Form kontak

### Contoh Struktur Kode:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Profil Saya</title>
</head>
<body>
    <!-- Header -->
    <h1>Hai! Saya [Nama Kamu]</h1>
    
    <!-- Foto Profil -->
    <img src="foto.jpg" alt="Foto profil saya">
    
    <!-- Biodata -->
    <h2>Tentang Saya</h2>
    <p>Saya adalah seorang pembelajar web development yang bersemangat!</p>
    
    <!-- Hobi -->
    <h2>Hobi Saya</h2>
    <ul>
        <li>Coding 💻</li>
        <li>Main Game 🎮</li>
        <li>Nonton Film 🎬</li>
    </ul>
    
    <!-- Form Kontak -->
    <h2>Hubungi Saya</h2>
    <form>
        <label for="nama">Nama:</label><br>
        <input type="text" id="nama" name="nama"><br>
        
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email"><br>
        
        <label for="pesan">Pesan:</label><br>
        <textarea id="pesan" name="pesan"></textarea><br>
        
        <button type="submit">Kirim</button>
    </form>
</body>
</html>
```

## HTML Validation 🔍

Sebelum upload website, pastikan HTML kamu valid:

1. **Tools Validation:**
   - [W3C Validator](https://validator.w3.org/)
   - Browser Developer Tools

2. **Yang Perlu Dicek:**
   ```html
   <!-- ❌ SALAH: Tag nggak ditutup -->
   <p>Halo semuanya
   
   <!-- ✅ BENAR: Tag ditutup dengan benar -->
   <p>Halo semuanya</p>

   <!-- ❌ SALAH: ID duplikat -->
   <div id="content">...</div>
   <div id="content">...</div>
   
   <!-- ✅ BENAR: ID unik -->
   <div id="content-1">...</div>
   <div id="content-2">...</div>
   ```

3. **Common Errors:**
   - Tag yang belum ditutup
   - Attribute yang salah tulis
   - Nested elements yang salah
   - ID yang duplikat

## 💡 Tips HTML

1. **Indentasi itu Penting!**
   ```html
   <!-- BAGUS -->
   <div>
     <p>Rapi kan?</p>
   </div>

   <!-- JELEK -->
   <div>
   <p>Berantakan nih!</p>
   </div>
   ```

2. **Selalu Tutup Tag**
   ```html
   <!-- BENAR -->
   <p>Paragraf yang benar</p>

   <!-- SALAH -->
   <p>Paragraf yang salah
   ```

3. **Gunakan Alt Text untuk Gambar**
   ```html
   <!-- BAGUS -->
   <img src="kucing.jpg" alt="Kucing lucu warna orange">

   <!-- KURANG BAGUS -->
   <img src="kucing.jpg">
   ```

## 🎯 Latihan HTML

### 1. Bikin Menu Restoran
Bikin halaman menu restoran sederhana dengan:
- Judul restoran
- Daftar makanan dan minuman (pakai list)
- Harga (pakai table)
- Form pemesanan

### 2. Bikin Halaman Blog
Bikin template blog post dengan:
- Judul artikel
- Tanggal posting
- Konten artikel
- Komen section (pake form)

### 3. Bikin Form Pendaftaran
Bikin form pendaftaran lengkap dengan:
- Data pribadi
- Pilihan paket
- Upload foto (input type file)
- Terms & conditions checkbox

## 📚 Resources Belajar HTML

1. [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
2. [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
3. [HTML CheatSheet](https://htmlcheatsheet.com/)

## 🤔 FAQ

1. **Q: Tag HTML itu case sensitive?**
   A: Nggak! `<P>` sama `<p>` sama aja. Tapi biasanya pake huruf kecil biar rapi.

2. **Q: Gimana cara lihat kode HTML website lain?**
   A: Klik kanan > View Page Source, atau tekan F12 di browser.

3. **Q: Berapa banyak tag HTML yang perlu dihafalin?**
   A: Santai aja, yang penting tau tag-tag dasar dulu. Yang lain bisa sambil jalan!

## 🎮 Challenge!

1. **Bikin Portfolio Website**
   - Home page
   - About page
   - Contact form
   - Project gallery

2. **HTML Scavenger Hunt**
   Coba cari di website favoritmu:
   - 5 jenis heading berbeda
   - 3 jenis list
   - Form dengan minimal 5 input type berbeda

## 🌟 Selamat!

Kalo udah nyampe sini, selamat! Kamu udah paham dasar-dasar HTML. Selanjutnya kita bakal belajar CSS buat bikin website kamu jadi lebih cakep! Keep coding! 💪

---
📝 Note: Inget, latihan adalah kunci! Jangan cuma baca doang, praktekin langsung ya! 😉
