# Chapter 3: CSS Fundamentals 🎨

## Daftar Isi 📑
- [Pengenalan CSS](#pengenalan-css)
- [Box Model](#box-model)
- [Display & Positioning](#display--positioning)
- [Flexbox Layout](#flexbox-layout)
- [CSS Grid Layout](#css-grid-layout)
- [Colors & Typography](#colors--typography)
- [Responsive Design](#responsive-design)
- [CSS Variables](#css-variables-custom-properties-)
- [Animations & Transforms](#animations--transitions-)
- [CSS Architecture](#css-architecture--organization-)

## Pengenalan CSS

Setelah kita belajar HTML, sekarang saatnya kita bikin website kita jadi lebih cakep pake CSS. Ibaratnya kalo HTML itu kerangka rumah, CSS itu cat dan dekorasinya. Yuk kita mulai!

### Apa sih CSS itu? 🤔

CSS (Cascading Style Sheets) itu bahasa yang dipake buat ngatur tampilan website kita. Kalo HTML fokus ke konten, CSS fokus ke styling. Contohnya:
- Warna text & background
- Ukuran & jenis font
- Layout & posisi element
- Animasi & efek keren lainnya

### 3 Cara Nulis CSS 📝

#### 1. Inline CSS
```html
<!-- Langsung di dalam tag HTML -->
<p style="color: blue; font-size: 20px;">Text biru besar</p>
```

#### 2. Internal CSS
```html
<!-- Di dalam tag <head> -->
<head>
    <style>
        p {
            color: blue;
            font-size: 20px;
        }
    </style>
</head>
```

#### 3. External CSS (Yang Paling Recommended! ⭐)
```html
<!-- File HTML -->
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

```css
/* File style.css */
p {
    color: blue;
    font-size: 20px;
}
```

### CSS Selectors 🎯

Selectors itu cara kita milih element mana yang mau di-styling. Kayak remote TV, kita bisa milih channel mana yang mau ditonton.

```css
/* 1. Element Selector */
p {
    color: blue;
}

/* 2. Class Selector (Paling Sering Dipake!) */
.btn {
    background: green;
}

/* 3. ID Selector */
#header {
    height: 80px;
}

/* 4. Kombinasi */
.btn.large {
    padding: 20px;
}

/* 5. Child Selector */
.container > p {
    margin: 10px;
}

/* 6. Descendant Selector */
.card p {
    font-size: 16px;
}
```

### CSS Specificity (Urutan Prioritas) 📊

Kalo ada style yang bentrok, mana yang bakal dipake? Ini urutannya dari yang paling kuat:

1. !important (Hindari pake ini!)
2. Inline styles
3. ID (#)
4. Class (.), attributes, pseudo-class
5. Elements (p, div, dll)

```css
/* Contoh Specificity */
p {
    color: blue;              /* Specificity: 1 */
}

.text {
    color: red;              /* Specificity: 10 */
}

#unique {
    color: green;            /* Specificity: 100 */
}

p.text#unique {
    color: purple;           /* Specificity: 111 */
}
```

## Box Model 📦

### Apa itu Box Model?

Setiap element di HTML itu sebenernya berbentuk kotak. Box model itu kayak lapisan bawang, ada:
1. Content - Isi kotaknya
2. Padding - Jarak dari isi ke border
3. Border - Garis pinggir kotak
4. Margin - Jarak ke element lain

```css
.box {
    /* Content */
    width: 200px;
    height: 100px;
    
    /* Padding */
    padding: 20px;              /* Semua sisi */
    padding: 10px 20px;         /* Atas-bawah kiri-kanan */
    padding: 10px 20px 15px 5px; /* Atas kanan bawah kiri */
    
    /* Border */
    border: 2px solid black;    /* Tebal jenis warna */
    border-radius: 10px;        /* Membuat sudut rounded */
    
    /* Margin */
    margin: 10px;              /* Sama kayak padding */
}
```

### Box Sizing

```css
/* Default box sizing */
.box {
    width: 200px;
    padding: 20px;
    border: 2px solid black;
    /* Total lebar = 200 + 40 + 4 = 244px */
}

/* Better box sizing */
* {
    box-sizing: border-box;
    /* Sekarang width 200px udah termasuk padding & border */
}
```

## Display & Positioning 🎯

### Display Properties

```css
/* 1. Block: Ambil 1 baris penuh */
.block {
    display: block;
    /* Contoh: <div>, <p>, <h1> */
}

/* 2. Inline: Sesuai konten */
.inline {
    display: inline;
    /* Contoh: <span>, <a> */
}

/* 3. Inline-block: Campuran keduanya */
.inline-block {
    display: inline-block;
    /* Bisa atur width/height, tapi tetep inline */
}

/* 4. None: Sembunyikan element */
.hidden {
    display: none;
}
```

### Position Properties

```css
/* 1. Static (Default) */
.static {
    position: static;
    /* Ikut normal flow */
}

/* 2. Relative */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
    /* Geser dari posisi normalnya */
}

/* 3. Absolute */
.absolute {
    position: absolute;
    top: 0;
    right: 0;
    /* Posisi relative ke parent terdekat yang punya position */
}

/* 4. Fixed */
.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
    /* Tetap di posisi layar (floating) */
}

/* 5. Sticky */
.sticky {
    position: sticky;
    top: 0;
    /* Jadi fixed setelah di-scroll */
}
```

## Layout Systems Comparison 📊

Kapan pake apa? Here's the guide:

```css
/* 1. Flexbox: For 1-dimensional layouts */
.navbar {
    display: flex;
    justify-content: space-between;
    /* Perfect for: Navigation bars, card rows, etc. */
}

/* 2. Grid: For 2-dimensional layouts */
.dashboard {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* Perfect for: Page layouts, photo galleries, etc. */
}

/* 3. Position: For specific placement */
.modal {
    position: fixed;
    /* Perfect for: Modals, tooltips, floating elements */
}
```

## Flexbox Layout 📏

### Apa itu Flexbox?

Flexbox itu teknologi CSS yang bikin kita gampang ngatur layout. Cara kerjanya:
1. Container (parent) jadi flex container
2. Items di dalemnya jadi flex items
3. Bisa ngatur arah, alignment, dan spacing dengan mudah

```css
/* Basic Flexbox */
.container {
    display: flex;
    
    /* Main Axis (horizontal) */
    justify-content: center;     /* Tengah horizontal */
    justify-content: space-between;  /* Space antara items */
    
    /* Cross Axis (vertical) */
    align-items: center;         /* Tengah vertical */
    
    /* Direction */
    flex-direction: row;         /* Horizontal (default) */
    flex-direction: column;      /* Vertical */
}

/* Flex Items */
.item {
    flex: 1;                     /* Grow sama rata */
    order: 2;                    /* Urutan item */
    align-self: flex-start;      /* Override align-items */
}
```

### Contoh Layout Flexbox

```css
/* Common Flexbox Patterns */
.navbar {
    display: flex;
    justify-content: space-between;  /* Items di ujung kiri dan kanan */
    align-items: center;            /* Vertical alignment tengah */
}

.card-grid {
    display: flex;
    flex-wrap: wrap;               /* Biar responsive, items bisa turun ke bawah */
    gap: 20px;                     /* Spacing antar cards */
    
    & > * {                        /* Semua child elements */
        flex: 1 1 300px;           /* grow shrink basis */
        /* flex: 1    -> bisa grow
           flex: 1    -> bisa shrink
           300px      -> ukuran default */
    }
}
```

## CSS Grid Layout 📐

### Apa itu Grid?

Grid itu sistem layout 2 dimensi di CSS. Kalo Flexbox bagus buat layout 1 dimensi (horizontal/vertical), Grid jago buat layout yang lebih kompleks. Think of it like Excel spreadsheet!

```css
/* Basic Grid */
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;  /* Bikin 3 kolom sama lebar */
    grid-gap: 20px;                      /* Jarak antar grid items */
}

/* Grid Area Example */
.container {
    display: grid;
    grid-template-areas: 
        "header header header"   /* Layout area dengan nama */
        "sidebar main main"      /* Sidebar 1 kolom, main 2 kolom */
        "footer footer footer";  /* Footer full width */
    gap: 20px;
}

.header { grid-area: header; }   /* Assign element ke area */
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### Common Grid Properties

```css
.grid-container {
    /* Grid Track Size */
    grid-template-columns: 200px auto 200px;  /* Fixed-Auto-Fixed */
    grid-template-rows: repeat(3, 100px);     /* 3 baris 100px */
    
    /* Responsive Grid */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive columns */
    
    /* Grid Gap */
    gap: 20px;                  /* Row & column gap */
    row-gap: 20px;             /* Just row gap */
    column-gap: 20px;          /* Just column gap */
}

/* Grid Item Placement */
.item {
    grid-column: 1 / 3;        /* Span dari kolom 1 sampai 3 */
    grid-row: 2 / 4;          /* Span dari baris 2 sampai 4 */
}
```

## Colors & Typography 🎨

### Praktis Color Examples
```css
/* Color Combinations for Common UI Elements */
.button {
    /* Primary Button */
    background: var(--primary-color);
    color: white;                    /* Teks putih biar kontras */
    border: 2px solid transparent;   /* Border transparent */
}

.button:hover {
    /* Hover Effect */
    background: var(--primary-dark); /* Warna lebih gelap */
    box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Bayangan soft */
}

.card {
    /* Card with Subtle Colors */
    background: white;
    border: 1px solid #e1e1e1;      /* Border abu-abu soft */
    box-shadow: 0 2px 8px rgba(0,0,0,0.05); /* Bayangan subtle */
}

.alert {
    /* Alert Messages */
    --success: #28a745;
    --error: #dc3545;
    --warning: #ffc107;
    --info: #17a2b8;
    
    &--success { background: var(--success); }
    &--error { background: var(--error); }
    /* ...dan seterusnya */
}
```

### Typography Best Practices
```css
/* Font Scale System */
:root {
    --font-xs: 0.75rem;   /* 12px */
    --font-sm: 0.875rem;  /* 14px */
    --font-base: 1rem;    /* 16px */
    --font-lg: 1.125rem;  /* 18px */
    --font-xl: 1.25rem;   /* 20px */
    
    /* Line Heights */
    --leading-tight: 1.25;
    --leading-normal: 1.5;
    --leading-loose: 1.75;
}

/* Responsive Typography */
html {
    font-size: 16px;  /* Base font size */
}

@media (min-width: 768px) {
    html {
        font-size: 18px;  /* Larger base font on bigger screens */
    }
}

/* Content Typography */
.article {
    /* Basic content styles */
    font-family: 'Georgia', serif;  /* Serif for readability */
    line-height: var(--leading-normal);
    
    /* Heading styles */
    h1 { 
        font-size: var(--font-xl);
        margin-bottom: 1em;
    }
    
    /* Paragraph spacing */
    p + p {
        margin-top: 1em;  /* Space between paragraphs */
    }
}
```

## Responsive Design 📱

### Media Queries

```css
/* Mobile First Approach */
.container {
    width: 100%;
    padding: 20px;
}

/* Tablet (768px and up) */
@media screen and (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Desktop (1024px and up) */
@media screen and (min-width: 1024px) {
    .container {
        width: 960px;
    }
}
```

### Viewport Meta Tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Responsive Units

```css
/* Relative Units */
.responsive-text {
    /* Relative to root font size */
    font-size: 1.2rem;
    
    /* Relative to viewport */
    width: 90vw;
    height: 100vh;
    
    /* Relative to parent */
    width: 50%;
    font-size: 1.2em;
}
```

## CSS Variables (Custom Properties) 🎯

### Kenapa Pake CSS Variables?
1. Gampang update value di banyak tempat
2. Bikin tema jadi lebih mudah
3. Kode lebih rapi dan maintainable

```css
/* Deklarasi Variables */
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 16px;
    --spacing-unit: 8px;
}

/* Pake Variables */
.button {
    background: var(--primary-color);
    padding: var(--spacing-unit);
    font-size: var(--font-size-base);
}

.link {
    color: var(--primary-color);
}

/* Dark Mode dengan Variables */
@media (prefers-color-scheme: dark) {
    :root {
        --primary-color: #66b0ff;
        --text-color: #ffffff;
        --bg-color: #333333;
    }
}
```

## Animations & Transitions 🎬

### Basic Transitions
Transition itu animasi sederhana dari satu state ke state lain.

```css
/* Hover Effect dengan Transition */
.button {
    background: blue;
    padding: 10px 20px;
    transition: all 0.3s ease; /* Property, duration, timing function */
}

.button:hover {
    background: darkblue;
    transform: scale(1.1); /* Membesar 10% */
}

/* Multiple Properties */
.card {
    transition: 
        transform 0.3s ease,
        box-shadow 0.3s ease-in-out;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
```

### Keyframe Animations
Untuk animasi yang lebih kompleks, kita pake @keyframes.

```css
/* Basic Animation */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animated-element {
    animation: slideIn 1s ease forwards;
}

/* Multiple Steps Animation */
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

.pulsing-element {
    animation: pulse 2s infinite; /* Name, duration, iteration */
}
```

## CSS Transforms & Effects 🎭

### CSS Transforms
Transform properties memungkinkan kita mengubah bentuk, posisi, dan ukuran element.

```css
/* Basic 2D Transforms */
.element {
    /* Rotate - Putar element */
    transform: rotate(45deg);    /* Putar 45 derajat */
    
    /* Scale - Ubah ukuran */
    transform: scale(1.5);       /* 1.5x lebih besar */
    transform: scale(0.8, 1.2);  /* X: 0.8x, Y: 1.2x */
    
    /* Translate - Geser posisi */
    transform: translateX(20px); /* Geser horizontal */
    transform: translateY(-10px); /* Geser vertical */
    
    /* Skew - Miring */
    transform: skew(10deg);     /* Miringkan element */
}

/* Multiple Transforms */
.combined {
    /* Bisa gabung beberapa transform */
    transform: rotate(45deg) scale(1.5) translateX(20px);
}

/* Transform Origin */
.custom-origin {
    transform-origin: left top; /* Titik pusat transformasi */
    transform: rotate(45deg);
}
```

### Praktis Effects

```css
/* Hover Effects */
.card {
    transition: all 0.3s ease;
}

.card:hover {
    /* Efek mengambang saat hover */
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Flip Card Effect */
.flip-card {
    perspective: 1000px; /* Bikin efek 3D */
}

.flip-card-inner {
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}
```

## CSS Architecture & Organization 🏗️

### BEM Naming Convention
BEM (Block Element Modifier) bikin class name lebih terstruktur.

```css
/* Block: Standalone component */
.card { }

/* Element: Part of block */
.card__title { }
.card__image { }

/* Modifier: Different state/version */
.card--featured { }
.button--large { }

/* Example Implementation */
.header { }
.header__nav { }
.header__nav-item { }
.header__nav-item--active { }
```

### File Organization

```scss
/* 1. Base Styles */
base/
  _reset.css      /* CSS Reset */
  _typography.css /* Font styles */
  _variables.css  /* CSS Variables */

/* 2. Layout Styles */
layout/
  _grid.css      /* Grid system */
  _header.css    /* Header styles */
  _footer.css    /* Footer styles */

/* 3. Components */
components/
  _buttons.css   /* Button styles */
  _cards.css     /* Card styles */
  _forms.css     /* Form styles */

/* 4. Pages */
pages/
  _home.css     /* Homepage specific */
  _about.css    /* About page styles */

/* 5. Themes */
themes/
  _dark.css     /* Dark theme */
  _light.css    /* Light theme */
```

## Performance & Best Practices 🚀

### 1. Layout Performance
```css
/* ❌ Avoid - Forces multiple layout recalculations */
.element {
    width: 50%;          /* Triggers layout */
    margin-left: 20px;   /* Triggers another layout */
    transform: scale(2); /* Triggers one more */
}

/* ✅ Better - Group layout-affecting properties */
.element {
    /* All layout calculations happen at once */
    width: 50%;
    margin-left: 20px;
    
    /* Transform happens on GPU - better performance */
    transform: scale(2);
}
```

### 2. Responsive Images
```css
/* Modern image optimization */
.image {
    max-width: 100%;
    height: auto;
    
    /* Modern lazy loading */
    loading: "lazy";
    
    /* Prevent layout shift */
    aspect-ratio: 16/9;
}
```

### 3. Modern CSS Features
```css
/* Use modern CSS when possible */
.container {
    /* Modern Box Alignment */
    display: grid;
    place-items: center;
    
    /* Modern Color Syntax */
    color: rgb(0 0 0 / 75%);
    
    /* Logical Properties */
    margin-inline: auto;
    padding-block: 1rem;
}
```

## 🎯 Mini Project: Landing Page

### Component Breakdown & Explanations:

1. **Navbar Structure:**
```css
.navbar {
    display: flex;               /* Bikin layout horizontal */
    justify-content: space-between; /* Logo kiri, menu kanan */
    position: sticky;           /* Navbar tetap di atas */
    top: 0;                    /* Nempel di top browser */
    z-index: 100;              /* Selalu di atas content lain */
}
```

2. **Hero Section Layout:**
```css
.hero {
    min-height: 100vh;         /* Minimal setinggi layar */
    background-image: linear-gradient(
        rgba(0,0,0,0.5),
        rgba(0,0,0,0.5)
    ), url('hero.jpg');        /* Overlay gelap di atas gambar */
    background-size: cover;    /* Gambar full cover */
    background-position: center; /* Gambar selalu di tengah */
}
```

3. **Responsive Card Grid:**
```css
.features {
    display: grid;
    /* Auto-fit: cards akan auto adjust ke container */
    /* minmax: minimal 300px, maximal 1fr (equal width) */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;                /* Space antar cards */
    padding: var(--spacing);
}
```

### Contoh Kode:

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar">
        <div class="logo">Brand</div>
        <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
    </nav>
    
    <!-- Hero -->
    <header class="hero">
        <h1>Welcome to My Site</h1>
        <p>A cool description here</p>
        <button class="btn">Learn More</button>
    </header>
    
    <!-- Features -->
    <section class="features">
        <div class="card">
            <h3>Feature 1</h3>
            <p>Description...</p>
        </div>
        <!-- More cards... -->
    </section>
</body>
</html>
```

```css
/* CSS Variables */
:root {
    --primary: #007bff;
    --dark: #333;
    --light: #fff;
    --spacing: 20px;
}

/* Reset & Base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
}

/* Navbar */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing);
    background: var(--dark);
    color: var(--light);
}

.nav-links a {
    color: var(--light);
    text-decoration: none;
    padding: 10px;
}

/* Hero Section */
.hero {
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: var(--primary);
    color: var(--light);
}

/* Features */
.features {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing);
    padding: var(--spacing);
}

.card {
    flex: 1 1 300px;
    padding: var(--spacing);
    border: 1px solid #ddd;
    border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-links {
        display: none; /* Simplified for example */
    }
    
    .hero {
        height: 60vh;
    }
}
```

## 💡 Tips & Tricks

1. **Gunakan CSS Reset/Normalize**
```css
/* Simple Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

2. **Mobile-First Approach**
```css
/* Base styles untuk mobile */
.element {
    width: 100%;
}

/* Kemudian tambah styles untuk screen lebih besar */
@media (min-width: 768px) {
    .element {
        width: 50%;
    }
}
```

3. **CSS Organization**
```css
/* 1. Variables */
:root {
    --color-primary: #007bff;
}

/* 2. Reset/Base */
* { box-sizing: border-box; }

/* 3. Typography */
body { font-family: sans-serif; }

/* 4. Layout/Components */
.container { /* ... */ }
.button { /* ... */ }

/* 5. Utilities */
.text-center { text-align: center; }

/* 6. Media Queries */
@media (min-width: 768px) { /* ... */ }
```

## 🔍 Debugging CSS

### Common Issues & Solutions

1. **Element Nggak Mau Center?**
```css
/* Solution 1: Flexbox */
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Solution 2: Grid */
.parent {
    display: grid;
    place-items: center;
}
```

2. **Margin Collapse?**
```css
/* Solution: Pake padding atau gap */
.parent {
    display: flex;
    gap: 20px;
}
```

3. **Z-index Nggak Kerja?**
```css
/* Solution: Pastikan ada position */
.element {
    position: relative;  /* atau absolute/fixed */
    z-index: 1;
}
```

## 📚 Resources

1. **Tools Online:**
   - [CSS Gradient Generator](https://cssgradient.io/)
   - [Flexbox Froggy](https://flexboxfroggy.com/)
   - [CSS Grid Garden](https://cssgridgarden.com/)

2. **Dokumentasi:**
   - [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
   - [CSS Tricks](https://css-tricks.com/)

3. **Color Tools:**
   - [Coolors](https://coolors.co/)
   - [Color Hunt](https://colorhunt.co/)

## 🎯 Latihan!

1. **Bikin Komponen UI:**
   - Button styles
   - Card component
   - Navigation menu
   - Form elements

2. **Layout Challenges:**
   - Center element vertically & horizontally
   - Create a responsive grid
   - Build a sticky header
   - Make a modal/popup

3. **Responsive Design:**
   - Convert desktop layout ke mobile
   - Bikin hamburger menu
   - Implement responsive images

## 🌟 Selamat!

Kalo udah sampe sini, congratulations! Kamu udah paham dasar-dasar CSS. Selanjutnya, latihan terus dan explore lebih banyak project. Remember: CSS itu kayak main LEGO, makin sering main makin jago! 💪

---
📝 Note: Jangan lupa selalu inspect element di browser buat liat style yang udah diterapin. Dan kalo stuck, Google adalah teman terbaik! 😉
