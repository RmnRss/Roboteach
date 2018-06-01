/*
  Nom : RoboTeach.js
  Auteur : Romain Rousseau
  Fonction : Fichier de pilotage du materiel RoboTeach sous mBlock 3.4 en mode Scratch
  Dernière modification : 30/05/2018
*/

(function(ext) {
  var device = null;
  var _rxBuf = [];

  //---- Déclaration des variables ----//

  var sorties = {
    M1:1,
    M2:2,
    M3:3,
    M4:4
  };

	var sens = {
		POSITIF:1,
		NEGATIF:0
	};

  var entrees_analogiques = {
    EX:4,
    EY:3
  };

  var entrees_binaires = {
    E1:1,
    E2:2,
    E3:3,
    E4:4,
    E5:5,
    E6:6,
    E7:7,
    E8:8
  };

  //pins des sorties tels que pins_MX = [ENX,INX,INX]
  var pins_M1 = [6, 7, 4];
  var pins_M2 = [5, 3, 2];
  var pins_M3 = [11, 13, 12];
  var pins_M4 = [10, 9, 8];

  //pin registre à décalage sur Arduino MEGA
  var pins_reg = [54, 55, 56]; //[DATA, LOAD, CLOCK]

  //sur Arduino UNO
  //var pins_reg = [14, 15, 16]; //[DATA, LOAD, CLOCK]

  //---- Fin de déclaration des variables ----//

  //---- Définition des blocs fonction ----//

  /*
  30 : digital (binaire);
  31 : analogique;
  32 : PWM;

  runPackage(numero de l'instruction à réaliser, pin d'écriture, état du pin souhaité);
  getPackage(nextID, type d'info à récupérer, pin de lecture);
  */

  //Réinitialise les paramètres par défaut de la carte
  ext.resetAll = function(){
    device.send([0xff, 0x55, 2, 0, 4]);
  };

  //Fonction d'initialisation de l'Arduino
  ext.runArduino = function(){
		responseValue();
	};

  //Fonction qui réinitialise toute les valeurs digitale ou de PWM à 0
  ext.arretUrgence = function(){
    for (var i=0; i<=60; i++){
      runPackage(30,i,0);
      runPackage(32,i,0);
    }
  };

  //Fonction qui permet de démarrer le moteur_select sélectionné dans le sens séléctionné
	ext.demarrerMoteur = function(moteur_select,sens_select) {
    var pwm_moteurs = 1250;

    if (sorties[moteur_select] == 1) {

      runPackage(32,pins_M1[0],pwm_moteurs); //pwm a 100

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M1[1],1); //Sens horaire
        runPackage(30,pins_M1[2],0);
      }else{
        runPackage(30,pins_M1[1],0); //Sens anti-horaire
        runPackage(30,pins_M1[2],1);
      }
    }

    if (sorties[moteur_select] == 2) {

      runPackage(32,pins_M2[0],pwm_moteurs);

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M2[1],1);
        runPackage(30,pins_M2[2],0);
      }else{
        runPackage(30,pins_M2[1],0);
        runPackage(30,pins_M2[2],1);
      }
    }

    if (sorties[moteur_select] == 3) {

      runPackage(32,pins_M3[0],pwm_moteurs);

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M3[1],1);
        runPackage(30,pins_M3[2],0);
      }else{
        runPackage(30,pins_M3[1],0);
        runPackage(30,pins_M3[2],1);
      }

    }

    if (sorties[moteur_select] == 4) {
      runPackage(32,pins_M4[0],pwm_moteurs);

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M4[1],1);
        runPackage(30,pins_M4[2],0);
      }else{
        runPackage(30,pins_M4[1],0);
        runPackage(30,pins_M4[2],1);
      }
    }

  };

  //Réinitialise la valeur de la PWM et des sorties de controles à 0 en fonction du moteur_select choisi
	ext.arreterMoteur = function(moteur_select){

    if (sorties[moteur_select] == 1) {
      runPackage(32,pins_M1[0],0);
      runPackage(30,pins_M1[1],0);
      runPackage(30,pins_M1[2],0);
    }

    if (sorties[moteur_select] == 2) {
      runPackage(32,pins_M2[0],0);
      runPackage(30,pins_M2[1],0);
      runPackage(30,pins_M2[2],0);
    }

    if (sorties[moteur_select] == 3) {
      runPackage(32,pins_M3[0],0);
      runPackage(30,pins_M3[1],0);
      runPackage(30,pins_M3[2],0);
    }

    if (sorties[moteur_select] == 4) {
      runPackage(32,pins_M4[0],0);
      runPackage(30,pins_M4[1],0);
      runPackage(30,pins_M4[2],0);
    }
  };

  ext.allumerLampe = function(sortie_select){
    var pwm = 250;

      if (sorties[sortie_select] == 1) {
        runPackage(32,pins_M1[0],pwm);
        runPackage(30,pins_M1[1],1);
        runPackage(30,pins_M1[2],0);
      }

      if (sorties[sortie_select] == 2) {
        runPackage(32,pins_M2[0],pwm);
        runPackage(30,pins_M2[1],1);
        runPackage(30,pins_M2[2],0);
      }

      if (sorties[sortie_select] == 3) {
        runPackage(32,pins_M3[0],pwm);
        runPackage(30,pins_M3[1],1);
        runPackage(30,pins_M3[2],0);
      }

      if (sorties[sortie_select] == 4) {
        runPackage(32,pins_M4[0],pwm);
        runPackage(30,pins_M4[1],1);
        runPackage(30,pins_M4[2],0);
      }
  };

  ext.eteindreLampe = function(sortie_select){
    if (sorties[sortie_select] == 1) {
      runPackage(32,pins_M1[0],0);
      runPackage(30,pins_M1[1],0);
      runPackage(30,pins_M1[2],0);
    }

    if (sorties[sortie_select] == 2) {
      runPackage(32,pins_M2[0],0);
      runPackage(30,pins_M2[1],0);
      runPackage(30,pins_M2[2],0);
    }

    if (sorties[sortie_select] == 3) {
      runPackage(32,pins_M3[0],0);
      runPackage(30,pins_M3[1],0);
      runPackage(30,pins_M3[2],0);
    }

    if (sorties[sortie_select] == 4) {
      runPackage(32,pins_M4[0],0);
      runPackage(30,pins_M4[1],0);
      runPackage(30,pins_M4[2],0);
    }
  };

  ext.activerAimant = function(sortie_select){
    var pwm = 1500;

      if (sorties[sortie_select] == 1) {
        runPackage(32,pins_M1[0],pwm);
        runPackage(30,pins_M1[1],1);
        runPackage(30,pins_M1[2],0);
      }

      if (sorties[sortie_select] == 2) {
        runPackage(32,pins_M2[0],pwm);
        runPackage(30,pins_M2[1],1);
        runPackage(30,pins_M2[2],0);
      }

      if (sorties[sortie_select] == 3) {
        runPackage(32,pins_M3[0],pwm);
        runPackage(30,pins_M3[1],1);
        runPackage(30,pins_M3[2],0);
      }

      if (sorties[sortie_select] == 4) {
        runPackage(32,pins_M4[0],pwm);
        runPackage(30,pins_M4[1],1);
        runPackage(30,pins_M4[2],0);
      }
  };

  ext.desactiverAimant = function(sortie_select){
    if (sorties[sortie_select] == 1) {
      runPackage(32,pins_M1[0],0);
      runPackage(30,pins_M1[1],0);
      runPackage(30,pins_M1[2],0);
    }

    if (sorties[sortie_select] == 2) {
      runPackage(32,pins_M2[0],0);
      runPackage(30,pins_M2[1],0);
      runPackage(30,pins_M2[2],0);
    }

    if (sorties[sortie_select] == 3) {
      runPackage(32,pins_M3[0],0);
      runPackage(30,pins_M3[1],0);
      runPackage(30,pins_M3[2],0);
    }

    if (sorties[sortie_select] == 4) {
      runPackage(32,pins_M4[0],0);
      runPackage(30,pins_M4[1],0);
      runPackage(30,pins_M4[2],0);
    }
  };

	ext.getBinaryIn = function(nextID, entree_binaire_select)
  {
    var deviceId = 30;

    getPackage(nextID,deviceId,pins_reg[0]); //lecture du pin DATA

    };

  ext.updateEntry = function(nextID, entree_binaire_select)
    {
      var deviceId = 30;

      runPackage(30, pins_reg[1], 0); //digitalWrite(LOAD, LOW);
      runPackage(30, pins_reg[2], 1); //digitalWrite(CLOCK, HIGH);

      waitMilliseconds(0.005);

      runPackage(30, pins_reg[1], 1); //digitalWrite(LOAD, HIGH);

      waitMilliseconds(0.005);

      for (var i = 0 ; i<entrees_binaires[entree_binaire_select] ; ++i)
        {
          runPackage(30, pins_reg[2], 1); //digitalWrite(CLOCK, HIGH);
          runPackage(30, pins_reg[2], 0); //digitalWrite(CLOCK, LOW);
        }

    };

  ext.getBinaryInBool = function(nextID, entree_binaire_select)
  {
    var deviceId = 30;

    getPackage(nextID,deviceId,pins_reg[0]);

    /*runPackage(30, pins_reg[1], 0); //digitalWrite(LOAD, LOW);
    runPackage(30, pins_reg[2], 1); //digitalWrite(CLOCK, HIGH);

    waitMilliseconds(0.005);

    runPackage(30, pins_reg[1], 1); //digitalWrite(LOAD, HIGH);

    waitMilliseconds(0.005);

    for (var i = 0 ; i<entrees_binaires[entree_binaire_select] ; ++i)
      {
        runPackage(30, pins_reg[2], 1); //digitalWrite(CLOCK, HIGH);
        runPackage(30, pins_reg[2], 0); //digitalWrite(CLOCK, LOW);
      }*/

    };

  ext.getAnalogIn = function(nextID, entree_analogique_select){
    var deviceId = 31;
		getPackage(nextID,deviceId,entrees_analogiques[entree_analogique_select]);
  };

  function waitMilliseconds(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
			if ((new Date().getTime() - start) > milliseconds){
				break;
			}
		}
	}

