// CE FICHIER GERE L'AFFICHAGE DE LA LISTE DES PRODUITS SUR LA PAGE D'ACCUEIL ET LES INTERACTIONS AU CLIQUE SUR UN ARTICLE:

// Cette fonction crée une structure HTML pour chaque objet d'une liste reçue en argument:
function createProductVisualsFromList(cameraList) {
    for(let item of cameraList){
        const productListContainer = document.querySelector(".productsList");
        productListContainer.innerHTML +=`
                                            <article class="camera homePageCamera productSheet" data-id=${item._id}>
                                                <h2 class="camera__name">${item.name}</h2>
                                                <img class="homePageCamera__pic camera__pic" src="${item.imageUrl}">
                                                <p class="camera__description">${item.description}</p>
                                                <p class="camera__price">${getFormatedPrice(item.price)}</p>
                                            </article>`;
    }
}

// Cette fonction récupère l'ID du produit cliqué, l'enregistre dans le localStorage et redirige l'utilisateur vers la page produit:
function storeClickedProductIdAndMoveToProductPage () {
    document.querySelectorAll(".camera").forEach(article => {
        article.addEventListener("click", function() {
            localStorage.setItem("clickedCameraId", this.dataset.id);
            document.location.href="../product/product.html";
        })
    })
}

/* Fonction globale qui récupère la liste de produits de l'API (fonction créee dans le fichier "APIrequestsManager.js"),
ensuite, les deux fonctions crées précédemment sont appellées: */
async function productDisplayAndInteraction() {
    let camerasList = await getProductsDatas("http://localhost:3000/api/cameras");
    createProductVisualsFromList(camerasList);
    storeClickedProductIdAndMoveToProductPage();
}

// Appel de la fonction globale:
productDisplayAndInteraction();