/* Classe d' un objet tache*/
 export class Tache {

    // propriétés de portée "public" 
    nom;
    importance;
    date;
    id;
    fait;
    
    /**
     * Création de l'objet par new
     * @param {string} nom
     * @param {string} importance
     * @param {string} date
     * @param {string} id
     * @param {string} fait
     */
    constructor(nom, importance, date, id, fait) {
      this.nom = nom;
      this.importance = importance;
      this.date = date;
      this.id = id;
      this.fait = fait;
    }
    
  }