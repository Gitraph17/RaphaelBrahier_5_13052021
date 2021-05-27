/*Réprésentation du format d'un produit "camera"*/

class Camera {
    constructor(lenses, id, name, price, description, imageUrl) {
        this.lenses = lenses;
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

//La fonction qui suit n'est pas définie en tant que méthode d'instance de la classe "Camera" pour bénéficier d'un scope plus large. 
function getFormatedPrice(price){
    let formatedPrice = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'}).format(price/100);
    return formatedPrice;
}