# Chapter 9: Final Project - Blog System! 🚀

Akhirnya kita sampai di chapter terakhir nih! Di sini kita bakal bikin project beneran yang gabungin semua yang udah kita pelajari. Kita bakal bikin Blog System yang keren dengan fitur lengkap. Siap-siap ya! 💪

## Daftar Isi 📑
- [Overview Project](#overview-project)
- [Learning Outcomes](#learning-outcomes)
- [Project Timeline](#project-timeline)
- [Project Setup](#project-setup)
- [User Management](#user-management)
- [Post Management](#post-management)
- [Categories & Tags](#categories--tags)
- [Comments System](#comments-system)
- [Dashboard Admin](#dashboard-admin)
- [Security Implementation](#security-implementation)
- [Testing & Deployment](#testing--deployment)

## Overview Project 🎯

### Fitur-Fitur Blog System
1. **User System**
   - Register & Login
   - Profile management
   - Role-based access (Admin & User)

2. **Blog Posts**
   - CRUD operations
   - Rich text editor
   - Image upload
   - Categories & tags

3. **Interaction**
   - Comments system
   - Like & share
   - Search functionality

4. **Admin Panel**
   - Dashboard statistics
   - User management
   - Content moderation

## Learning Outcomes 🎯

Setelah menyelesaikan project ini, kamu akan bisa:
1. Mengimplementasikan sistem blog dengan arsitektur MVC
2. Mengelola autentikasi dan autorisasi user
3. Menghandle upload dan manipulasi file
4. Membuat dashboard admin yang interaktif
5. Mengamankan aplikasi dari berbagai ancaman
6. Mengoptimasi performa aplikasi
7. Melakukan deployment ke production server

## Project Timeline 📅

### Week 1: Foundation
- Setup project structure
- Implementasi database
- Basic routing system
- User authentication

### Week 2: Core Features
- Post management system
- File upload handling
- Categories & tags
- Comment system

### Week 3: Admin Features
- Dashboard development
- User management
- Content moderation
- Statistics & reporting

### Week 4: Polish & Deploy
- Security implementation
- Performance optimization
- Testing & debugging
- Deployment preparation

## Project Setup 🛠️

### 1. Struktur Project
```
blog-system/
├── app/
│   ├── controllers/
│   │   ├── AuthController.php
│   │   ├── PostController.php
│   │   ├── CommentController.php
│   │   └── AdminController.php
│   ├── models/
│   │   ├── User.php
│   │   ├── Post.php
│   │   ├── Comment.php
│   │   └── Category.php
│   ├── views/
│   │   ├── auth/
│   │   │   ├── login.php
│   │   │   └── register.php
│   │   ├── posts/
│   │   │   ├── index.php
│   │   │   ├── create.php
│   │   │   └── view.php
│   │   ├── admin/
│   │   │   ├── dashboard.php
│   │   │   └── users.php
│   │   └── templates/
│   │       ├── header.php
│   │       └── footer.php
│   └── core/
│       ├── App.php
│       ├── Controller.php
│       ├── Database.php
│       └── Middleware.php
├── public/
│   ├── index.php
│   ├── css/
│   ├── js/
│   └── uploads/
└── config/
    ├── config.php
    └── routes.php
```

### Key Files Explained 📘

Each core file in our project has a specific responsibility:

### Core Components Explained 🔍

### 2. Database Structure

```sql
-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    content TEXT,
    image VARCHAR(255),
    status ENUM('draft', 'published') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);

-- Categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE
);

-- Post_categories table (Many-to-Many)
CREATE TABLE post_categories (
    post_id INT,
    category_id INT,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE
);

-- Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE SET NULL
);
```

### Code Documentation Standards 📚

Untuk memastikan code kita mudah dipahami, kita akan menggunakan standar dokumentasi berikut:

## User Management 👥

### 1. Model User
```php
// app/models/User.php
class User extends Model {
    private $table = 'users';
    
    // Register user baru
    public function register($data) {
        // Validasi input
        if (empty($data['username']) || empty($data['email'])) {
            throw new Exception("Username dan email wajib diisi!");
        }
        
        // Cek email unik
        if ($this->findByEmail($data['email'])) {
            throw new Exception("Email sudah terdaftar!");
        }
        
        // Hash password
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Insert ke database
        $sql = "INSERT INTO users (username, email, password) 
                VALUES (:username, :email, :password)";
                
        return $this->db->insert($sql, $data);
    }
    
    // Login user
    public function login($email, $password) {
        $user = $this->findByEmail($email);
        
        if ($user && password_verify($password, $user['password'])) {
            // Set session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_role'] = $user['role'];
            return true;
        }
        
        return false;
    }
}
```

### 2. Auth Controller
```php
// app/controllers/AuthController.php
class AuthController extends Controller {
    private $userModel;
    
    public function __construct() {
        $this->userModel = $this->model('User');
    }
    
    // Handle register
    public function register() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            try {
                $this->userModel->register($_POST);
                redirect('auth/login');
            } catch (Exception $e) {
                $this->view('auth/register', [
                    'error' => $e->getMessage()
                ]);
            }
        }
        
        $this->view('auth/register');
    }
    
    // Handle login
    public function login() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if ($this->userModel->login($_POST['email'], $_POST['password'])) {
                redirect('dashboard');
            } else {
                $this->view('auth/login', [
                    'error' => 'Email atau password salah!'
                ]);
            }
        }
        
        $this->view('auth/login');
    }
}
```

## Post Management 📝

### 1. Post Model
```php
// app/models/Post.php
class Post extends Model {
    private $table = 'posts';
    
    // Get semua post
    public function getAllPosts($page = 1, $limit = 10) {
        $offset = ($page - 1) * $limit;
        
        $sql = "SELECT p.*, u.username, 
                (SELECT COUNT(*) FROM comments WHERE post_id = p.id) as comments_count 
                FROM posts p 
                LEFT JOIN users u ON p.user_id = u.id 
                WHERE p.status = 'published' 
                ORDER BY p.created_at DESC 
                LIMIT :limit OFFSET :offset";
                
        return $this->db->query($sql, [
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
    
    // Create post baru
    public function create($data) {
        // Generate slug dari title
        $data['slug'] = $this->generateSlug($data['title']);
        
        // Upload image kalo ada
        if (!empty($_FILES['image']['name'])) {
            $data['image'] = $this->uploadImage($_FILES['image']);
        }
        
        // Insert ke database
        $sql = "INSERT INTO posts (title, slug, content, image, user_id) 
                VALUES (:title, :slug, :content, :image, :user_id)";
                
        return $this->db->insert($sql, $data);
    }
    
    // Helper: Generate slug
    private function generateSlug($title) {
        // Replace spasi dengan dash
        $slug = strtolower(str_replace(' ', '-', $title));
        // Remove karakter spesial
        $slug = preg_replace('/[^A-Za-z0-9\-]/', '', $slug);
        return $slug;
    }
    
    // Helper: Upload image
    private function uploadImage($file) {
        $targetDir = "uploads/posts/";
        $fileName = uniqid() . "-" . basename($file["name"]);
        $targetPath = $targetDir . $fileName;
        
        // Cek file type
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($file['type'], $allowedTypes)) {
            throw new Exception("Tipe file tidak diizinkan!");
        }
        
        // Upload file
        if (move_uploaded_file($file["tmp_name"], $targetPath)) {
            return $fileName;
        }
        
        throw new Exception("Gagal upload gambar!");
    }
}
```

## Comments System 💬

### 1. Comment Model
```php
// app/models/Comment.php
class Comment extends Model {
    // Add comment
    public function add($data) {
        // Validasi
        if (empty($data['content'])) {
            throw new Exception("Komentar tidak boleh kosong!");
        }
        
        // Set status default
        $data['status'] = 'pending';
        
        $sql = "INSERT INTO comments (post_id, user_id, content, status) 
                VALUES (:post_id, :user_id, :content, :status)";
                
        return $this->db->insert($sql, $data);
    }
    
    // Get comments by post
    public function getByPost($postId) {
        $sql = "SELECT c.*, u.username 
                FROM comments c 
                LEFT JOIN users u ON c.user_id = u.id 
                WHERE c.post_id = :post_id 
                AND c.status = 'approved' 
                ORDER BY c.created_at DESC";
                
        return $this->db->query($sql, ['post_id' => $postId]);
    }
}
```

## Dashboard Admin 📊

### 1. Admin Controller
```php
// app/controllers/AdminController.php
class AdminController extends Controller {
    // Check if admin
    public function __construct() {
        if ($_SESSION['user_role'] !== 'admin') {
            redirect('home');
        }
    }
    
    // Dashboard utama
    public function index() {
        $stats = [
            'total_users' => $this->getUserCount(),
            'total_posts' => $this->getPostCount(),
            'pending_comments' => $this->getPendingComments(),
            'recent_activity' => $this->getRecentActivity()
        ];
        
        $this->view('admin/dashboard', $stats);
    }
    
    // Manage users
    public function users() {
        $users = $this->model('User')->getAllUsers();
        $this->view('admin/users', ['users' => $users]);
    }
    
    // Manage comments
    public function comments() {
        $comments = $this->model('Comment')->getPendingComments();
        $this->view('admin/comments', ['comments' => $comments]);
    }
}
```

## Security Implementation 🔒

### 1. Middleware System
```php
// app/core/Middleware.php
class Middleware {
    // Auth check
    public static function auth() {
        if (!isset($_SESSION['user_id'])) {
            redirect('auth/login');
        }
    }
    
    // Admin check
    public static function admin() {
        self::auth();
        if ($_SESSION['user_role'] !== 'admin') {
            redirect('home');
        }
    }
    
    // CSRF protection
    public static function csrf() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!isset($_POST['csrf_token']) || 
                $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
                die('Invalid CSRF token!');
            }
        }
    }
}
```

### 2. Security Features
```php
// app/core/App.php
class App {
    public function __construct() {
        // Start session
        session_start();
        
        // Set security headers
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');
        header('X-Content-Type-Options: nosniff');
        
        // Generate CSRF token
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        
        $this->loadRoute();
    }
}
```

## Testing & Deployment 🚀

### 1. Testing Checklist
```php
// tests/checklist.php
$tests = [
    'User Management' => [
        'Register dengan data valid ✅',
        'Register dengan email duplikat ✅',
        'Login dengan kredensial benar ✅',
        'Login dengan password salah ✅'
    ],
    'Post Management' => [
        'Create post dengan image ✅',
        'Update post existing ✅',
        'Delete post (soft delete) ✅',
        'Pagination works ✅'
    ],
    'Comments' => [
        'Add comment sebagai user ✅',
        'Moderate comment sebagai admin ✅',
        'Delete comment ✅'
    ],
    'Security' => [
        'CSRF protection ✅',
        'XSS prevention ✅',
        'SQL injection prevention ✅',
        'File upload validation ✅'
    ]
];
```

### 2. Deployment Guide
```bash
# 1. Setup production server
# Update system
sudo apt update && sudo apt upgrade

# Install requirements
sudo apt install php mysql-server nginx

# 2. Configure web server
# Edit nginx config
sudo nano /etc/nginx/sites-available/blog-system

# Basic nginx config
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/blog-system/public;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
    }
}

# 3. Setup database
mysql -u root -p
CREATE DATABASE blog_system;

# 4. Deploy code
git clone repository-url
cd blog-system
composer install
php migrate.php
```

## Tips & Troubleshooting 💡

### 1. Common Issues
```php
// 1. Upload Error
if (!move_uploaded_file($file['tmp_name'], $target)) {
    // Check permissions
    error_log("Upload failed: " . error_get_last()['message']);
    throw new Exception("Gagal upload file!");
}

// 2. Database Connection
try {
    $db = new PDO($dsn, $user, $pass);
} catch (PDOException $e) {
    // Log error details
    error_log("DB Error: " . $e->getMessage());
    die("Koneksi database gagal!");
}
```

### 2. Performance Tips
```php
// 1. Cache queries
private function getCachedPosts() {
    $cache_key = "home_posts";
    $cached = apcu_fetch($cache_key);
    
    if ($cached === false) {
        $posts = $this->model->getAllPosts();
        apcu_store($cache_key, $posts, 3600); // 1 hour
        return $posts;
    }
    
    return $cached;
}

// 2. Optimize images
function optimizeImage($source, $quality = 80) {
    $info = getimagesize($source);
    
    if ($info['mime'] == 'image/jpeg') {
        $image = imagecreatefromjpeg($source);
    } elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source);
    }
    
    // Compress & save
    imagejpeg($image, $source, $quality);
}
```

## Exercise Time! 💪

### 1. Basic Features
- Bikin register & login ✅
- CRUD posts sederhana ✅
- Implement comments ✅

### 2. Advanced Features
- Categories & tags system ✅
- Rich text editor ✅
- Image gallery ✅
- User roles & permissions ✅

## 🌟 Selamat!

Wah, selamat ya! Kamu udah berhasil bikin blog system yang lengkap dengan MVC. Ini project yang keren banget buat portfolio kamu. Pastikan kamu paham setiap bagian codenya ya, karena ini bakal jadi fondasi buat karir programming kamu ke depannya!

Selanjutnya, kamu bisa:
1. Deploy ke hosting beneran
2. Tambahin fitur-fitur keren lainnya
3. Improve UI/UX-nya
4. Optimasi performance
5. Bikin dokumentasi yang rapih

Remember: Coding itu journey yang panjang, tapi menyenangkan! Keep learning dan happy coding! 💪

---
📝 Note: Jangan lupa backup database dan code kamu ya! Safety first! 😉
