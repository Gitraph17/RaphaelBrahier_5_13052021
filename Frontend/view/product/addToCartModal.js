// CREATION D'UNE BOITE MODALE SUR LA PAGE PRODUIT POUR CONFIRMER L'AJOUT AU PANIER D'UN PRODUIT
// Fonction appellée au clique sur le bouton "Ajouter au panier".

let modalContainer = document.createElement("div");
modalContainer.setAttribute("class", "modalContainer");

let modal = document.createElement("div");
modal.setAttribute("class", "modal");

function modalShow() {
    document.body.appendChild(modalContainer);
    modalContainer.appendChild(modal);
    document.querySelector(".modal-goToCartBtn").addEventListener("click", function() {
        document.location.href="../cart/cart.html"; 
        modalClose();
    });
    document.querySelector(".modal-closeBtn").addEventListener("click", function() {
        modalClose();
    });
}

function modalClose() {
    modal.innerHTML="";
    document.body.removeChild(modalContainer);
}