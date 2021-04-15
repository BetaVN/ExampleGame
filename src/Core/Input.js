export default class Input {
    constructor() {
        this.upPressed = false
        this.addInputHandler()
    }

    addInputHandler() {
        document.addEventListener('keydown', (event) => { this.handleDownPressed(event) }, false)
    }

    handleDownPressed(event) {
        console.log("hmm")
        if (event.keyCode == 38) {
            this.upPressed = true
        }
    }
    getInputState() {
        return this.upPressed
    }

    update() {
        this.upPressed = false
    }
}