---
title: "Sự kiện và xử lý sự kiện - Events trong JavaScript"
date: 2025-10-02
draft: false
tags: ["javascript", "học tập", "events", "interactive", "event listener"]
categories: ["JavaScript"]
description: "Học cách lắng nghe và xử lý các sự kiện người dùng để tạo trang web tương tác"
image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop"
---

## Events là gì?

**Events** (Sự kiện) là những hành động hoặc sự việc xảy ra trên trang web mà JavaScript có thể "lắng nghe" và phản ứng lại. Đây là cách trang web tương tác với người dùng.

Các loại events phổ biến:
- 🖱️ Mouse events: click, double-click, hover
- ⌨️ Keyboard events: keypress, keydown, keyup
- 📝 Form events: submit, change, focus
- 🪟 Window events: load, resize, scroll
- 👆 Touch events: touchstart, touchmove (mobile)

## addEventListener() - Cách hiện đại

### Cú pháp cơ bản
```javascript
element.addEventListener('eventType', callbackFunction);
```

### Click Event
```javascript
const button = document.querySelector('#myButton');

button.addEventListener('click', function() {
    console.log('Button được click!');
});

// Arrow function
button.addEventListener('click', () => {
    console.log('Button clicked!');
});

// Named function (dễ remove sau này)
function handleClick() {
    console.log('Handled');
}
button.addEventListener('click', handleClick);
```

### Event Object
```javascript
button.addEventListener('click', function(event) {
    console.log(event); // MouseEvent object
    console.log(event.type); // "click"
    console.log(event.target); // Element được click
    console.log(event.clientX, event.clientY); // Tọa độ chuột
});

// Destructuring
button.addEventListener('click', ({ target, clientX, clientY }) => {
    console.log(target, clientX, clientY);
});
```

## Mouse Events

### Click Events
```javascript
const btn = document.querySelector('button');

// click - Click chuột trái
btn.addEventListener('click', (e) => {
    console.log('Clicked!');
});

// dblclick - Double click
btn.addEventListener('dblclick', (e) => {
    console.log('Double clicked!');
});

// contextmenu - Click chuột phải
btn.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Chặn menu mặc định
    console.log('Right clicked!');
});
```

### Mouse Movement
```javascript
const box = document.querySelector('.box');

// mouseenter - Chuột vào element
box.addEventListener('mouseenter', () => {
    box.style.backgroundColor = 'blue';
});

// mouseleave - Chuột rời element
box.addEventListener('mouseleave', () => {
    box.style.backgroundColor = 'red';
});

// mousemove - Chuột di chuyển trong element
box.addEventListener('mousemove', (e) => {
    box.textContent = `X: ${e.offsetX}, Y: ${e.offsetY}`;
});

// mouseover vs mouseenter
// mouseover: Trigger cả khi hover vào children
// mouseenter: Chỉ trigger khi vào element chính

// mouseout vs mouseleave
// Tương tự như trên
```

### Mouse Button Detection
```javascript
document.addEventListener('mousedown', (e) => {
    if (e.button === 0) console.log('Left button');
    if (e.button === 1) console.log('Middle button');
    if (e.button === 2) console.log('Right button');
});
```

## Keyboard Events

### Basic Keyboard Events
```javascript
const input = document.querySelector('input');

// keydown - Phím được nhấn xuống
input.addEventListener('keydown', (e) => {
    console.log('Key down:', e.key);
});

// keyup - Phím được thả ra
input.addEventListener('keyup', (e) => {
    console.log('Key up:', e.key);
});

// keypress - Phím ký tự được nhấn (deprecated, dùng keydown)
```

### Key Properties
```javascript
document.addEventListener('keydown', (e) => {
    console.log('key:', e.key);           // "a", "Enter", "ArrowUp"
    console.log('code:', e.code);         // "KeyA", "Enter", "ArrowUp"
    console.log('keyCode:', e.keyCode);   // 65, 13, 38 (deprecated)
    
    // Modifier keys
    console.log('Ctrl:', e.ctrlKey);      // true/false
    console.log('Shift:', e.shiftKey);    // true/false
    console.log('Alt:', e.altKey);        // true/false
    console.log('Meta:', e.metaKey);      // Command (Mac) / Windows key
});
```

### Keyboard Shortcuts
```javascript
// Ctrl + S để save
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // Chặn save browser
        console.log('Saving...');
        // saveDocument();
    }
});

// Escape để đóng modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Arrow keys điều khiển
const player = document.querySelector('.player');
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            player.style.top = (player.offsetTop - 10) + 'px';
            break;
        case 'ArrowDown':
            player.style.top = (player.offsetTop + 10) + 'px';
            break;
        case 'ArrowLeft':
            player.style.left = (player.offsetLeft - 10) + 'px';
            break;
        case 'ArrowRight':
            player.style.left = (player.offsetLeft + 10) + 'px';
            break;
    }
});
```

