/** Node: node for a singly linked list. */

class Node {
  constructor(val, next=null) {
    this.val = val;
    this.next = next;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): retrieves node at idx */

  _get(idx) {
    let curr = this.head;
    let count = 0;

    while(curr !== null && count !== idx) {
      count++;
      curr = curr.next;
    }

    return curr;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);
    this.length++;

    if(this.head === null) this.head = newNode;

    if(this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);
    this.length++;
    if(this.head !== null){
      newNode.next = this.head;
      this.head = newNode;
    }

    if(this.tail === null) this.tail = newNode;

    this.head = newNode;

  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);

  }

  /** shift(): return & remove first item. */

  shift() {
   return  this.removeAt(0);

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    if(idx >= this.length || idx < 0){
      throw new Error("Invalid Index.");
    }

    return this._get(idx).val;

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx >= this.length || idx < 0){
      throw new Error("Invalid Index.");
    }

     this._get(idx).val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx > this.length || idx < 0){
      throw new Error("Invalid Index.");
    }

    if(idx === 0) return this.unshift(val);
    if(idx === this.length) return this.push(val);

    let newNode = new Node(val);

    let prev = this._get(idx - 1);
    newNode.next = this._get(idx)
    prev.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(idx > this.length || idx < 0){
      throw new Error("Invalid Index.");
    }

    if(idx === 0){
      let value = this.head.val;
      this.head = this.head.next;
      this.length--;
      if(this.length < 2 ) this.tail = this.head;
      return value;
    }

    let prevNode = this._get(idx - 1);

    if(idx === this.length - 1) {
      let value = prevNode.next.val;
      prevNode.next = null;
      this.tail = prevNode;
      this.length--;
      return value;
    }


    let value = prevNode.next.val;
    let nextNode = this._get(idx + 1);

    prevNode.next = nextNode;


    this.length--;
    return value;

  }

  /** average(): return an average of all values in the list */

  average() {

    if(this.length === 0) return 0;
    
    let total = 0;
    let current = this.head;

    while(current !== null){
      total += current.val;
      current = current.next;
    }

    return total/this.length;
    
  }
}

module.exports = LinkedList;
