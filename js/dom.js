
/*
 * La classe ObjetDomTad ne sert que comme retour de la fonction dom(). Elle représente le ou les éléments concernés par la valeur en parametre de la fonction dom().
 * Chaque méthode s'applique à tous les éléments concernés. Si une valeur doit être retournée, si la fonction finit par un s, toutes les valeurs sont retournées dans un tableau par element, 
 * sinon la valeur du premier élément est retournée.
 */

class ObjetDomTad {
    constructor(par_tab_el) { /* Le paramètre du constructeur est un tableau d'element */
        this.tableau_elements = [];
        if (is_array(par_tab_el)) { this.tableau_elements = par_tab_el; } else { this.tableau_elements[0] = par_tab_el; }
	this.display_mem = "inline-block";
    }
    
    /* Appelez cette propriété pour accéder au premier élément du tableau this.tableau_elements. Utile quand on est sur qu'un seul élément est sélectionné comme par exemple dans une sélection par id. */
    get element() { if (!this.null) { return this.tableau_elements[0]; } else { return null; } }
    
    /* Vérifie le résultat du sélecteur, si il n'a aucun élément dans le tableau, null() retourne true on considère que le sélecteur est nul. */
    get null() { if (this.tableau_elements.length > 0) { return false; } else { return true; } }			
    
    /* Exécute une fonction sur tous les éléments de cet ObjetDomTad elle doit comporter au moins un argument qui sera l'ObjetDomTad de l'élément courant de la boucle.
       Le retour sera un tableau des valeurs retournées par votre fonction (si il y'a un retour) pour chaque élément. */
    a_tous(par_fonction) {
        let tab_retour = [];
        for (let i_a_tous = 0; i_a_tous < this.tableau_elements.length; i_a_tous++) { tab_retour[i_a_tous] = par_fonction(dom(this.tableau_elements[i_a_tous])); }
        return tab_retour;
    }
    
    /* Ajouter un élément ou un ObjetDomTad à tous les éléments contenus dans cette instance de ObjetDomTad */
    ajouter(par_el_dom) {
        let tmpel = dom(par_el_dom);
        this.a_tous((el)=>{ for (let i = 0; i < tmpel.tableau_elements.length; i++) { el.tableau_elements[0].appendChild(tmpel.tableau_elements[i]); } });
        return this;
    }
    /* Ajouter cette instance de ObjetDomTad à un élément ou à tous les éléments d'un autre objet ObjetDomTad */
    ajouter_a(par_el_dom) { 
        let tmpel = dom(par_el_dom);
        this.a_tous((el)=>{ for (let i = 0; i < tmpel.tableau_elements.length; i++) { tmpel.tableau_elements[i].appendChild(el.tableau_elements[0]); } });
        return this;
    }
    /* Supprimer tous les enfants des élements du sélecteur */
    vider() { for (let i = this.tableau_elements.length - 1; i >= 0; i--) { for (let j = this.tableau_elements[i].childNodes.length - 1; j >= 0; j--) { this.tableau_elements[i].removeChild(this.tableau_elements[i].childNodes[j]); } } return this; };
    /* Supprimer tous les éléments du sélécteur */
    supprimer() { this.vider(); for (let i = this.tableau_elements.length - 1; i >= 0; i--) { this.tableau_elements[i].parentNode.removeChild(this.tableau_elements[i]); } };
    
    /* Applique un ou plusieurs styles ecrits en CSS sur tous les éléments du sélecteur */
    css(par_style) { this.a_tous((el)=>{ creer_css(el.tableau_elements[0], par_style); }); return this; };
}

/*
 * Cette fonction prend en paramètre un objet HTML, un tableau d'objets, un sélecteur d'objets (CSS) dans le document courant, ou le code HTML d'un objet que l'on souhaite créer 
 * et retourne ça sous la forme d'un objet ObjetDomTad ce qui permet d'intervenir sur plusieurs objets en même temps avec un seul appel de fonction.
 */

function dom(par_sel_el_code) { /* Le parametre de la fonction est un selecteur, un objet ou tableau d'objets ou alors le code html d'un nouvel objet */
    let tmptab = [ ];
    if (is_string(par_sel_el_code)) {
        if (contient(par_sel_el_code, "<") && contient(par_sel_el_code, ">")) {
            return eval_dom(par_sel_el_code);
        } else {
            let tmpret = document.querySelectorAll(par_sel_el_code);
            if (tmpret) {
                tmpret = liste_en_tableau(tmpret);
                return (tmpret.length > 0) ? new ObjetDomTad(tmpret) : null;
            } else { return null; }
        }
    } 
    else if (is_array(par_sel_el_code)) { return new ObjetDomTad(par_sel_el_code); } 
    else if (is_html(par_sel_el_code)) { tmptab[0] = par_sel_el_code; return new ObjetDomTad(tmptab); } 
    else if (is_objetdom(par_sel_el_code)) { return new ObjetDomTad(par_sel_el_code.tableau_elements); }
    else { return null; }
}