import Background from "../Core/Background.js";
import Physics from "../Core/Physics.js";
import ObstacleManager from "../Manager/ObstacleManager.js";
import ScoreManager from "../Manager/ScoreManager.js";
import Player from "../PlayerEntity/Player.js";

export default class GameplayScene {
    constructor() {
        this.obstacleManager = new ObstacleManager()
        this.background = new Background()
        this.player = new Player()
        this.scoreManager = new ScoreManager()
        this.physics = new Physics()
        this.gameOverCallback = null
    }

    getSceneContext() {
        return "Gameplay"
    }

    assignGameOverCallback(callback) {
        this.gameOverCallback = callback
    }

    getScore() {
        return this.scoreManager.getScore()
    }
    
    reset() {
        this.player.reset()
        this.obstacleManager.reset()
        this.scoreManager.reset()
        this.background.reset()
        this.physics.reset()
    }

    update(time, delta, playerInput) {
        var elapsedFrame = Math.floor(delta / 16)
        this.obstacleManager.update(elapsedFrame, this.background.getBackgroundSpeed())
        this.player.update(elapsedFrame, playerInput)
        this.scoreManager.update(elapsedFrame)
        this.background.update(elapsedFrame)
        this.physics.checkForCollision(this.player, this.obstacleManager)
        if (this.physics.getCollisionStatus()) {
            this.gameOverCallback()
        }
    }
}