
export default class Renderer {
    constructor() {

    }

    render(context, player, obstacleManager, background, scoreManager) {
        this.renderBackground(context, background)
        this.renderScore(context, scoreManager)
        this.renderPlayer(context, player)
        this.renderObstacle(context, obstacleManager)
    }

    renderPlayer(context, player) {
        context.drawImage(player.characterSprite, 48 * player.getAnimationFrame(), 0, 48, 48, player.currentPosX, player.currentPosY, player.sizeWidth, player.sizeHeight)
    }

    renderObstacle(context, obstacleManager) {
        obstacleManager.obstacleList.forEach(obstacle => {
            context.drawImage(obstacle.sprite, 48 * obstacle.getAnimationFrame(), 0, 48, 48, obstacle.currentPosX, obstacle.currentPosY, obstacle.sizeWidth, obstacle.sizeHeight)
        })
    }

    renderBackground(context, background) {
        context.drawImage(background.backgroundImage, background.currentPosX, 0, 800, 600)
        context.drawImage(background.backgroundImage, background.currentPosX + 800, 0, 800, 600)
    }

    renderScore(context, scoreManager) {
        context.font ="20px Arial"
        context.fillText((100000 + scoreManager.currentScore).toString().substring(1), 700, 30)
    }
}