//Fonctions de transmissions des données.
  function sendPackage(argList, type){
    var bytes = [0xff, 0x55, 0, 0, type];
    for(var i=0;i<argList.length;++i){
      var val = argList[i];
      if(val.constructor == "[class Array]"){
        bytes = bytes.concat(val);
      }else{
        bytes.push(val);
      }
    }
    bytes[2] = bytes.length - 3;
    device.send(bytes);
  }

  function runPackage(){
    sendPackage(arguments, 2);
  }

  function getPackage(){
    var nextID = arguments[0];
    Array.prototype.shift.call(arguments);
    sendPackage(arguments, 1);
  }

  // Extension API interactions
  var potentialDevices = [];
  ext._deviceConnected = function(dev) {
      potentialDevices.push(dev);

      if (!device) {
          tryNextDevice();
      }
  };

  function tryNextDevice() {
      // If potentialDevices is empty, device will be undefined.
      // That will get us back here next time a device is connected.
      device = potentialDevices.shift();
      if (device) {
          device.open({ stopBits: 0, bitRate: 115200, ctsFlowControl: 0 }, deviceOpened);
      }
  }

  function deviceOpened(dev) {
      if (!dev) {
          // Opening the port failed.
          tryNextDevice();
          return;
      }
      device.set_receive_handler('RoboTeach',function(data) {
          processData(data);
      });
  };

  ext._deviceRemoved = function(dev) {
      if(device != dev) return;
      device = null;
  };

  ext._shutdown = function() {
      if(device) device.close();
      device = null;
  };

  ext._getStatus = function() {
      if(!device) return {status: 1, msg: 'RoboTeach disconnected'};
      return {status: 2, msg: 'RoboTeach connected'};
  };

  var descriptor = {};

	ScratchExtensions.register('RoboTeach', descriptor, ext, {type: 'serial'});
})({});
