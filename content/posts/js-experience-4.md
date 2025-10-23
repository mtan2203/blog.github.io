---
title: "Vòng lặp và tư duy lặp trong JavaScript"
date: 2025-09-24
draft: false
tags: ["javascript", "học tập", "vòng lặp", "for", "while", "loop"]
categories: ["JavaScript"]
description: "Tìm hiểu các loại vòng lặp và cách sử dụng chúng hiệu quả"
image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop"
---

## Sức mạnh của vòng lặp

Vòng lặp (loop) cho phép chúng ta thực hiện một công việc nhiều lần mà không cần viết lại code. Đây là một trong những khái niệm quan trọng nhất trong lập trình.

Tưởng tượng bạn cần in ra "Hello" 100 lần. Thay vì viết 100 dòng `console.log()`, bạn chỉ cần một vòng lặp!

## Các loại vòng lặp trong JavaScript

### 1. Vòng lặp for - Phổ biến nhất

Cú pháp cơ bản:
```javascript
for (khởi_tạo; điều_kiện; bước_nhảy) {
    // Code thực thi
}
```

**Ví dụ đơn giản:**
```javascript
for (let i = 0; i < 5; i++) {
    console.log("Lần lặp thứ:", i);
}
// Output:
// Lần lặp thứ: 0
// Lần lặp thứ: 1
// Lần lặp thứ: 2
// Lần lặp thứ: 3
// Lần lặp thứ: 4
```

**Giải thích:**
- `let i = 0`: Bắt đầu từ 0
- `i < 5`: Lặp khi i nhỏ hơn 5
- `i++`: Tăng i lên 1 sau mỗi lần lặp

**Ví dụ thực tế - Tính tổng:**
```javascript
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log("Tổng từ 1 đến 10:", sum); // 55
```

**Lặp ngược:**
```javascript
for (let i = 5; i > 0; i--) {
    console.log("Đếm ngược:", i);
}
// 5, 4, 3, 2, 1
```

### 2. Vòng lặp while

Lặp khi điều kiện còn đúng:
```javascript
let count = 0;
while (count < 5) {
    console.log("Count:", count);
    count++;
}
```

**Ví dụ thực tế - Đoán số:**
```javascript
let targetNumber = 7;
let guess = 0;

while (guess !== targetNumber) {
    guess = Math.floor(Math.random() * 10);
    console.log("Đoán:", guess);
}
console.log("Đúng rồi!");
```

**⚠️ Cẩn thận vòng lặp vô hạn:**
```javascript
// ❌ NGUY HIỂM - Vòng lặp vô hạn
let x = 0;
while (x < 5) {
    console.log(x);
    // Quên tăng x++ → lặp mãi mãi!
}

// ✅ ĐÚNG
let y = 0;
while (y < 5) {
    console.log(y);
    y++; // Nhớ tăng biến!
}
```

### 3. Vòng lặp do...while

Chạy ít nhất 1 lần, sau đó kiểm tra điều kiện:
```javascript
let i = 0;
do {
    console.log("Chạy lần:", i);
    i++;
} while (i < 5);
```

**Khác biệt với while:**
```javascript
// while - Không chạy nếu điều kiện false ngay từ đầu
let x = 10;
while (x < 5) {
    console.log("while:", x); // Không in gì
}

// do-while - Chạy ít nhất 1 lần
let y = 10;
do {
    console.log("do-while:", y); // In ra 10
} while (y < 5);
```

### 4. Vòng lặp for...of (Duyệt mảng)

Duyệt qua từng phần tử của mảng:
```javascript
const fruits = ["táo", "chuối", "cam", "xoài"];

for (let fruit of fruits) {
    console.log("Tôi thích:", fruit);
}
// Output:
// Tôi thích: táo
// Tôi thích: chuối
// Tôi thích: cam
// Tôi thích: xoài
```

**So sánh với for thông thường:**
```javascript
// Cách cũ
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Cách mới - Dễ đọc hơn
for (let fruit of fruits) {
    console.log(fruit);
}
```

### 5. Vòng lặp for...in (Duyệt object)

Duyệt qua các thuộc tính của object:
```javascript
const student = {
    name: "Minh",
    age: 20,
    major: "IT"
};

for (let key in student) {
    console.log(key + ":", student[key]);
}
// Output:
// name: Minh
// age: 20
// major: IT
```

## Break và Continue

### break - Thoát khỏi vòng lặp

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // Dừng vòng lặp khi i = 5
    }
    console.log(i); // 0, 1, 2, 3, 4
}
```

**Ví dụ thực tế - Tìm số đầu tiên:**
```javascript
const numbers = [1, 3, 5, 8, 9, 12, 15];
let firstEven;

