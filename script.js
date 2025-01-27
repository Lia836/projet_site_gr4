//Création d'une alerte
// Sélectionner le lien par son ID
const alerte = document.getElementById("alerte");

// Ajouter un événement "click" au lien
if (alerte) {
  // Ajouter un événement "click" au lien
  alerte.addEventListener("click", function (event) {
    // Empêcher le comportement par défaut du lien (ne pas rediriger)
    event.preventDefault();

    // Afficher l'alerte
    alert("Nous sommes victimes de notre succès.... Rupture de stock !");
  });
} else {
  // Si l'élément n'existe pas, vous pouvez logguer un message pour le débogage
  console.log("L'élément 'alerte' n'existe pas sur cette page.");
}

//Création d'une alerte 2
// Sélectionner le lien par son ID
const alerte2 = document.getElementById("alerte2");

// Vérifier si l'élément existe
if (alerte2) {
  // Ajouter un événement "click" au lien
  alerte2.addEventListener("click", function (event) {
    // Empêcher le comportement par défaut du lien (ne pas rediriger)
    event.preventDefault();
    // Afficher une alerte
    alert("Une erreur s'est produite, veuillez réessayer ultérieurement");
  });
} else {
  // Si l'élément n'existe pas, loguer un message pour le débogage
  console.log("L'élément 'alerte2' n'existe pas sur cette page.");
}

/*horloge*/
let clockID = 0;
//une variable globale est définie pour stocker l'identifiant du minuteur (setTimeout)
//permet de contrôler l'exécution de la mise à jour
//initié à 0 pas de timer en cours au début

function UpdateClock() {
  //fonction est le coeur de l'horloge numérique
  //si un minuteur est en route, il est arrêté
  if (clockID) {
    clearTimeout(clockID);
    clockID = 0;
  }
  //elle commence par effacer tout timer existant pour éviter les conflits et provoquer des bugs

  let tDate = new Date();
  //création d'un objet date qui contient la date et l'heure actuelle

  //formatage des heures et extraction des heures, minutes et secondes sous le format HH:MM:SS
  let hours = tDate
    .getHours() //récupère l'heure actuelle
    .toLocaleString("fr", { minimumIntegerDigits: 2, useGrouping: false }); //convertit en une chaîne à deux chiffres
  let minutes = tDate
    .getMinutes() //récupère les minutes actuelles
    .toLocaleString("fr", { minimumIntegerDigits: 2, useGrouping: false }); //convertit en une chaîne à deux chiffres
  let seconds = tDate
    .getSeconds() //récupères les secondes actuelles
    .toLocaleString("fr", { minimumIntegerDigits: 2, useGrouping: false }); //convertit en une chaîne à deux chiffres

  document.getElementById("clock").value = `${hours}:${minutes}:${seconds}`;
  //met à jour l'élément qui contient l'identifiant clock dans le html pour afficher l'heure au bon format

  clockID = setTimeout(UpdateClock, 1000);
}
// lancement du timer, la fonction updateClock est appelée pour mettre à jour l'horloge, elle crée un nouveau timer en utilisant setTimeout//
//relance la fonction UpdateClock toutes les secondes (1000ms), ce qui remet à jour l'horloge)

//clockID = setInterval appelle la fonction toutes les secondes sans s'arrêter

window.addEventListener("load", function () {
  UpdateClock();
}); //appelle la fonction au chargement de la page

//Création du calendrier
let dateJour = new Date();
//creation d'un objet qui comprend la date du jour

