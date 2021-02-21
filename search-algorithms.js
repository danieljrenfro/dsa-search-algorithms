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
  
  //inOrder
  inOrder(values=[]) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  //preOrder
  preOrder(values=[]) {
    values.push(this.value);
    if (this.left) {
      values = this.left.dfs(values);
    }
    
    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  //postOrder
  postOrder(values=[]) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    
    if (this.right) {
      values = this.right.dfs(values);
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