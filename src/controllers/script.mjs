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
});
