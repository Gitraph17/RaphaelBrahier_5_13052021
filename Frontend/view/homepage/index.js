// CE FICHIER GERE L'AFFICHAGE DE LA LISTE DES PRODUITS SUR LA PAGE D'ACCUEIL

// Une requête est envoyée à l'API grâce à la méthode "fetch" pour récupérer la liste des produits sur le serveur.
fetch("http://localhost:3000/api/cameras")
    .then(function(response) {
       if(response.ok) {
           return response.json();
       }
    })
    .then(function(jsonCameraList) {
// Lorsque ces données sont récupérées, on crée une instance de chaque produit grâce à la classe "Camera" définie dans le fichier"productClass.js".
        for(let jsonCamera of jsonCameraList){
            let camera = new Camera(jsonCamera.lenses, jsonCamera._id, jsonCamera.name, jsonCamera.price, jsonCamera.description, jsonCamera.imageUrl);
// Pour chaque instance une structure HTML est créee pour l'affichage sur la page.
            document.querySelector(".productsList").innerHTML +=
                                                                `<article class="camera homePageCamera productSheet" data-id=${camera.id}>
                                                                    <h2 class="camera__name">${camera.name}</h2>
                                                                    <img class="homePageCamera__pic camera__pic" src="${camera.imageUrl}">
                                                                    <p class="camera__description">${camera.description}</p>
                                                                    <p class="camera__price">${getFormatedPrice(camera.price)}</p>
                                                                 </article>`;
        }
// Un écouteur d'événement "clique" est mis en place sur chaque article.
        document.querySelectorAll(".camera").forEach(article => {
            article.addEventListener("click", function() {
// Au clique, l'identifiant du produit cliqué est enrégistré dans le localStorage. 
                localStorage.setItem("clickedCameraId", this.dataset.id);
// L'utilisateur est redirigé vers la page product.html. 
                document.location.href="./Frontend/view/product/product.html"; 
            })
        })
    })
    .catch(function(error) {
        console.log(error)
    });