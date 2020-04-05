$(document).ready(
  (function () {
    var app = {
      init: function () {
        window.addEventListener("load", function (event) {
          var button = document.getElementById("launch");
          console.log(button);
          button.addEventListener("click", function (event) {
            // Disparition du bouton notation
            launch.style.display = "none";

            // Envoi de la requete AJAX et traitement du resultat par PHP
            $("#envoyer").click(function () {
              $.ajax({
                url: "filldatabase.php",
                type: "GET", // Le type de la requête HTTP, ici devenu GETT
                dataType: "html",
                success: function (code_html, statut) {
                  $(code_html).appendTo("#commentaires"); // On passe code_html à jQuery() qui va nous créer l'arbre DOM !
                },

                error: function (resultat, statut, erreur) {},

                complete: function (resultat, statut) {},
              });
            });
            // var xmlhttp = new XMLHttpRequest();
            // xmlhttp.addEventListener("readystatechange", function (event) {
            //   console.log(xmlhttp);
            //   if (xmlhttp.readyState == 4) {
            //     if (xmlhttp.status == "200") {
            //       // récupération des données et traitement
            //       var div = document.getElementById("result");
            //       div.innerHTML = xmlhttp.responseText;
            //     } else {
            //       alert(
            //         "error code" + xmlhttp.status + " : " + xmlhttp.statusText
            //       );
            //     }
            //   }
            // });

            // xmlhttp.open("GET", "filldatabase.php", true);
            // xmlhttp.setRequestHeader(
            //   "Content-type",
            //   "application/x-www-form-urlencoded; charset=utf-8"
            // );
            // xmlhttp.send(message);
          });
        });
      },
    };
    app.init();
  })();
  $("#more_com").click(function () {
    $.ajax();
  });
});
