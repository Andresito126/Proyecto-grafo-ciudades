import { LinkedList } from "./LinkedList/LinkedList.mjs";

export default class Graph {
    #listaAdyacencia = [];
    #map = new Map();
    #matrizAdyencia = [];


    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            this.#listaAdyacencia.push(new LinkedList())
            this.#map.set(value,this.#listaAdyacencia.length-1)
        }
    }
  
    addV(value) {
        this.#listaAdyacencia.push(new LinkedList())
        this.#map.set(value,this.#listaAdyacencia.length-1)
        this.#matrizAdyencia.push([])
        return value
    }
  
    addConexion(start, end, weight=1){
        if (this.#map.has(start) && this.#map.has(end)) {
            this.#listaAdyacencia[this.#map.get(start)].push(end,weight)
            this.#listaAdyacencia[this.#map.get(end)].push(start,weight)
            this.#matrizAdyencia[this.#map.get(start)][this.#map.get(end)] = weight
            this.#matrizAdyencia[this.#map.get(end)][this.#map.get(start)] = weight
            return true
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
        if (!visited.has(vertex)) {  //primeroverifica si ya fue visitado
            if (prevVertex !== null) {
                callback(`${prevVertex} -> ${vertex} (Distancia: ${prevDistance})`);
            } else {
                callback(vertex);
            }
            visited.add(vertex);  //marca la visita
            // te consigue los nodos vecinos 
            const vertexIndex = this.#map.get(vertex);
            const neighbors = this.#listaAdyacencia[vertexIndex];
            let current = neighbors.getElementAt(0);
            //y te los recorre uno por uno
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

        dijkstra(verticeInit) {
            // Valores iniciales
            let l = []; //Conjunto de vértices del grafo, vacio
            let lp = [];// el conjunto de los vertices que estan restantes
            let v = []; //vertice
            let d = []; //la matriz unidimensional 
            let dp = []; //la matriz unidimensional para guatdar los datos
            let v1; 

            // mil equivale al infinito
            for (let i = 0; i < this.#matrizAdyencia.length; i++) {
                for (let j = 0; j < this.#matrizAdyencia.length; j++) {
                    if (this.#matrizAdyencia[i][j] === undefined) {
                        this.#matrizAdyencia[i][j] = 10000;
                    }
                }            
            }
            
            // agregacion de los datos a los arreglos
            for (let i = 0; i < this.#matrizAdyencia.length; i++) {
                v[i] = i; // v1 => 0 , v2 => 1, v3 => 3  asigna los indices de los vertices
                lp[i] = v[i]; // todos los vertices se ecnutran aqui
                d[i] = 10000; // todas inician infinito
            }
        
            v1 = this.#map.get(verticeInit);
            d[v1] = 0;
            dp = [...d];
        
            while (l.length !== this.#matrizAdyencia.length) {
                let minimo = Math.min(...dp.filter(value => value !== null));
                let indice = dp.indexOf(minimo);
                l.push(minimo);
        
                for (let i = 0; i < d.length; i++) {
                    if (this.#matrizAdyencia[indice][i] !== 10000) { //
                        let suma = d[indice] + this.#matrizAdyencia[indice][i];
                        if (d[i] > suma) {
                            d[i] = suma;
                        }
                    }
                }

                dp[indice] = null;
            }

            // lonversion de indices a nombres
            let result = {};
            this.#map.forEach((index, vertex) => {
                result[vertex] = d[index];
            });

            return result;
        }
    }