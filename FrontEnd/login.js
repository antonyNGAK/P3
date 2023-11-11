const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  users(email, password);
});

function users(email, password) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Une erreur est survenue");
    })
    .then(data => {
      localStorage.setItem('Token', data.token);
      console.log(data);
      window.location.href = "user.html";
    })
    .catch(error => {
      console.log(error);
      alert("Adresse e-mail ou mot de passe incorrect");
    });
}