//création d'une fonction calendrier
function calendrier() {
  //constante qui appelle les mois de l'année de 0 à 11, tableau car utilisation de crochets
  const moisArray = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  //même principe qu'au dessus pour les jours de la semaine
  //même principe pour le nombre de jours dans le mois
  const jours = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const nombre = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //on met bdans un objet la date et le mois actuel
  let mois = dateJour.getMonth();
  let annee = dateJour.getFullYear();

  //on détermine les année bissextiles par ce calcul

  if (annee % 4 == 0 && annee != 1900) {
    nombre[1] = 29;
    //annee % 4 == 0 && annee != 1900) => si une année est divisible par 4 et que l'année ne soit pas 1900 car pas bissextile en 1900
    //% (modulo) correspond au reste de la division par 4
    //&& correspond à "et" || correspond à "ou"
    //!= correspond à différent ==correspond à égal
    //si le reste de la division par 4 est égal à 0 et si l'année est différente de 1900 le nombre de jour dans le mois de février (1) est 29
  }

  //détermine le jour de la semaine du premier jour du mois 0=dimanche et 6= samedi
  let premierJour = new Date(annee, mois, 1).getDay();

  //objet contenant le nombre de jour dans le mois
  let totalJours = nombre[mois];

  //création d'un objet pour déterminer la date actuelle, (c'est une instance qui fait référence à un objet crée à partir d'un modèle)
  // objet (instance) de type Date qui contient la date du jour => exemple aujourd'hui nous sommes le 16/01/2025
  let aujourdHui = new Date();

  //création du tableau pour html
  let calendrierHTML = `<table>
        <tr><th colspan="7">${moisArray[mois]} ${annee}</th></tr>
        <tr>${jours.map((j) => `<th>${j}</th>`).join("")}</tr>
        <tr>`;
  // On crée un tableau et on écrit à la première ligne la date du jour
  //colspan 7 : la case s'étend sur 7 colonnes donc la largeur du tableau

  let compteurJour = 0;
  //objet qui crée le compteur

  //boucle : si i égal 0 et i inférieur au premier jour on incrémente i
  for (let i = 0; i < premierJour; i++) {
    calendrierHTML += `<td></td>`; //ajoute des cellules vides pour aligner avec le 1er jour du mois
    compteurJour++; //augmenten la valeur du compteur de 1
  }

  // Génération des cellules pour les jours du mois
  //si jour egal 1 et que le jour est inférieur ou égal au total des jours on incrémente
  for (let jour = 1; jour <= totalJours; jour++) {
    if (compteurJour % 7 === 0 && jour !== 1) {
      //commence une nouvelle ligne à chaque fois qu'une semaine est complète
    }

    //pour pouvoir sélectionner la date du jour
    if (
      jour === aujourdHui.getDate() &&
      mois === aujourdHui.getMonth() &&
      annee === aujourdHui.getFullYear()
      //si le jour et le mois et l'année est strictement égal à la date d'aujourdHui
    ) {
      //on ajoute alors la classe cal_aujourdhui du CSS pour avoir le style en particulier
      calendrierHTML += `<td class="cal_aujourdhui">${jour}</td>`;
    } else {
      calendrierHTML += `<td>${jour}</td>`; //sinon on met juste le jour
    }

    compteurJour++; //incrémente le compteur de 1

    //permet de terminer la ligne si elle est complète
    if (compteurJour % 7 === 0) {
      calendrierHTML += `</tr>`; //fermeture de la cellule
    }
  }
  //complète les cellules vides à la fin du tableau
  while (compteurJour % 7 !== 0) {
    //si nécessaire tant que le reste de la division par 7 du compteurJour est strictement différente de 0
    calendrierHTML += `<td></td>`; //ajoute une case vide
    compteurJour++; //incrémente
  }

  //ferme le tableau
  calendrierHTML += `</tr></table>`;
  document.getElementById("calendrier").innerHTML = calendrierHTML;
  //insert le calendrier avec l'id calendrier.
  //cf page index écrit comme ceci : <div id="calendrier"></div><!--division de la section comprenant le calendrier-->
}

document.addEventListener("DOMContentLoaded", () => {
  //exécuter quand toute la page est chargée
  // Initialisation du calendrier
  calendrier(); //appelle la fonction calendrier dès que la page est prête

  // Gestion du bouton "Précédent"
  document.getElementById("prec").addEventListener("click", () => {
    //récupère l'html avec identifiant prec (bouton dans l'html) et l'évènement sera appliqué quand il y aura un click
    dateJour.setMonth(dateJour.getMonth() - 1); // Décrémenter le mois
    calendrier(); // Régénérer le calendrier
  });

  // Gestion du bouton "Suivant"
  //même système que précédent fonctionne de la même manière
  document.getElementById("suiv").addEventListener("click", () => {
    dateJour.setMonth(dateJour.getMonth() + 1); // Incrémenter le mois
    calendrier(); // Régénérer le calendrier
  });
});
