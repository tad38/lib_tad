const JOURS = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ];
const MOIS = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ];
const NOMBRE = "0123456789.";
const ALPHA_MIN = "abcdefghijklmnopqrstuvwxyz";
const ALPHA_MAJ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ALPHA_MIN_MAJ = ALPHA_MIN + ALPHA_MAJ;
const ALPHANUM_MIN = NOMBRE + ALPHA_MIN;
const ALPHANUM_MAJ = NOMBRE + ALPHA_MAJ;
const ALPHANUM_MIN_MAJ = NOMBRE + ALPHA_MIN_MAJ;

// Tests sur les types des variables
function type(par_objet) { if (par_objet === undefined) { return "undefined"; } 
                            else if (par_objet === null) { return "null"; } 
                            else if (par_objet.constructor) { return par_objet.constructor.name; } 
                            else { return typeof par_objet; } }

function is_function(par_objet) { if (type(par_objet) === "Function") { return true; } else { return false; } }
function is_string(par_objet) { if (type(par_objet) === "String") { return true; } else { return false; } }
function is_array(par_objet) { if (type(par_objet) === "Array") { return true; } else { return false; } }
function is_date(par_objet) { if (type(par_objet) === "Date") { return true; } else { return false; } }
function is_number(par_objet) { if (type(par_objet) === "Number") { return true; } else { return false; } }
function is_boolean(par_objet) { if (type(par_objet) === "Boolean") { return true; } else { return false; } }
function is_undefined(par_objet) { if (par_objet === undefined) { return true; } else { return false; } }
function is_null(par_objet) { if (par_objet === null) { return true; } else { return false; } }
function is_object(par_objet) { if (type(par_objet) === "Object") { return true; } else { return false; } }

function is_html(par_objet) { if (par_objet instanceof HTMLElement) { return true; } else { return false; } }
function is_objetdom(par_objet) { if (type(par_objet) === "ObjetDom") { return true; } else { return false; } }

// Conversions de différents types de variables
function liste_en_tableau(par_liste) { var retour = []; for (i = 0; i < par_liste.length; i++) { retour[i] = par_liste[i]; } return retour; }