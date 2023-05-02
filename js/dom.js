
/*
 * La classe ObjetDomTad ne sert que comme retour de la fonction dom(). Elle représente le ou les éléments concernés par la valeur en parametre de la fonction dom().
 * Chaque méthode s'applique à tous les éléments concernés. Si une valeur doit être retournée, si la fonction finit par un s, toutes les valeurs sont retournées dans un tableau par element, 
 * sinon la valeur du premier élément est retournée.
 */

class ObjetDomTad {
    constructor(par_tab_el) { // Le paramètre du constructeur est un tableau d'element
        this.elements_selectionnes = [];
    }
}

/*
 * Cette fonction prend en paramètre un objet HTML, un tableau d'objets, un sélecteur d'objets (CSS) dans le document courant, ou le code HTML d'un objet que l'on souhaite créer 
 * et retourne ça sous la forme d'un objet ObjetDomTad ce qui permet d'intervenir sur plusieurs objets en même temps avec un seul appel de fonction.
 * Si un deuxième paramètre est fourni, il s'agit du parent qui recevra l'objet à créer si c'est du code qui est en paramètre.
 */

function dom(par_sel_el_code) { // Le parametre de la fonction est un selecteur un ou des objets ou alors le code html d'un objet
    
}