// CE FICHIER GERE L'AFFICHAGE DE LA PAGE DE CONFIRMATION DE COMMANDE "orderConfirmation.html": 
// Les informations retournées par le serveur et le prix total sont récupérés dans le localStorage.
// Ces données sont ensuite injectées dans une structure HTML pour être affichées sur la page:

let orderConfirmationDetails = JSON.parse(localStorage.getItem("orderConfirmationDetails"));
let totalPrice = localStorage.getItem("totalPrice");
let customerFirstName = (orderConfirmationDetails.contact).firstName;

let orderConfirmationContainer = document.querySelector(".orderConfirmationContainer");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

orderConfirmationContainer.innerHTML += `
                                        <h1>Merci ${capitalizeFirstLetter(customerFirstName)} !</h1>
                                        <i class="fas fa-smile-beam"></i>
                                        <h2>Votre commande à été transmise avec succès.</h2>
                                        <p>Montant total: ${totalPrice}</p>
                                        <p>Identifiant de commande: ${orderConfirmationDetails.orderId}</p>
                                        <p class="seeYouSoon">À très bientôt sur <span class="logoTitle">Orinoco</span></p>
                                        `;