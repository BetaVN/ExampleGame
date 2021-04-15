import Input from "../Core/Input.js";
import Physics from "../Core/Physics.js";
import Renderer from "../Core/Renderer.js";
import ObstacleManager from "../Manager/ObstacleManager.js";
import ScoreManager from "../Manager/ScoreManager.js";
import Player from "../PlayerEntity/Player.js";
import Background from "./Background.js";

export default class Gameloop {
    constructor(context) {
        this.context = context
        this.player = new Player()
        this.obstacleManager = new ObstacleManager()
        this.scoreManager = new ScoreManager()
        this.physics = new Physics()
        this.renderer = new Renderer()
        this.input = new Input()
        this.background = new Background()
        this.upPressed = false
    }

    reset() {
        this.player.reset()
        this.obstacleManager.reset()
        this.scoreManager.reset()
        this.background.reset()
        this.physics.reset()
    }

    processNewInput() {
        this.upPressed = this.input.getInputState()
    }

    updateObjects() {
        this.player.update(this.upPressed)
        this.obstacleManager.update(this.background.backgroundScrollSpeed)
        this.scoreManager.update()
        this.background.update()
        this.physics.checkForCollision(this.player, this.obstacleManager)
        this.input.update()
    }

    render() {
        this.renderer.render(this.context, this.player, this.obstacleManager, this.background, this.scoreManager)
    }

    runGameLoop(callback) {
        this.processNewInput()
        this.updateObjects()
        this.render()
        if (!this.checkGameOver()) {
            requestAnimationFrame(() => {
                this.runGameLoop(callback)
            })
        } 
        else {
            callback(this.scoreManager.currentScore)
        }
    }
    
    checkGameOver() {
        return this.physics.collisionDetected
    }
}