import Gameloop from "../Core/Gameloop.js";

export default class GameplayScene {
    constructor(context) {
        this.context = context
        this.gameloop = new Gameloop(this.context)
    }

    runGameplay(callback) {
        this.gameloop.reset()
        requestAnimationFrame(() => {
            this.gameloop.runGameLoop(callback)
        })
    }
}