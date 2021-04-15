export default class GameOverScene {
    constructor(context, callback) {
        this.context = context
        this.score = 0
        this.callback = callback
        document.addEventListener("keydown", (event) => { this.handleRestart(event) }, false)
    }

    updateScore(score) {
        this.score = score
    }

    handleRestart(event) {
        if (event.keyCode == 13) {
            this.callback()
        }
    }

    renderGameOverScene() {
        this.context.fillStyle = 'rgba(249, 158, 0, 0.64)'
        this.context.fillRect(0, 0, 800, 600)
        this.context.font = "40px Arial"
        this.context.fillStyle = '#000000'
        this.context.fillText("Game Over", 300, 200)
        this.context.font = "20px Arial"
        this.context.fillStyle = '#000000'
        this.context.fillText("Score: " + (100000 + this.score).toString().substring(1), 325, 250)
        this.context.font = "20px Arial"
        this.context.fillStyle = '#000000'
        this.context.fillText("Press Enter to play again", 275, 450)

    }
}