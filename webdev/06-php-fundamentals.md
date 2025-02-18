# Chapter 6: PHP Fundamentals 🐘

Udah belajar HTML, CSS, sama JavaScript kan? Nah sekarang kita masuk ke dunia backend nih! Kita bakal belajar PHP, bahasa yang powerful buat bikin website dinamis. Let's go! 🚀

## Daftar Isi 📑
- [Setup Environment](#setup-environment)
- [Sintaks Dasar PHP](#sintaks-dasar-php)
- [Variables & Data Types](#variables--data-types)
- [Control Structures](#control-structures)
- [Functions](#functions)
- [Form Handling](#form-handling)
- [Database MySQL](#database-mysql)
- [Security](#security)
- [Debugging Tips](#debugging-tips)

## Setup Environment 🛠️

### 1. Install XAMPP
XAMPP itu kayak Swiss Army Knife buat web developer. Isinya:
- Apache (Web Server)
- MySQL (Database)
- PHP (Bahasa Backend)
- phpMyAdmin (Tool Database)

#### Cara Install:
1. Download XAMPP dari [apachefriends.org](https://www.apachefriends.org/)
2. Install seperti biasa
3. Start Apache & MySQL
4. Test dengan buka `http://localhost`

### 2. Struktur Project PHP
```
htdocs/
├── my-project/
│   ├── index.php
│   ├── about.php
│   ├── includes/
│   │   ├── header.php
│   │   ├── footer.php
│   │   └── config.php
│   └── assets/
│       ├── css/
│       ├── js/
│       └── images/
```

## Sintaks Dasar PHP 📝

### Hello World!
```php
<?php
// File: index.php
echo "Hello World!";  // Ini bakal tampil di browser

// Bisa juga gini
?>
<h1><?php echo "Hello World!"; ?></h1>
```

### PHP di HTML
```php
<!DOCTYPE html>
<html>
<head>
    <title>Web PHP Pertamaku</title>
</head>
<body>
    <?php
    $nama = "Budi";
    echo "<h1>Halo $nama!</h1>";
    ?>
    
    <!-- Atau bisa gini -->
    <h1>Halo <?php echo $nama; ?>!</h1>
</body>
</html>
```

## Variables & Data Types 📊

### 1. Variables
```php
<?php
// Variable di PHP pake $ di depannya
$nama = "Budi";
$umur = 20;
$tinggi = 170.5;
$isStudent = true;

// Nge-print variable
echo $nama;     // Output: Budi
echo $umur;     // Output: 20

// Concatenation (Gabungin String)
echo "Nama saya " . $nama;     // Pake titik (.)
echo "Saya berumur $umur";     // Atau langsung di string

// Variable Scope
$global = "Bisa diakses dimana aja";

function testScope() {
    $local = "Cuma bisa diakses di function";
    global $global;  // Pake keyword global
    echo $global;    // Bisa akses
}
```

### 2. Data Types
```php
<?php
// String - Text
$nama = "Budi";
$alamat = 'Jakarta';  // Bisa pake single atau double quote

// Integer - Bilangan bulat
$umur = 20;
$tahun = 2024;

// Float - Bilangan desimal
$tinggi = 170.5;
$berat = 65.8;

// Boolean - true/false
$isStudent = true;
$isMarried = false;

// Array - Kumpulan data
$hobi = ["Coding", "Gaming", "Reading"];
$biodata = [
    "nama" => "Budi",
    "umur" => 20,
    "kota" => "Jakarta"
];

// Null - Kosong
$data = null;

// Cek tipe data
var_dump($nama);     // string(4) "Budi"
var_dump($umur);     // int(20)
var_dump($hobi);     // array(3) { ... }
```

## Control Structures 🔄

### 1. If-Else Statement
```php
<?php
$umur = 20;

// Basic if
if ($umur >= 17) {
    echo "Boleh bikin SIM";
}

// If-else
if ($umur >= 17) {
    echo "Boleh bikin SIM";
} else {
    echo "Belum boleh bikin SIM";
}

// If-elseif-else
$nilai = 85;

if ($nilai >= 90) {
    echo "Nilai A";
} elseif ($nilai >= 80) {
    echo "Nilai B";
} elseif ($nilai >= 70) {
    echo "Nilai C";
} else {
    echo "Nilai D";
}

// Ternary Operator (If-else singkat)
$status = ($umur >= 17) ? "Dewasa" : "Anak-anak";
```

### 2. Loops (Perulangan)
```php
<?php
// For Loop
for ($i = 1; $i <= 5; $i++) {
    echo "Perulangan ke-$i <br>";
}

// While Loop
$count = 1;
while ($count <= 5) {
    echo "Count: $count <br>";
    $count++;
}

// Do-While Loop
$i = 1;
do {
    echo "Angka: $i <br>";
    $i++;
} while ($i <= 5);

// Foreach (Khusus untuk Array)
$buah = ["Apel", "Jeruk", "Mangga"];

foreach ($buah as $item) {
    echo "$item <br>";
}

// Foreach dengan key => value
$biodata = [
    "nama" => "Budi",
    "umur" => 20,
    "kota" => "Jakarta"
];

foreach ($biodata as $key => $value) {
    echo "$key: $value <br>";
}
```

### 3. Switch Case
```php
<?php
$hari = "Senin";

switch ($hari) {
    case "Senin":
        echo "Hari kerja 😢";
        break;
    case "Sabtu":
    case "Minggu":
        echo "Weekend! 🎉";
        break;
    default:
        echo "Hari biasa";
}
```

## Functions 🎯

### 1. Basic Functions
```php
<?php
// Function sederhana
function sayHello() {
    echo "Hello World!";
}

// Function dengan parameter
function greet($nama) {
    echo "Halo $nama!";
}

// Function dengan return value
function tambah($a, $b) {
    return $a + $b;
}

// Function dengan default parameter
function discount($harga, $persen = 10) {
    return $harga - ($harga * $persen / 100);
}

// Cara manggil function
sayHello();              // Output: Hello World!
greet("Budi");          // Output: Halo Budi!
$hasil = tambah(5, 3);   // $hasil = 8
$harga = discount(1000); // $harga = 900
```

### 2. Built-in Functions
```php
<?php
// String Functions
$text = "Hello World";
echo strlen($text);          // Panjang string: 11
echo strtoupper($text);      // HELLO WORLD
echo strtolower($text);      // hello world
echo str_replace("World", "PHP", $text);  // Hello PHP

// Array Functions
$buah = ["Apel", "Jeruk", "Mangga"];
echo count($buah);           // Jumlah item: 3
sort($buah);                // Sort ascending
print_r($buah);             // Print array
array_push($buah, "Anggur"); // Tambah item

// Date & Time
echo date("Y-m-d");         // Format: 2024-01-20
echo date("H:i:s");         // Format: 14:30:45
echo time();                // Unix timestamp

// Math Functions
echo rand(1, 10);           // Random number 1-10
echo max(1, 5, 3);          // Nilai terbesar: 5
echo min(1, 5, 3);          // Nilai terkecil: 1
echo round(3.7);            // Pembulatan: 4
```

## Form Handling 📝

### 1. Basic Form
```php
<!-- form.php -->
<form action="process.php" method="POST">
    <label for="nama">Nama:</label>
    <input type="text" name="nama" id="nama">
    
    <label for="email">Email:</label>
    <input type="email" name="email" id="email">
    
    <button type="submit">Kirim</button>
</form>

<!-- process.php -->
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST["nama"];
    $email = $_POST["email"];
    
    echo "Halo $nama! Email kamu $email";
}
```

### 2. Form Validation
```php
<?php
// Validasi Form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST["nama"];
    $email = $_POST["email"];
    $errors = [];
    
    // Cek nama
    if (empty($nama)) {
        $errors[] = "Nama wajib diisi!";
    }
    
    // Cek email
    if (empty($email)) {
        $errors[] = "Email wajib diisi!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Format email tidak valid!";
    }
    
    // Tampilkan error atau proses data
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<p style='color: red'>$error</p>";
        }
    } else {
        echo "Data valid! Proses...";
    }
}
```

### 3. File Upload
```php
<!-- upload.php -->
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <input type="file" name="foto">
    <button type="submit">Upload</button>
</form>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $file = $_FILES["foto"];
    
    // Cek error
    if ($file["error"] === 0) {
        $allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        
        if (in_array($file["type"], $allowedTypes)) {
            // Generate unique filename
            $filename = uniqid() . "-" . $file["name"];
            
            // Pindahkan file
            move_uploaded_file(
                $file["tmp_name"],
                "uploads/" . $filename
            );
            
            echo "File berhasil diupload!";
        } else {
            echo "Tipe file tidak diizinkan!";
        }
    } else {
        echo "Error upload file!";
    }
}
```

## Database MySQL 🗄️

### 1. Koneksi Database
```php
<?php
// config.php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "my_database";

try {
    $conn = new PDO(
        "mysql:host=$host;dbname=$db",
        $user,
        $pass
    );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
```

### 2. CRUD Operations
```php
<?php
// Create (Insert)
function addUser($nama, $email) {
    global $conn;
    $sql = "INSERT INTO users (nama, email) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    return $stmt->execute([$nama, $email]);
}

// Read (Select)
function getUsers() {
    global $conn;
    $sql = "SELECT * FROM users";
    $stmt = $conn->query($sql);
    return $stmt->fetchAll();
}

// Update
function updateUser($id, $nama, $email) {
    global $conn;
    $sql = "UPDATE users SET nama = ?, email = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    return $stmt->execute([$nama, $email, $id]);
}

// Delete
function deleteUser($id) {
    global $conn;
    $sql = "DELETE FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    return $stmt->execute([$id]);
}

// Contoh penggunaan:
// Create
addUser("Budi", "budi@email.com");

// Read
$users = getUsers();
foreach ($users as $user) {
    echo $user['nama'] . " - " . $user['email'] . "<br>";
}

// Update
updateUser(1, "Budi Update", "budi.update@email.com");

// Delete
deleteUser(1);
```

## Security 🔒

### 1. SQL Injection Prevention
```php
<?php
// ❌ JANGAN GINI (Tidak aman)
$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = $id";

// ✅ YANG BENAR (Pake Prepared Statement)
$id = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);
```

### 2. XSS Prevention
```php
<?php
// ❌ JANGAN GINI (Rentan XSS)
echo $_POST['message'];

// ✅ YANG BENAR (Escape output)
echo htmlspecialchars($_POST['message']);
```

### 3. Password Hashing
```php
<?php
// ❌ JANGAN GINI (Plain text password)
$password = $_POST['password'];

// ✅ YANG BENAR (Hash password)
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Verify password
if (password_verify($input_password, $hashed_password)) {
    echo "Password correct!";
}
```

### 4. CSRF Protection
```php
<?php
session_start();

// Generate CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

?>

<form method="POST">
    <input type="hidden" 
           name="csrf_token" 
           value="<?php echo $_SESSION['csrf_token']; ?>">
    <!-- form fields -->
</form>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
        die('CSRF token validation failed');
    }
    // Process form
}
```

## 🎯 Mini Project: Simple CRUD Application

### Project Structure
```
crud-app/
├── config/
│   └── database.php
├── includes/
│   ├── header.php
│   └── footer.php
├── assets/
│   └── css/
│       └── style.css
├── add.php
├── edit.php
├── delete.php
└── index.php
```

### Database Setup
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Complete CRUD Example

```php
<?php
// config/database.php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "crud_app";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// index.php - Read
<?php
require_once 'config/database.php';
include 'includes/header.php';

$stmt = $conn->query("SELECT * FROM users");
$users = $stmt->fetchAll();
?>

<div class="container">
    <h1>Daftar User</h1>
    <a href="add.php" class="btn btn-primary">Tambah User</a>
    
    <table class="table">
        <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Action</th>
        </tr>
        <?php foreach($users as $user): ?>
        <tr>
            <td><?= htmlspecialchars($user['nama']) ?></td>
            <td><?= htmlspecialchars($user['email']) ?></td>
            <td>
                <a href="edit.php?id=<?= $user['id'] ?>">Edit</a>
                <a href="delete.php?id=<?= $user['id'] ?>" 
                   onclick="return confirm('Yakin hapus?')">
                    Delete
                </a>
            </td>
        </tr>
        <?php endforeach; ?>
    </table>
</div>

<?php include 'includes/footer.php'; ?>

// add.php - Create
<?php
require_once 'config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = $_POST['nama'];
    $email = $_POST['email'];
    
    // Validasi
    $errors = [];
    
    if (empty($nama)) {
        $errors[] = "Nama wajib diisi";
    }
    
    if (empty($email)) {
        $errors[] = "Email wajib diisi";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Format email tidak valid";
    }
    
    // Jika tidak ada error, simpan data
    if (empty($errors)) {
        $sql = "INSERT INTO users (nama, email) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        
        if ($stmt->execute([$nama, $email])) {
            header("Location: index.php");
            exit;
        } else {
            $errors[] = "Gagal menyimpan data";
        }
    }
}
```

## Debugging Tips 🐞

### Error Handling & Logging
```

## Best Practices & Tips 💡

### 1. Code Organization
```php
// Config constants
define('BASE_URL', 'http://localhost/my-app');
define('UPLOAD_DIR', __DIR__ . '/uploads');

// Include files
require_once 'config/database.php';
include 'includes/header.php';

// Functions in separate file
// functions.php
function sanitizeInput($data) {
    return htmlspecialchars(trim($data));
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}
```

### 2. Error Handling
```php
<?php
// Custom error handler
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    echo "<b>Error:</b> [$errno] $errstr<br>";
    echo "Line $errline in $errfile";
}

set_error_handler("customErrorHandler");

// Try-catch untuk exception
try {
    // Kode yang mungkin error
    throw new Exception("Something went wrong!");
} catch (Exception $e) {
    // Handle error
    error_log($e->getMessage());
    echo "Maaf, terjadi kesalahan. Coba lagi nanti.";
}
```

## 🎯 Latihan!

1. **Form Registration**
   - Bikin form pendaftaran
   - Validasi input
   - Simpan ke database
   - Upload foto profil

2. **Login System**
   - Form login
   - Password hashing
   - Session handling
   - Remember me feature

3. **Blog System**
   - CRUD artikel
   - Upload gambar
   - Rich text editor
   - Kategori artikel

## 🌟 Selamat!

Kalo udah sampe sini, selamat! Kamu udah paham dasar-dasar PHP. Selanjutnya, latihan terus dan bikin project yang lebih kompleks ya! Remember: Practice makes perfect! 💪

---
📝 Note: Jangan lupa selalu validasi input dan jaga keamanan website kamu ya! Security first! 😉
