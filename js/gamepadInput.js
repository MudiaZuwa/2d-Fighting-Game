class GamepadHandler{
    constructor(gamepadIndex, fighter) {
        this.myGamepad
        this.fighter = fighter
        this.connected = false
        this.gamepadIndex = gamepadIndex
        this.gamepad_mapping = gamepad_mapping[this.fighter]
        this.player = player
        this.enemy = enemy
        this.framesElapsed = 0
        this.LastFramePressed

        window.addEventListener('gamepadconnected', (event) => {
            if (!this.connected && this.gamepadIndex === event.gamepad.index) this.connected = true
        });

        window.addEventListener('gamepaddisconnected', (event) => {
            if (this.gamepadIndex === event.gamepad.index) this.connected = false
        });

//[5] right_y
//[0] left-x
//[1] left_y
//[2] right_x
//[3] right_y(xbox)
}
    update() {
        this.framesElapsed ++
        this.myGamepad = navigator.getGamepads()[this.gamepadIndex];
        var LeftStickX = this.applyDeadzone(this.myGamepad.axes[0], 0.25);
        var LeftStickY = this.applyDeadzone(this.myGamepad.axes[1], 0.25);
        
            //Listen for Fighter Gampad Controls
        if (!(this[this.fighter].dead) && this[this.fighter].control === "Gamepad") {
            this.myGamepad.buttons.map(e => e.pressed).forEach((isPressed, buttonIndex) => {
                    if (isPressed) {
                        switch (buttonIndex) {
                            case this.gamepad_mapping.moveLeft.buttonIndex:
                                keys[this.fighter].left.pressed = true
                                this[this.fighter].lastkey = this.gamepad_mapping.moveLeft.key
                                break;
                            case this.gamepad_mapping.moveRight.buttonIndex:
                                keys[this.fighter].right.pressed = true
                                this[this.fighter].lastkey = this.gamepad_mapping.moveRight.key
                                break;
                            case this.gamepad_mapping.attack1:
                                this[this.fighter].attack(1)
                                break;
                            case this.gamepad_mapping.attack2:
                                this[this.fighter].attack(2)
                                break;
                            case 9:
                                if ((GameControl.gamestate === GAMESTATE.PAUSED || GameControl.gamestate === GAMESTATE.RUNNING) &&
                                    (Math.abs(this.framesElapsed - this.LastFramePressed) > 10 || this.LastFramePressed === undefined)) {
                                    this.LastFramePressed = this.framesElapsed
                                    GameControl.togglePause()
                                    GameControl.MenuSelection = 0
                                    if (GameControl.gamestate === GAMESTATE.RUNNING) decreaseTimer()
                                    else clearInterval(timerId)
                                }
                                break
                        }
                    }
                }
                )
           
                if (LeftStickX === 0) {
                    keys[this.fighter].left.pressed = false
                    keys[this.fighter].right.pressed = false
                }
            
                if (LeftStickX < 0) {
                    keys[this.fighter].left.pressed = true
                    this[this.fighter].lastkey = "left"
                    return
                }

                if (LeftStickX > 0) {
                    keys[this.fighter].right.pressed = true
                    this[this.fighter].lastkey = "right"
                    return
                }
                if (this[this.fighter].position.y === 330 && LeftStickY < 0) this[this.fighter].velocity.y = -20
        }
        
        //Listen to Start Game
        if (GameControl.gamestate === GAMESTATE.MENU &&
            (Math.abs(this.framesElapsed - this.LastFramePressed) > 10 || this.LastFramePressed === undefined)) {
            this.LastFramePressed = this.framesElapsed
            this.myGamepad.buttons.map(e => e.pressed).forEach((isPressed, buttonIndex) => {
                if (isPressed && buttonIndex === 9) {
                    GameControl.Restart()
                }
            })
        }

            //Listen for onMenu Gamepad Controls
        if ((GameControl.gamestate === GAMESTATE.GAMEOVER || GameControl.gamestate === GAMESTATE.PAUSED) &&
            (Math.abs(this.framesElapsed - this.LastFramePressed) > 10 || this.LastFramePressed === undefined)) {
                this.LastFramePressed = this.framesElapsed
            this.myGamepad.buttons.map(e => e.pressed).forEach((isPressed, buttonIndex) => {
                if (isPressed) {
                        switch (buttonIndex) {
                            case this.gamepad_mapping.attack1:
                                if (GameControl.MenuSelection === 0) {
                                    if (GameControl.gamestate === GAMESTATE.GAMEOVER) GameControl.Restart()
                                    else if (GameControl.gamestate === GAMESTATE.PAUSED) {
                                        GameControl.gamestate = GAMESTATE.RUNNING
                                        decreaseTimer()
                                    }
                                    break
                                } else {
                                    GameControl.gamestate = GAMESTATE.MENU
                                    document.getElementById("controlMenu").style.display = "flex"
                                }
                        }
                    }
                })
            
                if (LeftStickY > 0) {
                    GameControl.MenuSelection = (GameControl.MenuSelection === 0) ? 1 : 0
                    return
                }
            
                if (LeftStickY < 0) {
                    GameControl.MenuSelection = (GameControl.MenuSelection === 0) ? 1 : 0
                    return
                }
            }
    }

    applyDeadzone(number, threshold, percentage) {
        percentage = (Math.abs(number) - threshold) / (1 - threshold);
        if (percentage < 0)
            percentage = 0;
        return percentage * (number > 0 ? 1 : -1);
    }
}