## Form Events

### Submit Event
```javascript
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn reload trang
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log(data);
    // { username: "minh", email: "minh@email.com" }
});
```

### Input Events
```javascript
const input = document.querySelector('#searchInput');

// input - Mỗi khi giá trị thay đổi
input.addEventListener('input', (e) => {
    console.log('Current value:', e.target.value);
    // Real-time search
});

// change - Khi blur sau khi thay đổi
input.addEventListener('change', (e) => {
    console.log('Final value:', e.target.value);
});

// focus - Khi input được focus
input.addEventListener('focus', () => {
    input.classList.add('focused');
});

// blur - Khi input mất focus
input.addEventListener('blur', () => {
    input.classList.remove('focused');
});
```

### Select/Checkbox/Radio
```javascript
// Select dropdown
const select = document.querySelector('select');
select.addEventListener('change', (e) => {
    console.log('Selected:', e.target.value);
});

// Checkbox
const checkbox = document.querySelector('#terms');
checkbox.addEventListener('change', (e) => {
    console.log('Checked:', e.target.checked);
});

// Radio buttons
const radios = document.querySelectorAll('input[name="gender"]');
radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        console.log('Selected:', e.target.value);
    });
});
```

## Window Events

### Load Events
```javascript
// DOMContentLoaded - HTML đã load xong
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready!');
    // Init app
});

// load - Tất cả resources đã load (images, CSS, JS)
window.addEventListener('load', () => {
    console.log('Everything loaded!');
});

// beforeunload - Trước khi thoát trang
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = ''; // Hiện confirm dialog
});
```

### Resize & Scroll
```javascript
// resize - Window thay đổi kích thước
window.addEventListener('resize', () => {
    console.log('Width:', window.innerWidth);
    console.log('Height:', window.innerHeight);
});

// Debounce resize (Tối ưu performance)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Resize ended');
    }, 250);
});

// scroll - Cuộn trang
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    console.log('Scrolled:', scrollY);
    
    // Show/hide header khi scroll
    if (scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});
```

## Event Bubbling & Capturing

### Event Bubbling (Nổi bọt)
```javascript
// HTML: <div class="outer"><div class="inner"><button>Click</button></div></div>

const outer = document.querySelector('.outer');
const inner = document.querySelector('.inner');
const button = document.querySelector('button');

// Click button → event "nổi" lên inner → outer → document
button.addEventListener('click', () => {
    console.log('Button clicked');
});

inner.addEventListener('click', () => {
    console.log('Inner clicked');
});

outer.addEventListener('click', () => {
    console.log('Outer clicked');
});

// Output khi click button:
// "Button clicked"
// "Inner clicked"
// "Outer clicked"
```

### stopPropagation()
```javascript
button.addEventListener('click', (e) => {
    e.stopPropagation(); // Dừng bubbling
    console.log('Button clicked');
});
// Chỉ in "Button clicked", không bubble lên
```

### Event Capturing (Capture phase)
```javascript
// Thêm { capture: true } để listen ở capture phase
outer.addEventListener('click', () => {
    console.log('Outer (capture)');
}, { capture: true });

inner.addEventListener('click', () => {
    console.log('Inner (capture)');
}, { capture: true });

button.addEventListener('click', () => {
    console.log('Button');
});

// Output: Outer → Inner → Button (từ ngoài vào trong)
```

## Event Delegation

### Vấn đề
```javascript
// ❌ Không hiệu quả với nhiều elements
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick); // N listeners
});

// ❌ Không work với elements được thêm sau
const newButton = document.createElement('button');
document.body.appendChild(newButton);
// newButton không có listener!
```

### Giải pháp - Event Delegation
```javascript
// ✅ 1 listener cho tất cả
document.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        handleClick(e);
    }
});

// ✅ Work với elements dynamic
// Bất kỳ button nào được add sau đều có event
```

### Ví dụ thực tế - Todo List
```javascript
const todoList = document.querySelector('#todoList');

// Delegation - 1 listener cho tất cả todos
todoList.addEventListener('click', (e) => {
    // Delete button
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
    }
    
    // Complete checkbox
    if (e.target.classList.contains('complete-checkbox')) {
        e.target.closest('li').classList.toggle('completed');
    }
    
    // Edit button
    if (e.target.classList.contains('edit-btn')) {
        const li = e.target.closest('li');
        const text = li.querySelector('.text');
        text.contentEditable = true;
        text.focus();
    }
});
```

## preventDefault() & stopPropagation()

