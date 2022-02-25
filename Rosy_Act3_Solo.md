# Rosy, Activité 3 : Communication - Activité à faire en solo

## Présentation 1 @showdialog

Ce tutoriel est à faire seul.  

Si vous êtes en groupe de 3 et que vous avez chacun.e un nano-ordinateur micro:bit, vous pouvez également faire l'*Activité 3 : Communication radio*.

![Rosy quelque part dans l'espace](https://raw.githubusercontent.com/jfprimeau-genielab/rosy_activite3_communication-radio_terre/master/static/images/Rosy_Terre_Mars.png)

La communication entre les différents systèmes d'un satellite est essentielle à l'observation spatiale. Même si les meilleures images de tous les temps sont captées, si elles ne peuvent pas être envoyées sur Terre, personne ne pourra jamais les voir...

Les satellites d'observation spatiale sont des machines extrèmement complexes qui prennent plusieurs d'années à concevoir. Les systèmes qui s'y trouvent sons hautement automatisés puisque le temps de communication entre la Terre et le satellite fait en sorte que leur contrôle en temps réel est impossible.

## Présentation 2 @showdialog

Pour cette activité, nous allons programmer le micro:bit pour que, lorsque nous trouvons les coordonnées d'une étoile inconnue et prometteuse, ses coordonnées sont automatiquement envoyées au système de télécommunication.

Nous pourrons visualiser à l'écran de l'ordinateur les résultats de nos recherches en temps réel.

Pour réussir votre mission, il faut:

1. Générer des coordonnées X et Y aléatoirement pour représenter une étoile inconnue.
2. Utiliser le gyroscope intégré du micro:bit pour rechercher cette étoile en inclinant celui-ci de gauche à doite et de l'avant vers l'arrière.
3. Évaluer les coordonnées explorées en inclinant le micro:bit pour voir si elles sont celles de l'étoile inconnue.
4. Si nous avons trouvé ses coordonnées, envoyer un message les affichant à l'ordinateur.

Plusieurs concepts de programmation très utiles seront présentés lors de cette activité.  À vous de voir comment vous pourrez modifier le code final pour l'utiliser comme point de départ pour d'autres projets.

Bonne chance!


## Étape 1

Pour commencer, nous allons créer

1. Aller dans la section ``||radio:radio||`` pour trouver le bloc ``||radio:définir groupe||``, puis le mettre dans le bloc ``||basic:au démarrage||``.
2. Attribuer la valeur de votre numéro de groupe au bloc ``||radio:définir groupe||``.  Si une autre équipe à la même valeur de groupe, vos messages seront mélangés, se qui va nuire à votre mission.

>**À noter! Il arrive que les images de la bulle d'aide soient différentes de ce que l'on retrouve dans l'espace de programmation : couleurs différentes, noms en anglais, noms de variables différents des instructions, etc.  Pas de problème, il s'agit simplement d'un caprice d'affichage de la plateforme makecode que vous pouvez ignorer.**

```blocks
radio.setGroup(0)
```

## Étape 2

Lorsqu'une donnée est reçue du satellite-relais, nous voulons la voir affichée.  

1. Toujours dans la section ``||radio:radio||``, trouver le bloc ``||radio:quand une donnée est reçue par radio name value||`` et le glisser dans la page de programmation.
2. Aller dans ``||logic:logique||`` pour trouver le bloc ``||logic:si <vrai> alors||`` et le mettre dans le bloc radio que l'on vient de prendre.


```blocks
radio.onReceivedValue(function (name, value) {
    if (True) {
    }
})
```

## Étape 3

Il faut afficher la bonne image selon les données reçues, qui peuvent être 0, 1 ou 2.  Commençons par recevoir les bons messages, qui sont sous forme de chaines de caractères.

1. Aller dans la section ``||logic:logique||``, y trouver l'hexagone ``||logic:"" = ""||``, et le glisser dans l'hexagone au centre de ``||logic:si <vrai> alors||``.
2. Dans le cercle de gauche, glisser la variable "name" qui se trouve dans ``||radio:quand une donnée est reçue par radio||``.
3. Dans le cercle de droite, inscrire "terre".

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "terre") {

    }
})
```

## Étape 4

Affichons maintenant les données reçues, puis nettoyons ensuite l'écran.

1. Dans la section ``||basic:base||``, trouver le bloc ``||basic:montrer nombre||`` et la mettre dans notre bloc ``||logic:si...alors||``.
2. Glisser la variable "value" qui se trouve dans ``||radio:quand une donnée est reçue par radio||`` dans le cercle à droite dans ``||basic:montrer nombre||``.
3. Dans la section ``||basic:base||``, trouver le bloc ``||basic:pause (ms)||`` et le mettre à la suite.
4. Trouver le bloc ``||basic:effacer l'écran||`` et le mettre à la suite.

```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "terre") {
        basic.showNumber(value)
        basic.pause(200)
        basic.clearScreen()
    }
})
```


## Étape 5

Nous voulons maintenant pouvoir envoyer des messages de confirmation. Ils peuvent être: flèche à gauche (ouest), flèche à droite (est), flèche en haut (nord), flèche en bas (sud), crochet de validation.
Pour sélectionner le message à envoyer, nous allons utiliser l'accéléromètre du micro:bit.

1. Dans ``||input:entrée||``, prendre le bloc ``||input:lorsque le bouton A est pressé||``.
2. Y insérer le double bloc ``||logic:si <vrai> alors...sinon||`` de la section ``||logic:logique||``
3. Aller dans la section ``||logic:logique||``, y trouver l'hexagone ``||logic:plus petit que||``, et le glisser dans le premier ``||logic:si <vrai> alors||``.
4. Dans la section ``||input:entrée||``, trouver ``||input:accélération (mg)||`` et le mettre dans le cercle à gauche du ``||logic:plus petit que||``.

```blocks
input.onButtonPressed(Button.A, function () {
    if (input.acceleration(Dimension.X) < 0) {

    } else {

    }
})
```


## Étape 6

Lorsque le micro:bit penche vers la gauche et que l'on appuie sur le bouton A, envoyons "o" pour Ouest. Sinon "e" pour Est. Puis affichons ce que nous avons envoyé.

1. Insérer le bloc ``||radio:envoyer la chaîne "" par radio||`` de la section ``||radio:radio||`` sous le "si", et inscrire la lettre "o" dans ce bloc.
2. Dans la section ``||basic:base||``, trouver le bloc ``||basic:montrer la flèche||``, la mettre dans ce bloc et choisir "Ouest".
3. Trouver le bloc ``||basic:pause (ms)||`` et le mettre à la suite, puis y inscrire le nombre 100.
4. Trouver le bloc ``||basic:effacer l'écran||`` et le mettre à la suite.

```blocks
input.onButtonPressed(Button.A, function () {
    if (input.acceleration(Dimension.X) < 0) {
        radio.sendString("o")
        basic.showArrow(ArrowNames.West)
        basic.pause(100)
        basic.clearScreen()
    } else {

    }
})
```

## Étape 7

Dans la section "sinon", refaire la même chose, mais pour envoyer "e" Est.

1. Insérer le bloc ``||radio:envoyer la chaîne "" par radio||`` de la section ``||radio:radio||`` sous le "sinon", et inscrire la lettre "e" dans ce bloc.
2. Dans la section ``||basic:base||``, trouver le bloc ``||basic:montrer la flèche||``, la mettre dans ce bloc et choisir "Est".
3. Trouver le bloc ``||basic:pause (ms)||`` et le mettre à la suite, puis y inscrire le nombre 100.
4. Trouver le bloc ``||basic:effacer l'écran||`` et le mettre à la suite.

```blocks
input.onButtonPressed(Button.A, function () {
    if (input.acceleration(Dimension.X) < 0) {
        radio.sendString("o")
        basic.showArrow(ArrowNames.West)
        basic.pause(100)
        basic.clearScreen()
    } else {
        radio.sendString("e")
        basic.showArrow(ArrowNames.East)
        basic.pause(100)
        basic.clearScreen()
    }
})
```

## Étape 8

Répéter les 5 à 7 pour créer un nouveau bloc ``||input:lorsque le bouton A est pressé||`` avec les nouvelles valeurs que voici:

1. Changer le ``||input:bouton A||`` pour le ``||input:bouton B||``.
2. Assigner Y à ``||input:accélération (mg)||``.
3. Changer "o" pour "n", et "Ouest" pour "Nord".
4. Changer "e" pour "s", et "Est" pour "Sud".

```blocks
input.onButtonPressed(Button.B, function () {
    if (input.acceleration(Dimension.Y) < 0) {
        radio.sendString("n")
        basic.showArrow(ArrowNames.North)
        basic.pause(100)
        basic.clearScreen()
    } else {
        radio.sendString("s")
        basic.showArrow(ArrowNames.South)
        basic.pause(100)
        basic.clearScreen()
    }
})
```

## Étape 9

Pour aider à la communication, il est pratique d'envoyer un message de validation pour dire "d'accord".

Pour se faire, ajouter un troisième bloc ``||input:lorsque le bouton A est pressé||`` semblable aux 2 autres.

1. Créer un nouveau ``||input:lorsque le bouton A est pressé||`` et changer le ``||input:bouton A||`` pour ``||input:bouton A+B||``.
2. Insérer le bloc ``||radio:envoyer la chaîne "" par radio||`` de la section ``||radio:radio||``, et y inscrire "ok".
3. Dans la section ``||basic:base||``, trouver le bloc ``||basic:montrer l'icône||`` et le mettre à la suite.  Choisir l'image du crochet de validation.
4. Trouver le bloc ``||basic:pause (ms)||`` et le mettre à la suite, puis y inscrire le nombre 100.
5. Trouver le bloc ``||basic:effacer l'écran||`` et le mettre à la suite.

```blocks
input.onButtonPressed(Button.AB, function () {
    radio.sendString("ok")
    basic.showIcon(IconNames.Yes)
    basic.pause(100)
    basic.clearScreen()
})
```


## Étape 10

Voilà, le code est maintenant prêt!  Le voici au complet.

```blocks
function TrouverUneEtoile () {
    étoile_x = randint(-1023, 1023)
    étoile_y = randint(-1023, 1023)
}
let coord_y = false
let coord_x = false
let étoile_y = 0
let étoile_x = 0
TrouverUneEtoile()
basic.forever(function () {
    serial.writeLine("Nouvelle lecture")
    serial.writeValue("x", input.acceleration(Dimension.X))
    if (input.acceleration(Dimension.X) > étoile_x - 200 && input.acceleration(Dimension.X) < étoile_x + 200) {
        coord_x = true
    } else {
        coord_x = false
    }
    serial.writeValue("y", input.acceleration(Dimension.Y))
    if (input.acceleration(Dimension.Y) > étoile_y - 200 && input.acceleration(Dimension.Y) < étoile_y + 200) {
        coord_y = true
    } else {
        coord_y = false
    }
    if (coord_x == true && coord_y == true) {
        serial.writeLine("Étoile trouvée! " + "X : " + input.acceleration(Dimension.X) + ", Y : " + input.acceleration(Dimension.Y))
        basic.showIcon(IconNames.Surprised)
        basic.pause(5000)
        basic.clearScreen()
        TrouverUneEtoile()
    }
    basic.pause(100)
})

