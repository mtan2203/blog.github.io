---
title: "Hàm trong JavaScript - Functions đầy sức mạnh"
date: 2025-09-27
draft: false
tags: ["javascript", "học tập", "function", "arrow function", "parameters"]
categories: ["JavaScript"]
description: "Tìm hiểu về Functions, cách tạo và sử dụng hàm hiệu quả trong JavaScript"
image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
---

## Hàm - Khối xây dựng của code

Hàm (Function) là một khối code có thể tái sử dụng, thực hiện một công việc cụ thể. Khi mình hiểu được hàm, mình cảm thấy như đã mở ra cánh cửa mới trong lập trình - code trở nên ngắn gọn, dễ đọc và dễ bảo trì hơn rất nhiều.

## Tại sao cần Functions?

### Không dùng function (Code lặp lại)
```javascript
console.log("=== Học sinh 1 ===");
console.log("Tên: Minh");
console.log("Điểm: 8.5");
console.log("Kết quả: Giỏi");

console.log("=== Học sinh 2 ===");
console.log("Tên: Lan");
console.log("Điểm: 7.0");
console.log("Kết quả: Khá");

console.log("=== Học sinh 3 ===");
console.log("Tên: Hùng");
console.log("Điểm: 9.0");
console.log("Kết quả: Xuất sắc");
```

### Dùng function (DRY - Don't Repeat Yourself)
```javascript
function showStudent(name, score) {
    console.log(`=== Học sinh ===`);
    console.log(`Tên: ${name}`);
    console.log(`Điểm: ${score}`);
    
    let result = score >= 8 ? "Giỏi" : score >= 6.5 ? "Khá" : "Trung bình";
    console.log(`Kết quả: ${result}`);
}

showStudent("Minh", 8.5);
showStudent("Lan", 7.0);
showStudent("Hùng", 9.0);
```

## Các cách khai báo Function

### 1. Function Declaration (Khai báo hàm)

```javascript
function greet(name) {
    return `Xin chào, ${name}!`;
}

console.log(greet("Minh")); // "Xin chào, Minh!"
```

**Đặc điểm:**
- Có hoisting (có thể gọi trước khi khai báo)
- Dễ đọc, rõ ràng

```javascript
// Hoisting - Gọi trước khai báo vẫn OK
sayHello(); // "Hello!"

function sayHello() {
    console.log("Hello!");
}
```

### 2. Function Expression (Biểu thức hàm)

```javascript
const greet = function(name) {
    return `Xin chào, ${name}!`;
};

console.log(greet("Lan")); // "Xin chào, Lan!"
```

**Đặc điểm:**
- Không có hoisting
- Thường gán cho const

```javascript
// ❌ Lỗi: không thể gọi trước
sayHi(); // Error!

const sayHi = function() {
    console.log("Hi!");
};
```

### 3. Arrow Function (Hàm mũi tên) - ES6

```javascript
// Cú pháp đầy đủ
const greet = (name) => {
    return `Xin chào, ${name}!`;
};

// Rút gọn (1 tham số, return ngầm)
const greet2 = name => `Xin chào, ${name}!`;

// Không có tham số
const sayHello = () => console.log("Hello!");

// Nhiều tham số
const add = (a, b) => a + b;

console.log(add(5, 3)); // 8
```

**Khi nào dùng Arrow Function?**
- Callback functions
- Code ngắn gọn
- Không cần `this` binding

## Parameters (Tham số) và Arguments (Đối số)

### Parameters - Tham số
```javascript
function introduce(name, age) {
    // name và age là parameters
    console.log(`Tôi là ${name}, ${age} tuổi`);
}
```

### Arguments - Đối số
```javascript
introduce("Minh", 20); // "Minh" và 20 là arguments
```

### Default Parameters (Tham số mặc định)

```javascript
function greet(name = "bạn", greeting = "Xin chào") {
    return `${greeting}, ${name}!`;
}

console.log(greet()); // "Xin chào, bạn!"
console.log(greet("Minh")); // "Xin chào, Minh!"
console.log(greet("Lan", "Chào")); // "Chào, Lan!"
```

