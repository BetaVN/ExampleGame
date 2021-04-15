export default class ScoreManager {
    constructor() {
        this.currentScore = 0
        this.framePerScore = 12
        this.currentFrame = 0
    }

    reset() {
        this.currentScore = 0
        this.currentFrame = 0
    }

    update() {
        if (this.currentFrame < this.framePerScore) {
            this.currentFrame++
        } 
        else {
            this.currentScore++
            this.currentFrame = 0
        }
    }
}