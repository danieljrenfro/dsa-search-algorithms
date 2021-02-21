// Linear search
function indexOf(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

// Binary search
function binarySearch(array, value, start, end) {
  let startIndex = start === undefined ? 0 : start;
  let endIndex = end === undefined ? array.length : end;

  // if the start is greater than the end return -1. The value wasn't found.
  if (start > end) {
    return -1;
  }

  // index finds the index in the middle of the startIndex & endIndex
  const index = Math.floor((startIndex + endIndex) / 2);
  // item is the item in the array at the index
  const item = array[index];

  console.log(startIndex, endIndex);
  // if item equals the value we are searching for, return the index.
  if (item === value) {
    return index;
  }
  // if item is less than the value we are searching for, recursively run binarySearch() on the latter half of the array
  else if (item < value) {
    return binarySearch(array, value, index + 1, endIndex);
  }
  // if item is greater than the value we are searching for, recursively run binarySearch() on the lower half of the array
  else if (item > value) {
    return binarySearch(array, value, startIndex, index - 1);
  }
}

console.log('binarySearch', binarySearch([3, 5, 6, 8, 11, 12, 15, 17, 18], 8));
console.log('binarySearch2', binarySearch([3, 5, 6, 8, 11, 12, 15, 17, 18], 16));

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      else {
        this.left.insert(key, value);
      }
    }
    else {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (key === this.key) {
      return this.value;
    }
    else if (key < this.key) {
      return this.left.find(key);
    }
    else if (key > this.key) {
      return this.right.find(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (key === this.key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      else if (this.left) {
        this._replaceWith(this.left);
      }
      else if (this.right) {
        this._replaceWith(this.right);
      }
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key) {
      this.left.remove(key);
    }
    else if (key > this.key) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.key;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
  
  //inOrder
  inOrder(values=[]) {
    if (this.left) {
      values = this.left.inOrder(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }

  //preOrder
  preOrder(values=[]) {
    values.push(this.value);
    if (this.left) {
      values = this.left.preOrder(values);
    }
    
    if (this.right) {
      values = this.right.preOrder(values);
    }
    return values;
  }

  //postOrder
  postOrder(values=[]) {
    if (this.left) {
      values = this.left.postOrder(values);
    }
    
    if (this.right) {
      values = this.right.postOrder(values);
    }
    
    values.push(this.value);
    return values;
  }

  // Breadth-first search (BFS)
  bfs(tree, values=[]) {
    // instantiates a new queue
    // eslint-disable-next-line no-undef
    const queue = new Queue();
    // sets node to the root of the tree
    const node = tree.root;
    // enqueues the node
    queue.enqueue(node);
    // as long as there are items in the queue, run the loop
    while (queue.length) {
      // dequeue the first item in the queue to a new node variable
      const node = queue.dequeue();
      // push that node's value into the values array
      values.push(node.value);

      // if there is a left node, enqueue the left node
      if (node.left) {
        queue.enqueue(node.left);
      }

      // if there is a right node, enqueue the right node
      if (node.right) {
        queue.enqueue(node.right);
      }
    }

    // once you have cycled through all of the nodes in the tree, return the values array.
    return values;
  }
}

function main() {
  const bst = new BinarySearchTree();

  bst.insert(25, 25);
  bst.insert(15, 15);
  bst.insert(50, 50);
  bst.insert(10, 10);
  bst.insert(24, 24);
  bst.insert(35, 35);
  bst.insert(70, 70);
  bst.insert(4, 4);
  bst.insert(12, 12);
  bst.insert(18, 18);
  bst.insert(31, 31);
  bst.insert(44, 44);
  bst.insert(66, 66);
  bst.insert(90, 90);
  bst.insert(22, 22);

  console.log('preOrder', bst.preOrder());
  console.log('inOrder', bst.inOrder());
  console.log('postOrder', bst.postOrder());
}

main();