# Chapter 7: Database & Backend Magic! 🎩

Udah belajar HTML, CSS, JavaScript, dan PHP ya? Nah, sekarang kita bakal belajar tentang database dan backend yang lebih advanced! Database itu ibarat gudang penyimpanan website kita. Kalo backend itu kayak "otak" yang ngatur semua data. Let's dive in! 🚀

## Daftar Isi 📑
- [Database Fundamentals](#database-fundamentals)
- [MySQL Deep Dive](#mysql-deep-dive)
- [Database Design](#database-design)
- [PHP & Database Integration](#php--database-integration)
- [Advanced CRUD Operations](#advanced-crud-operations)
- [Backend Security](#backend-security)
- [Project Practice](#project-practice)
- [Database Optimization & Best Practices](#database-optimization--best-practices)
- [Database Caching & Performance](#database-caching--performance)
- [Database Monitoring & Troubleshooting](#database-monitoring--troubleshooting)

## Database Fundamentals 📊

### 1. Apa itu Database?
Database itu kayak lemari arsip digital. Kita bisa:
- Nyimpen data dengan rapi
- Ngambil data dengan cepet
- Ngatur hubungan antar data
- Update & hapus data dengan aman

### 2. Kenapa Pake MySQL? 🤔
MySQL itu salah satu database yang paling populer karena:
- Gratis & Open Source
- Gampang dipelajari
- Performa bagus
- Support banyak di hosting
- Komunitas besar

### 3. Basic Database Concepts 🎯

```sql
-- 1. Database: Kumpulan tabel
CREATE DATABASE my_blog;

-- 2. Table: Tempat nyimpen data spesifik
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Kolom: Jenis data yang disimpan
/*
Tipe Data Umum:
- INT: Angka bulat
- VARCHAR: Text pendek
- TEXT: Text panjang
- DATE: Tanggal
- TIMESTAMP: Tanggal & waktu
*/

-- 4. Primary Key: ID unik tiap data
-- 5. Foreign Key: Penghubung antar tabel
```

## MySQL Deep Dive 🏊‍♂️

### 1. Basic SQL Commands

```sql
-- SELECT: Ambil data
SELECT * FROM users;               -- Ambil semua data
SELECT username, email FROM users; -- Ambil kolom tertentu

-- WHERE: Filter data
SELECT * FROM users 
WHERE age >= 18;                  -- Filter umur >= 18

-- ORDER BY: Urutkan data
SELECT * FROM users 
ORDER BY username ASC;            -- Urut dari A-Z

-- LIMIT: Batasi jumlah data
SELECT * FROM users 
LIMIT 10;                        -- Ambil 10 data pertama

-- INSERT: Tambah data
INSERT INTO users (username, email) 
VALUES ('budi', 'budi@email.com');

-- UPDATE: Update data
UPDATE users 
SET email = 'budi.new@email.com' 
WHERE username = 'budi';

-- DELETE: Hapus data
DELETE FROM users 
WHERE id = 1;
```

### 2. JOIN Operations 🤝

```sql
-- Contoh: Blog dengan users dan posts
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    content TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- INNER JOIN: Gabung data yang cocok
SELECT posts.title, users.username
FROM posts
INNER JOIN users ON posts.user_id = users.id;

-- LEFT JOIN: Ambil semua data kiri + yang cocok dari kanan
SELECT users.username, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;
```

## Database Design 📐

### 1. Normalization (Biar Data Rapi)

```sql
-- BAD DESIGN (Not Normalized) ❌
CREATE TABLE orders (
    id INT,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_address TEXT,
    product_name VARCHAR(100),
    product_price DECIMAL(10,2)
);

-- BETTER DESIGN (Normalized) ✅
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    address TEXT
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 2. Relationships (Hubungan Antar Tabel)

```sql
-- 1. One-to-One
-- Contoh: User - Profile
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50)
);

CREATE TABLE profiles (
    id INT PRIMARY KEY,
    user_id INT UNIQUE,
    avatar VARCHAR(255),
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 2. One-to-Many
-- Contoh: User - Posts
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    title VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Many-to-Many
-- Contoh: Posts - Tags
CREATE TABLE posts (
    id INT PRIMARY KEY,
    title VARCHAR(100)
);

CREATE TABLE tags (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE post_tags (
    post_id INT,
    tag_id INT,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

## PHP & Database Integration 🔌

### 1. Database Connection Pattern

```php
<?php
// config/database.php
class Database {
    private $host = "localhost";
    private $db_name = "my_blog";
    private $username = "root";
    private $password = "";
    private $conn;

    // Method koneksi
    public function connect() {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name}",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;
        } catch(PDOException $e) {
            echo "Koneksi error: " . $e->getMessage();
            return null;
        }
    }
}

// Cara pake:
$database = new Database();
$db = $database->connect();
```

### 2. Basic Database Operations

```php
<?php
// models/User.php
class User {
    private $conn;
    private $table = 'users';

    // Properties
    public $id;
    public $username;
    public $email;

    // Constructor
    public function __construct($db) {
        $this->conn = $db;
    }

    // Get semua users
    public function getAll() {
        $query = "SELECT * FROM {$this->table}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get user by ID
    public function getById() {
        $query = "SELECT * FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$this->id]);
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Set properties
        $this->username = $row['username'];
        $this->email = $row['email'];
    }

    // Create user baru
    public function create() {
        $query = "INSERT INTO {$this->table} 
                  (username, email) 
                  VALUES (?, ?)";
        
        $stmt = $this->conn->prepare($query);
        
        // Clean data
        $this->username = htmlspecialchars($this->username);
        $this->email = htmlspecialchars($this->email);
        
        return $stmt->execute([
            $this->username,
            $this->email
        ]);
    }
}
```

## Advanced CRUD Operations 🛠️

### 1. Search & Filter

```php
<?php
// Search users
public function search($keyword) {
    $query = "SELECT * FROM {$this->table}
              WHERE username LIKE ? OR email LIKE ?";
    
    $keyword = "%{$keyword}%";  // For LIKE query
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute([$keyword, $keyword]);
    
    return $stmt;
}

// Filter by criteria
public function filter($criteria = []) {
    $query = "SELECT * FROM {$this->table} WHERE 1";
    $params = [];
    
    if (!empty($criteria['role'])) {
        $query .= " AND role = ?";
        $params[] = $criteria['role'];
    }
    
    if (!empty($criteria['status'])) {
        $query .= " AND status = ?";
        $params[] = $criteria['status'];
    }
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute($params);
    
    return $stmt;
}
```

### 2. Pagination

```php
<?php
public function paginate($page = 1, $per_page = 10) {
    // Calculate offset
    $offset = ($page - 1) * $per_page;
    
    // Get total records
    $total_query = "SELECT COUNT(*) as total FROM {$this->table}";
    $total_stmt = $this->conn->query($total_query);
    $total = $total_stmt->fetch()['total'];
    
    // Get paginated data
    $query = "SELECT * FROM {$this->table}
              LIMIT {$per_page} OFFSET {$offset}";
    
    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    
    return [
        'data' => $stmt->fetchAll(),
        'total' => $total,
        'pages' => ceil($total / $per_page),
        'current_page' => $page
    ];
}

// Cara pake:
$user = new User($db);
$result = $user->paginate(2, 10);  // Page 2, 10 items per page

// Di view:
foreach ($result['data'] as $user) {
    echo $user['username'] . "<br>";
}

// Pagination links
for ($i = 1; $i <= $result['pages']; $i++) {
    echo "<a href='?page={$i}'>{$i}</a> ";
}
```

## Backend Security 🔒

### 1. SQL Injection Prevention

```php
<?php
// ❌ JANGAN GINI (Vulnerable)
$username = $_POST['username'];
$query = "SELECT * FROM users WHERE username = '$username'";

// ✅ YANG BENAR (Prepared Statement)
$query = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($query);
$stmt->execute([$username]);
```

### 2. Password Hashing

```php
<?php
class User {
    // Hash password sebelum simpan
    public function create() {
        $query = "INSERT INTO users (username, password) 
                  VALUES (?, ?)";
                  
        $hashed_password = password_hash(
            $this->password, 
            PASSWORD_DEFAULT
        );
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $this->username,
            $hashed_password
        ]);
    }
    
    // Verify password
    public function login($username, $password) {
        $query = "SELECT * FROM users WHERE username = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$username]);
        
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            return $user;
        }
        
        return false;
    }
}
```

### 3. Input Validation & Sanitization

```php
<?php
class Validator {
    public static function email($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }
    
    public static function string($str, $min = 1, $max = 255) {
        $len = strlen($str);
        return $len >= $min && $len <= $max;
    }
    
    public static function sanitize($data) {
        return htmlspecialchars(strip_tags(trim($data)));
    }
}

// Cara pake:
email = $_POST['email'];
if (!Validator::email($email)) {
    die("Email tidak valid!");
}

$name = Validator::sanitize($_POST['name']);
```

## Project Practice: Mini Blog System 📝

### 1. Database Structure

```sql
-- 1. Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Posts Table
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- 3. Comments Table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
);
```

### 2. Model Implementation

```php
<?php
// models/Post.php
class Post {
    private $conn;
    private $table = 'posts';
    
    // Properties
    public $id;
    public $user_id;
    public $title;
    public $content;
    public $status;
    
    public function __construct($db) {
        $this->conn = $db;
    }
    
    // Get posts with user info
    public function getAllPosts() {
        $query = "SELECT 
                    p.*, 
                    u.username,
                    (SELECT COUNT(*) FROM comments WHERE post_id = p.id) 
                        as comment_count
                  FROM 
                    {$this->table} p
                    LEFT JOIN users u ON p.user_id = u.id
                  WHERE 
                    p.status = 'published'
                  ORDER BY 
                    p.created_at DESC";
                    
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt;
    }
    
    // Create post
    public function create() {
        $query = "INSERT INTO {$this->table} 
                  (user_id, title, content, status) 
                  VALUES (?, ?, ?, ?)";
                  
        $stmt = $this->conn->prepare($query);
        
        // Clean data
        $this->title = Validator::sanitize($this->title);
        $this->content = Validator::sanitize($this->content);
        
        return $stmt->execute([
            $this->user_id,
            $this->title,
            $this->content,
            $this->status
        ]);
    }
}
```

### 3. Controller Example

```php
<?php
// controllers/PostController.php
class PostController {
    private $db;
    private $post;
    
    public function __construct() {
        $database = new Database();
        $this->db = $database->connect();
        $this->post = new Post($this->db);
    }
    
    // Show all posts
    public function index() {
        try {
            $result = $this->post->getAllPosts();
            $posts = $result->fetchAll(PDO::FETCH_ASSOC);
            
            // Load view
            require 'views/posts/index.php';
        } catch (PDOException $e) {
            die("Error: " . $e->getMessage());
        }
    }
    
    // Create new post
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Validate input
            if (empty($_POST['title']) || empty($_POST['content'])) {
                die("Title dan content wajib diisi!");
            }
            
            // Set post properties
            $this->post->user_id = $_SESSION['user_id'];
            $this->post->title = $_POST['title'];
            $this->post->content = $_POST['content'];
            $this->post->status = 'published';
            
            if ($this->post->create()) {
                header("Location: posts.php");
                exit();
            } else {
                die("Something went wrong!");
            }
        }
        
        // Show create form
        require 'views/posts/create.php';
    }
}
```

## 🎯 Mini Challenge: Comment System

Coba bikin sistem komentar dengan fitur:
1. User bisa comment di post
2. Tampilkan jumlah comment
3. Nested comments (optional)
4. Edit & delete comments

### Contoh Implementation:

```php
<?php
// models/Comment.php
class Comment {
    private $conn;
    private $table = 'comments';
    
    public function getPostComments($post_id) {
        $query = "SELECT 
                    c.*,
                    u.username
                  FROM 
                    comments c
                    LEFT JOIN users u ON c.user_id = u.id
                  WHERE 
                    c.post_id = ?
                  ORDER BY 
                    c.created_at DESC";
                    
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$post_id]);
        
        return $stmt;
    }
    
    public function create() {
        $query = "INSERT INTO comments 
                  (post_id, user_id, content) 
                  VALUES (?, ?, ?)";
                  
        // Clean & validate
        $this->content = Validator::sanitize($this->content);
        
        if (strlen($this->content) < 1) {
            return false;
        }
        
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $this->post_id,
            $this->user_id,
            $this->content
        ]);
    }
}
```

## Database Optimization & Best Practices 🚀

### 1. Database Indexes

```sql
-- Create an index on a column
CREATE INDEX idx_username ON users(username);

-- Create a unique index
CREATE UNIQUE INDEX idx_email ON users(email);
```

### 2. Performance Optimization

- **Use Indexes**: Index columns that are frequently used in WHERE clauses.
- **Optimize Queries**: Avoid SELECT * and fetch only required columns.
- **Use Joins Efficiently**: Ensure joined columns are indexed.
- **Limit Data**: Use LIMIT to fetch only necessary rows.

### 3. Error Handling Best Practices

```php
<?php
try {
    // Code that may throw an exception
    $stmt->execute();
} catch (PDOException $e) {
    // Log the error (do not display it to the user)
    error_log($e->getMessage());
    // Show a user-friendly message
    die("Sorry, there was a system error!");
}
```

### 4. Database Backup & Maintenance

- **Regular Backups**: Schedule regular backups of your database.
- **Optimize Tables**: Use OPTIMIZE TABLE to defragment tables.
- **Monitor Performance**: Regularly check for slow queries and optimize them.
- **Security Updates**: Keep your database software up to date with security patches.

## Database Transactions & Error Handling 🔒

### 1. Database Transactions

```php
<?php
try {
    // Start transaction
    $conn->beginTransaction();
    
    // Execute multiple queries
    $conn->exec("INSERT INTO users (username, email) VALUES ('john', 'john@example.com')");
    $conn->exec("INSERT INTO profiles (user_id, bio) VALUES (LAST_INSERT_ID(), 'Bio of John')");
    
    // Commit transaction
    $conn->commit();
} catch (PDOException $e) {
    // Rollback transaction if something went wrong
    $conn->rollBack();
    error_log($e->getMessage());
    die("Transaction failed!");
}
```

## Database Caching & Performance 🚀

### 1. Basic Query Cache

```sql
-- Enable query cache
SET GLOBAL query_cache_size = 1048576; -- 1MB
SET GLOBAL query_cache_type = 1;

-- Check cache status
SHOW VARIABLES LIKE 'query_cache%';
```

### 2. Memcached Integration

```php
<?php
// Connect to Memcached
$memcached = new Memcached();
$memcached->addServer('localhost', 11211);

// Set cache
$memcached->set('key', 'value', 60); // Cache for 60 seconds

// Get cache
$value = $memcached->get('key');
if ($value) {
    echo "Cache hit: " . $value;
} else {
    echo "Cache miss";
}
```

## Database Monitoring & Troubleshooting 🔍

### 1. Query Performance Analysis

```sql
-- Check slow queries
SHOW GLOBAL STATUS LIKE 'Slow_queries';

-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2; -- Log queries longer than 2 seconds

-- View slow query log
SHOW VARIABLES LIKE 'slow_query_log_file';
```

### 2. Monitoring Tools

- **MySQL Workbench**: Provides a visual tool for database design, development, and administration.
- **phpMyAdmin**: A web-based tool for managing MySQL databases.
- **Percona Monitoring and Management (PMM)**: An open-source platform for managing and monitoring MySQL performance.

### 3. Troubleshooting Common Issues

- **Connection Issues**: Check database server status, network connectivity, and user permissions.
- **Slow Queries**: Use EXPLAIN to analyze query execution plans and optimize indexes.
- **Data Corruption**: Regularly back up your database and use tools like `mysqlcheck` to repair tables.

## 💡 Tips & Tricks

1. **Selalu Pake Prepared Statements**
```php
// ❌ JANGAN
$query = "SELECT * FROM users WHERE id = $id";

// ✅ YANG BENER
$query = "SELECT * FROM users WHERE id = ?";
$stmt->execute([$id]);
```

2. **Handle Errors dengan Baik**
```php
try {
    // Code yang mungkin error
    $stmt->execute();
} catch (PDOException $e) {
    // Log error (jangan tampilkan ke user!)
    error_log($e->getMessage());
    // Kasih pesan user-friendly
    die("Maaf, ada kesalahan sistem!");
}
```

3. **Validasi Input Selalu**
```php
// Validasi sebelum insert/update
if (empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    die("Email tidak valid!");
}
```

## 🎯 Exercise!

1. **Bikin CRUD sederhana**
   - Table products
   - Form input/edit
   - List view dengan filter & search
   - Delete confirmation

2. **User Management**
   - Registration
   - Login/Logout
   - Password reset
   - Profile update

3. **Implement Security**
   - Form validation
   - CSRF protection
   - Input sanitization
   - Error handling

## 🌟 Selamat!

Kalo udah sampe sini, selamat! Kamu udah belajar dasar-dasar database dan backend development. Selanjutnya, kita bakal belajar tentang MVC Architecture yang bakal bikin code kamu lebih terstruktur! Keep coding! 💪

---
📝 Note: Database itu jantungnya aplikasi web. Jadi pastikan kamu paham betul konsep-konsepnya ya! Kalo masih bingung, tanya aja! 😉

