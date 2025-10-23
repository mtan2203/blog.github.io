---
title: "Đối tượng và Mảng - Objects & Arrays trong JavaScript"
date: 2025-09-30
draft: false
tags: ["javascript", "học tập", "object", "array", "data structures"]
categories: ["JavaScript"]
description: "Làm chủ Objects và Arrays - hai cấu trúc dữ liệu quan trọng nhất trong JavaScript"
image: "https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=800&h=400&fit=crop"
---

## Giới thiệu về Objects và Arrays

Objects và Arrays là hai cấu trúc dữ liệu cơ bản và quan trọng nhất trong JavaScript. Chúng giúp tổ chức và quản lý dữ liệu phức tạp một cách hiệu quả.

- **Object**: Lưu trữ dữ liệu dạng key-value (cặp khóa-giá trị)
- **Array**: Lưu trữ danh sách có thứ tự

## PHẦN 1: OBJECTS

### Tạo Object

```javascript
// Cách 1: Object literal (phổ biến nhất)
const student = {
    name: "Nguyễn Văn Minh",
    age: 20,
    major: "Công nghệ thông tin",
    gpa: 3.5,
    isActive: true
};

// Cách 2: new Object()
const person = new Object();
person.name = "Lan";
person.age = 22;

// Cách 3: Object.create()
const user = Object.create(null);
user.username = "minh123";
```

### Truy cập thuộc tính

```javascript
const student = {
    name: "Minh",
    age: 20,
    major: "IT"
};

// Dot notation
console.log(student.name); // "Minh"
console.log(student.age); // 20

// Bracket notation
console.log(student["name"]); // "Minh"
console.log(student["major"]); // "IT"

// Dùng biến
const prop = "age";
console.log(student[prop]); // 20
```

### Thêm, sửa, xóa thuộc tính

```javascript
const user = {
    name: "Minh",
    age: 20
};

// Thêm thuộc tính
user.email = "minh@email.com";
user["phone"] = "0123456789";

// Sửa thuộc tính
user.age = 21;
user["name"] = "Minh Nguyễn";

// Xóa thuộc tính
delete user.phone;

console.log(user);
// { name: "Minh Nguyễn", age: 21, email: "minh@email.com" }
```

### Methods trong Object

```javascript
const calculator = {
    value: 0,
    
    add: function(num) {
        this.value += num;
        return this;
    },
    
    subtract(num) { // Shorthand syntax
        this.value -= num;
        return this;
    },
    
    multiply: (num) => { // Arrow function
        // ⚠️ Arrow function không có 'this' riêng
        console.log(this); // undefined hoặc window
    },
    
    getValue() {
        return this.value;
    },
    
    reset() {
        this.value = 0;
        return this;
    }
};

// Method chaining
calculator.add(5).add(3).subtract(2);
console.log(calculator.getValue()); // 6
```

### Nested Objects (Object lồng nhau)

```javascript
const student = {
    name: "Minh",
    age: 20,
    address: {
        street: "123 Nguyễn Huệ",
        city: "TP.HCM",
        country: "Việt Nam"
    },
    scores: {
        math: 8.5,
        english: 7.0,
        physics: 9.0
    }
};

// Truy cập nested properties
console.log(student.address.city); // "TP.HCM"
console.log(student.scores.math); // 8.5

// Optional chaining (?.)
console.log(student.address?.zipCode); // undefined (không lỗi)
```

### Object Methods (Built-in)

```javascript
const user = {
    name: "Minh",
    age: 20,
    email: "minh@example.com"
};

// Object.keys() - Lấy array của keys
console.log(Object.keys(user)); 
// ["name", "age", "email"]

// Object.values() - Lấy array của values
console.log(Object.values(user)); 
// ["Minh", 20, "minh@example.com"]

// Object.entries() - Lấy array của [key, value] pairs
console.log(Object.entries(user));
// [["name", "Minh"], ["age", 20], ["email", "minh@example.com"]]

// Object.assign() - Copy object
const userCopy = Object.assign({}, user);

// Spread operator (ES6)
const userClone = { ...user };

// Object.freeze() - Không thể thay đổi
Object.freeze(user);
user.age = 25; // Không có hiệu lực

// Object.seal() - Không thể thêm/xóa thuộc tính
Object.seal(user);
```

### Duyệt qua Object

```javascript
const scores = {
    math: 8,
    english: 7,
    physics: 9
};

// for...in
for (let subject in scores) {
    console.log(`${subject}: ${scores[subject]}`);
}

// Object.keys()
Object.keys(scores).forEach(subject => {
    console.log(`${subject}: ${scores[subject]}`);
});

// Object.entries()
for (let [subject, score] of Object.entries(scores)) {
    console.log(`${subject}: ${score}`);
}
```

