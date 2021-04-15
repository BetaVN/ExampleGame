import GameplayScene from "../Scene/GameplayScene.js"
import GameOverScene from "../Scene/GameOverScene.js"

export default class SceneManager {
    constructor(context) {
        this.context = context
        this.currentScene = 1
        this.runGameOverCallback = this.runGameOver.bind(this)
        this.runGameCallback = this.runGame.bind(this)
        this.gameplayScene = new GameplayScene(this.context)
        this.gameOverScene = new GameOverScene(this.context, this.runGameCallback)
    }

    runGame() {
        if (this.currentScene == 1) {
            this.currentScene = 0
            this.gameplayScene.runGameplay(this.runGameOverCallback)
        }
    }

    runGameOver(score) {
        this.currentScene = 1
        this.gameOverScene.updateScore(score)
        this.gameOverScene.renderGameOverScene()
    }
}