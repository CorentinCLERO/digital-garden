---
title: Hash Tables – Concepts, Operations, and Complexity  
tags:
  - Data Structures
  - Hash Table
  - Algorithms
  - Computer Science
  - Big O
---

## What is a Hash Table?

A **hash table** (or hash map) is a data structure that stores key-value pairs. It uses a **hash function** to compute an index (the "hash") into an array of buckets or slots, from which the desired value can be found very quickly.

Hash tables provide **fast insertion, deletion, and lookup** for data associated with unique keys.

---

## Hash Table Operations

- **Insert (Put/Set):** Add a key-value pair to the table.
- **Get (Lookup):** Retrieve the value associated with a given key.
- **Delete (Remove):** Remove a key and its value from the table.
- **Contains:** Check if a key exists in the table.

---

## How Does a Hash Table Work?

1. **Hash Function:**  
   Converts a key (like a string) into an integer (the hash code).
2. **Indexing:**  
   The hash code is mapped to an index in an internal array (using modulo operation).
3. **Collision Handling:**  
   Two different keys can produce the same index (a "collision").  
   Common strategies:
   - **Chaining:** Each array slot holds a list of entries.
   - **Open Addressing:** Find another open slot using a probing sequence.

---

### How Hashing and Indexing Work in a Hash Table

A **hash table** uses a **hash function** to convert a key into a numerical hash code, which is then mapped to an index in an internal array using the modulo operation.

**Example:**  
Suppose the key is `"apple"` and the array size is `10`.  
- The hash function turns `"apple"` into the number `541`.
- The index is calculated as `541 % 10 = 1`.
- The value is stored at index `1` in the array.

When you want to retrieve the value for `"apple"`, the hash function and modulo operation are applied again, pointing directly to index `1` for fast access.

If two keys map to the same index, the hash table handles the collision by storing both entries at that index (for example, in a list).

---

## Use Cases

- **Dictionaries and maps (key-value storage)**
- **Counting occurrences (frequency tables)**
- **Caching (LRU cache, memoization)**
- **Database indexing**
- **Sets (unique value storage)**

---

## Complexity

| Operation | Average Time Complexity | Worst-case Time Complexity |
|-----------|------------------------|---------------------------|
| Insert    | O(1)                   | O(n)                      |
| Get       | O(1)                   | O(n)                      |
| Delete    | O(1)                   | O(n)                      |

- **Average case** is O(1) for all main operations.
- **Worst case** (all keys collide) is O(n), but this is rare with a good hash function and resizing.

---

## Hash Table vs. Other Data Structures

- **Hash Table vs. Array:**  
  Arrays use integer indices; hash tables use arbitrary keys.
- **Hash Table vs. Tree:**  
  Trees keep keys in order; hash tables are unordered but faster for lookup.

---

## Example: Hash Table in JavaScript

In JavaScript, the built-in `Object` and `Map` types are hash tables.  
Here’s a simple custom implementation using chaining:

```js
class HashTable {
  constructor(size = 53) {
    this.buckets = Array(size).fill(null).map(() => []);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash = (hash + char.charCodeAt(0)) % this.buckets.length;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.buckets[idx].push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) return pair[1];
    }
    return undefined;
  }

  has(key) {
    const idx = this._hash(key);
    return this.buckets[idx].some(pair => pair[0] === key);
  }

  delete(key) {
    const idx = this._hash(key);
    this.buckets[idx] = this.buckets[idx].filter(pair => pair[0] !== key);
  }
}

// Usage:
const table = new HashTable();
table.set("apple", 5);
table.set("banana", 10);
console.log(table.get("apple")); // 5
console.log(table.has("banana")); // true
table.delete("apple");
console.log(table.get("apple")); // undefined
```

---

## Summary

- **Hash tables** are powerful for fast key-value storage and lookup.
- They use a hash function to map keys to array indices.
- Collisions are handled by chaining or open addressing.
- Average-case performance is O(1) for insert, get, and delete.

---

