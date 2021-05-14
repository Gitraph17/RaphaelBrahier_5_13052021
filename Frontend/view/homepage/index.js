fetch("http://localhost:3000/api/cameras")
    .then(function(response) {
       if(response.ok) {
           return response.json();
       }
    })
    .then(function(jsonCameraList) {
        for(let jsonCamera of jsonCameraList){
            let camera = new Camera(jsonCamera.lenses, jsonCamera._id, jsonCamera.name, jsonCamera.price, jsonCamera.description, jsonCamera.imageUrl);
            document.querySelector(".productsList").innerHTML +=
                                                                `<article class="camera">
                                                                    <h2 class="camera__name">${camera.name}</h2>
                                                                    <img class="camera__pic" src="${camera.imageURL}">
                                                                    <p class="camera__description">${camera.description}</p>
                                                                    <p class="camera__lenses">${camera.lenses}</p>
                                                                    <p class="camera__price">${camera.price}</p>
                                                                 </article>`;
        }
    })
    .catch(function(error) {
        console.log(error)
    });

   