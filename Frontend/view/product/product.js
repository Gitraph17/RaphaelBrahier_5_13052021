// CE FICHIER GERE L'AFFICHAGE ET LES OPTIONS DE PERSONNALISATION D'UN PRODUIT UNIQUE CLIQUÉ PAR L'UTILISATEUR SUR LA PAGE D'ACCUEIL

// L'identifiant du produit cliqué est récupéré dans le localStorage.
let clickedCameraId = localStorage.getItem("clickedCameraId");

// Fonction créant un visuel du produit placé en argument ainsi qu'un menu de personnalisation pour ses options:
function createProductVisualAndCustomMenus(cameraToDisplay) {
    document.querySelector(".productPageCamera").innerHTML +=
                                                `<h2 class="camera__name">${cameraToDisplay.name}</h2>
                                                <img class="productPageCamera__pic camera__pic" src="${cameraToDisplay.imageUrl}">
                                                <p class="camera__description">${cameraToDisplay.description}</p>
                                                <p class="camera__price">${getFormatedPrice(cameraToDisplay.price)}</p>
                                                <form class="camera__customization">
                                                    <label for="lenses">Lentille:</label>
                                                    <select class="selectLense"></select>
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
    for(let lense of cameraToDisplay.lenses) {
        document.querySelector(".selectLense").innerHTML += `<option value="${lense}">${lense}</option>`;
    }
}

// L'appareil photo à comparer a t'il le même identifiant, la même configuration de lentille et la même quantité séléctionnée qu'un appareil déja présent dans le panier ?
function isSameIdLenseQty (camToCompare) {
    let cartList = getCart();
    for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].id === camToCompare.id && cartList[i].selectedLense === camToCompare.selectedLense && cartList[i].selectedQuantity === camToCompare.selectedQuantity) {
            return true;
        }
    }
}

// L'appareil photo à comparer a t'il le même identifiant et la même configuration de lentille mais une quantité séléctionnée différente d'un appareil déja présent dans le panier ?
function isQtyChanged (camToCompare) {
    let cartList = getCart();
    for (let i = 0; i < cartList.length; i++) {
        if (cartList[i].id === camToCompare.id && cartList[i].selectedLense === camToCompare.selectedLense && cartList[i].selectedQuantity != camToCompare.selectedQuantity) {
            return true;
        }
    }
}

// FONCTION GERANT LES INTERACTIONS AU CLIQUE SUR LE BOUTON "AJOUTER AU PANIER".
// Au clique un objet est créee avec ses différentes propriétés, la quantité et l'option choisie par l'utilisateur.
// SI la liste du panier contient déja un produit identique (même Id ET même option de personnalisation) dans une quantité séléctionnée identique, on informe l'utilisateur via la boite modale que ce produit à déja été ajouté et on lui précise ce qu'il peut faire.
// SINON SI la liste du panier contient déja un produit identique (même Id ET même option de personnalisation), mais que la quantité séléctionnée diffère on remplace le produit dans le localStorage pour prendre en compte la modification de quantité et on en informe l'utilisateur via la boite modale.
// SINON l'objet est ajouté à la liste du panier et sauvegardé dans le localStorage (fonction créée dans le fichier "cartManager.js").
// Finalement, une boite modale apparait pour confirmer à l'utilisateur son ajout du produit au panier (fonction créée dans le fichier "addToCartModal.js").
function addToCartBtnInteraction (cameraToBuy) {
    document.querySelector(".addToCartButton").addEventListener("click", function() {
        let cameraAddedToCart = {
            name : cameraToBuy.name,
            picture : cameraToBuy.imageUrl,
            price : cameraToBuy.price,
            id : clickedCameraId,
            selectedLense: document.querySelector(".selectLense").value,
            selectedQuantity: document.querySelector(".selectQuantity").value,
        }
        if (isSameIdLenseQty(cameraAddedToCart)) {
            modal.innerHTML += `<p>L'appareil photo ${cameraToBuy.name} à déjà été ajouté au panier avec une lentille et une quantité identique à la séléction actuelle.</p>
                                    <p>Vous pouvez ajouter le même modèle avec une lentille différente, modifier la quantité séléctionnée, ou supprimer ce produit en vous rendant sur la page "Panier".</p>
                                    <button class="modalBtn modal-goToCartBtn">Voir mon panier</button>
                                    <button class="modalBtn modal-closeBtn">Retour à la fiche du produit</button>`;
            modalShow();
        } else if (isQtyChanged(cameraAddedToCart)) {
            modal.innerHTML += `La quantité séléctionnée à bien étée modifiée pour ce produit.</p>
                                    <button class="modalBtn modal-goToCartBtn">Voir mon panier</button>
                                    <button class="modalBtn modal-closeBtn">Retour à la fiche du produit</button>`;
            modalShow();
            removeCameraFromCart(cameraAddedToCart);
            addToCart(cameraAddedToCart);
        } else {
            addToCart(cameraAddedToCart);
            modal.innerHTML += `<p>L'appareil photo ${cameraToBuy.name} à été ajouté au panier !</p>
            <button class="modalBtn modal-goToCartBtn">Voir mon panier</button>
            <button class="modalBtn modal-closeBtn">Retour à la fiche du produit</button>`;
            modalShow();
        }
    })
}

// Fonction globale qui récupère les données du produit cliqué sur la page d'accueil via l'API (fonction créée dans le fichier "APIrequestsManager").
// Ensuite les deux fonctions créées précédemment sont appellées.
async function displayClickedCameraAndInteractions() {
    let clickedCamera = await getProductsDatas(`http://localhost:3000/api/cameras/${clickedCameraId}`);
    createProductVisualAndCustomMenus(clickedCamera);
    addToCartBtnInteraction(clickedCamera);
}

// Appel de la fonction globale:
displayClickedCameraAndInteractions()