for (let num of numbers) {
    if (num % 2 === 0) {
        firstEven = num;
        break; // Tìm thấy rồi, dừng lại
    }
}
console.log("Số chẵn đầu tiên:", firstEven); // 8
```

### continue - Bỏ qua lần lặp hiện tại

```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue; // Bỏ qua số chẵn
    }
    console.log(i); // 1, 3, 5, 7, 9
}
```

**Ví dụ - Lọc số:**
```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let num of numbers) {
    if (num % 2 === 0) {
        continue; // Bỏ qua số chẵn
    }
    console.log("Số lẻ:", num);
}
```

## Vòng lặp lồng nhau (Nested Loop)

Vòng lặp bên trong vòng lặp:
```javascript
// In bảng cửu chương
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
    console.log("---");
}
```

**Vẽ hình tam giác:**
```javascript
let rows = 5;
for (let i = 1; i <= rows; i++) {
    let pattern = "";
    for (let j = 1; j <= i; j++) {
        pattern += "* ";
    }
    console.log(pattern);
}
// *
// * *
// * * *
// * * * *
// * * * * *
```

## Bài tập thực hành

### Bài 1: Tính giai thừa
```javascript
function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorial(5)); // 120 (5! = 5x4x3x2x1)
```

### Bài 2: Đảo ngược chuỗi
```javascript
function reverseString(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

console.log(reverseString("Hello")); // "olleH"
```

### Bài 3: Tìm số lớn nhất trong mảng
```javascript
const numbers = [45, 23, 89, 12, 67, 34];
let max = numbers[0];

for (let num of numbers) {
    if (num > max) {
        max = num;
    }
}
console.log("Số lớn nhất:", max); // 89
```

### Bài 4: Đếm số nguyên âm
```javascript
function countVowels(str) {
    const vowels = "aeiouAEIOU";
    let count = 0;
    
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

console.log(countVowels("Hello World")); // 3 (e, o, o)
```

### Bài 5: FizzBuzz
```javascript
for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
```

## Những lỗi thường gặp

### 1. Vòng lặp vô hạn
```javascript
// ❌ Lỗi: Quên tăng biến đếm
let i = 0;
while (i < 5) {
    console.log(i);
    // Quên i++
}

// ✅ Đúng
let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}
```

### 2. Off-by-one error
```javascript
// ❌ Thiếu phần tử cuối
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length - 1; i++) {
    console.log(arr[i]); // Thiếu số 5
}

// ✅ Đúng
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]); // Đầy đủ
}
```

### 3. Sửa mảng trong khi lặp
```javascript
// ❌ Nguy hiểm
const numbers = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
    numbers.pop(); // Thay đổi độ dài → lỗi
}

// ✅ Lặp ngược hoặc dùng copy
for (let i = numbers.length - 1; i >= 0; i--) {
    // An toàn hơn
}
```

## Performance Tips

### 1. Cache độ dài mảng
```javascript
// Chậm - Tính length mỗi lần
for (let i = 0; i < arr.length; i++) { }

// Nhanh - Lưu length
const len = arr.length;
for (let i = 0; i < len; i++) { }
```

### 2. Chọn vòng lặp phù hợp
```javascript
// Đơn giản → for...of
for (let item of array) { }

// Cần index → for
for (let i = 0; i < array.length; i++) { }

// Object → for...in
for (let key in object) { }
```

## Kinh nghiệm của mình

### 1. Vẽ sơ đồ trước khi code
Khi gặp bài toán phức tạp, mình hay vẽ ra giấy:
- Vòng lặp chạy bao nhiêu lần?
- Biến đếm thay đổi thế nào?
- Điều kiện dừng là gì?

### 2. console.log là bạn thân
```javascript
for (let i = 0; i < 5; i++) {
    console.log("Trước:", i);
    // logic phức tạp
    console.log("Sau:", i);
}
```

### 3. Bắt đầu đơn giản
Đừng viết vòng lặp phức tạp ngay. Bắt đầu với case đơn giản, test, rồi mới thêm logic.

### 4. Tránh vòng lặp lồng sâu
```javascript
// ❌ Khó đọc
for (...) {
    for (...) {
        for (...) {
            for (...) {
                // Code gì đây?
            }
        }
    }
}

// ✅ Tách thành functions
function processRow(row) { }
function processData(data) {
    for (let row of data) {
        processRow(row);
    }
}
```

## When to Use Which Loop?

| Tình huống | Dùng vòng lặp |
|------------|---------------|
| Biết trước số lần lặp | `for` |
| Lặp đến khi điều kiện thỏa | `while` |
| Chạy ít nhất 1 lần | `do...while` |
| Duyệt mảng | `for...of` |
| Duyệt object | `for...in` |
| Xử lý từng phần tử mảng | `forEach` (sẽ học sau) |

## Kết luận

Vòng lặp là công cụ mạnh mẽ giúp tự động hóa công việc lặp đi lặp lại. Những điểm chính:

✅ `for` - Khi biết số lần lặp
✅ `while` - Khi lặp theo điều kiện
✅ `for...of` - Duyệt mảng dễ dàng
✅ `break` - Thoát vòng lặp
✅ `continue` - Bỏ qua lần lặp
✅ Cẩn thận vòng lặp vô hạn!

Trong bài tiếp theo, mình sẽ chia sẻ về **Functions** - cách tổ chức code thành các khối có thể tái sử dụng!

---

*Bạn đã từng gặp vòng lặp vô hạn chưa? Chia sẻ kinh nghiệm của bạn nhé! 😄*