# Chapter 8: MVC Architecture - Bikin Kode Lebih Rapi! 🏗️

Udah belajar bikin website dari awal sampai bisa handle database kan? Nah, sekarang kita bakal belajar bikin kode yang lebih terstruktur pake MVC. Ini bakal bikin project kamu lebih rapi dan gampang dikelola! 🚀

## Daftar Isi 📑
- [Apa itu MVC?](#apa-itu-mvc)
- [Kenapa Pake MVC?](#kenapa-pake-mvc)
- [Struktur Project MVC](#struktur-project-mvc)
- [Model - Si Pengatur Data](#model---si-pengatur-data)
- [View - Si Tukang Tampil](#view---si-tukang-tampil)
- [Controller - Si Pengatur Lalu Lintas](#controller---si-pengatur-lalu-lintas)
- [Routing - Pengatur Jalan](#routing---pengatur-jalan)
- [Mini Project MVC](#mini-project-mvc)
- [Tips & Tricks](#tips--tricks)

## Apa itu MVC? 🤔

MVC itu singkatan dari Model-View-Controller. Gampangnya, MVC itu kayak pembagian tugas di restoran:
- **Model**: Koki (yang ngurus data/masakan)
- **View**: Platting/penyajian (yang bikin tampilan cantik)
- **Controller**: Kepala restoran (yang ngatur semua proses)

### Cara Kerja MVC
```php
// 1. User request masuk
example.com/posts/view/1

// 2. Router arahkan ke Controller yang tepat
PostsController->view(1)

// 3. Controller minta data ke Model
$post = Post::find(1);

// 4. Model ambil data dari database
SELECT * FROM posts WHERE id = 1;

// 5. Controller kirim data ke View
$this->view('posts/view', ['post' => $post]);

// 6. View tampilkan hasil ke user
<h1><?= $post->title ?></h1>
```

## Kenapa Pake MVC? 🎯

1. **Kode Lebih Rapi**
   - File terpisah sesuai fungsi
   - Gampang dicari kalo ada error
   - Lebih mudah diupdate

2. **Kerja Tim Lebih Enak**
   - Frontend dev fokus di View
   - Backend dev fokus di Model & Controller
   - Nggak tabrakan kerjanya

3. **Maintenance Lebih Gampang**
   - Ubah tampilan tanpa ganggu logic
   - Update database tanpa ganggu tampilan
   - Testing lebih mudah

## Struktur Project MVC 📁

### Basic Structure
```
project/
├── app/                    # Folder utama aplikasi
│   ├── controllers/       # Tempat Controller
│   │   ├── HomeController.php
│   │   └── UserController.php
│   ├── models/           # Tempat Model
│   │   ├── User.php
│   │   └── Post.php
│   ├── views/            # Tempat View
│   │   ├── home/
│   │   │   └── index.php
│   │   └── users/
│   │       ├── login.php
│   │       └── register.php
│   └── core/             # Komponen inti
│       ├── App.php      # Router & aplikasi utama
│       ├── Controller.php
│       ├── Database.php
│       └── Model.php
├── public/               # Folder public
│   ├── index.php        # Entry point
│   ├── css/
│   ├── js/
│   └── images/
└── config/              # Konfigurasi
    └── config.php       # Database & setting
```

### Cara Setup Project MVC

```php
// 1. Bikin struktur folder dulu
mkdir -p app/{controllers,models,views,core}
mkdir -p public/{css,js,images}
mkdir config

// 2. Bikin file utama
touch public/index.php
touch app/core/{App.php,Controller.php,Database.php,Model.php}
touch config/config.php
```

## Model - Si Pengatur Data 📊

Model itu yang ngurusin semua tentang data. Dari ambil data, simpen data, sampe update data.

### Contoh Basic Model
```php
// app/models/User.php
class User {
    private $db;
    
    public function __construct() {
        // Koneksi database
        $this->db = new Database;
    }
    
    // Ambil semua user
    public function getAllUsers() {
        $this->db->query("SELECT * FROM users");
        return $this->db->resultAll();
    }
    
    // Ambil user by ID
    public function getUserById($id) {
        $this->db->query("SELECT * FROM users WHERE id = :id");
        $this->db->bind(':id', $id);
        return $this->db->resultSingle();
    }
    
    // Tambah user baru
    public function addUser($data) {
        // Basic validation
        if (empty($data['username']) || empty($data['email'])) {
            return false;
        }
        
        $this->db->query("INSERT INTO users (username, email) 
                         VALUES (:username, :email)");
                         
        $this->db->bind(':username', $data['username']);
        $this->db->bind(':email', $data['email']);
        
        return $this->db->execute();
    }
}
```

### Model Best Practices
```php
// ✅ BAGUS: Validasi di Model
class Post extends Model {
    public function create($data) {
        // Validasi dulu
        if (empty($data['title'])) {
            throw new Exception("Judul wajib diisi!");
        }
        
        // Sanitize input
        $data['title'] = htmlspecialchars($data['title']);
        
        // Simpan ke database
        return $this->db->insert('posts', $data);
    }
}

// ❌ KURANG BAGUS: Logic bisnis di Controller
class PostController {
    public function create() {
        // Validasi disini (harusnya di model)
        if (empty($_POST['title'])) {
            die("Judul wajib diisi!");
        }
        
        $this->model->save($_POST);
    }
}
```

## View - Si Tukang Tampil 🎨

View itu yang ngurusin tampilan ke user. Inget ya: View CUMA urusin tampilan, nggak boleh ada logic rumit di sini!

### Basic View Structure
```php
// app/views/users/index.php
<!DOCTYPE html>
<html>
<head>
    <title><?= $data['title'] ?></title>
</head>
<body>
    <h1>Daftar User</h1>
    
    <table>
        <tr>
            <th>Username</th>
            <th>Email</th>
        </tr>
        <?php foreach($data['users'] as $user): ?>
        <tr>
            <td><?= $user->username ?></td>
            <td><?= $user->email ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
```

### View dengan Layout
```php
// app/views/templates/header.php
<!DOCTYPE html>
<html>
<head>
    <title><?= $data['title'] ?></title>
    <link rel="stylesheet" href="<?= BASEURL ?>/css/style.css">
</head>
<body>
    <nav>
        <a href="<?= BASEURL ?>">Home</a>
        <a href="<?= BASEURL ?>/users">Users</a>
    </nav>

// app/views/templates/footer.php
    <footer>
        <p>&copy; 2024 My MVC App</p>
    </footer>
    <script src="<?= BASEURL ?>/js/script.js"></script>
</body>
</html>

// app/views/users/index.php
<?php require 'templates/header.php'; ?>

<div class="container">
    <h1>Daftar User</h1>
    <!-- Content here -->
</div>

<?php require 'templates/footer.php'; ?>
```

## Controller - Si Pengatur Lalu Lintas 🚦

Controller itu yang ngatur flow aplikasi. Dia yang nentuin data apa yang diambil dari Model dan View mana yang ditampilin.

### Basic Controller
```php
// app/controllers/UserController.php
class UserController extends Controller {
    private $userModel;
    
    public function __construct() {
        // Load model
        $this->userModel = $this->model('User');
    }
    
    // Method default
    public function index() {
        $data = [
            'title' => 'Daftar User',
            'users' => $this->userModel->getAllUsers()
        ];
        
        $this->view('users/index', $data);
    }
    
    // Tampilkan form tambah
    public function add() {
        $this->view('users/add');
    }
    
    // Proses tambah user
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Ambil data dari form
            $data = [
                'username' => $_POST['username'],
                'email' => $_POST['email']
            ];
            
            // Coba tambah user
            if ($this->userModel->addUser($data)) {
                // Redirect ke list user
                header('Location: ' . BASEURL . '/users');
                exit;
            } else {
                // Kembali ke form dengan error
                $data['error'] = 'Gagal menambah user!';
                $this->view('users/add', $data);
            }
        }
    }
}
```

### Controller Best Practices
```php
// ✅ BAGUS: Controller singkat dan jelas
class PostController extends Controller {
    public function show($id) {
        $post = $this->model->getPost($id);
        $this->view('posts/show', ['post' => $post]);
    }
}

// ❌ KURANG BAGUS: Controller terlalu kompleks
class PostController extends Controller {
    public function show($id) {
        // Logic database (harusnya di model)
        $db = new Database;
        $db->query("SELECT * FROM posts WHERE id = :id");
        $db->bind(':id', $id);
        $post = $db->resultSingle();
        
        // HTML generation (harusnya di view)
        echo "<h1>" . $post->title . "</h1>";
        echo "<p>" . $post->content . "</p>";
    }
}
```

## Routing - Pengatur Jalan 🛣️

Router itu yang nentuin Controller & method mana yang dipanggil berdasarkan URL yang diminta.

### Basic Router
```php
// app/core/App.php
class App {
    protected $controller = 'Home';
    protected $method = 'index';
    protected $params = [];
    
    public function __construct() {
        $url = $this->parseURL();
        
        // Controller
        if (file_exists('../app/controllers/' . $url[0] . '.php')) {
            $this->controller = $url[0];
            unset($url[0]);
        }
        
        require_once '../app/controllers/' . $this->controller . '.php';
        $this->controller = new $this->controller;
        
        // Method
        if (isset($url[1])) {
            if (method_exists($this->controller, $url[1])) {
                $this->method = $url[1];
                unset($url[1]);
            }
        }
        
        // Params
        $this->params = $url ? array_values($url) : [];
        
        // Jalankan controller & method
        call_user_func_array([$this->controller, $this->method], 
                           $this->params);
    }
    
    public function parseURL() {
        if (isset($_GET['url'])) {
            return explode('/', 
                filter_var(
                    rtrim($_GET['url'], '/'),
                    FILTER_SANITIZE_URL
                )
            );
        }
    }
}
```

### URL Pattern Examples
```
// Basic URL Pattern:
example.com/controller/method/parameter

// Contoh URL:
example.com/posts/view/1
example.com/users/edit/5
example.com/products/delete/3
```

## Mini Project MVC: Blog System 📝

Mari implementasi MVC dengan bikin sistem blog sederhana!

### 1. Database Structure
```sql
-- posts table
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Post Model
```php
// app/models/Post.php
class Post {
    private $db;
    
    public function __construct() {
        $this->db = new Database;
    }
    
    // Get all posts
    public function getAllPosts() {
        $this->db->query("SELECT * FROM posts ORDER BY created_at DESC");
        return $this->db->resultAll();
    }
    
    // Get single post
    public function getPost($id) {
        $this->db->query("SELECT * FROM posts WHERE id = :id");
        $this->db->bind(':id', $id);
        return $this->db->resultSingle();
    }
    
    // Add post
    public function addPost($data) {
        $this->db->query("INSERT INTO posts (title, content) 
                         VALUES (:title, :content)");
                         
        $this->db->bind(':title', $data['title']);
        $this->db->bind(':content', $data['content']);
        
        return $this->db->execute();
    }
}
```

### 3. Post Controller
```php
// app/controllers/Posts.php
class Posts extends Controller {
    public function __construct() {
        $this->postModel = $this->model('Post');
    }
    
    // Show all posts
    public function index() {
        $posts = $this->postModel->getAllPosts();
        
        $data = [
            'title' => 'Blog Posts',
            'posts' => $posts
        ];
        
        $this->view('posts/index', $data);
    }
    
    // Show single post
    public function show($id) {
        $post = $this->postModel->getPost($id);
        
        $data = [
            'title' => $post->title,
            'post' => $post
        ];
        
        $this->view('posts/show', $data);
    }
    
    // Show add form
    public function add() {
        $this->view('posts/add');
    }
    
    // Process add form
    public function create() {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // Sanitize POST
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
            
            $data = [
                'title' => trim($_POST['title']),
                'content' => trim($_POST['content']),
                'title_err' => '',
                'content_err' => ''
            ];
            
            // Validate
            if (empty($data['title'])) {
                $data['title_err'] = 'Please enter title';
            }
            if (empty($data['content'])) {
                $data['content_err'] = 'Please enter content';
            }
            
            // Make sure no errors
            if (empty($data['title_err']) && empty($data['content_err'])) {
                if ($this->postModel->addPost($data)) {
                    flash('post_message', 'Post Added');
                    redirect('posts');
                } else {
                    die('Something went wrong');
                }
            } else {
                // Load view with errors
                $this->view('posts/add', $data);
            }
        } else {
            $this->view('posts/add');
        }
    }
}
```

### 4. Post Views
```php
// app/views/posts/index.php
<?php require APPROOT . '/views/inc/header.php'; ?>

<div class="container">
    <h1><?= $data['title'] ?></h1>
    
    <a href="<?= URLROOT ?>/posts/add" class="btn">Add Post</a>
    
    <?php foreach($data['posts'] as $post) : ?>
        <div class="card">
            <h3><?= $post->title ?></h3>
            <small>Created: <?= $post->created_at ?></small>
            <p><?= substr($post->content, 0, 200) ?>...</p>
            <a href="<?= URLROOT ?>/posts/show/<?= $post->id ?>" 
               class="btn">Read More</a>
        </div>
    <?php endforeach; ?>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>

// app/views/posts/show.php
<?php require APPROOT . '/views/inc/header.php'; ?>

<div class="container">
    <a href="<?= URLROOT ?>/posts" class="btn">Back</a>
    
    <h1><?= $data['post']->title ?></h1>
    <div class="content">
        <?= $data['post']->content ?>
    </div>
    <small>Created: <?= $data['post']->created_at ?></small>
</div>

<?php require APPROOT . '/views/inc/footer.php'; ?>
```

## Tips & Tricks 💡

### 1. Penamaan yang Jelas
```php
// ✅ BAGUS: Nama jelas dan deskriptif
class UserController
class ProductModel
views/users/profile.php

// ❌ KURANG BAGUS: Nama membingungkan
class Ctrl
class Mdl
views/u/p.php
```

### 2. Keep it Simple
```php
// ✅ BAGUS: Function dengan single responsibility
public function getActiveUsers() {
    return $this->db->query("SELECT * FROM users WHERE active = 1");
}

// ❌ KURANG BAGUS: Function terlalu kompleks
public function handleUserStuff() {
    // Get users
    // Update status
    // Send email
    // Log activity
    // ...terlalu banyak!
}
```

### 3. Validation & Security
```php
// ✅ BAGUS: Validasi input
public function store($data) {
    if (empty($data['email'])) {
        throw new Exception("Email required");
    }
    
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email");
    }
    
    // Proses data...
}

// ❌ KURANG BAGUS: No validation
public function store($data) {
    $this->db->query("INSERT INTO users SET email = " . $data['email']);
}
```

## 🎯 Project Latihan

1. **Simple Blog System**
   - CRUD posts
   - Basic authentication
   - Comments system

2. **Todo App dengan MVC**
   - Add/edit/delete tasks
   - Mark as complete
   - Filter tasks

3. **User Management**
   - Register/login
   - Profile update
   - Password reset

## 🌟 Selamat!

Kalo udah sampe sini, selamat! Kamu udah paham konsep dasar MVC. Ini bakal jadi fondasi kuat buat belajar framework PHP kayak Laravel atau CodeIgniter nanti. Keep coding! 💪

---
📝 Note: MVC emang awalnya bikin pusing, tapi lama-lama bakal terbiasa dan ngerasain manfaatnya. Latihan terus ya! 😉