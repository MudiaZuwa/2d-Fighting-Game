class InputHandler {
  constructor() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && GameControl.gamestate === GAMESTATE.MENU)
        GameControl.Restart();

      if (
        event.key === 'Escape' &&
        (GameControl.gamestate === GAMESTATE.PAUSED ||
          GameControl.gamestate === GAMESTATE.RUNNING)
      ) {
        GameControl.togglePause();
        GameControl.MenuSelection = 0;
        if (GameControl.gamestate === GAMESTATE.RUNNING) {
          decreaseTimer();
        } else clearInterval(timerId);
      }
      if (!player.dead && player.control === 'WASD') {
        switch (event.key) {
          case key_mapping.player.moveRight:
            keys.player.right.pressed = true;
            player.lastkey = 'right';
            break;
          case key_mapping.player.moveLeft:
            keys.player.left.pressed = true;
            player.lastkey = 'left';
            break;
          case key_mapping.player.jump:
            if (player.position.y === 330) player.velocity.y = -20;
            break;
          case key_mapping.player.attack1:
            player.attack(1);
            break;
          case key_mapping.player.attack2:
            player.attack(2);
            break;
        }
      }
      //enemy Keys
      if (!enemy.dead && enemy.control === 'Arrowkeys') {
        switch (event.key) {
          case key_mapping.enemy.moveRight:
            keys.enemy.right.pressed = true;
            enemy.lastkey = 'right';
            break;
          case key_mapping.enemy.moveLeft:
            keys.enemy.left.pressed = true;
            enemy.lastkey = 'left';
            break;
          case key_mapping.enemy.jump:
            if (enemy.position.y === 330) enemy.velocity.y = -20;
            break;
          case key_mapping.enemy.attack1:
            enemy.attack(1);
            break;
          case key_mapping.enemy.attack2:
            enemy.attack(2);
            break;
        }
      }
      if (
        GameControl.gamestate === GAMESTATE.GAMEOVER ||
        GameControl.gamestate === GAMESTATE.PAUSED
      ) {
        switch (event.key) {
          case 'ArrowUp':
            GameControl.MenuSelection = GameControl.MenuSelection === 0 ? 1 : 0;
            break;
          case 'ArrowDown':
            GameControl.MenuSelection = GameControl.MenuSelection === 0 ? 1 : 0;
            break;
          case 'Enter':
            if (GameControl.MenuSelection === 0) {
              if (GameControl.gamestate === GAMESTATE.GAMEOVER)
                GameControl.Restart();
              else if (GameControl.gamestate === GAMESTATE.PAUSED) {
                GameControl.gamestate = GAMESTATE.RUNNING;
                decreaseTimer();
              }
              break;
            } else {
              GameControl.gamestate = GAMESTATE.MENU;
              document.getElementById('controlMenu').style.display = 'flex';
            }
        }
      }
    });

    window.addEventListener('keyup', (event) => {
      if (player.control === 'WASD') {
        switch (event.key) {
          case key_mapping.player.moveRight:
            keys.player.right.pressed = false;
            break;
          case key_mapping.player.moveLeft:
            keys.player.left.pressed = false;
            break;
        }
      }

      if (enemy.control === 'Arrowkeys') {
        switch (event.key) {
          //enemy Keys
          case key_mapping.enemy.moveRight:
            keys.enemy.right.pressed = false;
            break;
          case key_mapping.enemy.moveLeft:
            keys.enemy.left.pressed = false;
            break;
        }
      }
    });
  }
}
