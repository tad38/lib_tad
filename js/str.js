
/* convertit tous les caractères de la chaîne en lettres minuscules et la première lettre en majuscule (Attention ne pas mettre de 's' dans le nom de la fonction) */
function majuscule(par_chaine) { return (par_chaine[0].toString().toUpperCase() + par_chaine.toString().substring(1).toLowerCase()); }
/* convertit tous les caractères de la chaîne en lettres majuscules (Attention, ne pas oublier le 's' dans le nom de la fonction) */
function majuscules(par_chaine) { return par_chaine.toString().toUpperCase(); } 
/* convertit tous les caractères de la chaîne en lettres minuscules */
function minuscules(par_chaine) { return par_chaine.toString().toLowerCase(); }

/* encoder avec la spécification URL */
function enc_url(par_str) { return encodeURIComponent(par_str.toString()); }
/* décoder avec la spécification URL */
function dec_url(par_str) { return decodeURIComponent(par_str.toString()); }

/* encoder avec la spécification HTML */
function enc_html(par_str) {
    let textarea = document.createElement('textarea');
    textarea.innerText = par_str.toString();
    return textarea.innerHTML;
}
/* décoder avec la spécification HTML */
function dec_html(par_str) {
    let textarea = document.createElement('textarea');
    textarea.innerHTML = par_str.toString();
    return textarea.value;
}

// récupère dans un tableau tous les mots composés de caractères AlphaNumerique (voir la variable)
function mots(par_chaine, par_autorises) {
    let retour = []; retour[0] = ""; tmps = String(par_chaine);
    for (let i = 0, k = 0; i < par_chaine.length; i++) {
        if (par_autorises.indexOf(par_chaine.charAt(i)) >= 0) { retour[k] += par_chaine.charAt(i); } 
        else { if (retour[k].length > 0) { k++; retour[k] = ""; } }
    }
    return retour;
}

// Créé un extrait d'une chaine de par_max caracteres se situant autour du mot qui demarre a position et qui fait par_taille caracteres
function extrait(par_chaine, par_max, par_index, par_taille, log) {
    let chaine = String(par_chaine);
    let max = Number(par_max); if (isNaN(max)) { max = 50; }
    let index = Number(par_index); if (isNaN(index)) { index = 0; }
    let taille = Number(par_taille); if (isNaN(taille)) { taille = 0; }
    let moit_max = Math.floor(max / 2);
    let moit_taille = Math.floor(taille / 2);
    //log("extrait("); log(chaine.toString()); log(max.toString()); log(index.toString()); log(taille.toString()); log(")");
    index = index - moit_max + moit_taille; if (index < 0) { index = 0; }
    let maxd = max;
    if (index + max > chaine.length) { max = chaine.length - index; } 
    //log("index = " + index.toString()); log("max = " + max.toString());
    return par_chaine.substr(index, max) + ((maxd !== max) ? "" : "...");
}

// transforme la chaine en parametre pour qu'elle n'ait plus aucun retour à la ligne
function une_ligne(par_chaine) {
    let tmp = new String(par_chaine);
    tmp = tmp.replaceAll(/[\n]/gi, " "); tmp = tmp.replaceAll("\r", " "); tmp = tmp.replaceAll("\n", " "); tmp = tmp.replaceAll("\t", " "); tmp = tmp.replaceAll("\v", " ");
    while (tmp.indexOf("  ") >= 0) { tmp = tmp.replaceAll("  ", " "); }
    return tmp;
}

// Vérifie si une chaine ou un tableau contiennent une autre chaine
function contient(par_var, par_test) {
    if (is_array(par_var)) {
        for (i = 0; i < par_var.length; i++) { 
            if (is_array(par_var[i]) && contient(par_var[i], par_test)) { return true; }
            if (par_var[i] === par_test) { return true; } 
        }
        return false;
    } else {
        if (par_var.indexOf(par_test) >= 0) { return true; }
        else { return false; }
    }
}

