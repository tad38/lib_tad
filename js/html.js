var objet_global_html_tad = null;

// créé un élément à partir de son code HTML passé en paramètre et le retourne
function eval_html(par_chaine) {
    let parser = new DOMParser();
    let docel = parser.parseFromString(par_chaine.toString(), "text/html");
    if (docel && (docel.body.childNodes.length === 1)) { return docel.body.firstChild; } else { console.log("eval_html: la chaîne passée en paramètre n'a pas pu être analysé."); return null; }
}
// créé un élément à partir de son code HTML passé en paramètre et le retourne sous forme d'objet de classe 'ObjetDomTad'
function eval_dom(par_chaine) {
    let parser = new DOMParser();
    let docel = parser.parseFromString(par_chaine.toString(), "text/html");
    if (docel && (docel.body.childNodes.length === 1)) { return new ObjetDomTad([ docel.body.firstChild ]); } else { console.log("eval_html: la chaîne passée en paramètre n'a pas pu être analysé."); return null; }
}

// Application d'une chaîne CSS normale sur un objet en passant par l'appel de propriétés CSS en Javascript ce qui permet de garder les anciens styles
function creer_css(par_objet, chaine) {
    if (typeof par_objet === 'string' || par_objet instanceof String) { let tmp_dom = dom(par_objet); if (tmp_dom.taille() > 0) { par_objet = tmp_dom.tab[0].element; } } 
    if (typeof par_objet === 'ObjetDomTad' || par_objet instanceof ObjetDomTad) { par_objet.css(chaine); }
    let tab = chaine.split(";");
    for (let i = 0; i < tab.length; i++) {
        let tabd = tab[i].split(":");
        if (tabd.length > 1) {
            tabd[0] = tabd[0].trim();
            tabd[1] = tabd[1].trim();
        } else { break; }
        let tabt = tabd[0].split("-");
        if (tabt.length > 1) {
            for (let j = 0; j < tabt.length - 1; j++) { tabt[j + 1] = tabt[j + 1].charAt(0).toUpperCase() + tabt[j + 1].substring(1); }
            tabd[0] = tabt.join("");
        }
        objet_global_html_tad = par_objet;
        if (objet_global_html_tad.style) { eval("objet_global_html_tad.style." + tabd[0].toString() + " = '" + tabd[1].toString() + "';"); }
    }
    return par_objet;
}

/* Retourne l'index d'un élément HTML par rapport au tableau childNodes de sont parent */
function index_child_nodes(par_el) { let ret = -1; for (let i = 0; i < par_el.parentNode.childNodes.length; i++) { if (par_el.parentNode.childNodes[i] === par_el) { ret = i; break; } } return ret; }
/* Retourne l'index d'un élément HTML par rapport au tableau children de sont parent (ce qui prend en comtpe les nodes de texte par exemple qui sont ajoutés par les navigateurs) */
function index_children(par_el) { let ret = -1; for (let i = 0; i < par_el.parentNode.children.length; i++) { if (par_el.parentNode.children[i] === par_el) { ret = i; break; } } return ret; }