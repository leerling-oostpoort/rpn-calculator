def sendBar():
    basic.show_icon(IconNames.NO)
    radio.send_string("Bar")
    basic.show_icon(IconNames.YES)
def prevFib():
    global tmp, fibn, fib
    tmp = fibn
    fibn = fib - fibn
    fib = tmp

def on_button_pressed_a():
    if state == 0:
        sendFoo()
    elif state == 1:
        prevFib()
    elif state == 2:
        nextFib()
input.on_button_pressed(Button.A, on_button_pressed_a)

def nextPower():
    global power
    power = power * 2
def showInit():
    basic.show_icon(IconNames.HAPPY)
    basic.pause(2000)
    for index in range(4):
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . # . .
                        . . . . .
                        . . . . .
        """)
        basic.show_leds("""
            . . . . .
                        . . . . .
                        . . . . .
                        . . . . .
                        . . . . .
        """)
def showPower():
    basic.show_string("" + str((power)))

def on_button_pressed_ab():
    global state
    state += 1
    if state >= states:
        state = 0
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_received_string(receivedString):
    global busy
    busy = True
    basic.show_leds("""
        # # # # #
                # . # . #
                . # # # .
                . . # . .
                . . # . .
    """)
    basic.show_string(receivedString)
    basic.show_leds("""
        # # # # #
                # . # . #
                . # # # .
                . . # . .
                . . # . .
    """)
radio.on_received_string(on_received_string)

def on_button_pressed_b():
    if state == 0:
        sendBar()
    elif state == 1:
        nextFib()
    elif state == 2:
        nextPower()
input.on_button_pressed(Button.B, on_button_pressed_b)

def showFib():
    basic.show_string("" + str((fib)))
def animateHeart():
    global led_state
    if led_state == 0:
        basic.clear_screen()
    elif led_state == 2:
        dot.show_image(0)
    elif led_state == 3:
        images.icon_image(IconNames.SMALL_HEART).show_image(0)
    elif led_state == 4:
        images.icon_image(IconNames.HEART).show_image(0)
    elif led_state == 7:
        images.icon_image(IconNames.SMALL_HEART).show_image(0)
    elif led_state == 8:
        dot.show_image(0)
    led_state += 1
    if led_state > 8:
        led_state = 0
def sendFoo():
    basic.show_icon(IconNames.NO)
    radio.send_string("Foo")
    basic.show_icon(IconNames.YES)
def nextFib():
    global tmp, fib, fibn
    tmp = fib
    fib = fib + fibn
    fibn = tmp
def prevPower():
    global power
    power = power / 2
tmp = 0
busy = False
dot: Image = None
power = 0
fibn = 0
fib = 0
led_state = 0
state = 0
states = 0
radio.set_group(255)
states = 3
state = 0
led_state = 0
fib = 1
fibn = 0
power = 1
dot = images.create_image("""
    . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
""")
busy = False
showInit()

def on_every_interval():
    if not (busy):
        if state == 0:
            animateHeart()
        elif state == 1:
            showFib()
        elif state == 2:
            showPower()
loops.every_interval(100, on_every_interval)
