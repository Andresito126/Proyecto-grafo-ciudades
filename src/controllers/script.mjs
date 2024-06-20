import { grafo } from './dependencies.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const placeNameInput = document.querySelector('.main__input--place-name');
    const addPlaceButton = document.querySelector('.main__button--add-place');
    const placesList = document.querySelector('.main__list--places');

    const place1Input = document.querySelector('.main__input--place1');
    const place2Input = document.querySelector('.main__input--place2');
    const distanceInput = document.querySelector('.main__input--distance');
    const addPathButton = document.querySelector('.main__button--add-path');

    const startPlaceInput = document.querySelector('.main__input--start-place');
    const showPlacesButton = document.querySelector('.main__button--show-places');

    const startRouteInput = document.querySelector('.main__input--start-route');
    const showRoutesButton = document.querySelector('.main__button--show-routes');
    const routesList = document.querySelector('.main__list--routes');


    function updatePlacesList(content) {
        const li = document.createElement('li');
        li.textContent = content;
        placesList.appendChild(li);
    }

    addPlaceButton.addEventListener('click', () => {
        const placeName = placeNameInput.value.trim();
        if (placeName !== '') {
            grafo.addV(placeName);
            console.log(`Añadido lugar: ${placeName}`);
            placeNameInput.value = '';
        }
    });

    addPathButton.addEventListener('click', () => {
        const place1 = place1Input.value.trim();
        const place2 = place2Input.value.trim();
        const distance = parseFloat(distanceInput.value.trim());

        if (place1 !== '' && place2 !== '' && !isNaN(distance)) {
            grafo.addConexion(place1, place2, distance);
            console.log(` conexión entre ${place1} y ${place2} distancia: ${distance}`);
            place1Input.value = '';
            place2Input.value = '';
            distanceInput.value = '';
        }
    });

    showPlacesButton.addEventListener('click', () => {
        placesList.innerHTML = '';

        const dfsCallback = (result) => {
            console.log(`DFS: ${result}`);
            updatePlacesList(result);
        };

        const startVertex = startPlaceInput.value.trim();
        console.log(`inicio DFS: ${startVertex}`);
        
        if (!grafo.hasVertex(startVertex)) {
            alert("No existe ese vertice en el grafo")
            return;
        }
        
        grafo.dfs(startVertex, dfsCallback);
    });

    showRoutesButton.addEventListener('click', () => {
        routesList.innerHTML = '';

        const startVertex = startRouteInput.value.trim();
        console.log(`Inicio Dijkstra: ${startVertex}`);

        if (!grafo.hasVertex(startVertex)) {
            alert("No existe ese vértice en el grafo");
            return;
        }

        const result = grafo.dijkstra(startVertex);
        console.log(`Dijkstra: ${result}`);
        updateRoutesList(result);
    });

    function updateRoutesList(routes) {
        routesList.innerHTML = ''; 
        for (const [vertex, distance] of Object.entries(routes)) {
            const li = document.createElement('li');
            li.textContent = `${vertex} (Distancia: ${distance})`;
            routesList.appendChild(li);
        }
    }

});
    /*
    grafo.addV("v1")
    grafo.addV("v2")
    grafo.addV("v3")
    grafo.addV("v4")
    grafo.addV("v5")
    grafo.addV("v6")

    grafo.addConexion("v1","v2",2)
    grafo.addConexion("v1","v6",3)
    grafo.addConexion("v2","v3",1)
    grafo.addConexion("v3","v6",5)
    grafo.addConexion("v3","v5",3)
    grafo.addConexion("v3","v4",8)
    grafo.addConexion("v6","v5",6)
    grafo.addConexion("v5","v4",11)

    grafo.dijkstra("v6");
    */

