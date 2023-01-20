import {controleChamps} from "./validation.js";
import {Tache} from "./Tache.class";

/*Initiation des variables globales*/
let tTaches;
if(localStorage.getItem("ListTache")){
    tTaches = JSON.parse(localStorage.ListTache)
}else
    tTaches= [];
let modeleListe = document.getElementById("modeleListe"); /*template*/
let zoneListe = document.getElementById("listeTaches"); /*zone affichage*/
let eTemplateModal = document.getElementById("modeleDetail"); /*template modal*/

/*Insertion de données dynamiques dans la page HTML*/ 
AffichageTache();

/**
  * Gestionnaire de l'évènement click sur le bouton d'attribut name="ajouter" pour valider le champs du formulaire
  * @param {MouseEvent} evt
**/
frm1.ajouter.addEventListener("click", function(evt) {
    
    if (controleChamps(frm1)){
        /*Si erreur = true : on empeche l'envoi*/
        evt.preventDefault();
    }else{
        /*Sinon création d'une nouvelle tâche */
        let strDate = setDate();
        let Id = setID();
        let oTache = new Tache(frm1.tache.value, frm1.importance.value, strDate, Id, false);
        
        /*Insertion de la tache dans le tableau */
        tTaches.push(oTache);
        
        /*Affichage */
        AffichageTache();
    }
});

/**
  * Gestionnaire de l'évènement change sur le select d'attribut name="tri" pour trier les taches
  * @param {MouseEvent} evt
**/
frm2.tri.addEventListener("change", AffichageTache);


/**
 * Fonction qui retourne la date et heure courante
 * @return {string} 
**/
function setDate() {
    let today = "";
    let aujourdhui = new Date();
    let anneeEnCours = aujourdhui.getFullYear();
    let moisEnCours  = String(aujourdhui.getMonth() + 1).padStart(2, '0');
    let jourEnCours  = aujourdhui.getDate();
    let heureEnCours = aujourdhui.getHours();
    let minuteEnCours = aujourdhui.getMinutes();
    let secondeEnCours = aujourdhui.getSeconds();
    today = String(jourEnCours+"/"+moisEnCours+"/"+anneeEnCours+", "+heureEnCours +":"+minuteEnCours+":"+secondeEnCours);
    return today;
}


/**
 * Fonction qui affiche dynamiquement les données du tableau par le gabarit template
**/
function AffichageTache(){
    zoneListe.innerHTML = "";
    Tri();
    for (let tache of tTaches) {
        let tClone = modeleListe.cloneNode(true);
        for (let prop in tache) {
            tClone.innerHTML = tClone.innerHTML.replaceAll(`{${prop}}`, tache[prop]);
        }
        zoneListe.appendChild(tClone.content);
    }
    let jsonTache = JSON.stringify(tTaches);
    localStorage.ListTache = jsonTache;
}


/** 
 *Fonction qui tri le tableau des tâches 
**/
function Tri(){
    let tri = frm2.tri.value;
    if(tri == "nom/importance"){
        tTaches.sort((a, b) => a.nom.toLowerCase() > b.nom.toLowerCase() ? 1 : -1);
    }else if(tri == "importance/nom"){
        tTaches.sort((a, b) => a.importance > b.importance ? 1 : -1);
    }
}


/**
 * Gestionnaire de l'évènement click sur une tache pour soit effacer, afficher les détails ou la marquée comme fait
 * @param {MouseEvent} evt
**/
zoneListe.addEventListener("click", function(evt) {
    let elem = evt.target;
    let eTacheId;
    if (elem.classList.contains("effacer")){
        eTacheId=getID(elem.parentNode);
        /* supprimer la tache du tableau et reaffichage de celui-ci */
        tTaches = tTaches.filter(tache => tache.id != eTacheId);
    }else if (elem.classList.contains("detail")){
        eTacheId = getID(elem.parentNode);
        let eModal = document.getElementById("modale");
        let html = eTemplateModal.innerHTML;
        /*Aller chercher les valeurs */
        let resultat = tTaches.find(tache => tache.id == eTacheId);
        let listHtml="";
           
           listHtml += html.replace(`{id}`, resultat["id"])
                           .replace(`{nom}`, resultat["nom"])
                           .replace(`{importance}`, resultat["importance"])
                           .replaceAll(`{fait}`, resultat["fait"])
                           .replace(`{date}`, resultat["date"]);
        eModal.innerHTML = listHtml;
        eModal.showModal();
    }else if (elem.classList.contains("tache")){
       // elem.setAttribute("data-fait", "true");
        let eTacheId = elem.getAttribute("data-id");
        let resultat = tTaches.find(tache => tache.id == eTacheId);
        (resultat.fait) ? resultat.fait = false : resultat.fait = true;
        
    }
    AffichageTache();
});

/**
 * Fonction qui retourne un id unique
 * @return {number} 
**/
function setID() {
    let id = 0;
    for (let indice in tTaches) {
        if (id < tTaches[indice]["id"]) id = tTaches[indice]["id"]
    }
        return id+1;
}

/**
 * Fonction qui retourne un le data-id du parent tache
 * @return {number} 
**/
function getID(e){
   return e.getAttribute("data-id");
}


