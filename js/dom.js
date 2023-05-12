
/*
 * La classe ObjetDomTad ne sert que comme retour de la fonction dom(). Elle représente le ou les éléments concernés par la valeur en parametre de la fonction dom().
 * Chaque méthode s'applique à tous les éléments concernés. Si une valeur doit être retournée, si la fonction finit par un s, toutes les valeurs sont retournées dans un tableau par element, 
 * sinon la valeur du premier élément est retournée.
 */

class ObjetDomTad {
    constructor(par_tab_el) { /* Le paramètre du constructeur est un tableau d'element */
            this.elements = [];
            if (is_array(par_tab_el)) { this.elements = par_tab_el; } else { this.elements[0] = par_tab_el; }
            this.display_mem = "inline-block";
        }
    
    /* Appelez cette propriété pour accéder au premier élément du tableau this.elements. Utile quand on est sur qu'un seul élément est sélectionné comme par exemple dans une sélection par id. */
    get element() { if (!this.null) { return this.elements[0]; } else { return null; } }
    
    /* Vérifie le résultat du sélecteur, si il n'a aucun élément dans le tableau, null() retourne true on considère que le sélecteur est nul. */
    get null() { if (this.elements.length > 0) { return false; } else { return true; } }
    
    /* Retourne les valeurs de texte de tous les éléments de cet ObjetDomTad séparés par des virgules dans une chaîne, si il n'y a qu'un élément de sélectionné, retourne juste sa valeur texte. */
    get txt() { let tmptab = this.a_tous(function(el) { return el.elements[0].innerText; }); return tmptab.join(","); };
    /* Retourne le code HTML contenu dans tous les éléments de cet ObjetDomTad séparés par des virgules dans une chaîne, si il n'y a qu'un élément de sélectionné, retourne juste le code HTML qu'il contient. */
    get html() { let tmptab = this.a_tous(function(el) { return el.elements[0].innerHTML; }); return tmptab.join(","); };
    /* Définit le texte contenu dans tous les élements */
    set txt(par_texte) { this.a_tous(function(el) { el.elements[0].innerText = par_texte.toString();  }); };
    /* Définit le code HTML contenu par tous les éléments du sélecteur */
    set html(par_code_html) { this.a_tous(function(el) { el.elements[0].innerHTML = par_code_html.toString(); }); };
    // Renvoie la liste de tous les noms de classes de l'objet
    get classes() { 
            let tmpret = new Array(); 
            this.a_tous(function(el, obj, ind, opt) { 
                    for (i = 0; i < el.elements[0].classList.length; i++) { if (!contient(tmpret, el.elements[0].classList[i])) tmpret[tmpret.length] = el.elements[0].classList[i]; }
                });
            return tmpret; 
        };
    /* Retourne une chaîne qui contient tous les noms de classes de l'objet */
    get classes_txt() { return this.classes.join(" "); };
    
    /* Exécute une fonction sur tous les éléments de cet ObjetDomTad elle doit comporter au moins un argument qui sera l'ObjetDomTad de l'élément courant de la boucle.
       Le retour sera un tableau des valeurs retournées par votre fonction (si il y'a un retour) pour chaque élément. les autres arguments sont l'instance de cette classe, l'index par rapports ses éléments et un argument optionnel */
    a_tous(par_fonction, par_arg_opt) {
            let tab_retour = [];
            for (let i_a_tous = 0; i_a_tous < this.elements.length; i_a_tous++) { tab_retour[i_a_tous] = par_fonction(dom(this.elements[i_a_tous]), this, i_a_tous, par_arg_opt); }
            return tab_retour;
        }
    
    /* Créé un évènement à partir d'une fonction sur tous les elements de la classe (click, mousemove....) */
    evenement(par_nom_event, par_fonction) {
            for (let i = 0; i < this.elements.length; i++) { this.elements[i].addEventListener(par_nom_event.toString(), par_fonction); }
            return this;
        }
    
