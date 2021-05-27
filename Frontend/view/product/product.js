// CE FICHIER GERE L'AFFICHAGE ET LES OPTIONS DE PERSONNALISATION D'UN PRODUIT UNIQUE CLIQUÉ PAR L'UTILISATEUR SUR LA PAGE D'ACCUEIL

// L'identifiant du produit cliqué est récupéré dans le localStorage.
let clickedCameraId = localStorage.getItem("clickedCameraId");

// Une requête est envoyée à l'API pour obtenir les données du produit en plaçant l'identifiant récupéré en fin d'URL dans la méthode "fetch".
fetch(`http://localhost:3000/api/cameras/${clickedCameraId}`)
    .then(function(response) {    
       if(response.ok) {
           return response.json();
       }
    })
    .then(function(jsonCamera) {
// A la récéption des données une instance de la classe "Camera" (définie dans le fichier "productClass.js") est créee.
        let clickedCamera = new Camera(jsonCamera.lenses, jsonCamera._id, jsonCamera.name, jsonCamera.price, jsonCamera.description, jsonCamera.imageUrl);
// Les données de l'instance sont placées dans une structure HTML pour l'affichage sur la page.
        document.querySelector(".camera").innerHTML +=
                                                        `<h2 class="camera__name">${clickedCamera.name}</h2>
                                                        <img class="productPageCamera__pic camera__pic" src="${clickedCamera.imageUrl}">
                                                        <p class="camera__description">${clickedCamera.description}</p>
                                                        <p class="camera__price">${getFormatedPrice(clickedCamera.price)}</p>
                                                        <form class="camera__customization">
                                                            <label for="lenses">Lentille:</label>
                                                            <select class="selectLense">
                                                            </select>
                                                            <label for="quantity">Quantité:</label>
                                                            <select class="selectQuantity">
                                                                <option value=1>1</option>
                                                                <option value=2>2</option>
                                                                <option value=3>3</option>
                                                                <option value=4>4</option>
                                                                <option value=5>5</option>
                                                            </select>
                                                        </form>
                                                        <input type="submit" class="addToCartButton" value="Ajouter au panier">`
// Grâce à une boucle, chaque option produit est placée dans une balise html <option> pour former une liste de choix  pour l'utilisateur:                                                                         
        for(let lense of clickedCamera.lenses) {
            document.querySelector(".selectLense").innerHTML += `<option value="${lense}">${lense}</option>`;
        }
// Un écouteur d'évenement "clique" est mis en place sur le bouton "Ajouter au panier":
        document.querySelector(".addToCartButton").addEventListener("click", function() {
// Au clique sur ce bouton un objet est crée avec les caractèristiques du produit, notamment l'option et la quantité saisie par l'utilisateur:
            let cameraAddedToCart = {
                name : clickedCamera.name,
                picture : clickedCamera.imageUrl,
                price : clickedCamera.price,
                id : clickedCameraId,
                selectedLense: document.querySelector(".selectLense").value,
                selectedQuantity: document.querySelector(".selectQuantity").value,
            }
            let cartList = getCart();
// Si la liste du panier contient déja un produit identique (même Id ET même option de personnalisation) alors rien ne se passe:
            if (cartList.find(camera => camera.id === clickedCameraId) && cartList.find(camera => camera.selectedLense === document.querySelector(".selectLense").value)) {
// Sinon, l'objet est ajouté à la liste du panier et enrégistrée dans le localStorage via les fonctions créees dans le fichier "cartManager.js":
            } else {
                addToCart(cameraAddedToCart);
            }
// Une boite modale apparait pour confirmer à l'utilisateur son ajout du produit au panier (fonction construite dans le fichier "addToCartModal.js"):
            modal.innerHTML += `<p>L'appareil photo ${clickedCamera.name} à été ajouté au panier !</p>
                                <button class="modalBtn modal-goToCartBtn">Voir mon panier</button>
                                <button class="modalBtn modal-closeBtn">Retour à la fiche du produit</button>`;
            modalShow();
        })
    }) 
    .catch(function(error) {
        console.log(error)
    });