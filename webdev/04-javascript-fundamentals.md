# Chapter 4: JavaScript Journey 🚀

## Daftar Isi 📑
- [Pengenalan JavaScript](#pengenalan-javascript)
- [JavaScript Basics](#javascript-basics)
- [Control Flow](#control-flow)
- [Functions & Scope](#functions--scope)
- [DOM Manipulation](#dom-manipulation)
- [Data Structures](#data-structures)
- [Modern JavaScript](#modern-javascript)
- [Asynchronous JavaScript](#asynchronous-javascript)
- [API Integration](#api-integration)
- [Project & Latihan](#project--latihan)

## Pengenalan JavaScript 🎮

Selamat datang di dunia JavaScript! Kalo HTML itu struktur dan CSS itu styling, nah JavaScript ini yang bikin website kamu jadi "hidup" dan interaktif. Bisa dibilang JavaScript itu kayak "otaknya" website!

### Kenapa Belajar JavaScript? 🤔

1. Bikin website jadi interaktif
2. Bisa manipulasi HTML & CSS secara dinamis
3. Handle input user
4. Komunikasi sama server
5. Bikin animasi keren
6. Dan banyak lagi!

### Cara Pake JavaScript di HTML

```html
<!-- 1. Internal JavaScript (di dalam file HTML) -->
<script>
    alert("Halo! Ini JavaScript!");
</script>

<!-- 2. External JavaScript (file terpisah) -->
<script src="script.js"></script>

<!-- 3. Inline JavaScript (TIDAK RECOMMENDED!) -->
<button onclick="alert('Halo!')">Klik Saya</button>
```

## JavaScript Basics 📝

### Variables & Data Types

```javascript
// 1. Deklarasi Variable
let nama = "Budi";          // String
let umur = 20;             // Number
let isStudent = true;      // Boolean
let hobi;                  // Undefined

// const = nilai tetap, ga bisa diubah
const PI = 3.14;

// 2. Data Types
let text = "Ini string";           // String
let number = 42;                   // Number
let decimal = 3.14;                // Number (decimal)
let benar = true;                  // Boolean
let kosong = null;                 // Null
let belumDiisi;                    // Undefined
let array = ["apel", "jeruk"];     // Array
let object = {                     // Object
    nama: "Budi",
    umur: 20
};

// 3. Type Checking
console.log(typeof text);      // "string"
console.log(typeof number);    // "number"
console.log(typeof benar);     // "boolean"
```

### Operators di JavaScript

```javascript
// 1. Arithmetic Operators
let a = 10;
let b = 5;

console.log(a + b);    // 15 (Tambah)
console.log(a - b);    // 5 (Kurang)
console.log(a * b);    // 50 (Kali)
console.log(a / b);    // 2 (Bagi)
console.log(a % b);    // 0 (Sisa bagi/Modulus)

// 2. Comparison Operators
console.log(a > b);     // true
console.log(a < b);     // false
console.log(a >= b);    // true
console.log(a <= b);    // false
console.log(a === b);   // false (Sama dengan)
console.log(a !== b);   // true (Tidak sama dengan)

// 3. Logical Operators
let x = true;
let y = false;

console.log(x && y);    // false (AND)
console.log(x || y);    // true (OR)
console.log(!x);        // false (NOT)
```

### String Operations

```javascript
// 1. String Concatenation (Gabungin String)
let firstName = "Budi";
let lastName = "Santoso";
let fullName = firstName + " " + lastName;    // "Budi Santoso"

// 2. Template Literals (Cara Modern)
let greeting = `Halo ${firstName}!`;          // "Halo Budi!"

// 3. String Methods
let text = "Hello World";
console.log(text.length);          // 11 (panjang string)
console.log(text.toUpperCase());   // "HELLO WORLD"
console.log(text.toLowerCase());   // "hello world"
console.log(text.split(" "));      // ["Hello", "World"]
```

## Control Flow 🔄

### Conditional Statements

```javascript
// 1. If Statement
let umur = 18;

if (umur >= 18) {
    console.log("Boleh nonton film dewasa");
} else {
    console.log("Belum cukup umur!");
}

// 2. If-Else If-Else
let nilai = 85;

if (nilai >= 90) {
    console.log("Nilai A");
} else if (nilai >= 80) {
    console.log("Nilai B");
} else if (nilai >= 70) {
    console.log("Nilai C");
} else {
    console.log("Nilai D");
}

// 3. Switch Case
let hari = "Senin";

switch(hari) {
    case "Senin":
        console.log("Hari kerja 😢");
        break;
    case "Sabtu":
    case "Minggu":
        console.log("Weekend! 🎉");
        break;
    default:
        console.log("Hari biasa");
}

// 4. Ternary Operator (If-Else singkat)
let umur = 20;
let status = umur >= 18 ? "Dewasa" : "Anak-anak";
```

### Loops (Perulangan)

```javascript
// 1. For Loop
for (let i = 0; i < 5; i++) {
    console.log(`Perulangan ke-${i + 1}`);
}

// 2. While Loop
let count = 0;
while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}

// 3. Do-While Loop
let i = 0;
do {
    console.log(`Do-While: ${i}`);
    i++;
} while (i < 5);

// 4. For...of (untuk Array)
let fruits = ["apel", "jeruk", "mangga"];
for (let fruit of fruits) {
    console.log(fruit);
}

// 5. For...in (untuk Object)
let person = {
    nama: "Budi",
    umur: 20,
    hobi: "Coding"
};

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

## Functions & Scope 🎯

### Function Basics

```javascript
// 1. Function Declaration
function sayHello(nama) {
    return `Halo ${nama}!`;
}

console.log(sayHello("Budi"));    // "Halo Budi!"

// 2. Function Expression
const tambah = function(a, b) {
    return a + b;
};

console.log(tambah(5, 3));    // 8

// 3. Arrow Function (Modern)
const kali = (a, b) => a * b;
console.log(kali(4, 2));      // 8

// 4. Default Parameters
function greet(nama = "Teman") {
    console.log(`Halo ${nama}!`);
}

greet();        // "Halo Teman!"
greet("Budi");  // "Halo Budi!"
```

### Scope & Hoisting

```javascript
// 1. Global Scope
let globalVar = "Bisa diakses dimana saja";

function testScope() {
    console.log(globalVar);  // Bisa akses
}

// 2. Local/Function Scope
function testLocal() {
    let localVar = "Hanya bisa diakses di dalam function";
    console.log(localVar);  // Bisa akses
}

// console.log(localVar);  // Error! Tidak bisa akses

// 3. Block Scope
if (true) {
    let blockVar = "Hanya dalam block";
    var oldVar = "Bisa diakses diluar block";
}

// console.log(blockVar);  // Error!
console.log(oldVar);     // Bisa akses (tapi hindari var!)

// 4. Hoisting
console.log(hoistedVar);  // undefined
var hoistedVar = "Halo";  // var di-"angkat" ke atas

// Lebih baik pakai let/const
// console.log(notHoisted);  // Error!
let notHoisted = "Better!";
```

## DOM Manipulation 🎨

Let's enhance the explanations:

### Selecting Elements

```javascript
// 1. Get by ID
const title = document.getElementById('title');

// 2. Get by Class Name
const items = document.getElementsByClassName('item');

// 3. Get by Tag Name
const paragraphs = document.getElementsByTagName('p');

// 4. Query Selector (Modern & Recommended!)
const header = document.querySelector('.header');        // Satu element
const buttons = document.querySelectorAll('.btn');      // Semua element
```

### Modifying Elements

```javascript
// 1. Change Text Content
const title = document.querySelector('#title');
title.textContent = "Judul Baru";              // Just text
title.innerHTML = "Judul <span>Baru</span>";   // With HTML

// 2. Change Styles
const box = document.querySelector('.box');
box.style.backgroundColor = "blue";
box.style.width = "100px";
box.style.padding = "10px";

// 3. Classes
box.classList.add('active');        // Tambah class
box.classList.remove('hidden');     // Hapus class
box.classList.toggle('show');       // Toggle class

// 4. Attributes
const link = document.querySelector('a');
link.setAttribute('href', 'https://google.com');
console.log(link.getAttribute('href'));
```

### Event Handling

```javascript
// 1. Click Event
const button = document.querySelector('#myButton');

button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log(event);  // Event object
});

// 2. Form Events
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();  // Stop form submission
    
    // Get form data
    const name = document.querySelector('#name').value;
    console.log(`Form submitted by ${name}`);
});

// 3. Common Events
const element = document.querySelector('#element');

element.addEventListener('mouseenter', function() {
    console.log('Mouse masuk!');
});

element.addEventListener('mouseleave', function() {
    console.log('Mouse keluar!');
});

element.addEventListener('keyup', function(e) {
    console.log(`Key pressed: ${e.key}`);
});
```

## Data Structures 📊

### Arrays

```javascript
// 1. Creating Arrays
let fruits = ["apel", "jeruk", "mangga"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["text", 42, true, null];

// 2. Array Methods
// Push: Tambah di akhir
fruits.push("anggur");          // ["apel", "jeruk", "mangga", "anggur"]

// Pop: Hapus & return element terakhir
let last = fruits.pop();        // last = "anggur"

// Unshift: Tambah di awal
fruits.unshift("pisang");       // ["pisang", "apel", "jeruk", "mangga"]

// Shift: Hapus & return element pertama
let first = fruits.shift();     // first = "pisang"

// 3. Array Operations
// Slice: Ambil sebagian array
let slice = fruits.slice(1, 3);  // ["jeruk", "mangga"]

// Splice: Ubah isi array
fruits.splice(1, 1, "nanas");    // Ganti index 1 dengan "nanas"

// Join: Gabung jadi string
console.log(fruits.join(", "));  // "apel, nanas, mangga"

// 4. Array Iteration
fruits.forEach(function(fruit) {
    console.log(fruit);
});

// Map: Buat array baru dengan transformasi
let upperFruits = fruits.map(fruit => fruit.toUpperCase());

// Filter: Buat array baru dengan kondisi
let longFruits = fruits.filter(fruit => fruit.length > 5);
```

### Objects

```javascript
// 1. Creating Objects
let person = {
    nama: "Budi",
    umur: 20,
    hobi: ["coding", "gaming"],
    alamat: {
        jalan: "Jl. Merdeka",
        kota: "Jakarta"
    }
};

// 2. Accessing Object Properties
console.log(person.nama);           // Dot notation
console.log(person["umur"]);       // Bracket notation
console.log(person.alamat.kota);   // Nested objects

// 3. Modifying Objects
person.email = "budi@email.com";    // Add new property
delete person.hobi;                 // Delete property
person.umur = 21;                  // Update property

// 4. Object Methods
const student = {
    nama: "Ani",
    nilai: [85, 90, 78],
    hitungRata: function() {
        let sum = this.nilai.reduce((a, b) => a + b);
        return sum / this.nilai.length;
    }
};

console.log(student.hitungRata());  // 84.33...
```

## Modern JavaScript ⚡

### Template Literals

```javascript
// Old Way
let name = "Budi";
let greeting = "Halo " + name + "!";

// Modern Way (Template Literals)
let modern = `Halo ${name}!`;

// Multi-line String
let html = `
    <div>
        <h1>Halo ${name}!</h1>
        <p>Apa kabar?</p>
    </div>
`;
```

### Destructuring

```javascript
// 1. Array Destructuring
let colors = ["merah", "hijau", "biru"];
let [red, green, blue] = colors;

console.log(red);    // "merah"
console.log(green);  // "hijau"

// 2. Object Destructuring
let person = {
    nama: "Budi",
    umur: 20,
    kota: "Jakarta"
};

let { nama, umur } = person;
console.log(nama);  // "Budi"

// Rename variables
let { nama: fullName } = person;
console.log(fullName);  // "Budi"
```

### Spread & Rest Operators

```javascript
// 1. Spread Operator (...)
let numbers = [1, 2, 3];
let moreNumbers = [...numbers, 4, 5];  // [1, 2, 3, 4, 5]

let person = { nama: "Budi", umur: 20 };
let employee = {
    ...person,
    jabatan: "Developer"
};

// 2. Rest Parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b);
}

console.log(sum(1, 2, 3, 4));  // 10
```

## Asynchronous JavaScript ⏰

### Callbacks

```javascript
// 1. Simple Callback
function greeting(name, callback) {
    console.log(`Halo ${name}!`);
    callback();
}

greeting("Budi", function() {
    console.log("Callback dipanggil!");
});

// 2. Real World Example: setTimeout
console.log("Mulai");

setTimeout(function() {
    console.log("2 detik berlalu");
}, 2000);

console.log("Selesai");
```

### Promises

```javascript
// 1. Creating Promises
let janji = new Promise((resolve, reject) => {
    // Simulasi async operation
    setTimeout(() => {
        let success = true;
        
        if (success) {
            resolve("Berhasil!");
        } else {
            reject("Gagal!");
        }
    }, 2000);
});

// 2. Using Promises
janji
    .then(result => console.log(result))
    .catch(error => console.log(error));

// 3. Promise Chaining
fetchUser()
    .then(user => fetchUserPosts(user))
    .then(posts => displayPosts(posts))
    .catch(error => console.log(error));
```

### Async/Await

```javascript
// 1. Async Function
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error:', error);
    }
}

// 2. Multiple Awaits
async function getUser() {
    const user = await fetchUser();
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    
    return {
        user,
        posts,
        comments
    };
}

// 3. Parallel Promises
async function getAllData() {
    const [users, posts, comments] = await Promise.all([
        fetchUsers(),
        fetchPosts(),
        fetchComments()
    ]);
    
    console.log(users, posts, comments);
}
```

## API Integration 🌐

### Fetch API

```javascript
// 1. Basic GET Request
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('Error:', error));

// 2. POST Request
fetch('https://api.example.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        title: 'Post Baru',
        body: 'Isi post...',
        userId: 1
    })
})
.then(response => response.json())
.then(data => console.log(data));

