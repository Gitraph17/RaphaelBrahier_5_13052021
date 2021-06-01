// GESTION DU FORMULAIRE DE COMMANDE: AFFICHAGE DES MESSAGES DE SAISIE INVALIDE, VALIDATION, ENVOI DE LA COMMANDE AU SERVEUR
// Les atrributs de validation (pattern REGEX, min-length, max length...) sont placés dans le code HTML.

let orderForm = document.querySelector(".orderForm");

// Chaque input est placé dans une variable pour simplifier la manipulation:
let firstNameInput  = document.getElementById("orderForm__firstName");
let lastNameInput   = document.getElementById("orderForm__lastName");
let addressInput    = document.getElementById("orderForm__address");
let postalCodeInput = document.getElementById("orderForm__postalCode");
let cityInput       = document.getElementById("orderForm__city");
let emailInput      = document.getElementById("orderForm__email");

// Création d'un tableau d'objets pour associer à chaque input un message d'erreur personnalisé:
let inputs = [
    {
        name: firstNameInput,
        validationInfo: "Le prénom doit être composé de 2 à 20 caractères, chiffres et symboles spéciaux ne sont pas acceptés.",
    },
    {
        name: lastNameInput,
        validationInfo: "Le nom de famille doit être composé de 2 à 20 caractères, chiffres et symboles spéciaux ne sont pas acceptés.",
    },
    {
        name: addressInput,
        validationInfo: "L'adresse doit être composée de 3 à 100 caractères, les symboles spéciaux ne sont pas acceptés.",
    },
    {
        name: postalCodeInput,
        validationInfo: "Le code postal doit être composé de 5 chiffres.",
    },
    {
        name: cityInput,
        validationInfo: "Le nom de votre ville doit être composé de 1 à 30 caractères, chiffres et symboles spéciaux ne sont pas acceptés.",
    },
    {
        name: emailInput,
        validationInfo: "Votre adresse email doit être dans un format valide."
    },
];

// FONCTION QUI AFFICHE LES MESSAGES PERSONNALISES POUR CHAQUE INPUT EN CAS DE SAISIE INVALIDE:
// Au changement de valeur d'un champ, SI il est invalide ET non vide, on affiche le message associé au sein de l'élément HTML qui suit l'input (une balise "span").
// SINON on retire le message d'erreur.
function displayValidationInfos() {
    for (let input of inputs) {
        input.name.addEventListener("change", function(event){
            event.preventDefault();
        if ( ! event.target.validity.valid && input.name.value != "") {
            input.name.nextElementSibling.innerHTML = `<i class="fas fa-exclamation-circle"></i>  ${input.validationInfo}`;
            input.name.nextElementSibling.style.display = 'block';
            input.name.className = "invalidInput";
        }  else {
            input.name.nextElementSibling.style.display = "none";
            input.name.classList.remove("invalidInput");
        }
        })
    };
}

// FONCTION D'ACTIVATION DU BOUTON DE SOUMISSION DU FORMULAIRE:
// Le bouton est initialisé comme étant désactivé.
// A chaque saisie utilisateur, SI la longeur de la liste des champs invalides est nulle, alors le bouton est activé.
// SINON le bouton reste inactivé. 
function activateSubmitBtn() {
    let submitOrderButton = document.getElementById("submitOrderBtn");
    submitOrderButton.disabled = true;
    submitOrderButton.style.cursor = "not-allowed";
    for (let input of inputs) {
        input.name.addEventListener("input", function() {
        let invalidInputs = document.querySelectorAll(":invalid");
        if (invalidInputs.length === 0) {
            submitOrderButton.disabled = false;
            submitOrderButton.style.cursor = "pointer";
        } else {
            submitOrderButton.disabled = true;
            submitOrderButton.style.cursor = "not-allowed";
        }
        })
    }
};

// Fonction de création d'un objet "contact" avec les valeurs saisies par l'utilisateur:
// (Fonction appellée à la soumission du formulaire)
function createContactObject() {
    let contact = {
        firstName:  firstNameInput.value,
        lastName:   lastNameInput.value,
        address:    addressInput.value,
        city:       cityInput.value,
        email:      emailInput.value
    }
    return contact;
}

// Fonction de création d'un tableau qui contient les identifiants des produits commandés:
// (Fonction appellée à la soumission du formulaire)
function createProductIdsArray() {
    let products = [];
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    for (product of cartList) {
        products.push(product.id);
    }
    return products;
}

// GESTION DES INTERACTIONS A LA SOUMISSION DU FORMULAIRE:
// A la soumission, un objet contact et un tableau des produits commandés est crée. 
// Ces données sont envoyées à l'API (fonction créee dans le fichier "APIrequestsManager.js").
// L'API répond en retournant l'objet contact, le tableau de produits et un identifiant de commande.
// On stocke cette réponse et le prix total dans le localStorage, puis on redirige vers la page confirmation de commande.
function submitOrder() {
    orderForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let contact = createContactObject();
        let products = createProductIdsArray();
        sendOrderDatas(JSON.stringify({contact, products})).then ((serverResponse) => {
            localStorage.setItem("orderConfirmationDetails", JSON.stringify(serverResponse));
            localStorage.setItem("totalPrice", totalPrice());
            document.location.href="../orderConfirmation/orderConfirmation.html";
        })
    })
};

// Appel des fonctions crées:
displayValidationInfos ()
activateSubmitBtn ()
submitOrder()