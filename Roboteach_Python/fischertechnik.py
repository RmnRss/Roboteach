from pymata_aio.pymata3 import PyMata3
from pymata_aio.constants import Constants


# This class is used to control, or read from, the Fischertechnik material
class Fischertechnik:

    def __init__(self):
        # motor pins such as MX_pins = [EN,IN1,IN2]
        self.M1_pins = [6, 7, 4]
        self.M2_pins = [5, 3, 2]
        self.M3_pins = [11, 13, 12]
        self.M4_pins = [10, 9, 8]

        self.data_pin = 14
        self.load_pin = 15
        self.clock_pin = 16

        self.analog_in_x_pin = 4
        self.analog_in_y_pin = 5

        # instantiate the pymata_core API
        self.uno_board = PyMata3(2)

    def pin_mode(self):
        # set the mode of pins related to the motors
        self.uno_board.set_pin_mode(self.M1_pins[0], Constants.PWM)
        self.uno_board.set_pin_mode(self.M1_pins[1], Constants.OUTPUT)
        self.uno_board.set_pin_mode(self.M1_pins[2], Constants.OUTPUT)

        self.uno_board.set_pin_mode(self.M2_pins[0], Constants.PWM)
        self.uno_board.set_pin_mode(self.M2_pins[1], Constants.OUTPUT)
        self.uno_board.set_pin_mode(self.M2_pins[2], Constants.OUTPUT)

        self.uno_board.set_pin_mode(self.M3_pins[0], Constants.PWM)
        self.uno_board.set_pin_mode(self.M3_pins[1], Constants.OUTPUT)
        self.uno_board.set_pin_mode(self.M3_pins[2], Constants.OUTPUT)

        self.uno_board.set_pin_mode(self.M4_pins[0], Constants.PWM)
        self.uno_board.set_pin_mode(self.M4_pins[1], Constants.OUTPUT)
        self.uno_board.set_pin_mode(self.M4_pins[2], Constants.OUTPUT)

        # set the mode of pins related to the shift registers
        self.uno_board.set_pin_mode(self.data_pin, Constants.INPUT)
        self.uno_board.set_pin_mode(self.load_pin, Constants.OUTPUT)
        self.uno_board.set_pin_mode(self.clock_pin, Constants.OUTPUT)

        # set the mode of the analog input pins
        self.uno_board.set_pin_mode(self.analog_in_x_pin, Constants.ANALOG)
        self.uno_board.set_pin_mode(self.analog_in_y_pin, Constants.ANALOG)

    def urgent_stop(self):
        for i in range(0, 20):
            self.uno_board.analog_write(i, 0)
            self.uno_board.digital_write(i, 0)

    def start_motor(self, M_pins, direction):

        # activate motor clockwise
        if direction == "clockwise":
            self.uno_board.analog_write(M_pins[0], 128)
            self.uno_board.digital_write(M_pins[1], 1)
            self.uno_board.digital_write(M_pins[2], 0)

        # activate motor counterclockwise
        if direction == "counterclockwise":
            self.uno_board.analog_write(M_pins[0], 128)
            self.uno_board.digital_write(M_pins[1], 0)
            self.uno_board.digital_write(M_pins[2], 1)

    def stop_motor(self, M_pins):
        self.uno_board.analog_write(M_pins[0], 0)

    def read_digital_input(self, input_number):
        received = [0, 0, 0, 0, 0, 0, 0, 0]

        self.uno_board.digital_write(self.load_pin, 0)
        self.uno_board.digital_write(self.clock_pin, 1)
        self.uno_board.sleep(0.000005)
        self.uno_board.digital_write(self.load_pin, 1)
        self.uno_board.sleep(0.000005)

        for i in range(0, input_number):
            self.uno_board.digital_write(self.clock_pin, 1)
            self.uno_board.digital_write(self.clock_pin, 0)
            self.uno_board.sleep(0.005)
            received[i] = received[i] | self.uno_board.digital_read(self.data_pin)
            # print("E"+ str(i+1) + " - " + str(received[i]))

        self.uno_board.digital_write(self.load_pin, 0)

        input_state = received[input_number-1]
        print(input_state)
        return input_state

    def read_analog_input(self, analog_letter):
        if analog_letter == "x":
            reading = self.uno_board.analog_read(self.analog_in_x_pin)

        if analog_letter == "y":
            reading = self.uno_board.analog_read(self.analog_in_y_pin)

        print("Sortie E" + str(analog_letter) + " = " + str(reading))
        return reading
