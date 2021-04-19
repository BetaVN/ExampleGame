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

    update(elapsedFrame) {
        for (let i = 0; i < elapsedFrame; i++) {
            if (this.currentFrame < this.framePerScore) {
                this.currentFrame++
            } 
            else {
                this.currentScore++
                this.currentFrame = 0
            }
        }
    }

    getScore() {
        return this.currentScore
    }
}