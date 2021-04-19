import GameplayScene from "../Scene/GameplayScene.js"
import GameOverScene from "../Scene/GameOverScene.js"

export default class SceneManager {
    constructor(context) {
        this.context = context
        this.currentScene = 1
        this.switchToGameplayCallback = this.switchToGameplay.bind(this)
        this.switchToGameOverCallback = this.switchToGameOver.bind(this)
        this.gameplayScene = new GameplayScene()
        this.gameplayScene.assignGameOverCallback(this.switchToGameOverCallback)
        this.gameOverScene = new GameOverScene()
        this.gameOverScene.assignRestartCallback(this.switchToGameplayCallback)
    }

    switchToGameplay() {
        if (this.currentScene != 1) {
            this.gameplayScene.reset()
            this.currentScene = 1
        }
    }

    switchToGameOver() {
        this.gameOverScene.updateScore(this.gameplayScene.getScore())
        this.currentScene = 2
    }

    update(time, delta, playerInput) {
        if (this.currentScene == 1) {
            this.gameplayScene.update(time, delta, playerInput)
        }
    }

    getCurrentScene() {
        switch (this.currentScene) {
            case 1: {
                return this.gameplayScene
            }
            case 2: {
                return this.gameOverScene
            }
        }
    }
}