**Reference Video:**  
[Hash Table Data Structure | Illustrated Data Structures (YouTube)](https://www.youtube.com/watch?v=jalSiaIi8j4&ab_channel=theroadmap)

---

**Reference Resources:** 

- [MDN Web Docs – Map (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)  
- [GeeksforGeeks – Hash Table Data Structure](https://www.geeksforgeeks.org/hashing-data-structure/)  

---

Let me know if you want exercises or more advanced hash table topics!Absolutely! Here’s a complete Markdown note for **Hash Tables**, inspired by the video [Hash Table Data Structure | Illustrated Data Structures](https://www.youtube.com/watch?v=jalSiaIi8j4&ab_channel=theroadmap), following the same structure as your previous notes.

---

title: Hash Tables – Concepts, Operations, and Complexity  
tags:
  - Data Structures
  - Hash Table
  - Algorithms
  - Computer Science
  - Big O
---

## What is a Hash Table?

A **hash table** (or hash map) is a data structure that stores key-value pairs. It uses a **hash function** to compute an index (the "hash") into an array of buckets or slots, from which the desired value can be found very quickly.

Hash tables provide **fast insertion, deletion, and lookup** for data associated with unique keys.

---

## Hash Table Operations

- **Insert (Put/Set):** Add a key-value pair to the table.
- **Get (Lookup):** Retrieve the value associated with a given key.
- **Delete (Remove):** Remove a key and its value from the table.
- **Contains:** Check if a key exists in the table.

---

## How Does a Hash Table Work?

1. **Hash Function:**  
   Converts a key (like a string) into an integer (the hash code).
2. **Indexing:**  
   The hash code is mapped to an index in an internal array (using modulo operation).
3. **Collision Handling:**  
   Two different keys can produce the same index (a "collision").  
   Common strategies:
   - **Chaining:** Each array slot holds a list of entries.
   - **Open Addressing:** Find another open slot using a probing sequence.

---

## Use Cases

- **Dictionaries and maps (key-value storage)**
- **Counting occurrences (frequency tables)**
- **Caching (LRU cache, memoization)**
- **Database indexing**
- **Sets (unique value storage)**

---

## Complexity

| Operation | Average Time Complexity | Worst-case Time Complexity |
|-----------|------------------------|---------------------------|
| Insert    | O(1)                   | O(n)                      |
| Get       | O(1)                   | O(n)                      |
| Delete    | O(1)                   | O(n)                      |

- **Average case** is O(1) for all main operations.
- **Worst case** (all keys collide) is O(n), but this is rare with a good hash function and resizing.

---

## Hash Table vs. Other Data Structures

- **Hash Table vs. Array:**  
  Arrays use integer indices; hash tables use arbitrary keys.
- **Hash Table vs. Tree:**  
  Trees keep keys in order; hash tables are unordered but faster for lookup.

---

## Example: Hash Table in JavaScript

In JavaScript, the built-in `Object` and `Map` types are hash tables.  
Here’s a simple custom implementation using chaining:

```js
class HashTable {
  constructor(size = 53) {
    this.buckets = Array(size).fill(null).map(() => []);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash = (hash + char.charCodeAt(0)) % this.buckets.length;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.buckets[idx].push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) return pair[1];
    }
    return undefined;
  }

  has(key) {
    const idx = this._hash(key);
    return this.buckets[idx].some(pair => pair[0] === key);
  }

  delete(key) {
    const idx = this._hash(key);
    this.buckets[idx] = this.buckets[idx].filter(pair => pair[0] !== key);
  }
}

// Usage:
const table = new HashTable();
table.set("apple", 5);
table.set("banana", 10);
console.log(table.get("apple")); // 5
console.log(table.has("banana")); // true
table.delete("apple");
console.log(table.get("apple")); // undefined
```

---

## Summary

- **Hash tables** are powerful for fast key-value storage and lookup.
- They use a hash function to map keys to array indices.
- Collisions are handled by chaining or open addressing.
- Average-case performance is O(1) for insert, get, and delete.

---

**Reference Video:**  
[Hash Table Data Structure | Illustrated Data Structures (YouTube)](https://www.youtube.com/watch?v=jalSiaIi8j4&ab_channel=theroadmap)

---

**Reference Resources:** 

- [MDN Web Docs – Map (JavaScript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)  
- [GeeksforGeeks – Hash Table Data Structure](https://www.geeksforgeeks.org/hashing-data-structure/)  

---