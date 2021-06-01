// FORMATAGE DU PRIX POUR L'AFFICHAGE

function getFormatedPrice(price){
    let formatedPrice = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'}).format(price/100);
    return formatedPrice;
}