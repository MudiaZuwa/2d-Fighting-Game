
 function rectangularCollision({rectangle1, rectangle2}){
            return(
                rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
                rectangle2.position.x&&rectangle1.attackBox.position.x <= rectangle2.position.x+rectangle2.width&&
                rectangle1.attackBox.position.y+rectangle1.attackBox.height>= rectangle2.position.y&&
                rectangle1.attackBox.position.y<=rectangle2.position.y+rectangle2.height
     )
        }

function determineWinner({ player, enemy, timerId }) {
    clearInterval(timerId)
    if (player.health === enemy.health) {
        document.getElementById("displayText").innerText = "Tie"
        player.switchSprite("death")
        enemy.switchSprite("death")
    } else if (player.health > enemy.health) {
        document.getElementById("displayText").innerText = "Player 1 Wins"
    } else if (player.health < enemy.health) {
        document.getElementById("displayText").innerText = "Player 2 Wins"
    }
    document.getElementById("displayText").style.display = "flex"
    
    GameControl.MenuSelection = 0
    setTimeout(()=>{
        GameControl.gamestate = GAMESTATE.GAMEOVER
        },
        3000)
}
        
let timer
let timerId
    
function decreaseTimer() {
    timerId = setInterval(() => {
         timer--
        if (timer === 10) {
        document.getElementById("timer").style.color = "red"
        }    

         if (timer >= 0) {
         document.getElementById("timer").innerText = timer
        }

        if (timer === -1) {
        determineWinner({ player, enemy, timerId })
        }
    }, 1000)
}

let CountDownTimer

function CountDown() {
         timerId = setInterval(() => {
             CountDownTimer--
             if (CountDownTimer > 0) {
                 document.getElementById("displayText").innerText = CountDownTimer
    }
             if (CountDownTimer === 0) {
                 clearInterval(timerId)
                 GameControl.gamestate = GAMESTATE.RUNNING
                 document.getElementById("displayText").style.display = "none"
                 document.getElementById("timer").style.color = "white"
                 document.getElementById("displayText").style.backgroundColor = "transparent"
                 decreaseTimer()
             }
         }, 1000);
}