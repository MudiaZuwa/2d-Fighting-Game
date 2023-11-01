const canvas= document.querySelector("canvas")
const ctx= canvas.getContext("2d")

canvas.width= 1024
canvas.height=576
const gravity= .7

ctx.fillRect(0, 0, canvas.width, canvas.height)

const background =new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:"./img/background.png",
})

const shop =new Sprite({
    position:{
        x:600,
        y:128
    },
    imageSrc:"./img/shop.png",
    scale: 2.75,
    framesMax:6
})

 const enemy =new Fighter({
    position:{
    x:canvas.width-200,
    y:0
    },
    velocity:{
        x:0,
        y:0
    },
    color:"blue",
    offset:{
        x:215,
        y:167
    },
    imageSrc:"./img/kenji/Idle.png",
    framesMax:4,
    scale:2.5,
    canvas:canvas,
     gravity,
    direction: "Left",
    sprites: kenji,
    attckBox:{
        offset: {
        Left: {
            x:-170,
            y:50
        },
        Right:{
            x:75,
            y:50
    }  
        },
        width:170,
        height:50
    }
        
        })

const player =new Fighter({
    position:{
    x:150,
    y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:215,
        y:157
    },
    imageSrc:"./img/samuraiMack/Idle.png",
    framesMax:8,
    scale:2.5,
    canvas:canvas,
    gravity,
    direction: "Right",
    sprites: samuraiMack,
    attckBox:{
        offset:{
        Left: {
            x:-185,
            y:50
            },
            Right: {
            x:100,
            y:50
        }
        },
        width:160,
        height:50
    }
        })


 const keys = {
    player:{
        left: {
            pressed: false
        },
        right: {
            pressed: false
        }
    },
    enemy: {
        left: {
            pressed: false
        },
        right: {
            pressed: false
        }
    }
    }


new InputHandler()
const enemyGamepad=new GamepadHandler(1, "enemy")
const playerGamepad=new GamepadHandler(0, "player")

let GameControl = new Game(canvas.width, canvas.height)


    function gameloop() {
        requestAnimationFrame(gameloop)
        if(enemyGamepad.connected && enemy.control === "Gamepad") enemyGamepad.update()
        if (playerGamepad.connected && player.control === "Gamepad") playerGamepad.update()
        GameControl.Control(ctx)
        if (GameControl.gamestate === GAMESTATE.PAUSED || GameControl.gamestate === GAMESTATE.STARTED || GameControl.gamestate === GAMESTATE.MENU || GameControl.gamestate === GAMESTATE.GAMEOVER) return;        
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.scale(1, 1)
        background.update(ctx)
        shop.update(ctx)
        player.update(ctx)
        enemy.update(ctx)

        //player Movement
        player.velocity.x = 0
        if (keys.player.left.pressed && player.lastkey === "left") {
            player.velocity.x = -5
            player.switchSprite("run")
        } else if (keys.player.right.pressed && player.lastkey === "right") {
            player.velocity.x = 5
            player.switchSprite("run")
        } else {
            player.switchSprite("idle")
        }

        if (player.velocity.y < 0) {
            player.switchSprite("jump")
        } else if (player.velocity.y > 0) {
            player.switchSprite("fall")
        }

        //enemy Movement
        enemy.velocity.x = 0
        if (keys.enemy.left.pressed && enemy.lastkey === "left") {
            enemy.velocity.x = -5
            enemy.switchSprite("run")
        } else if (keys.enemy.right.pressed && enemy.lastkey === "right") {
            enemy.velocity.x = 5
            enemy.switchSprite("run")
        } else {
            enemy.switchSprite("idle")
        }

        if (enemy.velocity.y < 0) {
            enemy.switchSprite("jump")
        } else if (enemy.velocity.y > 0) {
            enemy.switchSprite("fall")
        }

        // detect player attack
        if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking && player.framesCurrent === 4) {
            enemy.takeHit()
            document.getElementById("enemyHealth").style.width = enemy.health + "%";
            player.isAttacking = false
            gsap.to('#enemyHealth', {
                width: enemy.health + "%"
            })
        }

        // detect enemy attack
        if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking && enemy.framesCurrent === 2) {
            player.takeHit()
            gsap.to('#playerHealth', {
                width: player.health + "%"
            })
            enemy.isAttacking = false
        }

        //if player misses
        if (player.isAttacking && player.framesCurrent === 4) {
            player.isAttacking = false
        }

        //if player misses
        if (enemy.isAttacking && enemy.framesCurrent === 2) {
            enemy.isAttacking = false
        }

        //end game based on health
        if (enemy.health <= 0 || player.health <= 0) {
            determineWinner({ player, enemy, timerId })
        }

        if (player.position.x < enemy.position.x) {
            player.direction = "Right"
            enemy.direction = "Left"
        } else if (player.position.x > enemy.position.x) {
                    enemy.direction = "Right"
                    player.direction = "Left"
        }
        ComputerAi()
    }

gameloop()
GetControls()
