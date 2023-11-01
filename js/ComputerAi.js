let LastAttackFrame
function ComputerAi() {
    if (enemy.control === "ComputerAi" && !enemy.dead) {
        if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
            player.isAttacking && player.framesCurrent < 4) {
       //Dodge if Computer is within Player attack range and is attacking
        let action = Math.floor(Math.random() * 3)
        switch (action) {
            case 0:
                enemy.velocity.x = (enemy.direction === "Left") ? 5 : -5
                break
            case 1:
                if (enemy.position.y === 330) enemy.velocity.y = -20
                break
            case 2:
                if (enemy.position.y === 330) enemy.velocity.y = -20
                enemy.velocity.x = (enemy.direction === "Left") ? 5 : -5
                break
        }
        return
    } else if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&
        !enemy.isAttacking && !player.dead &&
        (Math.abs(enemy.framesElapsed - LastAttackFrame) > 40 || LastAttackFrame === undefined)) {
        LastAttackFrame = enemy.framesElapsed
    //Attack if Player is within attack range
        let action = Math.floor(Math.random() * 2)
        switch (action) {
            case 0:
                enemy.attack(1)
                break
            case 1:
                enemy.attack(2)
                break
        }
    } else if (!(enemy.attackBox.position.x + enemy.attackBox.width >=
        player.position.x && enemy.attackBox.position.x <= player.position.x + player.width)) {
            if (enemy.direction === "Left") {
                keys.enemy.left.pressed = true
                enemy.lastkey = 'left'
            } else {
                keys.enemy.right.pressed = true
                enemy.lastkey = 'right'
            }
        } else {
            keys.enemy.left.pressed = false
            keys.enemy.right.pressed = false
            
    }
    }
}