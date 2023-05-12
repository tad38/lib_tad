
function maj_tad() {
    maj_objets_dynamiques_tad();
}

function chargement_lib_tad() {
    maj_tad();
}

self.addEventListener("load", chargement_lib_tad);