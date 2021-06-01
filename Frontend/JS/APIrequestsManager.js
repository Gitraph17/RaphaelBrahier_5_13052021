// GESTION DES REQUETES API

// REQUETE DE TYPE "GET" POUR RECUPERER LES DONNES SUR LES PRODUITS 
// Cette fonction asynchrone prend en argument l'URL de l'API cible.
// Si la requête HTTP est bien effectuée une promesse est reçue. La variable "response" contient cette promesse lorsqu'elle est résolue sous forme d'objet "Response".
// SI la réponse indique un succès de cette requête (response.ok: true), alors on retourne le contenu de la réponse en tant qu’objet JSON.
// SINON (si "response.ok" vaut "false") le statut de l'érreur est affiché dans la console.
// Si la requête HTTP n’a pas pu être effectuée l'erreur est affichée dans la console via l'instruction "catch".
async function getProductsDatas(apiUrl) {
    try {
        let response = await fetch(apiUrl);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Retour du serveur : ", response.status);
        }
    }
    catch (e) {
        console.log(e);
    }
}

// REQUETE DE TYPE "POST" POUR ENVOYER LES DONNES NECESSAIRES A UNE COMMANDE
// Cette fonction prend en argument les données à envoyer.
// Elle est construite sur le même modèle que la fonction "getProductsDatas".
async function sendOrderDatas(requestBody) {
    try {
        let response = await fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: requestBody,
            })
            if (response.ok) {
                return await response.json();
            } else {
                console.error("Retour du serveur : ", response.status);
            }
    }
    catch (e) {
        console.log(e);
    }
}