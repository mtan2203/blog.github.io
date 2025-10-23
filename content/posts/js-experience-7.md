---
title: "DOM Manipulation - Thao tác với trang web"
date: 2025-10-01
draft: false
tags: ["javascript", "học tập", "DOM", "web", "manipulation"]
categories: ["JavaScript"]
description: "Học cách sử dụng JavaScript để thao tác và thay đổi nội dung trang web"
image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop"
---

## DOM là gì?

**DOM (Document Object Model)** là cầu nối giữa JavaScript và HTML. Nó biểu diễn cấu trúc trang web dưới dạng cây (tree) mà JavaScript có thể đọc và thay đổi.

Đây là lúc JavaScript thực sự trở nên thú vị - bạn có thể làm cho trang web "sống động"!

```
Document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── header
        ├── main
        │   ├── section
        │   └── article
        └── footer
```

## Selecting Elements (Chọn phần tử)

### getElementById()
```javascript
// HTML: <div id="myDiv">Hello</div>
const element = document.getElementById('myDiv');
console.log(element.textContent); // "Hello"
```

### getElementsByClassName()
```javascript
// HTML: <div class="box">1</div> <div class="box">2</div>
const boxes = document.getElementsByClassName('box');
console.log(boxes.length); // 2
console.log(boxes[0].textContent); // "1"

// ⚠️ Trả về HTMLCollection (không phải Array)
```

### getElementsByTagName()
```javascript
// Lấy tất cả thẻ p
const paragraphs = document.getElementsByTagName('p');

// Lấy tất cả thẻ img
const images = document.getElementsByTagName('img');
```

### querySelector() - Khuyên dùng!
```javascript
// Chọn phần tử đầu tiên khớp với CSS selector
const element = document.querySelector('.box'); // class
const heading = document.querySelector('#title'); // id
const firstPara = document.querySelector('p'); // tag
const complexSelect = document.querySelector('div.container > p.intro');
```

### querySelectorAll() - Rất mạnh!
```javascript
// Chọn TẤT CẢ phần tử khớp
const allBoxes = document.querySelectorAll('.box');
const allLinks = document.querySelectorAll('a');

// Trả về NodeList (có thể dùng forEach)
allBoxes.forEach(box => {
    console.log(box.textContent);
});

// Convert sang Array
const boxArray = Array.from(allBoxes);
const boxArray2 = [...allBoxes];
```

## Thay đổi nội dung

### textContent vs innerHTML

```javascript
const div = document.querySelector('#myDiv');

// textContent - Text thuần túy
div.textContent = 'Hello World';
div.textContent = '<strong>Bold</strong>'; // Hiện đúng chuỗi, không render HTML

// innerHTML - Có thể chứa HTML
div.innerHTML = '<strong>Bold Text</strong>'; // Render HTML
div.innerHTML = '<p>Paragraph</p><span>Span</span>';

// ⚠️ Cẩn thận XSS với innerHTML
const userInput = '<script>alert("XSS")</script>';
// div.innerHTML = userInput; // NGUY HIỂM!
div.textContent = userInput; // AN TOÀN
```

### innerText vs textContent

```javascript
// innerText - Tôn trọng CSS (hidden, display: none)
// textContent - Lấy tất cả text, kể cả hidden

const element = document.querySelector('.box');
element.textContent = 'New text'; // Thường dùng
```

## Thay đổi thuộc tính (Attributes)

```javascript
const link = document.querySelector('a');
const image = document.querySelector('img');

// getAttribute() - Lấy giá trị thuộc tính
console.log(link.getAttribute('href'));

// setAttribute() - Đặt giá trị thuộc tính
link.setAttribute('href', 'https://google.com');
link.setAttribute('target', '_blank');

image.setAttribute('src', 'new-image.jpg');
image.setAttribute('alt', 'New description');

// Truy cập trực tiếp
link.href = 'https://facebook.com';
image.src = 'another-image.jpg';

// removeAttribute() - Xóa thuộc tính
link.removeAttribute('target');

// hasAttribute() - Kiểm tra có thuộc tính
if (link.hasAttribute('href')) {
    console.log('Link có href');
}
```

## Thay đổi Style

### Inline Style
```javascript
const box = document.querySelector('.box');

// Thay đổi từng thuộc tính
box.style.color = 'red';
box.style.backgroundColor = 'blue'; // camelCase!
box.style.fontSize = '20px';
box.style.padding = '10px';
box.style.border = '2px solid black';

// Đọc style
console.log(box.style.color);

// Xóa style
box.style.color = '';
```

### CSS Classes (Khuyên dùng!)
```javascript
const element = document.querySelector('.box');

// className - Thay thế toàn bộ classes
element.className = 'box active';

// classList - API mạnh mẽ hơn
element.classList.add('highlight'); // Thêm class
element.classList.remove('old-class'); // Xóa class
element.classList.toggle('active'); // Bật/tắt class

// Kiểm tra có class
if (element.classList.contains('active')) {
    console.log('Element is active');
}

// Thay thế class
element.classList.replace('old', 'new');

// Thêm nhiều classes
element.classList.add('class1', 'class2', 'class3');
```

