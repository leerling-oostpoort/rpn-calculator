/**
 * RPN Calculator
 * 
 * ---------------------
 * 
 * - Modify number entry by clicking buttons
 * 
 * - Long press B to push current number onto stack
 * 
 * - Long press A to switch to operator selection
 * 
 * - Select operator by clicking buttons
 * 
 * - Long press B to execute operator on stack
 * 
 * - Press A and B simultaneously to show stack
 * 
 * - Tilt left to multiply entry by 10
 * 
 * - Tilt right to divide entry by 10
 * 
 * - Tilt up/backward to edit the last stack entry
 * 
 * - Tilt down/forward to clear the entry
 * 
 * Operations:
 * 
 * - Add: add two last number on stack
 * 
 * - Sub: subtract last number from second to last number on stack
 * 
 * - Mul: multiply two last numbers on stack
 * 
 * - Div: divide second to last number by last number on stack
 * 
 * - Sqr: square the last number on the stack
 * 
 * - Root: take root of last number on the stack
 * 
 * - Pwr: raise second to last number to the power of the last number on the stack
 * 
 * - Sum: add all numbers on stack together and clear the stack
 * 
 * - Dup: duplicate last entry on stack
 * 
 * - Swap: swap last two numbers on stack
 * 
 * - Drop: drop the last number on the stack
 * 
 * - Clear: clear the stack
 */
/**
 * Button event handling:
 * 
 * Deal with press, long press and two button press
 */
/**
 * Tilt handling
 */
/**
 * Number and operator entry
 */
/**
 * Display numbers on stack or error
 */
/**
 * Stack operations
 */
function doDrop () {
    if (stack.length >= 1) {
        stack.pop()
    } else {
        showError()
    }
}
function showOp () {
    ops[op_index].showImage(0)
}
function doSwap () {
    if (stack.length >= 2) {
        value1 = stack.pop()
        value2 = stack.pop()
        stack.push(value1)
        stack.push(value2)
    } else {
        showError()
    }
}
function clickB () {
    if (state == 0) {
        nextNum()
    } else if (state == 1) {
        nextOp()
    }
}
function doOp () {
    if (op_index == 0) {
        doAdd()
    } else if (op_index == 1) {
        doSub()
    } else if (op_index == 2) {
        doMul()
    } else if (op_index == 3) {
        doDiv()
    } else if (op_index == 4) {
        doSquare()
    } else if (op_index == 5) {
        doRoot()
    } else if (op_index == 6) {
        doPower()
    } else if (op_index == 7) {
        doSum()
    } else if (op_index == 8) {
        doSwap()
    } else if (op_index == 9) {
        doDup()
    } else if (op_index == 10) {
        doDrop()
    } else if (op_index == 11) {
        doClear()
    }
}
function doRoot () {
    if (stack.length >= 1) {
        value2 = stack.pop()
        stack.push(Math.sqrt(value2))
    } else {
        showError()
    }
}
function prevOp () {
    op_index += -1
    if (op_index < 0) {
        op_index = ops.length - 1
    }
}
function tiltUp () {
    if (stack.length >= 1) {
        if (!(num_init)) {
            num_init = true
            num = stack.pop()
        }
    }
}
function tiltRight () {
    num = num / 10
}
function nextOp () {
    op_index += 1
    if (op_index >= ops.length) {
        op_index = 0
    }
}
function doDiv () {
    if (stack.length >= 2) {
        value1 = stack.pop()
        value2 = stack.pop()
        stack.push(value2 / value1)
    } else {
        showError()
    }
}
function tiltDown () {
    if (num_init) {
        num_init = false
        num = 0
    }
}
function doSquare () {
    if (stack.length >= 1) {
        value2 = stack.pop()
        stack.push(value2 * value2)
    } else {
        showError()
    }
}
function nextInc () {
    inc = Math.constrain(inc + 1, -1, 1)
}
function tiltLeft () {
    num = num * 10
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    if (idle_counter <= max_idle) {
        if (button_a) {
            if (button_b) {
                button_b = 0
                showStack()
            } else {
                button_a = control.eventTimestamp() - button_a
                if (button_a < 400000) {
                    clickA()
                } else {
                    pushA()
                }
            }
        }
    }
    idle_counter = 0
    button_a = 0
})
function pushA () {
    if (state) {
        state = 0
    } else {
        state = 1
    }
}
/**
 * Display loop: diplaying either current number entry or current operator selection
 */
function showNum () {
    if (num_init) {
        basic.showNumber(num)
    } else {
        basic.showString("_")
    }
}
function showInit () {
    basic.showIcon(IconNames.Happy)
    basic.pause(2000)
    for (let index = 0; index < 3; index++) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
    }
}
/**
 * Start of program
 * 
 * Initialize and show startup sequence
 */