/* Recherche dans une chaîne de base et éventuellement à partir d'une certaine position laquelle des sous-chaines passées en paramètres est située au plus près du début. */
function trouver_premier(par_arguments) {
    let na = 1; let pos = 0;
    if (arguments.length > 1) {
        if (is_number(arguments[1])) {
            pos = arguments[1];
            na++;
            if (arguments.length < 3) { log("trouver_premier(): Cette fonction doit avoir une de ces formes:\ntrouver_premier(chaine_de_base, chaine_un, chaine_deux....)\ntrouver_premier(chaine_de_base, position, chaine_un, ....)"); return null; }
        }
        let index_arg = -1; let index_str = -1;
        for (let i = na; i < arguments.length; i++) {
            let ntmp = arguments[0].indexOf(arguments[i], pos);
            if (ntmp >= 0) {
                if (index_str > -1) {
                    if (ntmp < index_str) {  index_arg = i; index_str = ntmp; }
                } else { index_arg = i; index_str = ntmp; }
            }
        }
        if (index_arg <= -1) { return null; } else { return arguments[index_arg]; }
    } else { log("trouver_premier(): Cette fonction doit avoir une de ces formes:\ntrouver_premier(chaine_de_base, chaine_un, chaine_deux....)\ntrouver_premier(chaine_de_base, position, chaine_un, ....)"); return null; }
}
/* Recherche dans une chaîne de base et éventuellement jusqu'à une certaine position laquelle des sous-chaines passées en paramètres est située au plus près de la fin. */
function trouver_dernier(par_arguments) {
    let na = 1; let pos = arguments[0].length;
    if (arguments.length > 1) {
        if (is_number(arguments[1])) {
            pos = arguments[1];
            na++;
            if (arguments.length < 3) { log("trouver_dernier(): Cette fonction doit avoir une de ces formes:\ntrouver_dernier(chaine_de_base, chaine_un, chaine_deux....)\ntrouver_dernier(chaine_de_base, position, chaine_un, ....)"); return null; }
        }
        let index_arg = -1; let index_str = -1;
        for (let i = na; i < arguments.length; i++) {
            let ntmp = arguments[0].lastIndexOf(arguments[i], pos);
            if ((ntmp >= 0) && (ntmp + arguments[i].length <= pos)) {
                if (index_str > -1) {
                    if (ntmp > index_str) {  index_arg = i; index_str = ntmp; }
                } else { index_arg = i; index_str = ntmp; }
            }
        }
        if (index_arg <= -1) { return null; } else { return arguments[index_arg]; }
    } else { log("trouver_dernier(): Cette fonction doit avoir une de ces formes:\ntrouver_dernier(chaine_de_base, chaine_un, chaine_deux....)\ntrouver_dernier(chaine_de_base, position, chaine_un, ....)"); return null; }
}
/* Recherche dans une chaîne de base et éventuellement à partir d'une certaine position laquelle des sous-chaines passées en paramètres est située au plus près du début et retourne sa position. */
function position_premier(par_arguments) {
    let na = 1; let pos = 0;
    if (arguments.length > 1) {
        if (is_number(arguments[1])) {
            pos = arguments[1];
            na++;
            if (arguments.length < 3) { log("position_premier(): Cette fonction doit avoir une de ces formes:\nposition_premier(chaine_de_base, chaine_un, chaine_deux....)\nposition_premier(chaine_de_base, position, chaine_un, ....)"); return -1; }
        }
        let index_arg = -1; let index_str = -1;
        for (let i = na; i < arguments.length; i++) {
            let ntmp = arguments[0].indexOf(arguments[i], pos);
            if (ntmp >= 0) {
                if (index_str > -1) {
                    if (ntmp < index_str) {  index_arg = i; index_str = ntmp; }
                } else { index_arg = i; index_str = ntmp; }
            }
        }
        if (index_arg <= -1) { return -1; } else { return index_str; }
    } else { log("position_premier(): Cette fonction doit avoir une de ces formes:\nposition_premier(chaine_de_base, chaine_un, chaine_deux....)\nposition_premier(chaine_de_base, position, chaine_un, ....)"); return -1; }
}
/* Recherche dans une chaîne de base et éventuellement jusqu'à une certaine position laquelle des sous-chaines passées en paramètres est située au plus près de la fin et retourne sa position. */
function position_dernier(par_arguments) {
    let na = 1; let pos = arguments[0].length;
    if (arguments.length > 1) {
        if (is_number(arguments[1])) {
            pos = arguments[1];
            na++;
            if (arguments.length < 3) { log("position_dernier(): Cette fonction doit avoir une de ces formes:\nposition_dernier(chaine_de_base, chaine_un, chaine_deux....)\nposition_dernier(chaine_de_base, position, chaine_un, ....)"); return -1; }
        }
        let index_arg = -1; let index_str = -1;
        for (let i = na; i < arguments.length; i++) {
            let ntmp = arguments[0].lastIndexOf(arguments[i], pos);
            if ((ntmp >= 0) && (ntmp + arguments[i].length <= pos)) {
                if (index_str > -1) {
                    if (ntmp > index_str) {  index_arg = i; index_str = ntmp; }
                } else { index_arg = i; index_str = ntmp; }
            }
        }
        if (index_arg <= -1) { return -1; } else { return index_str; }
    } else { log("position_dernier(): Cette fonction doit avoir une de ces formes:\nposition_dernier(chaine_de_base, chaine_un, chaine_deux....)\nposition_dernier(chaine_de_base, position, chaine_un, ....)"); return -1; }
}