## Tạo và Thêm Elements

### createElement() & appendChild()

```javascript
// Tạo phần tử mới
const newDiv = document.createElement('div');
newDiv.textContent = 'Tôi là div mới';
newDiv.className = 'new-box';
newDiv.id = 'box1';

// Thêm vào cuối
document.body.appendChild(newDiv);

// Tạo list item
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = 'Item mới';
ul.appendChild(li);
```

### insertBefore() & insertAdjacentElement()

```javascript
const parent = document.querySelector('.container');
const reference = document.querySelector('.reference');
const newElement = document.createElement('div');
newElement.textContent = 'New element';

// Chèn trước phần tử reference
parent.insertBefore(newElement, reference);

// insertAdjacentElement (linh hoạt hơn)
const element = document.querySelector('.target');
const newEl = document.createElement('span');

element.insertAdjacentElement('beforebegin', newEl); // Trước element
element.insertAdjacentElement('afterbegin', newEl);  // Đầu element
element.insertAdjacentElement('beforeend', newEl);   // Cuối element
element.insertAdjacentElement('afterend', newEl);    // Sau element
```

### insertAdjacentHTML (Nhanh và tiện)

```javascript
const container = document.querySelector('.container');

// Thêm HTML
container.insertAdjacentHTML('beforeend', '<p>Paragraph mới</p>');
container.insertAdjacentHTML('afterbegin', '<h2>Heading</h2>');

// Ví dụ thực tế - Thêm card
const cardHTML = `
    <div class="card">
        <h3>Tiêu đề</h3>
        <p>Nội dung</p>
    </div>
`;
container.insertAdjacentHTML('beforeend', cardHTML);
```

## Xóa Elements

```javascript
const element = document.querySelector('.to-remove');

// Cách 1: remove() (Modern)
element.remove();

// Cách 2: removeChild() (Old way)
const parent = element.parentElement;
parent.removeChild(element);

// Xóa tất cả children
const container = document.querySelector('.container');
container.innerHTML = ''; // Cách nhanh

// Hoặc
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
```

## Clone Elements

```javascript
const original = document.querySelector('.original');

// Clone (shallow - không clone event listeners)
const clone = original.cloneNode(false); // Chỉ element

// Deep clone (bao gồm children)
const deepClone = original.cloneNode(true);

// Thêm vào DOM
document.body.appendChild(deepClone);
```

## Traversing DOM (Di chuyển trong DOM)

### Parent, Children, Siblings

```javascript
const element = document.querySelector('.child');

// Parent
const parent = element.parentElement;
const parentNode = element.parentNode; // Giống parentElement

// Children
const container = document.querySelector('.container');
const children = container.children; // HTMLCollection
const firstChild = container.firstElementChild;
const lastChild = container.lastElementChild;

// Siblings
const nextSibling = element.nextElementSibling;
const prevSibling = element.previousElementSibling;

// Closest parent matching selector
const closestForm = element.closest('form');
const closestDiv = element.closest('.wrapper');
```

### Ví dụ thực tế - Traversing

```javascript
// HTML: <ul><li>1</li><li>2</li><li class="active">3</li></ul>

const activeItem = document.querySelector('li.active');

// Lên parent
const list = activeItem.parentElement;

// Sang siblings
const prevItem = activeItem.previousElementSibling;
const nextItem = activeItem.nextElementSibling;

// Tất cả siblings
const allItems = list.children;
Array.from(allItems).forEach(item => {
    if (item !== activeItem) {
        item.classList.remove('active');
    }
});
```

## Đọc và Set Data Attributes

```javascript
// HTML: <div data-user-id="123" data-role="admin">User</div>

const element = document.querySelector('div');

// Đọc data attributes
console.log(element.dataset.userId); // "123"
console.log(element.dataset.role); // "admin"

// Set data attributes
element.dataset.status = 'active';
element.dataset.lastLogin = '2025-10-01';

// getAttribute/setAttribute cũng dùng được
console.log(element.getAttribute('data-user-id'));
element.setAttribute('data-premium', 'true');
```

## Dimensions và Position

```javascript
const box = document.querySelector('.box');

// Kích thước
console.log(box.offsetWidth);  // Width (bao gồm padding, border)
console.log(box.offsetHeight); // Height
console.log(box.clientWidth);  // Width (bao gồm padding, không border)
console.log(box.clientHeight); // Height
console.log(box.scrollWidth);  // Width của nội dung
console.log(box.scrollHeight); // Height của nội dung

// Vị trí
console.log(box.offsetTop);    // Khoảng cách từ top của parent
console.log(box.offsetLeft);   // Khoảng cách từ left của parent

// getBoundingClientRect() - Chính xác hơn
const rect = box.getBoundingClientRect();
console.log(rect.top);    // Khoảng cách từ top viewport
console.log(rect.left);   // Khoảng cách từ left viewport
console.log(rect.width);  // Width
console.log(rect.height); // Height
console.log(rect.x, rect.y); // Tọa độ

// Scroll position
console.log(window.scrollX); // Horizontal scroll
console.log(window.scrollY); // Vertical scroll
```

## Window và Document

