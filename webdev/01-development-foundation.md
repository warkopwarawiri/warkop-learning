# Chapter 1: Development Foundation 🛠️

## Pengenalan Development Environment

Sebelum mulai ngoding, kita perlu siapin dulu "dapur coding" kita nih. Nggak beda sama masak, coding juga butuh alat-alat yang tepat biar hasilnya maksimal. Mari kita bahas satu-satu!

### 1. Text Editor/IDE: Visual Studio Code 📝

#### Apa itu VS Code?
VS Code itu kayak buku tulis canggih buat nulis code. Bedanya, dia bisa:
- Kasih warna berbeda ke code kita (syntax highlighting)
- Ngasih tau kalo ada yang salah (error detection)
- Auto-complete code (intellisense)
- Dan banyak fitur keren lainnya!

#### Cara Install VS Code
1. Buka [website VS Code](https://code.visualstudio.com/)
2. Klik tombol download
3. Install seperti biasa install aplikasi
4. Udah deh, siap dipake!

#### Extension yang Wajib Install
Extension itu kayak "plugins" yang bikin VS Code makin powerful:
- Live Server: Buat preview website kita secara live
- Auto Rename Tag: Biar gampang edit tag HTML
- Prettier: Buat bikin code kita rapi otomatis

Cara install extension:
1. Klik icon extension di sidebar (⚡)
2. Cari nama extension yang mau dipasang
3. Klik Install
4. Restart VS Code

#### Shortcut Penting VS Code 🎯
Nih, beberapa shortcut yang bakal bikin kamu lebih cepet ngoding:
- `Ctrl + S`: Save file
- `Ctrl + C` / `Ctrl + V`: Copy/Paste
- `Ctrl + Z`: Undo (batalin perubahan)
- `Ctrl + /`: Comment/uncomment code
- `Alt + ↑/↓`: Pindahin baris ke atas/bawah
- `Ctrl + B`: Show/hide sidebar

#### Keyboard Navigation Pro Tips 🎹
```
# Windows/Linux
Alt + Tab       : Switch applications
Win + ←/→       : Snap windows
Ctrl + L        : Focus address bar
Win + D         : Show desktop

# VS Code Essential
F1 or Ctrl+Shift+P : Command palette
Ctrl + P           : Quick file open
Ctrl + `          : Toggle terminal
```

#### Debugging in VS Code
```bash
# Debugging Shortcuts
F5              # Start debugging
F9              # Toggle breakpoint
F10             # Step over
F11             # Step into
Shift + F11     # Step out
```

### 2. Version Control dengan Git 🌳

#### Apa sih Git itu?
Git itu kayak "mesin waktu" buat code kita. Kita bisa:
- Nyimpen history perubahan code
- Balik ke versi sebelumnya kalo ada masalah
- Kerja bareng-bareng dalam satu project

#### Install Git
1. Download Git dari [git-scm.com](https://git-scm.com/)
2. Install seperti biasa
3. Buka terminal/command prompt
4. Ketik `git --version` untuk cek instalasi

#### Penjelasan Perintah Git
```bash
# Setting identitas - Wajib dilakukan pertama kali
git config --global user.name "Nama Kamu"    # Nama yang muncul di commit
git config --global user.email "email@kamu.com"    # Email yang terdaftar di GitHub

# Workflow dasar
git init        # Buat repository baru di folder project
git add .       # Stage semua perubahan (. artinya semua file)
git add file.html    # Stage file tertentu saja
git commit -m "pesan"    # Simpan perubahan dengan deskripsi
git status      # Cek status perubahan file
git log         # Lihat history commit

# Branch commands
git branch      # Lihat semua branch
git checkout -b nama-branch    # Buat & pindah ke branch baru
git merge nama-branch    # Gabungkan branch ke main
```

#### Conventional Commits
Tulis commit message yang jelas dengan format:
```bash
# Format: <type>: <description>
git commit -m "feat: add login form"     # New feature
git commit -m "fix: resolve login error"  # Bug fix
git commit -m "docs: update README"       # Documentation
git commit -m "style: format code"        # Formatting
```

#### Contoh Workflow Git Sehari-hari 🔄
```bash
# Mulai hari dengan update code terbaru
git pull origin main

# Kerja di feature baru
git checkout -b fitur-login

# Setelah coding...
git status                  # Cek file yang berubah
git add index.html         # Add file yang udah diubah
git commit -m "Tambah form login"  # Simpan perubahan
git push origin fitur-login  # Upload ke GitHub
```

### 3. GitHub: Rumah untuk Code Kita 🏠

GitHub itu sosmed-nya para programmer! Di sini kita bisa:
- Nyimpen code online
- Kolaborasi sama temen
- Pamer portfolio coding kita

#### Cara Mulai:
1. Buat akun di [GitHub](https://github.com)
2. Bikin repository baru
3. Upload project pertama kamu!

#### Hubungin Git Local ke GitHub
```bash
# Tambah remote repository
git remote add origin https://github.com/username/repo.git

# Upload code
git push -u origin main
```

### 4. Browser Developer Tools 🔍

#### Apa itu DevTools?
Browser DevTools itu alat sakti buat:
- Inspect element website
- Debug JavaScript
- Cek network requests
- Analisa performance

#### Cara Buka DevTools:
- Chrome/Edge: `F12` atau `Ctrl + Shift + I`
- Firefox: `F12` atau `Ctrl + Shift + I`
- Safari: `Command + Option + I`

#### Panel Penting di DevTools:
1. **Elements**: Buat liat struktur HTML & CSS
2. **Console**: Tempat debug JavaScript
3. **Network**: Monitor request ke server
4. **Sources**: Liat source code website

### 5. Development Workflow Best Practices 🔄

#### Code Organization
```bash
# 1. Buat branch untuk setiap fitur
git checkout -b feature/login

# 2. Commit sering dengan pesan jelas
git commit -m "feat: add login form HTML"
git commit -m "feat: add login validation"

# 3. Review code sendiri sebelum push
git diff main          # Cek perubahan
git status            # Pastikan file yang benar

# 4. Merge ke main
git checkout main
git pull origin main  # Update dulu
git merge feature/login
```

#### Testing & Quality
- Run live server untuk test
- Cek cross-browser compatibility
- Validate HTML di [W3C Validator](https://validator.w3.org/)
- Format code sebelum commit

### 6. Terminal/Command Line Basics 💻

#### Apa itu Terminal?
Terminal itu jendela buat ngasih perintah langsung ke komputer. Penting banget buat:
- Jalanin perintah Git
- Install packages/dependencies
- Navigasi folder project
- Jalanin server local

#### Perintah Terminal Dasar
```bash
# Navigasi
pwd           # Liat lokasi folder sekarang
ls            # Liat isi folder (dir di Windows)
cd folder     # Masuk ke folder
cd ..         # Keluar ke folder parent

# File & Folder
mkdir folder  # Bikin folder baru
touch file.txt # Bikin file baru (di Windows: echo.> file.txt)
rm file.txt   # Hapus file
rm -rf folder # Hapus folder (HATI-HATI!)

# Tambahan
clear         # Bersihin layar terminal
history      # Liat history perintah
```

#### Git Workflow Lengkap
```bash
# 1. Setup awal project
git init                    # Mulai tracking project
touch .gitignore           # Bikin file .gitignore
git add .                  # Add semua file ke staging
git commit -m "Initial commit"  # Commit pertama

# 2. Feature development
git checkout -b feature-name    # Bikin & pindah ke branch baru
# ... coding ...
git add file1.html file2.css   # Add file yang berubah
git commit -m "Add login form" # Commit dengan pesan jelas

# 3. Update & Merge
git checkout main        # Balik ke branch main
git pull origin main    # Update dari remote
git merge feature-name  # Gabungkan perubahan
git push origin main    # Upload ke GitHub
```

### Security Best Practices 🔒

#### Git Security
```bash
# Never commit sensitive data
echo ".env" >> .gitignore
echo "config.local.php" >> .gitignore

# Remove sensitive file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config.php" \
  --prune-empty --tag-name-filter cat -- --all
```

#### Development Security
- Use HTTPS for GitHub remote URLs
- Enable 2FA on GitHub account
- Keep Git and VS Code updated
- Use `.gitignore` for sensitive files

### Package Management Basics 📦

```bash
# Node.js & NPM
node -v                 # Check Node version
npm init                # Create package.json
npm install package     # Install package
npm run script-name     # Run npm script

# PHP & Composer
composer init          # Create composer.json
composer install      # Install dependencies
composer update       # Update packages
```

### 7. Workspace Organization 📁

#### Struktur Folder Project
```
project-name/
│
├── assets/          # Tempat file statis
│   ├── images/      # Gambar-gambar
│   ├── css/         # File CSS
│   └── js/          # File JavaScript
│
├── docs/            # Dokumentasi (opsional)
│
└── index.html       # Homepage
```

#### Best Practices
- Gunakan nama file yang jelas
- Pisahkan file sesuai jenisnya
- Jaga struktur folder tetap rapi
- Buat .gitignore untuk file pribadi

#### Contoh .gitignore
```
# File sistem
.DS_Store
Thumbs.db

# File editor
.vscode/
*.sublime-project
*.sublime-workspace

# File pribadi
config.php
.env
```

## 🎯 Mini Project: Setup Workspace Kamu

### Tugas:
1. Install VS Code
2. Pasang minimal 3 extension yang disebutin di atas
3. Install Git
4. Buat akun GitHub
5. Bikin repository pertama
6. Push file "hello.txt" ke GitHub

### Checklist Keberhasilan ✅
- [ ] VS Code terinstall dan bisa dibuka
- [ ] Extensions terpasang dan aktif
- [ ] Git terinstall (`git --version` berhasil)
- [ ] Punya akun GitHub
- [ ] Repository pertama sudah dibuat
- [ ] Berhasil push file ke GitHub

## 🎯 Mini Project yang Lebih Terstruktur

### Setup Professional Workspace
1. Buat struktur folder seperti contoh di atas
2. Initialize Git repository
3. Buat .gitignore file
4. Setup VS Code dengan extensions
5. Buat branch development
6. Push ke GitHub dengan README.md

## 💡 Tips Belajar

1. Jangan takut salah! Namanya juga belajar
2. Kalo bingung, Google adalah teman terbaik
3. Join komunitas programming di Discord/Telegram
4. Latihan terus-menerus sampai terbiasa
5. Catat perintah-perintah penting di notepad

## 📚 Resources Tambahan

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [VS Code Tips & Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [GitHub Guides](https://guides.github.com/)

## 🤔 FAQ (Pertanyaan yang Sering Ditanyakan)

1. **Q: Git sama GitHub itu sama ya?**
   A: Beda! Git itu sistemnya, GitHub itu websitenya. Analoginya: Git = WhatsApp, GitHub = Play Store

2. **Q: Harus install semua extension yang disebutin?**
   A: Yang wajib cuma Live Server dulu aja, yang lain bisa nyusul sesuai kebutuhan

3. **Q: Kalo error pas install gimana?**
   A: Tenang, screenshot error-nya terus tanya di grup ya! Senior-senior pasti bantu kok 😉

## 🎮 Latihan Interaktif

1. **Git Practice:**
   - Bikin folder project baru
   - Initialize Git repository
   - Bikin file index.html
   - Add dan commit file tersebut
   - Push ke GitHub

2. **VS Code Exploration:**
   - Coba fitur Live Server
   - Explore command palette (Ctrl/Cmd + Shift + P)
   - Coba shortcuts penting

## 🎯 Final Challenge

Bikin project dengan best practices:
```
my-project/
├── assets/
│   ├── css/
│   └── js/
├── .gitignore         # List semua file sensitif
├── package.json       # Dependencies management
├── README.md          # Project documentation
└── index.html
```

## 🛠️ Command Reference

```bash
# Project Setup
mkdir my-project && cd my-project
git init
npm init -y
touch .gitignore README.md

# Git Workflow
git checkout -b feature
git add .
git commit -m "feat: add new feature"
git push origin feature

# Security
git config --global credential.helper store
git config --global core.autocrlf true  # Windows only
```

## 🛠️ Quick Reference

### VS Code Shortcuts Paling Penting
```
Ctrl + S        : Save
Ctrl + /        : Comment/uncomment
Ctrl + Space    : Trigger suggestion
Alt + ↑/↓       : Move line up/down
F5              : Debug/run
```

### Git Commands Paling Sering Dipake
```
git status      : Cek status perubahan
git add .       : Stage semua perubahan
git commit -m "" : Commit dengan pesan
git push        : Upload ke remote
git pull        : Update dari remote
```

## 🛠️ Troubleshooting Guide

### VS Code Issues
1. **Extension Nggak Bisa Install?**
   - Cek koneksi internet
   - Restart VS Code
   - Update VS Code ke versi terbaru

2. **Live Server Error?**
   - Pastikan port 5500 nggak kepake
   - Coba run as administrator
   - Check firewall settings

### Git Problems
1. **'git' is not recognized?**
   - Restart terminal
   - Add Git ke system PATH
   - Install ulang Git

2. **Push Ditolak?**
   ```bash
   # Solusi 1: Pull dulu
   git pull origin main
   
   # Solusi 2: Force push (HATI-HATI!)
   git push -f origin main  # Gunakan sebagai pilihan terakhir!
   ```

## 🌟 Selamat!

Kalo udah sampai sini, selamat! Kamu udah siap mulai journey-mu sebagai web developer. Chapter selanjutnya kita akan mulai belajar HTML. Jangan lupa latihan ya! Remember: Practice makes perfect! 💪

---
📝 Note: Kalo ada yang masih bingung, jangan ragu buat tanya di grup ya! Kita semua mulai dari nol kok! 😊
