---
title: Stacks
tags:
  - Data Structures
  - Stack
  - Algorithms
  - Computer Science
  - Big O
---

## What is a Stack?

A **stack** is a linear data structure that follows the **Last-In, First-Out (LIFO)** principle. This means that the last element added to the stack will be the first one to be removed.  
Think of a stack like a pile of plates: you add (push) and remove (pop) plates from the top only.

---

## Stack Operations

- **Push:** Add an element to the top of the stack.
- **Pop:** Remove and return the element at the top of the stack.
- **Peek/Top:** Return the element at the top of the stack without removing it.
- **isEmpty:** Check if the stack is empty.
- **Size/Length:** Return the number of elements in the stack.

---

## Use Cases

- **Function call management (call stack)**
- **Undo/redo functionality in editors**
- **Expression evaluation and syntax parsing**
- **Backtracking algorithms (DFS, maze solving, etc.)**
- **Browser history navigation**

---

## Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Push      | O(1)           | O(n)             |
| Pop       | O(1)           | O(n)             |
| Peek/Top  | O(1)           | O(n)             |
| isEmpty   | O(1)           | O(1)             |

- All main stack operations are **constant time** (O(1)), making stacks very efficient.

---

## Stack vs. Other Data Structures

- **Stack vs. Queue:**  
  Stack is LIFO (last in, first out), queue is FIFO (first in, first out).
- **Stack vs. Array:**  
  Arrays allow random access, stacks only allow access to the top element.

---

## Example: Stack in JavaScript

```js
class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to the top
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the size of the stack
  size() {
    return this.items.length;
  }
}
```

---

## Summary

- **Stacks** are simple, efficient data structures for managing data in a LIFO order.
- They are widely used in programming for function calls, undo/redo, parsing, and more.
- All main operations (push, pop, peek) are O(1).
- Stacks are best when you only need to access or modify the most recently added element.

---

**Reference Video:**  
[Stack Data Structure | Illustrated Data Structures (YouTube)](https://www.youtube.com/watch?v=I5lq6sCuABE&ab_channel=theroadmap)

---

**Reference Resources:** 

- [w3schools – DSA Stacks](https://www.w3schools.com/dsa/dsa_data_stacks.php)  

- [GeeksforGeeks – Stack Data Structure](https://www.geeksforgeeks.org/stack-data-structure/)  

---