// on charge les infos utiles pour le jeu
const statut_h2 = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// on definit les conditions de la victoire
const conditionsVictoire = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

// Messages
const gagne = () => `Le joueur ${joueurActif} a gagné ! `
const egalite = () => "Egalité !"
const tourJoueur = () => `Tour du joueur ${joueurActif}`

// on affiche quel joueur joue
statut_h2.innerHTML = tourJoueur()

// on met en place les écouteurs d'événements

document
  .querySelectorAll(".case")
  .forEach((cellule) => cellule.addEventListener("click", gestionClickCase))
document.querySelector("#recommencer").addEventListener("click", recommencer)

/**
 * Fonction qui gère le click sur une case
 */

function gestionClickCase() {
  // Récupération de l'id de la cellule cliquée
  const indexCase = parseInt(this.dataset.index)

  // On va vérifier si la case est déja remplie ou si le jeu est terminé
  if (etatJeu[indexCase] !== "" || !jeuActif) {
    return
  }

  // On écrit le symbole du joueur dans le tableau etatjeu et la case
  etatJeu[indexCase] = joueurActif
  this.innerHTML = joueurActif

  // On vérifie si le joueur a gagné
  verifGagne()
}

function verifGagne() {
  let tourGagnant = false

  for (let condition of conditionsVictoire) {
    // On parcour toutes les conditions de victoire
    let val1 = etatJeu[condition[0]]
    let val2 = etatJeu[condition[1]]
    let val3 = etatJeu[condition[2]]

    // Si une case est vide
    if (val1 === "" || val2 === "" || val3 === "") {
      continue
    }

    // Si 3 cases sont identiques
    if (val1 === val2 && val2 === val3) {
      // On gagne
      console.log("le joueur a gagné")
      tourGagnant = true
      break
    }
  }

  // Si on a gagné
  if (tourGagnant) {
    console.log("On est dans le if du h2 gagné")
    statut_h2.innerHTML = gagne()
    jeuActif = false
    return
  }

  //On change de joueur
  joueurActif = joueurActif === "X" ? "O" : "X"
  statut_h2.innerHTML = tourJoueur()

  // Si toutes les cases sont remplies
  if (!etatJeu.includes("")) {
    statut_h2.innerHTML = egalite()
    jeuActif = false
    return
  }
}

function recommencer() {
  console.log("on recommence")
  joueurActif = "X"
  jeuActif = true
  etatJeu = ["", "", "", "", "", "", "", "", ""]
  statut_h2.innerHTML = tourJoueur()

  document
    .querySelectorAll(".case")
    .forEach((cellule) => (cellule.innerHTML = ""))
}
