export default class Physics {
    constructor() {
        this.collisionDetected = false
    }

    reset() {
        this.collisionDetected = false
    }

    checkForCollision(player, obstacleManager) {
        obstacleManager.obstacleList.forEach(obstacle => {
            if ((player.currentPosX + 20 < obstacle.currentPosX + obstacle.sizeWidth) &&
                (player.currentPosX + player.sizeWidth - 16 > obstacle.currentPosX) &&
                (player.currentPosY < obstacle.currentPosY +  obstacle.sizeHeight) &&
                (player.currentPosY + player.sizeHeight > obstacle.currentPosY)) {
                    this.collisionDetected = true
                }
        })
    }

    getCollisionStatus() {
        return this.collisionDetected
    }
}