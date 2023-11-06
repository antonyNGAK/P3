const loginForm = document.getElementById("login-form");
const urlApi = "http://localhost:5678/api/";

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let emailChamp = document.getElementById("email");
    let passwordChamp = document.getElementById("password");
    const user = {
        email: emailChamp.Value,
        password: passwordChamp.Value,
    };
    
    /*Appelle à l'API pour récupérer l'identifiant et le mot de passe*/
    
    fetch(urlApi + "users/login", {
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
})
    /*Condition d'accès au site et vérification du couple login
      retour d'erreur en cas de mauvaise saisie
    */
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        else {
            return Error("Vérifier votre saisie");
        }

    })
    .then(value => {
        if (value !== 1) {
            sessionStorage.setItem("token", value.token);
            location.href = "index.html"
        }
    })
    .catch(error =>{
        console.log(error);
    })

    /*Vérification des données
      et retour d'erreur si besion
    */
    .then(data => {
        localStorage.setItem("id",data.userId)
        localStorage.setItem("Token", data.token);
        window.location.href = "index.html";
    })
    .catch(function (error) {
        console.log(error);
        alert("Adresse e-mail ou mot de passe incorrect");
    });