```javascript
// Window size
console.log(window.innerWidth);  // Width của viewport
console.log(window.innerHeight); // Height của viewport
console.log(window.outerWidth);  // Width của browser window
console.log(window.outerHeight); // Height của browser window

// Document size
console.log(document.documentElement.scrollHeight);
console.log(document.documentElement.scrollWidth);

// Scroll to position
window.scrollTo(0, 0); // Scroll to top
window.scrollTo(0, 500); // Scroll to Y = 500px

// Smooth scroll
window.scrollTo({
    top: 500,
    behavior: 'smooth'
});

// Scroll element into view
const element = document.querySelector('#section2');
element.scrollIntoView({ behavior: 'smooth' });
```

## Bài tập thực hành

### Bài 1: Todo List
```javascript
const input = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const todoList = document.querySelector('#todoList');

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text === '') return;
    
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Xóa</button>
    `;
    
    // Xóa khi click
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });
    
    todoList.appendChild(li);
    input.value = '';
});
```

### Bài 2: Toggle Dark Mode
```javascript
const toggleBtn = document.querySelector('#darkModeToggle');

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Lưu preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent = '🌙 Dark Mode';
    }
});

// Load theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}
```

### Bài 3: Image Gallery
```javascript
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('#mainImage');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Đổi main image
        mainImage.src = thumb.src;
        
        // Active state
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    });
});
```

### Bài 4: Accordion
```javascript
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
        // Đóng tất cả các items khác
        accordionItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle item hiện tại
        item.classList.toggle('active');
    });
});
```

### Bài 5: Form Validation
```javascript
const form = document.querySelector('#myForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Tên không được để trống');
        isValid = false;
    } else {
        showSuccess(nameInput);
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, 'Email không hợp lệ');
        isValid = false;
    } else {
        showSuccess(emailInput);
    }
    
    if (isValid) {
        console.log('Form hợp lệ, submit!');
    }
});

function showError(input, message) {
    const formControl = input.parentElement;
    const errorDiv = formControl.querySelector('.error');
    errorDiv.textContent = message;
    formControl.classList.add('error');
    formControl.classList.remove('success');
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    formControl.classList.remove('error');
}
```

## Performance Tips

### 1. Cache DOM queries
```javascript
// ❌ Chậm - Query nhiều lần
for (let i = 0; i < 100; i++) {
    document.querySelector('.box').textContent = i;
}

// ✅ Nhanh - Query 1 lần
const box = document.querySelector('.box');
for (let i = 0; i < 100; i++) {
    box.textContent = i;
}
```

### 2. Batch DOM changes
```javascript
// ❌ Chậm - Nhiều reflows
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    ul.appendChild(li); // Reflow mỗi lần
}

// ✅ Nhanh - 1 reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    fragment.appendChild(li);
}
ul.appendChild(fragment); // Chỉ 1 reflow
```

### 3. Event Delegation (Sẽ học kỹ bài sau)
```javascript
// ❌ Chậm - Nhiều listeners
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// ✅ Nhanh - 1 listener
document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        handleClick(e);
    }
});
```

## Những lỗi thường gặp

### 1. Element chưa tồn tại
```javascript
// ❌ Script chạy trước khi HTML load
const box = document.querySelector('.box'); // null
box.textContent = 'Hello'; // Error!

// ✅ Đợi DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');
    box.textContent = 'Hello';
});

// Hoặc đặt script cuối body
```

### 2. Quên return false/preventDefault
```javascript
// ❌ Link vẫn chuyển trang
link.addEventListener('click', () => {
    // Do something
});

// ✅ Prevent default behavior
link.addEventListener('click', (e) => {
    e.preventDefault();
    // Do something
});
```

### 3. innerHTML với user input
```javascript
// ❌ XSS vulnerability
const userInput = '<script>alert("hacked")</script>';
div.innerHTML = userInput; // NGUY HIỂM!

// ✅ Dùng textContent
div.textContent = userInput; // An toàn
```

## Kinh nghiệm của mình

### 1. querySelector/All là đủ
Hầu hết trường hợp chỉ cần `querySelector` và `querySelectorAll`. Chúng mạnh mẽ và linh hoạt.

### 2. classList > style
Thay vì thay đổi inline style, nên toggle CSS classes. Code sạch hơn và dễ maintain.

### 3. Console.log element
Khi debug, log element ra để xem properties:
```javascript
const box = document.querySelector('.box');
console.log(box);
console.dir(box); // Xem tất cả properties
```

### 4. Dataset cho custom data
Dùng data attributes để lưu metadata:
```javascript
<button data-id="123" data-action="delete">Xóa</button>
```

## Kết luận

DOM Manipulation là kỹ năng cốt lõi của JavaScript:

✅ Selecting: `querySelector`, `querySelectorAll`
✅ Modifying: `textContent`, `innerHTML`, `classList`
✅ Creating: `createElement`, `appendChild`
✅ Traversing: Parent, children, siblings
✅ Performance: Cache queries, batch updates

Bài tiếp theo: **Events** - Xử lý tương tác người dùng!

---

*Bạn đã làm project nào với DOM chưa? Chia sẻ nhé! 🚀*