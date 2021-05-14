/*Réprésentation du format d'un produit "camera"*/

class Camera {
    constructor(lenses, id, name, price, description, imageURL) {
        this.lenses = lenses;
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageURL = imageURL;
    }
}
