---
title: Queues
tags:
  - Data Structures
  - Queue
  - Algorithms
  - Computer Science
  - Big O
---

## What is a Queue?

A **queue** is a linear data structure that follows the **First-In, First-Out (FIFO)** principle. This means that the first element added to the queue will be the first one to be removed.  
Think of a queue like a line at a ticket counter: the first person to join the line is the first to be served.

---

## Queue Operations

- **Enqueue:** Add an element to the end (rear) of the queue.
- **Dequeue:** Remove and return the element at the front of the queue.
- **Front/Peek:** Return the element at the front without removing it.
- **isEmpty:** Check if the queue is empty.
- **Size/Length:** Return the number of elements in the queue.

---

## Use Cases

- **Task scheduling (print queue, CPU scheduling)**
- **Breadth-First Search (BFS) in graphs and trees**
- **Handling requests in web servers**
- **Order processing systems**
- **Buffering data (e.g., IO Buffers, streaming)**

---

## Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Enqueue   | O(1)           | O(n)             |
| Dequeue   | O(1)           | O(n)             |
| Front     | O(1)           | O(n)             |
| isEmpty   | O(1)           | O(1)             |

- All main queue operations are **constant time** (O(1)), making queues very efficient.

---

## Queue vs. Other Data Structures

- **Queue vs. Stack:**  
  Queue is FIFO (first in, first out), stack is LIFO (last in, first out).
- **Queue vs. Array:**  
  Arrays allow random access, queues only allow access to the front and rear elements.

---

## Example: Queue in JavaScript

```js
class Queue {
  constructor() {
    this.items = [];
  }

  // Add element to the end
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front element
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // Return the front element without removing it
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the size of the queue
  size() {
    return this.items.length;
  }
}
```

---

## Summary

- **Queues** are simple, efficient data structures for managing data in a FIFO order.
- They are widely used in programming for scheduling, buffering, and breadth-first traversal.
- All main operations (enqueue, dequeue, front) are O(1).
- Queues are best when you need to process elements in the order they arrive.

---

**Reference Video:**  
[Queue Data Structure | Illustrated Data Structures (YouTube)](https://www.youtube.com/watch?v=mDCi1lXd9hc&ab_channel=theroadmap)

---

**Reference Resources:** 

- [w3schools – DSA Queues](https://www.w3schools.com/dsa/dsa_data_queues.php)  

- [GeeksforGeeks – Queue Data Structure](https://www.geeksforgeeks.org/queue-data-structure/)  

---