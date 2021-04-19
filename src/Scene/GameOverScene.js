export default class GameOverScene {
    constructor() {
        this.score = 0
        this.restartCallback = null
        document.addEventListener("keydown", (event) => { this.handleRestart(event) }, false)
    }

    assignRestartCallback(callback) {
        this.restartCallback = callback
    }

    updateScore(score) {
        this.score = score
    }

    getSceneContext() {
        return "GameOver"
    }

    handleRestart(event) {
        if (event.keyCode == 13) {
            this.restartCallback()
        }
    }
}