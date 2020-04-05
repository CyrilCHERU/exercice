GET_URL = "liste.php";

$(document).ready(function () {
  var button = document.getElementById("start");

  button.addEventListener("click", function (event) {
    // Disparition du bouton notation
    $("#launch").css("display", "none");

    // Envoi de la requete AJAX et traitement du resultat par PHP
    $.ajax({
      url: "fillDatabase.php",
      type: "GET",
      dataType: "html",
      success: function (code_html, statut) {
        $(code_html).appendTo("#liste");
        alert("Votre base de données a bien été remplie de données !");
      },

      error: function (resultat, statut, erreur) {},

      complete: function (resultat, statut) {},
    });

    // Requête AJAX pour récupérer la liste des amis
    $.get(GET_URL, function (json) {
      var div = document.querySelector("#liste");
      var nav = document.createElement("ul");
      div.appendChild(nav);
      console.log(json.lenght);
      // for (let i = 0; i < json.length; i++) {
      //   var name = json[i]["lastname"];

      //   var lien = document.createElement("li");
      //   nav.appendChild(lien);
      //   var a = document.createElement("a");

      //   a.setAttribute("data-set", i);
      //   a.setAttribute("href", "#");
      //   a.setAttribute("style", "display: block");

      //   a.innerHTML = name;
      //   lien.appendChild(a);
      // }

      // var links = document.querySelectorAll("a");

      // links.forEach((link) => {
      //   link.addEventListener("click", function (e) {
      //     e.preventDefault();
      //     var number = this.getAttribute("data-set");

      //     $.get(GET_URL, function (json) {
      //       console.log(json[1]);

      //       var name = json[number]["lastname"];
      //       var firstname = json[number]["firstname"];
      //       var address = json[number]["post_address"];

      //       var phone = json[number]["phone"];
      //       var quote = json[number]["quote"];

      //       var titre = document.getElementsByTagName("h1");
      //       var paragraphs = document.querySelectorAll("p");

      //       titre[0].textContent = name + " " + firstname;
      //       paragraphs[0].innerHTML = "Je suis un ami d'Eddy Malou.";
      //       paragraphs[1].innerHTML =
      //         "Mon adresse est la suivante : " + address + ".";
      //       paragraphs[2].innerHTML =
      //         "Mon N° de téléphone est le : " + phone + ".";
      //       paragraphs[3].innerHTML =
      //         "Et ma citation préférée d'Eddy est : " + quote + ".";
    });
  });
});
//     });
//   });
// });
