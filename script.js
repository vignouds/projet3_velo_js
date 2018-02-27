
/*Slider*/
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
 	showSlides(slideIndex += n);	
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slider");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

/*Google map*/
function initMap() {
var lyon = {lat: 45.765591, lng: 4.833026};
var map = new google.maps.Map(document.getElementById('map'), {
  center: lyon,
  zoom: 13
});
var marker = new google.maps.Marker({
      position: lyon,
      map: map
  });
}


// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

/* Récupération des données de l'API JCDecaux */
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=06d1abf31ef9614eebf8a70d0ab679b30d3cf7ed", function (reponse) {
	// Transforme la réponse en un tableau d'articles
    var velos = JSON.parse(reponse);
    velos.forEach(function(velo) {
      console.log(velo.name);
      console.log(velo.position.lat);
      console.log(velo.position.lng);
    });

    // Récupération de certains résultats

/*    var temperature = meteo.current_observation.temp_c;

    var humidite = meteo.current_observation.relative_humidity;

    var imageUrl = meteo.current_observation.icon_url;*/

    // Affichage des résultats

/*    var conditionsElt = document.createElement("div");

    conditionsElt.textContent = "Il fait actuellement " + temperature +

        "°C et l'humidité est de " + humidite;

    var imageElt = document.createElement("img");

    imageElt.src = imageUrl;

    var meteoElt = document.getElementById("meteo");

    meteoElt.appendChild(conditionsElt);

    meteoElt.appendChild(imageElt);*/

});