### preventDefault() - Ngăn hành động mặc định
```javascript
// Ngăn link chuyển trang
const link = document.querySelector('a');
link.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Link clicked but not followed');
});

// Ngăn form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle with AJAX
});

// Ngăn context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // Show custom menu
});

// Ngăn drag image
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});
```

### stopPropagation() - Ngăn bubbling
```javascript
button.addEventListener('click', (e) => {
    e.stopPropagation();
    // Event không bubble lên parent
});

// stopImmediatePropagation() - Ngăn cả listeners khác trên cùng element
button.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
});

button.addEventListener('click', () => {
    console.log('Never runs');
});
```

## removeEventListener()

```javascript
function handleClick() {
    console.log('Clicked');
}

// Add listener
button.addEventListener('click', handleClick);

// Remove listener
button.removeEventListener('click', handleClick);

// ⚠️ Phải dùng cùng function reference
// ❌ Không work
button.addEventListener('click', () => console.log('Hi'));
button.removeEventListener('click', () => console.log('Hi')); // Khác reference!

// ✅ Work
const handler = () => console.log('Hi');
button.addEventListener('click', handler);
button.removeEventListener('click', handler);
```

## Event Options

```javascript
element.addEventListener('click', handler, {
    capture: false,  // Capture phase hay bubble phase
    once: true,      // Chỉ chạy 1 lần rồi tự remove
    passive: true    // Không call preventDefault()
});

// once: true - Chỉ chạy 1 lần
button.addEventListener('click', () => {
    console.log('Only once!');
}, { once: true });

// passive: true - Tối ưu scroll performance
document.addEventListener('touchstart', handler, { passive: true });
```

## Custom Events

### Tạo và dispatch custom event
```javascript
// Tạo custom event
const myEvent = new CustomEvent('userLogin', {
    detail: {
        username: 'minh',
        timestamp: Date.now()
    }
});

// Listen custom event
document.addEventListener('userLogin', (e) => {
    console.log('User logged in:', e.detail.username);
    console.log('At:', new Date(e.detail.timestamp));
});

// Dispatch event
document.dispatchEvent(myEvent);

// Ví dụ thực tế - Component communication
class TabComponent {
    constructor() {
        this.tabs = document.querySelectorAll('.tab');
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.activateTab(tab);
            });
        });
    }
    
    activateTab(tab) {
        // Dispatch custom event
        const event = new CustomEvent('tabChanged', {
            detail: { tabId: tab.id }
        });
        document.dispatchEvent(event);
    }
}

// Listen ở component khác
document.addEventListener('tabChanged', (e) => {
    console.log('Tab changed to:', e.detail.tabId);
    updateContent(e.detail.tabId);
});
```

## Bài tập thực hành

### Bài 1: Counter với Keyboard
```javascript
const counter = document.querySelector('#counter');
let count = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        count++;
    } else if (e.key === 'ArrowDown') {
        count--;
    } else if (e.key === 'r' || e.key === 'R') {
        count = 0;
    }
    counter.textContent = count;
});
```

### Bài 2: Modal với ESC
```javascript
const modal = document.querySelector('.modal');
const openBtn = document.querySelector('#openModal');
const closeBtn = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// ESC để đóng
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
```

### Bài 3: Image Slider
```javascript
const slider = document.querySelector('.slider');
const images = document.querySelectorAll('.slider img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// Auto play
let autoPlay = setInterval(() => {
    nextBtn.click();
}, 3000);

// Pause on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
});

slider.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => nextBtn.click(), 3000);
});
```

### Bài 4: Infinite Scroll
```javascript
let page = 1;
let loading = false;

window.addEventListener('scroll', () => {
    if (loading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadMoreContent();
    }
});

async function loadMoreContent() {
    loading = true;
    console.log('Loading page', page);
    
    // Giả lập API call
    const newItems = await fetchItems(page);
    renderItems(newItems);
    
    page++;
    loading = false;
}

function fetchItems(page) {
    return new Promise(resolve => {
        setTimeout(() => {
            const items = Array.from({ length: 10 }, (_, i) => ({
                id: page * 10 + i,
                title: `Item ${page * 10 + i}`
            }));
            resolve(items);
        }, 1000);
    });
}

function renderItems(items) {
    const container = document.querySelector('#content');
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = item.title;
        container.appendChild(div);
    });
}
```

### Bài 5: Search with Debounce
```javascript
const searchInput = document.querySelector('#search');
const results = document.querySelector('#results');

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Search function
async function search(query) {
    if (query.length < 2) {
        results.innerHTML = '';
        return;
    }
    
    console.log('Searching for:', query);
    results.innerHTML = '<p>Đang tìm kiếm...</p>';
    
    // Giả lập API call
    setTimeout(() => {
        results.innerHTML = `
            <ul>
                <li>Kết quả 1 cho "${query}"</li>
                <li>Kết quả 2 cho "${query}"</li>
                <li>Kết quả 3 cho "${query}"</li>
            </ul>
        `;
    }, 500);
}

// Debounced search
const debouncedSearch = debounce(search, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
```

