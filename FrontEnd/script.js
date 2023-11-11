const FilterT =
  document.querySelector("#tous");
const FilterO =
  document.querySelector("#objets");
const FilterA =
  document.querySelector("#appartements");
const FilterH =
  document.querySelector(
    "#hotels"
  );

async function importImages() {
  const data = await worksImport();
  const gallery = document.querySelector(".gallery");
  for (const image of data) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    const title = document.createElement("p");
    title.textContent = image.title;
    img.src = image.imageUrl;
    img.alt = image.title;
    img.crossOrigin = "anonymous"; /*Fix du bug d'affichage*/
    /*importation des images à la page principale*/
    div.appendChild(img);
    div.appendChild(title);
    gallery.appendChild(div);
  }
}

importImages();


FilterT.addEventListener("click", async function () {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  importImages();
});

FilterO.addEventListener("click", async function () {
  getCategory("Objets");
});

FilterA.addEventListener("click", async function () {
  getCategory("Appartements");
});

FilterH.addEventListener("click", async function () {
  getCategory("Hotels & restaurants");
});

/* Création de la modale */
// Ouverture de la modale et fonctionnement du bouton Précédent
let modal = null;

const modalOpened = function (e) {
  e.preventDefault();
  e.stopPropagation();
  const buttonPrevious = document.querySelector(".boutonP");
  buttonPrevious.style.display = "none";
  const target = document.querySelector(e.currentTarget.getAttribute("href"));
  target.style.display = "flex";
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", modalClosed);
  modal.querySelector(".boutonC").addEventListener("click", modalClosed);
  modal
    .querySelector(".modalSup")
    .addEventListener("click", stopPropagation);
  modalLoad();
};

/* Fermeture de la boite modale et fonctionnement des boutons Close et Précédent */
const modalClosed = function (e) {
  if (modal === null) return; /* si la modale est non existante*/
  e.preventDefault();
  const imgContainer = document.querySelector(".containerImg");
  imgContainer.innerHTML = "";
  modal.style.display = "none";
  const imageContainer = document.querySelector(".containerImg");
  const supGallery = document.querySelector(".gallerySup"); // sup: supprimer, suppréssion
  const buttonPrevious = document.querySelector(".boutonP");
  const formModal = document.querySelector("#modalForm");
  const titreGalerie = document.querySelector("#galerieTitre");
  const contentBottom = document.querySelector(".blockA-S");
  const imageExport = document.querySelector("#exportImage");
  imageExport.innerHTML = "";
  imageExport.style.width = "0px";
  imageExport.style.height = "0px";
  contentBottom.style.display = "flex";
  buttonPrevious.style.display = "none";
  imageContainer.style.display = "flex";
  titreGalerie.innerHTML = "Galerie photo";
  supGallery.style.display = "block";
  formModal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("click", modalClosed);
  modal
    .querySelector(".boutonC")
    .removeEventListener("click", modalClosed);
  modal
    .querySelector(".modalSup")
    .removeEventListener("click", modalClosed);
  modal = null;
};

/* Arrêt de la propagation de la fermeture de la fenêtre modal*/
const stopPropagation = function (e) {
  e.stopPropagation();
};

document.querySelectorAll(".modifierApparence").forEach((a) => {
  a.addEventListener("click", modalOpened);
});

/* Importation des travaux dans la fenêtre modale */
async function modalLoad() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();

  const imgContainer = document.querySelector(".containerImg");

  imgContainer.innerHTML = "";

  for (const image of data) {

    const div = document.createElement("div");
    div.classList.add("work-item"); // Ajout d'une classe au parent
    const img = document.createElement("img");
    const title = document.createElement("p");
    const corbeilButton = document.createElement("button");
    corbeilButton.classList.add("deleted-work");
    corbeilButton.dataset.id =
      image.id; 
    title.textContent = "éditer";
    img.src = image.imageUrl;
    img.crossOrigin = "anonymous";
    corbeilButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
    /*importation des images à la page principale*/
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(corbeilButton);
    imgContainer.appendChild(div);
  }
  /* Ecoute du click, Suppression de travaux et création d'une variable Token */
  const deleteButtons =
    document.querySelectorAll(
      ".deleted-work"
    );
  deleteButtons.forEach((button) => {
    button.addEventListener("click", async function (e) {
      e.preventDefault();
      let workId =
        button.dataset
          .id;
      const token = localStorage.getItem("Token");
      await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
      const deletedWorkDiv = button.closest(".work-item");
      deletedWorkDiv.remove();
    });
  });
}