    /* Ajouter un élément ou un ObjetDomTad à tous les éléments contenus dans cette instance de ObjetDomTad */
    ajouter(par_el_dom) {
            let tmpel = dom(par_el_dom);
            this.a_tous((el)=>{ for (let i = 0; i < tmpel.elements.length; i++) { el.elements[0].appendChild(tmpel.elements[i]); } });
            return this;
        }
    /* Ajouter cette instance de ObjetDomTad à un élément ou à tous les éléments d'un autre objet ObjetDomTad */
    ajouter_a(par_el_dom) { 
            let tmpel = dom(par_el_dom);
            this.a_tous((el)=>{ for (let i = 0; i < tmpel.elements.length; i++) { tmpel.elements[i].appendChild(el.elements[0]); } });
            return this;
        }
    /* Supprimer tous les enfants des élements du sélecteur */
    vider() { for (let i = this.elements.length - 1; i >= 0; i--) { for (let j = this.elements[i].childNodes.length - 1; j >= 0; j--) { this.elements[i].removeChild(this.elements[i].childNodes[j]); } } return this; };
    /* Supprimer tous les éléments du sélécteur */
    supprimer() { this.vider(); for (let i = this.elements.length - 1; i >= 0; i--) { this.elements[i].parentNode.removeChild(this.elements[i]); } };
    
    // Renvoie tous les attributs, si une clé est précisé, retourne un seul attribut, si une valeur est précisée, elle sera assigné à la cellule qui porte cette clé.
    attr(par_cle, par_val) {
            if (par_cle) {
                return this.a_tous(function(el, obj, ind, opt) { 
                        if (par_val) { obj.elements[ind].setAttribute(par_cle, par_val); }
                        return obj.elements[ind].getAttribute(par_cle);
                    });
            } else {
                let retour = new Array(); var str = "";
                let tmptab = this.a_tous(function(el) { return el.elements[0].attributes; });
                for (let i = 0; i < tmptab.length; i++) {
                    for (let j = 0; j < tmptab[i].length; j++) {
                        let ntmp = -1;
                        for (let k = 0; k < retour.length; k++) { if (retour[k].name === tmptab[i][j].name) { ntmp = k; retour[k].value = tmptab[i][j].value; } }
                        if (ntmp < 0) { retour.push([ tmptab[i][j].name, tmptab[i][j].value ]); }
                    }
                }
                return JSON.stringify(retour);
            }
        };
    
    /* Applique un ou plusieurs styles ecrits en CSS sur tous les éléments du sélecteur */
    css(par_style) { this.a_tous((el)=>{ creer_css(el.elements[0], par_style); }); return this; };
    
    /* Simule un click utilisateur sur tous les éléments du sélecteur */
    click() { this.a_tous(function(el) { if (el.click) { el.click(); } }); return this; }
    /* Simule une validation de formulaire sur les éléments de la classe */
    submit() { this.a_tous(function(el) { if (el.submit) { el.submit(); } }); return this; }
    
    /* Retourne la valeur de l'attribut value de tous les éléments du tableau */
    get value() { return this.a_tous(function(el) { return el.element.value; }).join(","); }
    /* Affecte une valeur à l'attribut value de tous les éléments */
    set value(par_val) { this.a_tous(function(el) { el.element.value = par_val; }); }
    
    // ajout d'un ou plusieurs noms de classe pour cet objet
    ajouter_classe(par_classe) {
            if (par_classe) {
                let tmpm = mots(par_classe, ALPHANUM_MIN_MAJ + "-_");
                for (let i = 0; i < tmpm.length; i++) { this.a_tous(function(el, obj, ind, opt) { el.elements[0].classList.add(opt); }, tmpm[i]); }
            } else { console.log("ajout_classe(): Aucune classe n'a été précisée."); }
            return this;
        };
    // supprime un ou plusieurs noms de classe dans cet objet
    supprimer_classe(par_classe) {
            if (par_classe) {
                let tmpm = mots(par_classe, ALPHANUM_MIN_MAJ + "-_");
                for (let m in tmpm) { this.a_tous(function(el, obj, ind, opt) { el.elements[0].classList.remove(opt); }, m); }
            } else { console.log("suppr_classe(): Aucune classe n'a été précisée."); }
            return this;
        };
    // Retourne true si tous les elements contiennent une classe qui port ce nom, false dans le cas contraire (si par_au_moins_un = true, un seule élément avec cette classe suffit)
    contient_classe(par_nom_classe, par_au_moins_un=false) {
            if (par_nom_classe) { 
                tmpret = this.a_tous(function(el) { return el.elements[0].classList.contains(par_nom_classe); });
                if (par_au_moins_un === true) { if (contient(tmpret, true)) { return true; } } else { if (contient(tmpret, false)) { return false; } else { return true; } }
            } else { console.log("contient_classe(): Aucun nom de classe n'a été précisée."); }
            return false;
        };
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
    else if (is_objetdom(par_sel_el_code)) { return new ObjetDomTad(par_sel_el_code.elements); }
    else { return null; }
}