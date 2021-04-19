import Input from "../Core/Input.js";
import Physics from "../Core/Physics.js";
import Renderer from "../Core/Renderer.js";
import ObstacleManager from "../Manager/ObstacleManager.js";
import SceneManager from "../Manager/SceneManager.js";
import ScoreManager from "../Manager/ScoreManager.js";
import Player from "../PlayerEntity/Player.js";
import Background from "./Background.js";

export default class Gameloop {
    constructor() {
        this.context = null
        this.renderer = new Renderer()
        this.sceneManager = new SceneManager()
        this.playerInput = []
        this.time = performance.now()
        this.delta = 0
    }

    assignContext(context) {
        this.renderer.assignContext(context)
    }
    
    processNewInput() {

    }

    updateObjects() {
        this.sceneManager.update(this.time, this.delta)
    }

    render() {
        this.renderer.render(this.sceneManager.getCurrentScene())
    }

    runGameLoop() {
        let currentTime = performance.now()
        this.delta = currentTime - this.time
        this.processNewInput()
        this.updateObjects()
        this.render()
        this.time = currentTime
        requestAnimationFrame(() => {
            this.runGameLoop()
        })
    }
}