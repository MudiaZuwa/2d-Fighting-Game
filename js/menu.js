const key_mapping={
    player:{
        jump:"w",
        moveLeft:"a",
        moveRight:"d",
        attack1:"z",
        attack2:"s",
    },
    enemy:{
        jump:"ArrowUp",
        moveLeft:"ArrowLeft",
        moveRight:"ArrowRight",
        attack1:"ArrowDown",
        attack2:"Shift",
    }
} 

const gamepad_mapping={
    player:{
        jump:12,
        moveLeft:{
            buttonIndex: 14,
            key: "a"
     }, 
     moveRight:{
        buttonIndex: 15,
        key:"d"
 },
        attack1:1,
        attack2:2,
    },
    enemy:{
        jump:12,
        moveLeft:{
            buttonIndex: 14,
            key: "ArrowLeft"
     }, 
     moveRight:{
        buttonIndex: 15,
        key: "ArrowRight"
 },
        attack1:1,
        attack2:2,
    }
}

function GetControls() {
    let selectElement = document.getElementById("enemyControls")
    let optionElement = document.createElement("option")

    optionElement.innerHTML = "EnemyControls"
    optionElement.value = "EnemyControls"
    optionElement.setAttribute("disabled", "disabled")
    optionElement.setAttribute("selected", "selected")

    selectElement.appendChild(optionElement)


    selectElement = document.getElementById("playerControls")
    optionElement = document.createElement("option")

    optionElement.innerHTML = "PlayerControls"
    optionElement.value = "PlayerControls"
    optionElement.setAttribute("disabled", "disabled")
    optionElement.setAttribute("selected", "selected")

    selectElement.appendChild(optionElement)
    
    CreateOptionElement("playerControls", "WASD")
    CreateOptionElement("enemyControls", "Arrowkeys")
    CreateOptionElement("enemyControls", "ComputerAi")
}

function CreateOptionElement(ElementId, optionText, Value = optionText) {
    let selectElement = document.getElementById(ElementId)
    let optionElement = document.createElement("option")

    optionElement.innerHTML = optionText
    optionElement.value = Value

    selectElement.appendChild(optionElement)
}

function GetSelectedOption(ElementId, Fighter) {
    let selectElement = document.getElementById(ElementId)
    let selectedIndex = selectElement.selectedIndex
    if (selectedIndex > 0) {
        let selectedValue = selectElement.options[selectedIndex].value
        if (selectedValue === "WASD" || selectedValue === "Arrowkeys" || selectedValue === "ComputerAi") {
            eval(Fighter + ".control = selectedValue")
        } else {
            eval(Fighter+".control = 'Gamepad'")
            if (Fighter === "player") {
                playerGamepad.gamepadIndex = selectedValue
                playerGamepad.connected = true
                }
            else{
                enemyGamepad.gamepadIndex = selectedValue
                playerGamepad.connected = true
            }
        }
    }
}

addEventListener('gamepadconnected', (event) => {
    let index = event.gamepad.index;
    let GamepadId = navigator.getGamepads()[index].id
    CreateOptionElement("playerControls", GamepadId, index)
    CreateOptionElement("enemyControls", GamepadId, index)
});

document.getElementById("playerControls").addEventListener("change", () => {
    GetSelectedOption("playerControls", "player")
})

document.getElementById("enemyControls").addEventListener("change", () => {
    GetSelectedOption("enemyControls", "enemy")
})