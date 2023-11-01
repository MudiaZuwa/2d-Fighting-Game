const GAMESTATE={
    PAUSED:0,
    RUNNING:1,
    MENU:2,
    GAMEOVER:3,
    STARTED:4,
    PAUSE:5
}

class Game{
    constructor(gameWidth, gameHeight){
        this.gameWidth= gameWidth;
        this.gameHeight=gameHeight;
        this.gamestate = GAMESTATE.MENU
        this.MenuSelection = 0
        document.getElementById("controlMenu").style.display = "flex"
    }

    Restart() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.GAMEOVER ||
            (player.control === undefined || enemy.control === undefined)) return;
        document.getElementById("controlMenu").style.display = "none"
        player.position = {
            x: 82.5,
            y: 0
        }
        enemy.position = {
            x: this.gameWidth - 110,
            y: 0
        }
        player.Restart()
        enemy.Restart()
            gsap.to('#enemyHealth', {
                width: enemy.health + "%"
            })
            gsap.to('#playerHealth', {
                width: player.health + "%"
            })
        
        timer = 60
        CountDownTimer = 3
        document.getElementsByClassName("displayText")[0].style.display = "flex"
        document.getElementsByClassName("displayText")[0].style.backgroundColor = "rgba(0, 0, 0, 0.9)"
        document.getElementById("displayText").innerText = CountDownTimer
        document.getElementById("timer").innerText = timer
        CountDown()
        this.gamestate = GAMESTATE.STARTED
    }

    Control(){
        if (this.gamestate == GAMESTATE.PAUSED || this.gamestate == GAMESTATE.PAUSE) {
            ctx.font="40px Arial"
            ctx.textAlign = "center";

            ctx.fillStyle = "white"
            ctx.fillRect(this.gameWidth / 2 - 240, this.gameHeight / 2 - 120, 480, 60)
            ctx.fillStyle = (this.MenuSelection === 0) ? "blue" : "#818CF8"
            ctx.fillRect(this.gameWidth / 2 - 236, this.gameHeight / 2 - 116, 472, 52)
            ctx.fillStyle = "white";
            ctx.fillText("Resume", this.gameWidth / 2, this.gameHeight / 2 - 80)
            
            ctx.fillStyle = "rgba(275, 275, 275, 0.9)"
            ctx.fillRect(this.gameWidth / 2 - 240, this.gameHeight / 2, 480, 60)
            ctx.fillStyle = (this.MenuSelection === 1) ? "blue" : "#818CF8"
            ctx.fillRect(this.gameWidth / 2 - 236, this.gameHeight / 2 + 4, 472, 52)
            ctx.fillStyle = "white";
            ctx.fillText("Return To Menu", this.gameWidth / 2, this.gameHeight / 2 + 40)
        }

        if(this.gamestate==GAMESTATE.MENU){
            ctx.rect(0,0 ,this.gameWidth, this.gameHeight)
            ctx.fillStyle="rgba(0,0,0,1)"
            ctx.fill();
            ctx.font="30px Arial"
            ctx.fillStyle="white";
            ctx.textAlign="center";
            ctx.fillText("Press Enter or Start to Start Game", this.gameWidth/2, this.gameHeight/2)
        }

        if (this.gamestate == GAMESTATE.GAMEOVER) {
            document.getElementById("displayText").style.display = "none"
            ctx.font="40px Arial"
            ctx.textAlign = "center";

            ctx.fillStyle = "white"
            ctx.fillRect(this.gameWidth / 2 - 240, this.gameHeight / 2 - 120, 480, 60)
            ctx.fillStyle = (this.MenuSelection === 0) ? "blue" : "#818CF8"
            ctx.fillRect(this.gameWidth / 2 - 236, this.gameHeight / 2 - 116, 472, 52)
            ctx.fillStyle = "white";
            ctx.fillText("Replay", this.gameWidth / 2, this.gameHeight / 2 - 80)
            
            ctx.fillStyle = "rgba(275, 275, 275, 0.9)"
            ctx.fillRect(this.gameWidth / 2 - 240, this.gameHeight / 2, 480, 60)
            ctx.fillStyle = (this.MenuSelection === 1) ? "blue" : "#818CF8"
            ctx.fillRect(this.gameWidth / 2 - 236, this.gameHeight / 2 + 4, 472, 52)
            ctx.fillStyle = "white";
            ctx.fillText("Return To Menu", this.gameWidth / 2, this.gameHeight / 2 + 40)
        }
    }

    drawButton() {

    }

    togglePause(){
        switch(this.gamestate){  
            case GAMESTATE.PAUSED:
                this.gamestate=GAMESTATE.RUNNING 
                break;
                case GAMESTATE.RUNNING:
                    this.gamestate=GAMESTATE.PAUSED
                    break;
                    case GAMESTATE.STARTED:
                        this.gamestate= GAMESTATE.PAUSE
                        break;
                        case GAMESTATE.PAUSE:
                            this.gamestate=GAMESTATE.STARTED
                            break;
        }
    }
}