/* Récupération des catégories */
async function worksImport() {
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json();
  return data;
}

async function getCategory(category) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  const data = await worksImport();
  let result = data.filter((item) => item.category.name === category);

  for (const image of result) {

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
/* Creation des travaux de la galerie dans la modal */
async function creatingWork() {
  const imageContainer = document.querySelector(".containerImg");
  const supGallery = document.querySelector(".gallerySup");
  const buttonPrevious = document.querySelector(".boutonP");
  const formModal = document.querySelector("#modalForm");
  const titreGalerie = document.querySelector("#galerieTitre");
  const contentBottom = document.querySelector(".blockA-S");
  const hideCorbeil = document.querySelector(".corbeilHide");
  const textDivAjout = document.querySelector(".ajouterTexte");
  const formHidden = document.querySelector(".imageApparence");

  hideCorbeil.style.display = "flex";
  textDivAjout.style.display = "flex";
  formHidden.style.display = "flex";
  contentBottom.style.display = "none";
  buttonPrevious.style.display = "block";
  imageContainer.style.display = "none";
  titreGalerie.innerHTML = "Ajout photo";
  supGallery.style.display = "none"; //sup: supprimé, suppréssion
  formModal.style.display = "flex";
}
const textA = document.querySelector(".texteAjouter");
textA.addEventListener("click", creatingWork);

/* Fonctionnement du bouton Précédent */
async function previousButton() {
  const imageContainer = document.querySelector(".containerImg");
  const supGallery = document.querySelector(".gallerySup");
  const buttonPrevious = document.querySelector(".boutonP");
  const formModal = document.querySelector("#modalForm");
  const titreGalerie = document.querySelector("#galerieTitre");
  const contentBottom = document.querySelector(".blockA-S");
  const imageExport = document.querySelector("#exportImage");

  contentBottom.style.display = "flex";
  buttonPrevious.style.display = "none";
  imageContainer.style.display = "flex";
  titreGalerie.innerHTML = "Galerie photo";
  supGallery.style.display = "block";
  imageExport.innerHTML = "";
  imageExport.style.width = "0px";
  imageExport.style.height = "0px";
  formModal.style.display = "none";
  formModal.reset();
}
const boutonPrevious = document.querySelector(".boutonP");
boutonPrevious.addEventListener("click", previousButton);

async function createWork() {
  const token = localStorage.getItem("Token");
  const imageForm = document.getElementById("image").files[0];
  const titleForm = document.getElementById("title").value;
  const categoryForm = document.getElementById("category").value;

  if (!imageForm || !titleForm || !categoryForm) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageForm);
  formData.append("title", titleForm);
  formData.append("category", categoryForm);

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network error");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      modalLoad();
      previousButton()
    })
    .catch((error) => {
      console.error("problem dans l'operation fetch :", error);
    });
}


document.getElementById("modalForm").addEventListener("submit", function (event) {
  event.preventDefault();
  createWork();
});


//fonctionnement de l'image au click
const divExport = document.querySelector("#exportImage");
const exportFile = document.querySelector("#image");
const validateButton = document.querySelector("#boutonValider");
const hideCorbeil = document.querySelector(".corbeilHide");
const textDivAjout = document.querySelector(".ajouterTexte");
const formHidden = document.querySelector(".imageApparence");

exportFile.addEventListener("change", getImage);

function getImage(e) {
  hideCorbeil.style.display = "none";
  textDivAjout.style.display = "none";
  formHidden.style.display = "none";
  validateButton.style.backgroundColor = "#1D6154";
  console.log(e.target.files[0]);
  console.log("images", e.target.files[0]);
  const imageToProcess = e.target.files[0];
  let newImage = new Image(imageToProcess.width, imageToProcess.height);
  newImage.src = URL.createObjectURL(imageToProcess);
  divExport.style.width = "130px";
  divExport.style.height = "169px";
  divExport.appendChild(newImg);
}

function logout() {
  localStorage.removeItem("Token");
}
targetLogout = document.querySelector("#boutonLogout");
targetLogout.addEventListener("click", logout);

/* controle Token et redirection en cas d'erreur*/
function checkAccess() {
  const token = localStorage.getItem("Token");
  if (!token) {
    window.location.href = 'index.html';
    alert("Vous n'avez pas accès à la page d'administration");
  }
}

// Accès à la page user.html
if (window.location.href.endsWith('user.html')) {
  checkAccess();
}

/* Activation des boutons des filtres */
const buttons = document.querySelectorAll('.apparenceFiltres');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('active');

    buttons.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.classList.remove('active');
      }
    });
  });
});