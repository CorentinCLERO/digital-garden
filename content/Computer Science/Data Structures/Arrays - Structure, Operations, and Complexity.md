---
title: Arrays - Structure, Types, Operations, and Complexity  
tags:
  - Data Structures
  - Arrays
  - Algorithms
  - Computer Science
  - Big O
---

## What is an Array?

An **array** is a fundamental data structure that stores a collection of elements in contiguous memory locations. Arrays allow you to efficiently access any element by its index. All elements are typically of the same type, but some languages allow mixed types.

### Key Properties

- **Homogeneous (Fixed-Type) Arrays:** All elements are of the same type (e.g., all integers, all strings). This is the default in most statically-typed languages.
- **Mixed-Type Arrays:** Some languages (like JavaScript, Python) allow arrays to contain elements of different types in the same array.
- **Contiguous Memory:** Elements are stored one after another in memory, enabling fast access.
- **Index-based Access:** Each element can be accessed directly using its index (starting from 0).

---

## Fixed-Size vs. Dynamic Arrays

### Fixed-Size Arrays

- **Definition:** The size is set when the array is created and cannot be changed.
- **Languages:** Common in C, C++, Java (primitive arrays).
- **Memory Allocation:** Allocated as a single block in memory; size must be known in advance.
- **Pros:** Very fast access and predictable memory usage.
- **Cons:** Cannot grow or shrink; resizing requires creating a new array and copying elements.

### Dynamic Arrays

- **Definition:** Arrays that can grow or shrink as needed.
- **Languages:** Built-in in higher-level languages (e.g., Python’s `list`, JavaScript’s `Array`, Java’s `ArrayList`).
- **How it works:** Internally, dynamic arrays use a fixed-size array. When more space is needed, a new, larger array is allocated, and all elements are copied over.
- **Resizing:** Usually, the array size is doubled when it runs out of space, making resizing efficient on average.
- **Pros:** Flexible size, easy to use.
- **Cons:** Occasional resizing can be costly (but is rare thanks to doubling strategy).

---

## Mixed-Type Arrays

### What Are Mixed-Type Arrays?

A **mixed-type array** can store elements of different data types (e.g., numbers, strings, objects) in the same array. This is possible in dynamically-typed languages like JavaScript and Python.

**Example in JavaScript:**

```js
let mixedArray = [42, "hello", true, { name: "Alice" }, [1, 2, 3], null];
```

### How Do Mixed-Type Arrays Work?

- **Dynamically-Typed Languages:** Arrays (or lists) are collections of references (pointers) to objects in memory. Each element can point to any type of value, and the language runtime keeps track of the type for each value.
- **Type Checking at Runtime:** The type of each element is checked at runtime, not at compile time. This gives flexibility but can reduce performance and type safety.
- **Memory Overhead:** Each element is a reference, not a raw value, so there is a small memory and performance overhead compared to fixed-type arrays.

### Trade-offs

- **Flexibility:** Very flexible and convenient for rapid prototyping or storing heterogeneous data.
- **Performance:** Slightly slower than fixed-type arrays due to runtime type checking and reference management.
- **Type Safety:** No compile-time type safety, which can lead to bugs if you assume all elements are of the same type.

### In Statically-Typed Languages

- **Not Allowed by Default:** Arrays are homogeneous by default. All elements must be of the same type.
- **Workarounds:** You can use arrays of a generic base type (like `Object[]` in Java), but you must cast elements to their actual type when using them.

**Example in Java:**

```java
Object[] mixedArray = { 42, "hello", true };
String s = (String) mixedArray[1]; // Must cast
```

---

## How Arrays Work Internally

- **Memory Layout:** Arrays are stored in a single, contiguous block of memory. The address of any element can be calculated as:

  \[
  \text{Address of element at index } i = \text{Base address} + (i \times \text{size of each element})
  \]

- **Direct Access:** This layout allows constant-time access to any element by index.

---

## Array Operations and Big O Complexity

| Operation         | Fixed-size Array | Dynamic Array | Time Complexity (Big O) |
|-------------------|------------------|---------------|-------------------------|
| Access (Read)     | Yes              | Yes           | O(1)                    |
| Update (Write)    | Yes              | Yes           | O(1)                    |
| Insert at End     | No (unless space)| Yes           | O(1) *amortized*        |
| Insert at Start   | No               | Yes           | O(n)                    |
| Insert in Middle  | No               | Yes           | O(n)                    |
| Delete at End     | No               | Yes           | O(1)                    |
| Delete at Start   | No               | Yes           | O(n)                    |
| Delete in Middle  | No               | Yes           | O(n)                    |

**Notes:**
- In fixed-size arrays, you cannot insert or delete elements without creating a new array.
- In dynamic arrays, inserting at the end is usually O(1) *amortized* because resizing happens infrequently.
- Inserting or deleting at the start or in the middle requires shifting elements, which is O(n).

---

## How Dynamic Arrays Resize

When a dynamic array runs out of space:
1. A new array with a larger capacity (usually double the current size) is allocated.
2. All existing elements are copied to the new array.
3. The old array is discarded.

This copying is expensive (O(n)), but because it happens rarely, the *average* cost per insertion remains O(1) — this is called **amortized analysis**.

---

## Example in JavaScript

```js
// Dynamic array in JavaScript
let arr = [10, 20, 30, 40];

// Access
console.log(arr[2]); // 30

// Update
arr[1] = 25;

// Insert at end
arr.push(50);

// Remove from end
arr.pop();

// Insert at start (O(n))
arr.unshift(5);

// Remove from start (O(n))
arr.shift();

// Mixed types
let mixed = [1, "two", false, { key: "value" }];
```

---

## Summary

- Arrays are a core data structure, providing fast, index-based access to elements.
- Fixed-size arrays are simple and efficient but inflexible.
- Dynamic arrays offer flexibility at the cost of occasional expensive resizing operations.
- Mixed-type arrays are possible in some languages, offering flexibility but less performance and type safety.
- Understanding the time complexity of array operations is crucial for writing efficient code.

---

**Reference Video:**  
[Array Data Structure | Illustrated Data Structures (YouTube)](https://www.youtube.com/watch?v=QJNwK2uJyGs&ab_channel=theroadmap)

---

**Reference Resources:** 

- [w3schools – DSA Linked Lists](https://www.w3schools.com/dsa/dsa_theory_linkedlists.php)

- [GeeksforGeeks – Linked List Data Structure](https://www.geeksforgeeks.org/data-structures/linked-list/)

---