```


## Étape 11

Il ne reste qu'à téléverser le code sur le micro:bit, et vous êtes prêt.

Si vous avez besoin de vous rafraîchir la mémoire, [voici la procédure détaillée](https://makecode.microbit.org/device/usb) dans la documentation de makecode (en anglais seulement).


## Étape 12 @showdialog

Lorsque vos coéquipier.ère.s seront prêt.e.s, vous pourrez commencer à recevoir et interpréter les données critiques à la mission, qui se trouvent à la prochaine étape.  
En attendant, vous pouvez:

1. Vous pratiquer pour maitriser les boutons.
2. Pouvez-vous trouver une façon d'améliorer l'affichage à l'écran du micro:bit?

Lorsque tout le monde est prêt, aller à la prochaine étape.


## Étape 13 @showdialog

Voici votre défi: l'équipe du satellite télescope va vous guider, en passant par le satellite-relais, pour trouve l'étoile d'où provient le message, à l'aide du plan suivante.

Il est maintenant temps de revenir à votre protocole de communication.  Maintenant que vous et vos 2 coéquipier.ère.s êtes prêt.e.s à commencer la communication, il faut vous entendre sur ce que veulent dire vos messages.  Comment donner des directions précises avec des moyens de communication limités?  Par exemple, vous pouvez vous inspirer du [code Morse](https://fr.wikipedia.org/wiki/Code_Morse_international), qui utilise seulement les deux symboles "." et "-" pour épeler toutes les lettres de l'alphabet, ou encore du [code binaire](https://fr.wikipedia.org/wiki/Code_binaire), qui n'utilise que des 1 et de 0.

1. Vous entendre sur un protocole de communication en équipe.
2. Recevoir les informations de l'équipe satellite-relais et les interpréter selon le protocole établi.
3. En utilisant le centre de l'image comme point de référence, suivre les indications reçues pour trouver la bonne étoile.

Une excellente communication entre toutes les équipes sera essentielle à la réussite de cette mission. Bonne chance!

![Charte des étoiles](https://raw.githubusercontent.com/jfprimeau-genielab/rosy_activite3_communication-radio_telescope-spatial/master/static/images/Ciel_etoiles_Francais_V1.jpg)