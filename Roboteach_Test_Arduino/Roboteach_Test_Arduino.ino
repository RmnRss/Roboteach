/* ------- BIBLIOTEQUES ------------ */

//#include "Pin_map.h"

/* ------- FIN BIBLIOTEQUES ------------ */

/* ------- DECLARATION VARIABLES MOTEURS ------------ */

/*
  Les ENX gèrent la PWM donc la vitesse des moteurs
  Les INX gèrent le sens de rotation du moteur(2 par moteur)
  H = HIGH ; L = LOW ;
  EN  IN1 IN2   FONCTION
  H   1   0     HORAIRE
  H   0   1     ANTI-HORAIRE
  H   1   1     ARRET RAPIDE
  H   0   0     ARRET RAPIDE
  L   X   X     ARRET EN ROUE LIBRE
*/

//Branchement des pins moteurs tels que : MX[3]{EN,IN1,IN2}
int M1[3]{13,11,12}, M2[3]{8,9,10}, M3[3]{7,5,6}, M4[3]{2,3,4};

/* ------- FIN VARIABLES MOTEURS ------- */

/* ------- DECLARATION VARIABLES REGISTRES ------- */

const int DATA = 54;
const int LOAD = 55;
const int CLOCK = 56;

byte input_state;

/* ------- FIN VARIABLES REGISTRES ------- */

/* ------- DECLARATION VARIABLES ANALOGIQUES ------- */

const int ANALOGX = 4;
const int ANALOGY = 5;

int EX;
int EY;

/* ------- FIN VARIABLES REGISTRES ------- */

void setup()
{
  //Debug
  Serial.begin(9600);
  delay(1000);

  Serial.println("esfdf");
  //Initialisation des I/O Moteurs
  IO_Motors();

  //Initialisation des entrées
  IO_Register();

  digitalWrite(CLOCK, LOW);
  digitalWrite(LOAD, HIGH);
}

void loop()
{
  input_state = read_Registers();
  print_Byte(input_state);

  delay(50);
  Serial.println(analogRead(A3));
  Serial.println(analogRead(A4));

  //test_Motor(M1);
  //test_Motor(M2);
  //test_Motor(M3);
  //test_Motor(M4);

}

//----------------------------------------------------------------//
//                    FONCTIONS ENTREES BINAIRES                  //
//----------------------------------------------------------------//

void IO_Register()
{
  pinMode(DATA, INPUT);
  pinMode(LOAD, OUTPUT);
  pinMode(CLOCK, OUTPUT);

}

byte read_Registers()
{
  byte received;

  digitalWrite(LOAD, LOW);    //Active le chargement des données parallèle dans le registre
  digitalWrite(CLOCK, HIGH);
  delayMicroseconds(5);
  digitalWrite(LOAD, HIGH);
  delayMicroseconds(5);

  received = shiftIn(DATA, CLOCK, LSBFIRST);

  /* for (int i = 0; i<8 ; i++) {
     received = received | (digitalRead(DATA) << i);
     digitalWrite(CLOCK, HIGH);
     digitalWrite(CLOCK, LOW);
    }*/

  //Serial.print("received : ");
  //Serial.println(received, BIN);

  //digitalWrite(CLOCK, LOW);
  digitalWrite(LOAD, LOW);    //Active le chargement des données parallèle dans le registre


  return  received;
}

void print_Byte(byte to_Print)
{
  Serial.print("ABCDEFGH : ");

  for (int i = 0; i <= 7; i++) {
    Serial.print(to_Print >> i & 1, BIN);
  }

  Serial.println(" ");
  Serial.println(to_Print >> 0 & 1);

  delay(1000);
}

//----------------------------------------------------------------//
//                       FONCTIONS MOTEURS                        //
//----------------------------------------------------------------//

void IO_Motors (void)
{
  pinMode (M1[0], OUTPUT);
  pinMode (M1[1], OUTPUT);
  pinMode (M1[2], OUTPUT);

  pinMode (M2[0], OUTPUT);
  pinMode (M2[1], OUTPUT);
  pinMode (M2[2], OUTPUT);

  pinMode (M3[0], OUTPUT);
  pinMode (M3[1], OUTPUT);
  pinMode (M3[2], OUTPUT);

  pinMode (M4[0], OUTPUT);
  pinMode (M4[1], OUTPUT);
  pinMode (M4[2], OUTPUT);
}

void test_Motor (int MX[3])
{
  analogWrite (MX[0], 200);   //Vitesse Moteur
  digitalWrite(MX[1], LOW);   //Sens horaire
  digitalWrite(MX[2], HIGH);
  delay(300);
  digitalWrite(MX[1], HIGH);  //Sens anti-horaire
  digitalWrite(MX[2], LOW);
  delay(300);
  digitalWrite(MX[1], LOW);   //Arret
}