function init () {
    states = 2
    state = 0
    led_state = 0
    idle_counter = 0
    max_idle = 100
    inc = 0
    tilted = false
    ops = [
    images.createImage(`
        . . # . .
        . . # . .
        # # # # #
        . . # . .
        . . # . .
        `),
    images.createImage(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `),
    images.createImage(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `),
    images.createImage(`
        . . . . #
        . . . # .
        . . # . .
        . # . . .
        # . . . .
        `),
    images.createImage(`
        . . # # .
        . . . . #
        . . . # .
        . . # # #
        . . . . .
        `),
    images.createImage(`
        . . . . #
        . . . . #
        # # . # .
        . # . # .
        . . # . .
        `),
    images.createImage(`
        . . # . .
        . # . # .
        . . . . .
        . . . . .
        . . . . .
        `),
    images.createImage(`
        # # # # .
        . # . . .
        . . # . .
        . # . . .
        # # # # .
        `),
    images.createImage(`
        . . # . .
        . # . # .
        . . . . .
        . # . # .
        . . # . .
        `),
    images.createImage(`
        . . # # #
        # # # . #
        # . # . #
        # . # # #
        # # # . .
        `),
    images.createImage(`
        . . . . .
        . . . . .
        # . . . #
        . # . # .
        . . # . .
        `),
    images.createImage(`
        . # # . .
        # . . # .
        # . . . .
        # . . # .
        . # # . .
        `)
    ]
    stack = []
    dot = images.createImage(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    busy = false
}
function clickA () {
    if (state == 0) {
        prevNum()
    } else if (state == 1) {
        prevOp()
    }
}
function nextNum () {
    num += 1 * 10 ** inc
    num_init = true
}
function doClear () {
    stack = []
}
function animateHeart () {
    if (led_state == 0) {
        dot.showImage(0)
    } else if (led_state == 1) {
        images.iconImage(IconNames.SmallHeart).showImage(0)
    } else if (led_state == 2) {
        images.iconImage(IconNames.Heart).showImage(0)
    } else if (led_state == 3) {
        images.iconImage(IconNames.SmallHeart).showImage(0)
    } else if (led_state == 6) {
        dot.showImage(0)
    } else if (led_state == 7) {
        basic.clearScreen()
    }
    led_state += 1
    if (led_state > 20) {
        led_state = 0
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    button_b = control.eventTimestamp()
})
function pushB () {
    pushNum()
    if (state == 1) {
        doOp()
        state = 0
        showStack()
    }
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    button_a = control.eventTimestamp()
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_UP, function () {
    if (idle_counter <= max_idle) {
        if (button_b) {
            if (button_a) {
                button_a = 0
                showStack()
            } else {
                button_b = control.eventTimestamp() - button_b
                if (button_b < 400000) {
                    clickB()
                } else {
                    pushB()
                }
            }
        }
    }
    idle_counter = 0
    button_b = 0
})
function doSum () {
    value2 = 0
    while (stack.length > 0) {
        value2 += stack.pop()
    }
    stack.push(value2)
}
function doDup () {
    if (stack.length >= 1) {
        stack.push(stack[stack.length - 1])
    } else {
        showError()
    }
}
function doAdd () {
    if (stack.length >= 2) {
        value1 = stack.pop()
        value2 = stack.pop()
        stack.push(value2 + value1)
    } else {
        showError()
    }
}
function pushNum () {
    if (num_init) {
        stack.push(num)
        num = 0
        num_init = false
    }
}
/**
 * Currently unused increment modifier
 */
function prevInc () {
    inc = Math.constrain(inc - 1, -1, 1)
}
function doSub () {
    if (stack.length >= 2) {
        value1 = stack.pop()
        value2 = stack.pop()
        stack.push(value2 - value1)
    } else {
        showError()
    }
}
function doMul () {
    if (stack.length >= 2) {
        value1 = stack.pop()
        value2 = stack.pop()
        stack.push(value2 * value1)
    } else {
        showError()
    }
}
function prevNum () {
    num += -1 * 10 ** inc
    num_init = true
}
control.onEvent(EventBusSource.MICROBIT_ID_ACCELEROMETER, EventBusValue.MICROBIT_ACCELEROMETER_EVT_DATA_UPDATE, function () {
    ax = input.acceleration(Dimension.X)
    ay = input.acceleration(Dimension.Y)
    az = input.acceleration(Dimension.Z)
    if (tilted) {
        if (az < -800) {
            tilted = false
        }
    } else {
        if (ax < -950) {
            if (idle_counter <= max_idle) {
                tiltLeft()
            }
            tilted = true
            idle_counter = 0
        } else if (ax > 950) {
            if (idle_counter <= max_idle) {
                tiltRight()
            }
            tilted = true
            idle_counter = 0
        } else if (ay > 950) {
            if (idle_counter <= max_idle) {
                tiltUp()
            }
            tilted = true
            idle_counter = 0
        } else if (ay < -950) {
            if (idle_counter <= max_idle) {
                tiltDown()
            }
            tilted = true
            idle_counter = 0
        }
    }
})
function showError () {
    busy = true
    basic.showIcon(IconNames.Sad)
    busy = false
}
function doPower () {
    if (stack.length >= 2) {
        value1 = stack.pop()
        value2 = stack.pop()
        stack.push(value2 ** value1)
    } else {
        showError()
    }
}
function showStack () {
    busy = true
    for (let value of stack) {
        basic.clearScreen()
        basic.pause(100)
        basic.showNumber(value)
    }
    busy = false
}
let az = 0
let ay = 0
let ax = 0
let busy = false
let dot: Image = null
let tilted = false
let led_state = 0
let states = 0
let button_b = 0
let button_a = 0
let max_idle = 0
let idle_counter = 0
let inc = 0
let num = 0
let num_init = false
let state = 0
let value2 = 0
let value1 = 0
let op_index = 0
let ops: Image[] = []
let stack: number[] = []
init()
showInit()
loops.everyInterval(100, function () {
    idle_counter += 1
    if (!(busy)) {
        if (idle_counter > max_idle) {
            animateHeart()
        } else {
            if (state == 0) {
                showNum()
            } else if (state == 1) {
                showOp()
            }
        }
    }
})
