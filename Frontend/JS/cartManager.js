/* GESTION DES DIFFERENTES FONCTIONS DU PANIER:
        -Récupération de la liste des produits du panier dans le localStorage
        -Sauvegarde de la liste dans le localStorage
        -Ajout d'un produit à la liste
        -Suppression d'un produit de la liste
        -Association de chaque bouton supprimer au produit à supprimer dans la "cartList"
        -Calcul du prix total du panier
        -Calcul de la quantité de produits dans le panier
*/

function getCart() {
    let cartList = localStorage.getItem("cartList");
    if(cartList == null){
        return [];
    }else{
        return JSON.parse(cartList);
    }
}

function saveCartListToLocalStorage(cartList) {
    localStorage.setItem("cartList",JSON.stringify(cartList));
}

function addToCart(camera) {
    let cartList = getCart();
    cartList.push(camera);
    saveCartListToLocalStorage(cartList);
}

function removeCameraFromCart(camera) {
    let cartList = getCart();
/* Un produit est supprimé du panier grâce à la méthode filter qui renvoie un tableau avec uniquement les produits du panier 
ayant un identifiant différent OU une option de personnalisation différente du produit que l'on souhaite supprimer*/
    cartList = cartList.filter(cartListItem => cartListItem.id !== camera.id || cartListItem.selectedLense !== camera.selectedLense);
    saveCartListToLocalStorage(cartList);
}

function deleteButton(buttonsList) {
    for (let i = 0; i < buttonsList.length; i++) {
        buttonsList[i].addEventListener("click", function() {
            removeCameraFromCart(cartList[i]);
// Après suppression la page est rafraichie pour mettre à jour le panier:
            document.location.href="./cart.html";
        })
    }
}

function totalPrice() {
    let total = 0;
    for(let product of cartList) {
        total += product.price*product.selectedQuantity;
    }
    return getFormatedPrice(total);
}

function numberOfProductsInCart() {
    let productsQty = 0;
    for(let product of cartList) {
        productsQty += Number(product.selectedQuantity);
    }
    if (productsQty > 1){
    return productsQty + " articles dans le panier";
    } else {
    return productsQty + " article dans le panier";
    }
}