## PHẦN 2: ARRAYS

### Tạo Array

```javascript
// Array literal
const fruits = ["táo", "chuối", "cam"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "hello", true, null, {name: "Minh"}];

// new Array()
const arr1 = new Array(3); // [empty × 3]
const arr2 = new Array(1, 2, 3); // [1, 2, 3]

// Array.of()
const arr3 = Array.of(7); // [7]
const arr4 = Array.of(1, 2, 3); // [1, 2, 3]

// Array.from()
const str = "hello";
const chars = Array.from(str); // ["h", "e", "l", "l", "o"]
```

### Truy cập phần tử

```javascript
const fruits = ["táo", "chuối", "cam", "xoài", "dưa hấu"];

// Index từ 0
console.log(fruits[0]); // "táo"
console.log(fruits[2]); // "cam"

// Index âm (không chính thức, dùng at())
console.log(fruits.at(-1)); // "dưa hấu" (phần tử cuối)
console.log(fruits.at(-2)); // "xoài"

// Độ dài
console.log(fruits.length); // 5

// Phần tử cuối
console.log(fruits[fruits.length - 1]); // "dưa hấu"
```

### Thêm/Xóa phần tử

```javascript
let fruits = ["táo", "chuối"];

// Thêm vào cuối
fruits.push("cam"); // ["táo", "chuối", "cam"]
fruits.push("xoài", "dưa"); // Thêm nhiều phần tử

// Thêm vào đầu
fruits.unshift("dâu"); // ["dâu", "táo", "chuối", "cam", "xoài", "dưa"]

// Xóa phần tử cuối
let last = fruits.pop(); // "dưa"

// Xóa phần tử đầu
let first = fruits.shift(); // "dâu"

// Xóa/thêm ở vị trí bất kỳ (splice)
fruits.splice(1, 2); // Xóa 2 phần tử từ index 1
fruits.splice(1, 0, "nho", "lê"); // Thêm vào index 1
fruits.splice(1, 1, "kiwi"); // Thay thế 1 phần tử tại index 1
```

### Array Methods quan trọng

#### 1. map() - Biến đổi từng phần tử

```javascript
const numbers = [1, 2, 3, 4, 5];

// Nhân đôi mỗi số
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Object array
const students = [
    { name: "Minh", score: 8 },
    { name: "Lan", score: 9 },
    { name: "Hùng", score: 7 }
];

const names = students.map(student => student.name);
console.log(names); // ["Minh", "Lan", "Hùng"]
```

#### 2. filter() - Lọc phần tử

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Lọc số chẵn
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

// Lọc học sinh đạt
const students = [
    { name: "Minh", score: 8 },
    { name: "Lan", score: 4 },
    { name: "Hùng", score: 7 }
];

const passedStudents = students.filter(s => s.score >= 5);
console.log(passedStudents);
// [{ name: "Minh", score: 8 }, { name: "Hùng", score: 7 }]
```

#### 3. reduce() - Giảm về một giá trị

```javascript
const numbers = [1, 2, 3, 4, 5];

// Tính tổng
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15

// Tính tích
const product = numbers.reduce((result, num) => result * num, 1);
console.log(product); // 120

// Tìm max
const max = numbers.reduce((max, num) => num > max ? num : max);
console.log(max); // 5

// Đếm số lần xuất hiện
const fruits = ["táo", "chuối", "táo", "cam", "chuối", "táo"];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count); // { táo: 3, chuối: 2, cam: 1 }
```

#### 4. find() & findIndex()

```javascript
const users = [
    { id: 1, name: "Minh" },
    { id: 2, name: "Lan" },
    { id: 3, name: "Hùng" }
];

// Tìm user đầu tiên
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Lan" }

// Tìm index
const index = users.findIndex(u => u.name === "Hùng");
console.log(index); // 2
```

#### 5. some() & every()

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - Có ít nhất 1 phần tử thỏa điều kiện?
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true

// every() - Tất cả phần tử thỏa điều kiện?
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true
```

#### 6. sort() - Sắp xếp

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Sắp xếp số tăng dần
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]

// Sắp xếp giảm dần
numbers.sort((a, b) => b - a);

// Sắp xếp object
const students = [
    { name: "Minh", score: 7 },
    { name: "Lan", score: 9 },
    { name: "Hùng", score: 8 }
];

