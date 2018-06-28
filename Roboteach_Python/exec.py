from fischertechnik import Fischertechnik

# Needed
ft = Fischertechnik()
ft.pin_mode()

# test instructions
ft.start_motor(ft.M1_pins, "counterclockwise")
ft.uno_board.sleep(2)
ft.stop_motor(ft.M1_pins)

ft.start_motor(ft.M2_pins, "counterclockwise")
ft.uno_board.sleep(2)
ft.stop_motor(ft.M2_pins)

ft.start_motor(ft.M3_pins, "counterclockwise")
ft.uno_board.sleep(2)
ft.stop_motor(ft.M3_pins)

ft.start_motor(ft.M4_pins, "counterclockwise")
ft.uno_board.sleep(2)
ft.stop_motor(ft.M4_pins)

ft.uno_board.shutdown()


