class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.cache = new Map();

        this.head = new Node(-1, -1); // Dummy head
        this.tail = new Node(-1, -1); // Dummy tail
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addNode(node) {
        node.prev = this.head;
        node.next = this.head.next;

        this.head.next.prev = node;
        this.head.next = node; // Fix: should assign to `node`, not `prev`
    }

    deleteNode(node) {
        node.prev.next = node.next; // Fix: directly link previous node's next to current node's next
        node.next.prev = node.prev; // Fix: directly link next node's prev to current node's prev
    }

    insFront(node) {
        this.deleteNode(node); // Delete the node from its current position
        this.addNode(node); // Add it to the front (most recently used position)
    }

    deleteLast() {
        const res = this.tail.prev; // Get the last used node (LRU)
        this.deleteNode(res); // Delete it from the linked list
        return res; // Return the deleted node
    }

    _get(key) {
        const node = this.cache.get(key);
        if (!node) return -1; // If node doesn't exist, return -1
        this.insFront(node); // Move the accessed node to the front
        return node.value; // Return the value of the accessed node
    }

    put(key, value) {
        const node = this.cache.get(key);
        if (node) {
            node.value = value; // Update the value of the existing node
            this.insFront(node); // Move it to the front
        } else {
            const newNode = new Node(key, value);
            this.cache.set(key, newNode); // Add the new node to the cache
            this.addNode(newNode); // Add it to the front of the linked list
            this.size++;

            if (this.size > this.capacity) {
                const tail = this.deleteLast(); // Remove the LRU node
                this.cache.delete(tail.key); // Remove it from the cache
                this.size--;
            }
        }
    }

    getCacheState() {
        let current = this.head.next; // Start from the first real node
        const cacheList = [];
        while (current !== this.tail) { // Iterate until the tail dummy node
            cacheList.push({ key: current.key, value: current.value });
            current = current.next; // Move to the next node
        }
        return cacheList; // Return the list of cache entries
    }
}