students.sort((a, b) => b.score - a.score);
console.log(students);
// Lan (9), Hùng (8), Minh (7)
```

#### 7. slice() & splice()

```javascript
const fruits = ["táo", "chuối", "cam", "xoài", "dưa"];

// slice() - Copy một phần (không thay đổi array gốc)
const someFruits = fruits.slice(1, 3);
console.log(someFruits); // ["chuối", "cam"]
console.log(fruits); // Không đổi

// splice() - Xóa/thêm (thay đổi array gốc)
const removed = fruits.splice(1, 2, "nho", "lê");
console.log(removed); // ["chuối", "cam"]
console.log(fruits); // ["táo", "nho", "lê", "xoài", "dưa"]
```

#### 8. join() & split()

```javascript
// join() - Array → String
const words = ["Hello", "World", "JavaScript"];
const sentence = words.join(" ");
console.log(sentence); // "Hello World JavaScript"

// split() - String → Array
const str = "táo,chuối,cam";
const fruits = str.split(",");
console.log(fruits); // ["táo", "chuối", "cam"]
```

#### 9. includes() & indexOf()

```javascript
const fruits = ["táo", "chuối", "cam"];

// includes() - Có chứa không?
console.log(fruits.includes("chuối")); // true
console.log(fruits.includes("xoài")); // false

// indexOf() - Vị trí đầu tiên
console.log(fruits.indexOf("cam")); // 2
console.log(fruits.indexOf("xoài")); // -1 (không tìm thấy)

// lastIndexOf() - Vị trí cuối cùng
const numbers = [1, 2, 3, 2, 1];
console.log(numbers.lastIndexOf(2)); // 3
```

### Array Destructuring

```javascript
const fruits = ["táo", "chuối", "cam", "xoài"];

// Destructuring
const [first, second] = fruits;
console.log(first); // "táo"
console.log(second); // "chuối"

// Skip elements
const [, , third] = fruits;
console.log(third); // "cam"

// Rest operator
const [one, ...rest] = fruits;
console.log(one); // "táo"
console.log(rest); // ["chuối", "cam", "xoài"]

// Swap variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

### Spread Operator

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Nối arrays
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1];

// Thêm phần tử
const extended = [0, ...arr1, 4];
console.log(extended); // [0, 1, 2, 3, 4]

// Math với spread
const numbers = [5, 2, 9, 1, 7];
console.log(Math.max(...numbers)); // 9
```

## Bài tập thực hành

### Bài 1: Student Management
```javascript
const students = [
    { id: 1, name: "Minh", score: 8.5 },
    { id: 2, name: "Lan", score: 7.0 },
    { id: 3, name: "Hùng", score: 9.0 },
    { id: 4, name: "Mai", score: 6.5 }
];

// Tìm học sinh điểm cao nhất
const topStudent = students.reduce((max, student) => 
    student.score > max.score ? student : max
);

// Tính điểm trung bình
const avgScore = students.reduce((sum, s) => sum + s.score, 0) / students.length;

// Lọc học sinh giỏi (>= 8.0)
const excellentStudents = students.filter(s => s.score >= 8.0);

console.log("Top:", topStudent.name);
console.log("TB:", avgScore.toFixed(2));
console.log("Giỏi:", excellentStudents.map(s => s.name));
```

### Bài 2: Shopping Cart
```javascript
const cart = [
    { name: "Laptop", price: 20000000, quantity: 1 },
    { name: "Mouse", price: 200000, quantity: 2 },
    { name: "Keyboard", price: 500000, quantity: 1 }
];

// Tính tổng tiền
const total = cart.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
);

console.log("Tổng:", total.toLocaleString('vi-VN'), "đ");
// Tổng: 20,900,000 đ
```

### Bài 3: Remove Duplicates
```javascript
const numbers = [1, 2, 2, 3, 4, 4, 5, 5, 5];

// Cách 1: Set
const unique1 = [...new Set(numbers)];

// Cách 2: filter
const unique2 = numbers.filter((num, index) => 
    numbers.indexOf(num) === index
);

console.log(unique1); // [1, 2, 3, 4, 5]
```

## Kết luận

Objects và Arrays là nền tảng để làm việc với dữ liệu trong JavaScript:

✅ **Object**: Key-value pairs, methods, nested objects
✅ **Array**: Ordered list, nhiều methods mạnh mẽ
✅ **Array Methods**: map, filter, reduce, find, sort...
✅ **Destructuring & Spread**: Cú pháp hiện đại ES6+

Trong bài tiếp theo: **DOM Manipulation** - Tương tác với HTML!

---

*Bạn thích dùng method nào nhất? Comment nhé! 💬*