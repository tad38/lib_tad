# lib_tad (en cours de création)

Librairie de développement pour simplifier la création de vos sites web et applications.

Du CSS, du JavaScript et du PHP pour dynamiser vos projets en quelques lignes de code.

## Installation

Il vous suffit de télécharger la dernière version lib_tad sur GitHub à cette adresse:

https://github.com/tad38/lib_tad

Ensuite copiez le dossier lib_tad à la racine de votre site web PHP (XAMPP est vivement conseillé car je n'ai pas essayé sur d'autres serveurs).

À partir de là vous pouvez intégrer la lib_tad à vos pages web en suivant les instructions de la partie "Utilisation".

## Utilisation

### Pour commencer

Au tout début du fichier `index.php` , avant le moindre caractère, il faut ajouter cette ligne:

```php 
<?php require("lib_tad/lib.php"); ?>
```

Puis, au début de l'en-tête de votre fichier HTML (entre les balises `<head>` et `</head>`) avant d'inclure vos fichiers Javascript ou CSS:

```php 
<?php lib_tad(); ?>
```

Une fois que vous avez intégré ces deux lignes au fichier, vous pouvez profiter de la lib_tad.

### Objets prédéfinis

Pour insérer un objet de la librairie dans vos pages web, il suffit de donner à un élément la classe adéquate.

Par exemple pour une interface d'objet avec une barre de menu en haut, une barre latérale gauche et une partie contenu au centre, on utilisera la classe `interface_hg_tad`:

```html
<div class="interface_hg_tad">
    <div style="background-color: red;"></div>
    <div style="background-color: green;"></div>
    <div style="background-color: blue;"></div>
</div>
```

## Réference et aides

Pour une aide plus complète sur l'utilisation de la librairie et pour consulter la référence des objets et fonctions, je vous invite à vous rendre sur le wiki de lib_tad:

https://github.com/tad38/lib_tad/wiki

## Auteur

[Laurent TADDEÏ (Montricoux - 82)](mailto://laurent.taddei.38@gmail.com)  -  [hackoys](mailto://hackoys@gmail.com) sur [root-me](https://www.root-me.org/hackoys)

