import Node from "./Node.mjs"
import Lugar from "./Lugar.mjs"

export class LinkedList {
    #count
    #head

    constructor(){
        this.#count = 0
        this.#head = undefined
    }

    push(nombre, distancia) {
        let lugar = new Lugar(nombre, distancia)
        const node = new Node(lugar)

        let current
        if (this.#head == null) {
            this.#head = node
        } else {
            current = this.#head
            while (current.next != null)
                current = current.next
            current.next = node
        }
        this.#count++
    }

    getElementAt(index) {
        if (index>=0 && index<this.#count) {
            let node = this.#head
            for (let i=0;i<index && node != null; i++)
                node = node.next
            return node
        }
        return undefined
    }
    isEmpty(){
        return this.size() === 0
    }
    size(){
        return this.#count
    }
    
    remove(value) {
        if (this.#head === null) {
          return null;
        }
    
        // Si el nodo a remover es el head
        if (this.#head.getData() === value) {
          this.#head = this.#head.next;
          this.#count--
          return;
        }
    
        let current = this.#head;
        let previous = null;
    
        while (current) {
          if (current.getData() === value) {
            previous.next = current.next;
            this.#count--
            return;
          }
          previous = current;
          current = current.next;
    }

    }
}