### Bài 6: Drag and Drop
```javascript
const draggables = document.querySelectorAll('.draggable');
const dropZones = document.querySelectorAll('.drop-zone');

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    });
    
    draggable.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });
});

dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Cho phép drop
        zone.classList.add('drag-over');
    });
    
    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });
    
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        zone.appendChild(draggable);
    });
});
```

## Performance Tips

### 1. Throttle vs Debounce
```javascript
// Debounce - Chờ user ngừng action
// Dùng cho: search, resize, input validation
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle - Giới hạn tần suất thực thi
// Dùng cho: scroll, mouse move, resize
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Sử dụng
window.addEventListener('scroll', throttle(() => {
    console.log('Scrolling...');
}, 100));
```

### 2. Passive Listeners
```javascript
// Tối ưu scroll/touch performance
document.addEventListener('touchstart', handler, { passive: true });
document.addEventListener('wheel', handler, { passive: true });
```

### 3. Event Delegation
```javascript
// ✅ Tốt - 1 listener
parent.addEventListener('click', (e) => {
    if (e.target.matches('.item')) {
        // Handle
    }
});

// ❌ Tệ - N listeners
items.forEach(item => {
    item.addEventListener('click', handler);
});
```

## Những lỗi thường gặp

### 1. This binding với Arrow Function
```javascript
const button = {
    text: 'Click me',
    
    // ❌ Arrow function - this là window
    handleClick: () => {
        console.log(this.text); // undefined
    },
    
    // ✅ Regular function - this là button
    handleClickCorrect: function() {
        console.log(this.text); // "Click me"
    }
};
```

### 2. Quên preventDefault
```javascript
// ❌ Form submit và reload trang
form.addEventListener('submit', () => {
    console.log('Submitting...');
});

// ✅ Ngăn reload
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submitting...');
});
```

### 3. Memory Leaks
```javascript
// ❌ Không remove listener
function init() {
    const btn = document.querySelector('button');
    btn.addEventListener('click', heavyFunction);
    // Nếu btn bị remove nhưng listener vẫn còn → memory leak
}

// ✅ Remove khi không cần
function init() {
    const btn = document.querySelector('button');
    btn.addEventListener('click', handler);
    
    // Cleanup
    return () => {
        btn.removeEventListener('click', handler);
    };
}
```

### 4. Event trong Loop
```javascript
// ❌ Closure problem
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        console.log(i); // Luôn in buttons.length
    });
}

// ✅ Dùng let
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        console.log(i); // In đúng index
    });
}

// ✅ Hoặc dùng forEach
buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        console.log(i);
    });
});
```

## Kinh nghiệm của mình

### 1. addEventListener > onclick
Luôn dùng `addEventListener` thay vì `onclick` attribute. Nó cho phép nhiều listeners và dễ quản lý.

### 2. Named functions cho reusable events
```javascript
// ✅ Tốt - Dễ debug và reuse
function handleSubmit(e) {
    e.preventDefault();
    // ...
}
form.addEventListener('submit', handleSubmit);

// ❌ Tệ - Khó debug
form.addEventListener('submit', (e) => { /* ... */ });
```

### 3. Console.log event object
Khi học event mới, log ra để xem properties:
```javascript
element.addEventListener('click', (e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.type);
});
```

### 4. Delegation cho dynamic content
Nếu elements được add/remove động, dùng event delegation.

### 5. Cleanup events
Luôn remove listeners khi không cần nữa, đặc biệt trong SPAs.

## So sánh các cách xử lý events

| Phương pháp | Ưu điểm | Nhược điểm |
|-------------|---------|------------|
| `onclick` attribute | Đơn giản | Mixing HTML/JS, chỉ 1 handler |
| `element.onclick` | Dễ dùng | Chỉ 1 handler per event |
| `addEventListener` | Nhiều handlers, options | Cú pháp dài hơn |
| Event Delegation | Performance tốt | Cần check target |

## Kết luận

Events là cốt lõi của trang web tương tác:

✅ **addEventListener()** - Cách hiện đại và mạnh mẽ
✅ **Event Object** - Chứa thông tin về event
✅ **preventDefault()** - Ngăn hành động mặc định
✅ **stopPropagation()** - Ngăn event bubbling
✅ **Event Delegation** - Tối ưu performance
✅ **Debounce/Throttle** - Giảm số lần thực thi

Trong bài tiếp theo: **Tổng kết và Kinh nghiệm học JavaScript**!

---

*Bạn đã làm feature tương tác nào thú vị chưa? Chia sẻ nhé! 🎯*