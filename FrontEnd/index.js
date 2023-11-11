const FilterT = document.getElementById("tous");
const FilterO = document.getElementById("objets");
const FilterA = document.getElementById("appartements");
const FilterH = document.getElementById("hotels");


async function importImages() {
    /*Appel à l'API pour récupérer toutes les données*/
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    const gallery = document.querySelector(".gallery");

    for (const image of data) {
        /*Création des balises div, image et paragraphe pour le parent*/
        const div = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        title.textContent = image.title;
        img.src = image.imageUrl;
        img.alt = image.title;
        img.crossOrigin = "anonymous";
        div.appendChild(img);
        div.appendChild(title);
        gallery.appendChild(div);
    }
}
importImages();

/* Ecoute du click et récupération de toutes la galerie*/
FilterT.addEventListener("click", async function (event) {
    event.preventDefault();
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    importImages();
})

/* Récupération de la galerie afin de n'afficher que les objets
      au clique sur le filtre "Objets"
   */
FilterO.addEventListener("click", function () {

    displayWorks();
})

async function displayWorks() {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    let result = data.filter(item => item.category.name === "Objets");

    for (const image of result) {
        /*Création des balises div, image et paragraphe*/
        const div = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        title.textContent = image.title;
        /*importation des images spécifiques au filtre*/
        img.src = image.imageUrl;
        img.alt = image.title;
        img.crossOrigin = "anonymous";
        /*Appelle des images sur la page principale*/
        div.appendChild(img);
        div.appendChild(title);
        gallery.appendChild(div);
    }
}

/* Récupération de la galerie afin de n'afficher que les appartements
      au clique sur le filtre "Appartements"
   */
FilterA.addEventListener("click", async function () {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    let result = data.filter(item => item.category.name === "Appartements");

    for (const image of result) {

        const div = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        title.textContent = image.title;
        /*importation des images spécifiques au filtre*/
        img.src = image.imageUrl;
        img.alt = image.title;
        img.crossOrigin = "anonymous";
        /*Appelle des images sur la page principale*/
        div.appendChild(img);
        div.appendChild(title);
        gallery.appendChild(div);
    }
})

/*Récupération de la galerie afin de n'afficher que
      les hotels et les restaurants au 'clique' sur le filtre "Hotels & restaurants"
*/
FilterH.addEventListener("click", async function () {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    let result = data.filter(item => item.category.name === "Hotels & restaurants");

    for (const image of result) {

        const div = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("p");
        title.textContent = image.title;
        /*importation des images spécifiques au filtre*/
        img.src = image.imageUrl;
        img.alt = image.title;
        img.crossOrigin = "anonymous";
        /*Appelle des images sur la page principale*/
        div.appendChild(img);
        div.appendChild(title);
        gallery.appendChild(div);
    }
})

/* Activation des filtres */

const buttons = document.querySelectorAll(".apparenceFiltres");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("active");

        buttons.forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.classList.remove("active");
            }
        })
    });
});