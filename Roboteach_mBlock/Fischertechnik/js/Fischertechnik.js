// pilotageft.js

(function(ext) {
  var device = null;
  var _rxBuf = [];

  var moteurs = {
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

  //pins des moteurs tels que MX = [ENX,INX,INX]
  var pins_M1 = [13, 11, 12];
  var pins_M2 = [8, 9, 10];
  var pins_M3 = [7, 5, 6];
  var pins_M4 = [2, 3, 4];

  //pin registre à décalage sur Arduino MEGA
  var pins_reg = [54, 55, 56]; //[DATA, LOAD, CLOCK]

  //sur Arduino UNO
  //var pins_reg = [14, 15, 16]; //[DATA, LOAD, CLOCK]

  //Réinitialise les paramètres de la carte
  ext.resetAll = function(){
    device.send([0xff, 0x55, 2, 0, 4]);
  };

  //Fonction d'Initialisation de l'Arduino
  ext.runArduino = function(){
		responseValue();
	};

  //Fonction qui réinitialise toute les valeurs à 0
  ext.arretUrgence = function(){
    for (var i=0, i<=60, i++){
      runPackage(30,i,0);
      runPackage(32,i,0);
    }
  };

  //Fonction qui permet de démarrer le moteur_select sélectionné dans le sens séléctionné
	ext.demarrerMoteur = function(moteur_select,sens_select) {

    if (moteurs[moteur_select] == 1) {

      runPackage(32,pins_M1[0],100); //pwm a 100

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M1[1],1); //Sens horaire
        runPackage(30,pins_M1[2],0);
      }else{
        runPackage(30,pins_M1[1],0); //Sens anti-horaire
        runPackage(30,pins_M1[2],1);
      }
    }

    if (moteurs[moteur_select] == 2) {

      runPackage(32,pins_M2[0],100);

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M2[1],1);
        runPackage(30,pins_M2[2],0);
      }else{
        runPackage(30,pins_M2[1],0);
        runPackage(30,pins_M2[2],1);
      }
    }

    if (moteurs[moteur_select] == 3) {

      runPackage(32,pins_M3[0],100);

      if (sens[sens_select] == 1) {
        runPackage(30,pins_M3[1],1);
        runPackage(30,pins_M3[2],0);
      }else{
        runPackage(30,pins_M3[1],0);
        runPackage(30,pins_M3[2],1);
      }

    }

    if (moteurs[moteur_select] == 4) {
      runPackage(32,pins_M4[0],100);

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

    if (moteurs[moteur_select] == 1) {
      runPackage(32,pins_M1[0],0);
      runPackage(30,pins_M1[1],0);
      runPackage(30,pins_M1[2],0);
    }

    if (moteurs[moteur_select] == 2) {
      runPackage(32,pins_M2[0],0);
      runPackage(30,pins_M2[1],0);
      runPackage(30,pins_M2[2],0);
    }

    if (moteurs[moteur_select] == 3) {
      runPackage(32,pins_M3[0],0);
      runPackage(30,pins_M3[1],0);
      runPackage(30,pins_M3[2],0);
    }

    if (moteurs[moteur_select] == 4) {
      runPackage(32,pins_M4[0],0);
      runPackage(30,pins_M4[1],0);
      runPackage(30,pins_M4[2],0);
    }
  };

	ext.getBinaryIn = function(nextID, entree_binaire_select){
    var deviceId = 30;

    getPackage(nextID,deviceId,pins_reg[0]);

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

  function processData(bytes) {
      trace(bytes);
  }

  var inputArray = [];
  var _isParseStart = false;
  var _isParseStartIndex = 0;
  function processData(bytes) {
    var len = bytes.length;
    if(_rxBuf.length>30){
      _rxBuf = [];
    }
    for(var index=0;index<bytes.length;index++){
      var c = bytes[index];
      _rxBuf.push(c);
      if(_rxBuf.length>=2){
        if(_rxBuf[_rxBuf.length-1]==0x55 && _rxBuf[_rxBuf.length-2]==0xff){
          _isParseStart = true;
          _isParseStartIndex = _rxBuf.length-2;
        }
        if(_rxBuf[_rxBuf.length-1]==0xa && _rxBuf[_rxBuf.length-2]==0xd&&_isParseStart){
          _isParseStart = false;

          var position = _isParseStartIndex+2;
          var extId = _rxBuf[position];
          position++;
          var type = _rxBuf[position];
          position++;
          //1 byte 2 float 3 short 4 len+string 5 double
          var value;
          switch(type){
            case 1:{
              value = _rxBuf[position];
              position++;
            }
              break;
            case 2:{
              value = readFloat(_rxBuf,position);
              position+=4;
              if(value<-255||value>1023){
                value = 0;
              }
            }
              break;
            case 3:{
              value = readInt(_rxBuf,position,2);
              position+=2;
            }
              break;
            case 4:{
              var l = _rxBuf[position];
              position++;
              value = readString(_rxBuf,position,l);
            }
              break;
            case 5:{
              value = readDouble(_rxBuf,position);
              position+=4;
            }
              break;
            case 6:
              value = readInt(_rxBuf,position,4);
              position+=4;
              break;
          }
          if(type<=6){
            responseValue(extId,value);
          }else{
            responseValue();
          }
          _rxBuf = [];
        }
      }
    }
    }

  function readFloat(arr,position){
    var f= [arr[position],arr[position+1],arr[position+2],arr[position+3]];
    return parseFloat(f);
  }

  function readInt(arr,position,count){
    var result = 0;
    for(var i=0; i<count; ++i){
      result |= arr[position+i] << (i << 3);
    }
    return result;
  }

  function readDouble(arr,position){
    return readFloat(arr,position);
  }

  function readString(arr,position,len){
    var value = "";
    for(var ii=0;ii<len;ii++){
      value += String.fromCharCode(_rxBuf[ii+position]);
    }
    return value;
  }

  function appendBuffer( buffer1, buffer2 ) {
      return buffer1.concat( buffer2 );
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
      device.set_receive_handler('Fischertechnik',function(data) {
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
      if(!device) return {status: 1, msg: 'Fischertechnik disconnected'};
      return {status: 2, msg: 'Fischertechnik connected'};
  };

  var descriptor = {};

	ScratchExtensions.register('Fischertechnik', descriptor, ext, {type: 'serial'});
})({});
