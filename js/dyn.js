
function maj_objets_dynamiques_tad() {
    dom(".classeur_tad > *:first-child > *").evenement("click", (e)=>{ 
        let ntmp = index_children(e.target);
        let cont_pages = e.target.parentNode.parentNode.children[1];
        for (let i = 0; i < cont_pages.children.length; i++) {
            if (i === ntmp) { 
                if (!contient(cont_pages.children[i].className, "selection")) cont_pages.children[i].className += " selection";
                cont_pages.children[i].className = cont_pages.children[i].className.trim();
                if (!contient(e.target.parentNode.children[i].className, "selection")) e.target.parentNode.children[i].className += " selection";
                e.target.parentNode.children[i].className = e.target.parentNode.children[i].className.trim();
            }
            else { 
                cont_pages.children[i].className = cont_pages.children[i].className.replace("selection", "").replace("  ", " ").trim(); 
                e.target.parentNode.children[i].className = e.target.parentNode.children[i].className.replace("selection", "").replace("  ", " ").trim(); 
            }
        }
    });
}