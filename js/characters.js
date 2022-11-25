//Personajes

let characters = document.querySelector("#characters");

fetch("https://rickandmortyapi.com/api/character")
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.results);

        data.results.map((item) => {
            const content = document.createElement("div");
            content.className = "card2";
            content.innerHTML = `
            <h4>Nombre: ${item.name}</h4>
            <p>Estado: ${item.status}</p>
            <p>Especie: ${item.species}</p>
            <img src= "${item.image}"</img>
            `;
            characters.append(content);
        });
    });
