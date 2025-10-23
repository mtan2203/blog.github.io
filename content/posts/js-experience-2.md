---
title: "Biến và kiểu dữ liệu trong JavaScript"
date: 2025-09-18
draft: false
tags: ["javascript", "học tập", "biến", "kiểu dữ liệu", "var", "let", "const"]
categories: ["JavaScript"]
description: "Tìm hiểu về cách khai báo biến và các kiểu dữ liệu trong JavaScript"
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
---

## Hiểu về biến trong JavaScript

Biến là "hộp chứa" để lưu trữ dữ liệu trong chương trình. Trong JavaScript, chúng ta có ba cách khai báo biến: `var`, `let`, và `const`. Ban đầu mình khá bối rối với sự khác biệt giữa chúng, nhưng sau khi hiểu rõ, việc sử dụng trở nên rất đơn giản.

## Ba cách khai báo biến

### 1. var (Cách cũ - không nên dùng)

```javascript
var name = "Nguyễn Văn A";
var age = 20;
var age = 25; // Có thể khai báo lại - dễ gây lỗi!
```

**Vấn đề với var:**
- Có thể khai báo lại cùng tên
- Function scope (phạm vi hàm)
- Hoisting (được "kéo lên" đầu)

### 2. let (Khuyên dùng cho giá trị thay đổi)

```javascript
let score = 100;
score = 95; // Có thể thay đổi giá trị
console.log(score); // 95

// let score = 90; // ❌ Lỗi: không thể khai báo lại
```

**Ưu điểm của let:**
- Block scope (phạm vi khối {})
- Không thể khai báo lại
- Giá trị có thể thay đổi

### 3. const (Khuyên dùng mặc định)

```javascript
const PI = 3.14159;
const birthYear = 2004;
// PI = 3.14; // ❌ Lỗi: không thể gán lại

const student = {
    name: "Minh",
    age: 20
};
student.age = 21; // ✅ OK: có thể thay đổi thuộc tính
// student = {}; // ❌ Lỗi: không thể gán object mới
```

**Đặc điểm const:**
- Phải gán giá trị khi khai báo
- Không thể gán lại
- Với object/array: có thể thay đổi nội dung nhưng không thể gán lại

## Quy tắc đặt tên biến

```javascript
// ✅ Tên hợp lệ
let userName = "John";
let age = 25;
let _private = "data";
let $jquery = "library";
let user2 = "User 2";

// ❌ Tên không hợp lệ
// let 2user = "error"; // Không bắt đầu bằng số
// let user-name = "error"; // Không dùng dấu gạch ngang
// let let = "error"; // Không dùng từ khóa
```

**Best practices:**
- Dùng camelCase: `userName`, `firstName`
- Tên có ý nghĩa: `totalPrice` thay vì `x`
- Hằng số viết HOA: `MAX_SIZE`, `API_KEY`

## Các kiểu dữ liệu trong JavaScript

### 1. Number (Số)

```javascript
let age = 20;
let price = 99.99;
let negative = -15;
let infinity = Infinity;
let notANumber = NaN; // Not a Number

console.log(typeof age); // "number"
```

JavaScript chỉ có một kiểu số (không phân biệt integer/float như Java).

### 2. String (Chuỗi)

```javascript
let name = "Minh";
let message = 'Hello World';
let template = `Xin chào ${name}`; // Template literal

// Nối chuỗi
let fullName = "Nguyễn" + " " + "Văn" + " " + "A";
let greeting = `Chào bạn ${name}, năm nay ${2025 - 2004} tuổi`;

console.log(typeof name); // "string"
```

