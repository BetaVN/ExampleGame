export default class Obstacle {
    constructor(spriteFile, width, height, flyingObstacle = false, animationFrameCount = 0) {
        this.sprite = new Image();
        this.sprite.src = spriteFile;
        this.sizeWidth = width;
        this.sizeHeight = height;    
        this.currentPosX = 800
        if (flyingObstacle) {
            this.currentPosY = 600 - 213 - this.sizeHeight
        }
        else {
            this.currentPosY = 600 - 13 - this.sizeHeight
        }
        this.maxFrameCount = animationFrameCount
        this.currentFrameCount = 0
    }
}