// 3. With Async/Await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Error:', error);
    }
}
```

## Project & Latihan 💻

### 1. Todo List App
```javascript
// HTML Structure
/*
<div id="todo-app">
    <input type="text" id="todo-input">
    <button id="add-btn">Add</button>
    <ul id="todo-list"></ul>
</div>
*/

// JavaScript
const todoInput = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');

let todos = [];

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push(text);
        renderTodos();
        todoInput.value = '';
    }
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTodo(index);
        
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

addBtn.addEventListener('click', addTodo);
```

### 2. Simple Quiz App
```javascript
const questions = [
    {
        question: "Ibukota Indonesia?",
        answers: ["Jakarta", "Bandung", "Surabaya", "Medan"],
        correct: 0
    },
    {
        question: "2 + 2 = ?",
        answers: ["3", "4", "5", "6"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = questions[currentQuestion];
    
    document.querySelector('#question').textContent = q.question;
    const answers = document.querySelector('#answers');
    answers.innerHTML = '';
    
    q.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answers.appendChild(button);
    });
}

function checkAnswer(answerIndex) {
    if (answerIndex === questions[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector('#quiz').innerHTML = `
        <h2>Quiz Selesai!</h2>
        <p>Skor kamu: ${score} dari ${questions.length}</p>
    `;
}

// Start the quiz
showQuestion();
```

## 🎯 Latihan!

1. **Manipulasi DOM:**
   - Buat toggle dark/light mode
   - Implementasi form validation
   - Buat image slider

2. **Array & Objects:**
   - Filter & sort data
   - Transform data structures
   - CRUD operations

3. **API & Async:**
   - Fetch data dari API
   - Handle loading states
   - Error handling

## Debugging & Development Tools 🔧

### Console Methods dengan Contoh
```javascript
console.log("Check value");
console.warn("Warning!");
console.error("Error!");
console.table(arrayOfObjects);
```

## 💡 Tips JavaScript

1. **Console adalah Teman Terbaik!**
```javascript
console.log("Check value");
console.warn("Warning!");
console.error("Error!");
console.table(arrayOfObjects);
```

2. **Use Strict Mode**
```javascript
'use strict';
// Helps catch common mistakes
```

3. **Error Handling**
```javascript
try {
    // Code yang mungkin error
    riskyOperation();
} catch (error) {
    console.error('Error:', error);
} finally {
    // Selalu dijalankan
    cleanup();
}
```

## 🌟 Selamat!

Kalo udah nyampe sini, selamat! Kamu udah punya fondasi yang kuat di JavaScript. Inget, latihan adalah kunci. Mulai dari yang kecil, terus tingkatin kompleksitasnya pelan-pelan. Happy coding! 💪

---
📝 Note: JavaScript itu luas banget! Jangan khawatir kalo belum paham semua, fokus ke basic dulu, praktik yang banyak, nanti lama-lama jago sendiri! 😉
