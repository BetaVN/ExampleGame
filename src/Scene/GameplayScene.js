import Background from "../Core/Background.js";
import Input from "../Core/Input.js";
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
        this.input = new Input()
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
        this.input.reset()
    }

    update(time, delta) {
        var elapsedFrame = Math.floor(delta / 16)
        this.obstacleManager.update(elapsedFrame, this.background.getBackgroundSpeed())
        this.player.update(elapsedFrame, this.input.getInputState())
        this.scoreManager.update(elapsedFrame)
        this.background.update(elapsedFrame)
        this.physics.checkForCollision(this.player, this.obstacleManager)
        this.input.reset()
        if (this.physics.getCollisionStatus()) {
            this.gameOverCallback()
        }
    }
}