/*variables pour la validation du formulaire*/
let val, msgErr, erreur = false;


/**
 * Exécuter la fonction de validation 
 * @param {Element} frm1
 * @return {boolean} erreur
**/
export function controleChamps() {
    erreur = false;
    validerTache()
    return erreur;
}

/*contrôle champ text tache*/
function validerTache(){
  msgErr = "";
  val = frm1.tache.value;
  val = val.trim();
  if (val === "") msgErr ="Saisir au moins un caractère";
  if (msgErr !== "") erreur = true;
  document.getElementById("msgErr").innerText = msgErr;
}