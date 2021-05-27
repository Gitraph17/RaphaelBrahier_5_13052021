// GESTION DU FORMULAIRE DE COMMANDE: AFFICHAGE DES MESSAGES DE SAISIE INVALIDE, VALIDATION, ENVOI DE LA COMMANDE AU SERVEUR
// Les atrributs de validation (pattern REGEX, min-length, max length...) sont placés dans le code HTML.

let orderForm = document.querySelector(".orderForm");
let submitOrderButton = document.getElementById("submitOrderBtn");

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

// Le bouton "submit" est désactivé jusqu'au remplissage correct de tous les champs du formulaire:
submitOrderButton.disabled = true;
submitOrderButton.style.cursor = "not-allowed";

// Un écouteur d'évenement "changement de valeur" est attribué à chaque champ du formulaire:
for (let input of inputs) {
    input.name.addEventListener("change", function(event){
        event.preventDefault();
// Au changement de valeur du champ, SI il est invalide ET non vide, on affiche le message d'erreur associé dans l'élément HTML qui suit l'input (une balise "span"):
    if ( ! event.target.validity.valid && input.name.value != "") {
        input.name.nextElementSibling.innerHTML = `<i class="fas fa-exclamation-circle"></i>  ${input.validationInfo}`;
        input.name.nextElementSibling.style.display = 'block';
        input.name.className = "invalidInput";
// SINON on retire le message d'erreur:
    }  else {
        input.name.nextElementSibling.style.display = "none";
        input.name.classList.remove("invalidInput");
    }
// A chaque changement de valeur d'un champ, on dénombre les champs invalides:
    let invalidInputs = document.querySelectorAll(":invalid");
// SI aucun champ n'est invalide, le bouton "submit" est activé:
    if (invalidInputs.length === 0) {
        submitOrderButton.disabled = false;
        submitOrderButton.style.cursor = "pointer";
// SINON le bouton "submit" reste désactivé:
    } else {
        submitOrderButton.disabled = true;
        submitOrderButton.style.cursor = "not-allowed";
    }
    })
};

// Tableau servant à contenir les identifiants des produits commandés:
let products = [];

// Ecoute de l'événement soumission du formulaire: 
orderForm.addEventListener("submit", function(event) {
    event.preventDefault();
// Un objet "contact" est crée avec les valeurs saisies par l'utilisateur:
    let contact = {
        firstName:  firstNameInput.value,
        lastName:   lastNameInput.value,
        address:    addressInput.value,
        city:       cityInput.value,
        email:      emailInput.value
    }
// Les identifiants des produits commandés par l'utilisateur sont ajouté au tableau "products":
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    for (product of cartList) {
        products.push(product.id);
    }
// "contact" et "products" sont regroupées dans un seul objet qui est envoyé à l'API: 
    let toSend = {contact, products};
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend),
        })
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
         })
// L'API répond en retournant l'objet contact, le tableau de produits et un identifiant de commande:
        .then(function(orderConfirmationDetails){
// On sauvegarde cette réponse et le prix total dans le localStorage, puis on redirige vers la page confirmation de commande:
            localStorage.setItem("orderConfirmationDetails", JSON.stringify(orderConfirmationDetails));
            localStorage.setItem("totalPrice", totalPrice());
            document.location.href="http://127.0.0.1:5500/Frontend/view/orderConfirmation/orderConfirmation.html";
        })
        .catch(function(error) {
            console.log(error)
        })
});