# Roboteach
## Qu’est-ce que Roboteach ?
 
Roboteach est un outil pédagogique, permettant aux élèves de cycle 2 (écoles primaires) et de cycle 3 (collèges) d’appréhender les grands principes de la robotique, de l’informatique et de l’électronique. 

Il permet aux élèves de construire des petits robots et de les programmer pour faire ce qu’ils souhaitent.

Ce projet utilise du matériel Fischertechnik qui est piloté depuis un ordinateur sous Windows 7 ou plus récent, grâce au logiciel mBlock 3 et a une interface physique branchée sur une carte Arduino Uno. 

## Prendre en main Roboteach :
 
### Les prérequis.
* Une boite Roboteach (contenant une prise d’alimentation, une carte Arduino Uno et une interface de pilotage).
* Du matériel Fischertechnik : Blocs de constructions, éléments électronique, bornier, moteur à courant continu etc.
* Un ordinateur sous Windows 7 ou plus récent.
* Le logiciel mBlock 3.0 à télécharger ici.
* L’extension mBlock Roboteach.zip à télécharger ici.

### Installation et Configuration.
#### Installation de mBlock 3.
On va tout d’abord commencer par installer mBlock 3 sur votre machine.

Si ça n’est pas déjà fait téléchargez mBlock 3 ici.

Lancez le fichier téléchargé et suivez les instructions d’installation du logiciel.

Une fois installé, lancez le logiciel pour vérifier qu’il fonctionne correctement.

Vous pouvez la langue du logiciel en allant dans le Menu Langage > Français.

Si vous ne possédez pas les pilotes Arduino, installez-les en cliquant sur le menu Connecter > Installer les pilotes Arduino. Attendez que l’installation se termine.

#### Installation de l’extension Roboteach sur mBlock 3
Si ça n’est pas déjà fait téléchargez l’extension ici.

Ouvrez mBlock.

Cliquez ensuite sur Choix des Extensions > Gérer les extensions.

Dans la nouvelle petite fenêtre, cliquez en bas à droite sur le bouton Ajouter.

Sélectionnez le fichier Roboteach.zip préalablement téléchargé.

L’extension devrait maintenant apparaitre dans la section Installées de la fenêtre Gérer les extensions.

Fermez la fenêtre Gérer les extensions et cliquez ensuite sur la section Pilotage des blocs dans laquelle vous devriez maintenant voir apparaitre les blocs Roboteach.

Si ça n’est pas le cas vérifier que Roboteach est bien coché dans le menu Choix Des Extensions.

### Configuration du Matériel
#### Branchements du matériel
1. Branchez la boite Roboteach en USB sur votre ordinateur (prise blanche sur la boite).
2. Branchez les deux extrémités Rouge et Verte de l’adaptateur secteur aux extrémités rouge et verte de la boite Roboteach, en respectant bien les couleurs, le rouge sur le rouge et le vert sur le vert.
3. Branchez ensuite votre bornier à la boite Roboteach, en respectant bien le sens indiqué par le détrompeur de la boite.
4. Enfin, branchez ensuite adaptateur secteur sur le secteur.

### Paramétrage de la carte avec mBlock
#### Une fois la carte branchée en USB et mBlock lancé.
Cliquez sur le menu Choix de la carte > Arduino Uno. Assurez-vous ensuite que Arduino Uno est bien coché dans le menu.

Cliquez sur le menu Connecter > par Port Série COM > Le port sur lequel est branché l’Arduino (COM9 par exemple). Si vous n’avez que l’Arduino de branché sur l’ordinateur il ne devrait vous être présenté qu’un choix.

Une fois le port sélectionné cliquez une nouvelle fois sur le menu Connecter > Téléverser le microprogramme de communication. Attendez que le programme se téléverse.

Si tout s’est bien passé vous devriez voir apparaitre un rond vert à coté de Roboteach dans la section Pilotage. Vous êtes donc prêt à utiliser les blocs.

## Test de fonctionnement
 
Pour s’assurer que tout fonctionne correctement, nous allons essayer de faire démarrer un moteur. 
#### Matériel :
Branchez un moteur sur une des bornes M du bornier Fischertechnik, la borne M2 par exemple.
#### Logiciel :
Placez ensuite un bloc « Démarrer le moteur M2 dans le sens POSITIF ». Si vous avez branché votre moteur sur les bornes M2, sinon choisissez en conséquence.
Cliquez sur ce bloc, si le moteur démarre alors tout est bien branché. Vous pouvez l’arrêter en cliquant sur le bloc « Arrêt d’Urgence », ou bien en utilisant le bloc « Arrêter le moteur M2 ».

## Détail des blocs

* Arrêt d’urgence
Permet d’arrêter toutes les actions en cours et de réinitialiser toutes les valeurs de la carte à 0.
---
* Démarrer le moteur **M1/M2/M3/M4** dans le sens **POSITIF/NEGATIF**.
Démarre le moteur branché sur la sortie M sélectionnée, dans le sens choisis.
---
* Arrêter le moteur **M1/M2/M3/M4**.
Stop le moteur branché sur la sortie M sélectionnée.
---
* Allumer la lampe **M1/M2/M3/M4**.
Allume la lampe branchée sur la sortie M sectionnée.
---
* Éteindre la lampe **M1/M2/M3/M4**.
Éteint la lampe branchée sur la sortie M sectionnée.
---
* Activer l’aimant **M1/M2/M3/M4**.
Active l’aimant branchée sur la sortie M sectionnée.
---
* Désactiver l’aimant **M1/M2/M3/M4**.
Désactive l’aimant branchée sur la sortie M sectionnée.
---
* Actualiser l’entrée **E1/E2/E3/E4/E5/E6/E7/E8**.
Permet au registre à décalage d’envoyer la bonne entrée vers le pin lu par l’Arduino.
---
* Valeur de **E1/E2/E3/E4/E5/E6/E7/E8**.
Donne la valeur digitale (binaire) de l’entrée sélectionnée.
ATTENTION : Ce bloc doit toujours être précédé du bloc « Actualiser l’entrée E ». Et les entrées des deux blocs doivent être identiques. Donc si on souhaite lire la valeur de l’entrée E5, je dois sélectionner E5 sur les deux blocs.
---
* Booléen de **E1/E2/E3/E4/E5/E6/E7/E8**.
Donne la valeur de l’entrée sélectionnée sous forme booléenne (vrai ou faux).
ATTENTION : Ce bloc doit toujours être précédé du bloc « Actualiser l’entrée E ». Et les entrées des deux blocs doivent être identiques. Donc si on souhaite lire la valeur de l’entrée E5, je dois sélectionner E5 sur les deux blocs.
---
*Valeur de **EX/EY**.
Donne la valeur analogique du matériel branché sur l’entrée sélectionnée.

## Outils utilisés

*	Autodesk EAGLE – Pour les typons de l’interface
*	Notepad++ – Pour l’écriture de l’extension mBlock

## Auteurs

*	Rousseau Romain – Stagiaire à l’ENSIM – Conception de l’interface, et code de l’extension.
*	Pascal Leroux – Professeur des Universités à l’ENSIM - Créateur de Roboteach en 1998 et encadrant du projet.

## Remerciements

*	Au personnel de l’ENSIM, pour leur aide tout au long du projet.
*	Merci à Daniel Puglièse, Jean-Pierre Remoué, Marc Tavera et Christophe Aubier pour leurs conseils avisés
