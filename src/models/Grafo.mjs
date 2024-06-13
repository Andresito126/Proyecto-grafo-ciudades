import { LinkedList } from "./LinkedList/LinkedList.mjs";

export default class Graph {
    #listaAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#listaAdyacencia.push(new LinkedList());
            this.#map.set(value, this.#listaAdyacencia.length - 1);
        }
    }

    addV(value) {
        this.#listaAdyacencia.push(new LinkedList());
        this.#map.set(value, this.#listaAdyacencia.length - 1);
    }

    addConexion(start, end, weight = 1) {
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#listaAdyacencia[this.#map.get(end)].push(start, weight);
            this.#listaAdyacencia[this.#map.get(start)].push(end, weight);
            return true;
        }
        return false;
    }

    //verificar si existe un vertice en el grafo
    hasVertex(vertex) {
        return this.#map.has(vertex);
    }

    //iplemenatcion del recorrido
    dfs(startVertex, callback) {
        const visited = new Set();
        this.#dfsHelper(startVertex, visited, null, 0, callback);
    }

    #dfsHelper(vertex, visited, prevVertex = null, prevDistance = 0, callback) {
        if (!visited.has(vertex)) {
            if (prevVertex !== null) {
                callback(`${prevVertex} -> ${vertex} (Distancia: ${prevDistance})`);
            } else {
                callback(vertex);
            }
            visited.add(vertex);

            const vertexIndex = this.#map.get(vertex);
            const neighbors = this.#listaAdyacencia[vertexIndex];
            let current = neighbors.getElementAt(0);

            while (current !== undefined && current !== null) {
                const neighborVertex = current.value.nombre;
                const distance = current.value.distancia;

                if (!visited.has(neighborVertex)) {
                    this.#dfsHelper(neighborVertex, visited, vertex, distance, callback);
                }
                current = current.next;
            }
        }
    }
}

