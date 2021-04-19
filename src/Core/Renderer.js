
export default class Renderer {
    constructor() {
        this.context = null
    }

    assignContext(context) {
        this.context = context
    }

    render(scene) {
        switch (scene.getSceneContext()) {
            case "Gameplay": {
                this.renderGameplay(scene)
                break;
            }
            case "GameOver": {
                this.renderGameOver(scene)
                break;
            }
        }
    }

    renderGameplay(scene) {
        this.renderBackground(scene.background)
        this.renderScore(scene.scoreManager)
        this.renderPlayer(scene.player)
        this.renderObstacle(scene.obstacleManager)
    }

    renderPlayer(player) {
        this.context.drawImage(player.characterSprite, 48 * player.getAnimationFrame(), 0, 48, 48, player.currentPosX, player.currentPosY, player.sizeWidth, player.sizeHeight)
    }

    renderObstacle(obstacleManager) {
        obstacleManager.obstacleList.forEach(obstacle => {
            this.context.drawImage(obstacle.sprite, 48 * obstacle.getAnimationFrame(), 0, 48, 48, obstacle.currentPosX, obstacle.currentPosY, obstacle.sizeWidth, obstacle.sizeHeight)
        })
    }

    renderBackground(background) {
        this.context.drawImage(background.backgroundImage, background.currentPosX, 0, 800, 600)
        this.context.drawImage(background.backgroundImage, background.currentPosX + 800, 0, 800, 600)
    }

    renderScore(scoreManager) {
        this.context.font ="20px Arial"
        this.context.fillText((100000 + scoreManager.currentScore).toString().substring(1), 700, 30)
    }

    renderGameOver(scene) {
        this.context.fillStyle = 'rgba(249, 158, 0, 0.64)'
        this.context.fillRect(0, 0, 800, 600)
        this.context.font = "40px Arial"
        this.context.fillStyle = '#000000'
        this.context.fillText("Game Over", 300, 200)
        this.context.font = "20px Arial"
        this.context.fillStyle = '#000000'
        this.context.fillText("Score: " + (100000 + scene.score).toString().substring(1), 325, 250)
        this.context.font = "20px Arial"
        this.context.fillStyle = '#000000'
        this.context.fillText("Press Enter to play again", 275, 450)
    }
}