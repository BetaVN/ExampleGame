import Utils from '../Util/Utils.js'
import Obstacle from '../ObstacleEntity/Obstacle.js'
import stoneSpriteFile from '../assets/images/obstacle1.png'

export default class ObstacleManager {
    constructor() {
        this.obstacleList = []
        this.obstacleGenerationCooldown = 150
        this.currentCooldown = 0
    }

    reset() {
        this.obstacleList = []
        this.currentCooldown = 0
    }

    obstacleGeneration() {
        if(this.currentCooldown <= 0) {
            let size = Utils.getRndNumber(50, 80)
            var newObstacle = new Obstacle(stoneSpriteFile, size, size)
            this.obstacleList.push(newObstacle)
            this.currentCooldown = Utils.getRndNumber(Math.floor(this.obstacleGenerationCooldown * 0.5), this.obstacleGenerationCooldown)
        }
        else {
            this.currentCooldown--
        }
    }

    removeInvalidObstacles() {
        this.obstacleList.forEach(obstacle => {
            if (obstacle.currentPosX < -80) {
                let index = this.obstacleList.indexOf(obstacle)
                this.obstacleList.splice(index, 1)
            }
        })
    }

    update(backgroundSpeed) {
        this.obstacleGeneration()
        this.obstacleList.forEach(obstacle => {
            obstacle.update(backgroundSpeed)
        })
        this.removeInvalidObstacles()
    }
}