**Template literal** (backtick `) rất tiện:
- Có thể xuống dòng
- Chèn biến với `${}`
- Dễ đọc hơn nối chuỗi

### 3. Boolean (Đúng/Sai)

```javascript
let isStudent = true;
let hasPassed = false;
let isAdult = age >= 18; // true nếu age >= 18

console.log(typeof isStudent); // "boolean"
```

Thường dùng trong điều kiện if/else.

### 4. Undefined

```javascript
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"
```

Biến đã khai báo nhưng chưa gán giá trị.

### 5. Null

```javascript
let data = null; // Cố ý gán "không có giá trị"
console.log(data); // null
console.log(typeof data); // "object" (bug của JS!)
```

**Khác biệt undefined vs null:**
- `undefined`: Hệ thống tự gán (chưa khởi tạo)
- `null`: Lập trình viên gán (cố ý để trống)

### 6. Object (Đối tượng)

```javascript
let student = {
    name: "Minh",
    age: 20,
    major: "IT"
};

console.log(student.name); // "Minh"
console.log(typeof student); // "object"
```

### 7. Array (Mảng)

```javascript
let fruits = ["táo", "chuối", "cam"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

console.log(fruits[0]); // "táo"
console.log(typeof fruits); // "object"
console.log(Array.isArray(fruits)); // true
```

## Type Conversion (Chuyển đổi kiểu)

### Tự động (Implicit)

```javascript
let result1 = "5" + 3; // "53" (string)
let result2 = "5" - 3; // 2 (number)
let result3 = "5" * "2"; // 10 (number)
```

Đây là lý do dễ gây nhầm lẫn nhất của JavaScript!

### Thủ công (Explicit)

```javascript
// String sang Number
let str = "123";
let num1 = Number(str); // 123
let num2 = parseInt(str); // 123
let num3 = parseFloat("123.45"); // 123.45
let num4 = +str; // 123 (cách ngắn gọn)

// Number sang String
let age = 20;
let str1 = String(age); // "20"
let str2 = age.toString(); // "20"
let str3 = age + ""; // "20"

// Sang Boolean
let bool1 = Boolean(1); // true
let bool2 = Boolean(0); // false
let bool3 = Boolean("hello"); // true
let bool4 = Boolean(""); // false
```

## Checking Types

```javascript
let name = "Minh";
let age = 20;
let isStudent = true;
let data = null;
let nothing;
let user = {};
let numbers = [];

console.log(typeof name); // "string"
console.log(typeof age); // "number"
console.log(typeof isStudent); // "boolean"
console.log(typeof data); // "object" (quirk!)
console.log(typeof nothing); // "undefined"
console.log(typeof user); // "object"
console.log(typeof numbers); // "object"

// Kiểm tra array
console.log(Array.isArray(numbers)); // true
console.log(Array.isArray(user)); // false

// Kiểm tra null
console.log(data === null); // true
```

## Những lỗi thường gặp

### 1. Quên khai báo biến

```javascript
// ❌ Sai
score = 100; // Tạo biến global (rất nguy hiểm!)

// ✅ Đúng
let score = 100;
```

### 2. Nhầm lẫn undefined và null

```javascript
let x; // undefined
let y = null; // null

if (x == null) console.log("x là null hoặc undefined"); // true
if (x === null) console.log("x là null"); // false
if (x === undefined) console.log("x là undefined"); // true
```

### 3. Type coercion không mong muốn

```javascript
console.log("5" + 3); // "53" không phải 8
console.log("5" - 3); // 2 không phải "5-3"

// Nên dùng
console.log(Number("5") + 3); // 8
```

## Bài học của mình

### 1. Luôn dùng const trước
Bắt đầu với `const`, chỉ dùng `let` khi thực sự cần thay đổi giá trị. Không bao giờ dùng `var`.

```javascript
// ✅ Tốt
const userName = "Minh";
let score = 0;
score += 10;

// ❌ Tránh
var x = 10;
```

### 2. Kiểm tra kiểu dữ liệu
Khi nhận dữ liệu từ user input hoặc API, luôn kiểm tra kiểu:

```javascript
function calculate(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return "Vui lòng nhập số!";
    }
    return num1 + num2;
}
```

### 3. Cẩn thận với == và ===

```javascript
console.log(5 == "5"); // true (so sánh giá trị)
console.log(5 === "5"); // false (so sánh cả kiểu)

// Nên dùng === và !==
if (age === 18) {
    console.log("Vừa đủ tuổi");
}
```

## Thực hành

Hãy thử các bài tập này:

```javascript
// Bài 1: Khai báo biến
const myName = "Tên của bạn";
let myAge = 20;
let isLearning = true;

// Bài 2: Chuyển đổi kiểu
let str = "100";
let num = Number(str);
console.log(num + 50); // 150

// Bài 3: Template literal
let product = "Laptop";
let price = 20000000;
let message = `Sản phẩm ${product} có giá ${price.toLocaleString('vi-VN')}đ`;
console.log(message);
```

## Kết luận

Hiểu rõ về biến và kiểu dữ liệu là nền tảng để học JavaScript. Những điểm chính:

✅ Dùng `const` mặc định, `let` khi cần thay đổi
✅ JavaScript có 7 kiểu dữ liệu cơ bản
✅ Cẩn thận với type coercion
✅ Luôn dùng `===` thay vì `==`
✅ Đặt tên biến có ý nghĩa

Trong bài tiếp theo, mình sẽ chia sẻ về câu lệnh điều kiện và cách ra quyết định trong code!

---

*Bạn có gặp khó khăn gì với biến và kiểu dữ liệu không? Hãy comment để mình hỗ trợ nhé!*