### Rest Parameters (Tham số còn lại)

```javascript
function sum(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10)); // 10
```

**Ví dụ thực tế:**
```javascript
function createUser(name, age, ...hobbies) {
    return {
        name,
        age,
        hobbies
    };
}

const user = createUser("Minh", 20, "code", "game", "music");
console.log(user);
// { name: "Minh", age: 20, hobbies: ["code", "game", "music"] }
```

## Return Statement

### Return giá trị
```javascript
function multiply(a, b) {
    return a * b;
}

let result = multiply(5, 3);
console.log(result); // 15
```

### Return object
```javascript
function createStudent(name, score) {
    return {
        name: name,
        score: score,
        passed: score >= 5
    };
}

const student = createStudent("Minh", 8);
console.log(student);
// { name: "Minh", score: 8, passed: true }
```

### Early return (Thoát sớm)
```javascript
function divide(a, b) {
    if (b === 0) {
        return "Không thể chia cho 0!";
    }
    return a / b;
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // "Không thể chia cho 0!"
```

### Không có return
```javascript
function logMessage(message) {
    console.log(message);
    // Không có return → trả về undefined
}

let result = logMessage("Hello");
console.log(result); // undefined
```

## Scope (Phạm vi)

### Function Scope
```javascript
function myFunction() {
    let x = 10; // Chỉ tồn tại trong function
    console.log(x); // 10
}

myFunction();
// console.log(x); // ❌ Error: x is not defined
```

### Block Scope
```javascript
function test() {
    let x = 1;
    
    if (true) {
        let x = 2; // Biến khác với x bên ngoài
        console.log(x); // 2
    }
    
    console.log(x); // 1
}
```

### Global vs Local
```javascript
let globalVar = "Tôi là global";

function myFunc() {
    let localVar = "Tôi là local";
    console.log(globalVar); // ✅ Truy cập được
    console.log(localVar); // ✅ Truy cập được
}

myFunc();
console.log(globalVar); // ✅ OK
// console.log(localVar); // ❌ Error
```

## Callback Functions

Hàm được truyền như tham số vào hàm khác:

```javascript
function processUser(name, callback) {
    console.log("Đang xử lý user:", name);
    callback(name);
}

function welcomeUser(name) {
    console.log(`Chào mừng ${name}!`);
}

processUser("Minh", welcomeUser);
// Đang xử lý user: Minh
// Chào mừng Minh!
```

**Với Arrow Function:**
```javascript
processUser("Lan", (name) => {
    console.log(`${name} đã đăng nhập thành công!`);
});
```

## Higher-Order Functions

Hàm nhận hàm làm tham số hoặc trả về hàm:

```javascript
// Hàm trả về hàm
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## IIFE (Immediately Invoked Function Expression)

Hàm tự gọi ngay sau khi định nghĩa:

```javascript
(function() {
    console.log("Tôi chạy ngay!");
})();

// Với tham số
(function(name) {
    console.log("Hello,", name);
})("Minh");

// Arrow function IIFE
(() => {
    console.log("ES6 IIFE");
})();
```

## Bài tập thực hành

### Bài 1: Calculator
```javascript
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : "Error: Division by zero"
};

console.log(calculator.add(5, 3)); // 8
console.log(calculator.divide(10, 0)); // "Error: Division by zero"
```

### Bài 2: Grade Calculator
```javascript
function calculateGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

console.log(calculateGrade(85)); // "B"
console.log(calculateGrade(55)); // "F"
```

### Bài 3: Find Max
```javascript
function findMax(...numbers) {
    if (numbers.length === 0) return undefined;
    
    let max = numbers[0];
    for (let num of numbers) {
        if (num > max) max = num;
    }
    return max;
}

