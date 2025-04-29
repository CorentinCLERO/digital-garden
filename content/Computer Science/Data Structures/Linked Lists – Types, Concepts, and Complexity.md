---
title: Linked Lists – Types, Concepts, and Complexity  
tags:
  - Data Structures
  - Linked List
  - Algorithms
  - Computer Science
  - Big O
---

## What is a Linked List?

A **linked list** is a linear data structure where each element (called a node) contains a value and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked lists do not store elements in contiguous memory locations. Instead, each node points to the next, forming a chain.

---

## Types of Linked Lists

### Singly Linked List

- Each node contains a value and a reference to the next node.
- Traversal is only possible in one direction (from the first node to the last).
- The last node points to nothing (often called `null`).

**Use cases:**  
Efficient insertions and deletions at the beginning of the list; useful when you do not need to traverse backward.

---

### Doubly Linked List

- Each node contains a value, a reference to the next node, and a reference to the previous node.
- Allows traversal in both directions: forward and backward.

**Use cases:**  
Useful for navigation systems (back/forward), undo/redo functionality, or when you want to efficiently delete nodes from both ends.

---

### Circular Linked List

- The last node points back to the first node, forming a circle.
- Can be singly or doubly linked.

**Use cases:**  
Ideal for applications where you need to cycle through elements repeatedly, such as round-robin scheduling, music playlists, or games.

---

### Circular Doubly Linked List

- Each node has references to both the next and previous nodes.
- The last node’s next points to the first node, and the first node’s previous points to the last node.
- Allows endless traversal in either direction, with no true beginning or end.

**Use cases:**  
Perfect for scenarios where you need continuous, bidirectional traversal, such as advanced scheduling systems or cyclic buffers.

---

## Complexity and Comparison

| Operation                | Singly Linked List | Doubly Linked List | Circular Doubly Linked List | Array      |
|--------------------------|--------------------|--------------------|----------------------------|------------|
| Access by index          | O(n)               | O(n)               | O(n)                       | O(1)       |
| Insert/Delete at head    | O(1)               | O(1)               | O(1)                       | O(n)       |
| Insert/Delete at tail    | O(n) (O(1) with tail pointer) | O(1) (with tail pointer) | O(1) (with tail pointer) | O(1) or O(n) |
| Insert/Delete in middle  | O(n)               | O(n)               | O(n)                       | O(n)       |
| Traversal (forward)      | Yes                | Yes                | Yes                        | Yes        |
| Traversal (backward)     | No                 | Yes                | Yes                        | Yes        |
| Cyclic traversal         | No                 | No                 | Yes                        | No         |
| Memory overhead          | Low                | Higher (extra pointers) | Higher (extra pointers) | Low        |
| Dynamic size             | Yes                | Yes                | Yes                        | Needs resizing |

---

## When to Use Each Type

- **Singly linked list:**  
  When you need simple, efficient insertions and deletions at the start, and only need to traverse forward.
- **Doubly linked list:**  
  When you need to traverse in both directions or efficiently delete from both ends.
- **Circular linked list:**  
  When you need to cycle through elements endlessly (e.g., round-robin).
- **Circular doubly linked list:**  
  When you need endless, bidirectional traversal with efficient operations at both ends.

---

## Example: Singly Linked List in JavaScript

```js
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at head
  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Traverse and print
  printList() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}
```

---

## Summary

- **Linked lists** are flexible, dynamic data structures ideal for scenarios with frequent insertions and deletions.
- **Singly, doubly, circular, and circular doubly linked lists** each offer different trade-offs in terms of traversal, efficiency, and use cases.
- **Arrays** are better for fast random access, but less flexible for dynamic changes.
- Understanding the strengths and weaknesses of each helps you choose the right structure for your needs.

---

**Reference Video:**  
[Linked List Data Structure | Illustrated Data Structures (YouTube)](https://www.youtube.com/watch?v=odW9FU8jPRQ)

---

**Reference Resources:** 

- [MDN Web Docs – Array (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

- [GeeksforGeeks – Arrays Data Structure](https://www.geeksforgeeks.org/array-data-structure/)

---
