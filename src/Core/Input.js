export default class Input {
    constructor() {
        this.upPressed = false
        this.downPressed = false
        this.addInputHandler()
    }
    
    reset() {
        this.upPressed = false
        this.downPressed = false
    }

    addInputHandler() {
        document.addEventListener('keydown', (event) => { this.handleDownPressed(event) }, false)
    }

    handleDownPressed(event) {
        if (event.keyCode == 38) {
            this.upPressed = true
        }
        if (event.keyCode == 40) {
            this.downPressed = true
        }
    }
    getInputState() {
        return [this.upPressed, this.downPressed]
    }

    update() {
        this.upPressed = false
        this.downPressed = false
    }
}