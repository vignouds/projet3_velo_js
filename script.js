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

//Classe Marqueur
var Marqueur = {
  initMarqueur: function(name, lattitude, longitude){
    this.name = name;
    this.lattitude = lattitude;
    this.longitude = longitude;
  }
};

var marqueurs = [];

/* Récupération des données de l'API JCDecaux */
ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=06d1abf31ef9614eebf8a70d0ab679b30d3cf7ed", function (reponse) {
	// Transforme la réponse en un tableau d'articles
    var stations = JSON.parse(reponse);
    stations.forEach(function(station) {
      var marqueur = Object.create(Marqueur);
      marqueur.initMarqueur(station.name, station.position.lat, station.position.lng);
      marqueurs.push(marqueur);
    });
});

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

/*marqueurs.forEach(function (marq) {
  var marker = new google.maps.Marker({
      position: {lat: marqueur.lattitude, lng: marqueur.longitude},
      map: 'map'
  });
});*/
