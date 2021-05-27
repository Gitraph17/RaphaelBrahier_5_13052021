// GESTION DE L'AFFICHAGE DU PANIER ("cart.html").

//Récupèration de la liste du panier utilisateur dans le localStorage (fonction créee dans "cartManager.js"):
let cartList = getCart();

//Pour chaque produit de la liste, une structure HTML est créee pour l'affichage:
let cartListContainer = document.querySelector(".cartListContainer");
for (let product of cartList){
    cartListContainer.innerHTML += `
                                    <article class="cameraInCart" data-id=${product.id}>
                                        <img class="cameraInCart__pic" src="${product.picture}">
                                        <div class= "cameraInCartNameAndLenseContainer">
                                            <h2 class="cameraInCart__name">Appareil photo ${product.name}</h2>
                                            <p class="cameraInCart__lense">Lentille séléctionnée: ${product.selectedLense}</p>
                                        </div>
                                        <div class= "cameraInCartPriceAndQtyContainer">
                                            <p class="cameraInCart__price">${getFormatedPrice(product.price)}</p>
                                            <p class="cameraInCart__quantity">Qté: ${product.selectedQuantity}</p>
                                            <button class="cameraInCart__deleteBtn--mobilVersion"><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                        <button class="cameraInCart__deleteBtn">Supprimer</button>
                                    </article>
                                    `
};

//Mise en place du bouton "Supprimer" pour chaque article, version desktop et mobile du boutton (fonction créee dans "cartManager.js"):
deleteButton(document.querySelectorAll(".cameraInCart__deleteBtn"));
deleteButton(document.querySelectorAll(".cameraInCart__deleteBtn--mobilVersion"));

//Affichage SI panier vide
if (cartList.length === 0) {
    document.querySelector(".cartHeadline").style.display="none";
    document.querySelector(".orderSummary").style.display="none";
    document.querySelector(".orderForm").style.display="none";
    document.querySelector(".emptyCart").innerHTML  +=  `
                                                        <h2 class = "emptyCart__headline">Votre panier est vide</h2>
                                                        <a class = "emptyCart__backLink backToHomepageLink" href="http://127.0.0.1:5500/index.html">Retour à l'accueil</a>
                                                        `
};

//Affichage SI panier NON vide
if (cartList.length > 0) {
    document.querySelector(".emptyCart").style.display="none";
    document.querySelector(".orderSummary").innerHTML += `
                                                        <h2 class = "orderSummary__headline" >Récapitulatif</h2>
                                                        <p>${numberOfProductsInCart()}</p>
                                                        <h3 class = "orderSummary__totalPriceHeadline">Total</h3>
                                                        <p>${totalPrice()}</p>
                                                        `
};