console.log(findMax(5, 2, 9, 1, 7)); // 9
```

### Bài 4: Palindrome Checker
```javascript
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("hello")); // false
```

### Bài 5: Temperature Converter
```javascript
const tempConverter = {
    cToF: (celsius) => (celsius * 9/5) + 32,
    fToC: (fahrenheit) => (fahrenheit - 32) * 5/9,
    cToK: (celsius) => celsius + 273.15,
    kToC: (kelvin) => kelvin - 273.15
};

console.log(tempConverter.cToF(25)); // 77
console.log(tempConverter.fToC(77)); // 25
```

## Best Practices

### 1. Đặt tên hàm có ý nghĩa
```javascript
// ❌ Tệ
function calc(x, y) { return x + y; }

// ✅ Tốt
function calculateTotal(price, tax) { return price + tax; }
```

### 2. Hàm chỉ nên làm một việc
```javascript
// ❌ Làm quá nhiều việc
function processUser(user) {
    validateUser(user);
    saveToDatabase(user);
    sendEmail(user);
    logActivity(user);
}

// ✅ Tách thành các hàm nhỏ
function processUser(user) {
    if (!validateUser(user)) return false;
    saveUser(user);
}

function notifyUser(user) {
    sendEmail(user);
    logActivity(user);
}
```

### 3. Tránh side effects
```javascript
// ❌ Thay đổi biến bên ngoài
let total = 0;
function add(num) {
    total += num; // Side effect!
}

// ✅ Pure function
function add(a, b) {
    return a + b; // Không side effect
}
```

### 4. Sử dụng const cho functions
```javascript
// ✅ Tốt - Không thể gán lại
const calculateArea = (width, height) => width * height;
```

### 5. Return sớm để tránh nested if
```javascript
// ❌ Khó đọc
function checkAge(age) {
    if (age > 0) {
        if (age < 18) {
            return "Trẻ em";
        } else {
            return "Người lớn";
        }
    } else {
        return "Tuổi không hợp lệ";
    }
}

// ✅ Dễ đọc
function checkAge(age) {
    if (age <= 0) return "Tuổi không hợp lệ";
    if (age < 18) return "Trẻ em";
    return "Người lớn";
}
```

## Kinh nghiệm của mình

### 1. Bắt đầu với function nhỏ
Khi mới học, mình hay viết function quá dài. Bây giờ mình tuân theo quy tắc: một function không quá 20 dòng.

### 2. Đặt tên theo hành động
Dùng động từ: `calculateTotal()`, `getUserData()`, `validateEmail()`

### 3. Document phức tạp
```javascript
/**
 * Tính thuế VAT
 * @param {number} price - Giá gốc
 * @param {number} taxRate - Thuế suất (%)
 * @returns {number} Tổng tiền sau thuế
 */
function calculateVAT(price, taxRate = 10) {
    return price + (price * taxRate / 100);
}
```

### 4. Test từng function riêng
Viết function nhỏ giúp dễ test và debug hơn.

## Arrow Function vs Regular Function

| Đặc điểm | Regular Function | Arrow Function |
|----------|-----------------|----------------|
| Cú pháp | Dài hơn | Ngắn gọn |
| `this` binding | Có | Không |
| Hoisting | Có (declaration) | Không |
| Constructor | Có thể dùng `new` | Không thể |
| `arguments` object | Có | Không |

**Khi nào dùng gì?**
- **Arrow**: Callbacks, functions ngắn, không cần `this`
- **Regular**: Methods trong object, cần `this`, constructors

## Kết luận

Functions là công cụ quan trọng nhất trong JavaScript. Những điểm chính:

✅ 3 cách khai báo: Declaration, Expression, Arrow
✅ Parameters & Arguments
✅ Return values
✅ Scope và hoisting
✅ Callback và Higher-order functions
✅ DRY principle - Đừng lặp lại code

Trong bài tiếp theo, mình sẽ chia sẻ về **Objects và Arrays** - cấu trúc dữ liệu quan trọng trong JavaScript!

---

*Bạn thích cách nào để khai báo function? Hãy chia sẻ nhé! 🚀*