import _, { forEach } from 'lodash'
import backgroundImageFile from './assets/images/background.png'
import characterSpriteFile from './assets/images/char_sprite.png'
import Obstacle from './ObstacleEntity/Obstacle.js'
import stoneSpriteFile from './assets/images/obstacle1.png'
import Player from './PlayerEntity/Player.js'


function screenInit() {
    var background = document.createElement('canvas')
    var context = background.getContext('2d')

    background.width = 800
    background.height = 600

    document.body.appendChild(background)
    return context
}

function addInputHandlers() {
    document.addEventListener('keydown', handleDownPressed, false)
}

function handleUpPressed() {

}

function handleDownPressed(event) {
    if (event.keyCode == 38) {
        inputInfo.upPressed = true
    }
    else if (event.keyCode == 40) {
        inputInfo.downPressed = true
    }
    console.log(inputInfo)
}

function drawBackground(context, backgroundImage, backgroundInfo) {
    backgroundInfo.posX -= backgroundInfo.speed
    context.drawImage(backgroundImage, backgroundInfo.posX, 0, 800, 600)
    context.drawImage(backgroundImage, backgroundInfo.posX + globalConstants.screenWidth, 0, 800, 600)
    if (backgroundInfo.posX <= globalConstants.screenWidth * (-1)) {
        backgroundInfo.posX = 0
    }
}

function drawCharacter(context, characterSprite, player) {
    player.currentFrame += 1
    if ((inputInfo.upPressed) && (!player.jumping) && (!player.descending)) {
        player.jumping = true
    }
    if ((player.jumping) && (!player.descending)) {
        player.currentJumpHeight += player.jumpingModifier
    }
    if (player.currentJumpHeight > player.maxJumpHeight) {
        player.currentJumpHeight = player.maxJumpHeight
        player.descending = true
        player.jumping = false
    }
    if (player.descending) {
        player.currentJumpHeight -= player.jumpingModifier
    }
    if ((player.descending) && (player.currentJumpHeight <= 0)) {
        player.descending = false
    }
    let currentAnimationFrame = Math.floor(player.currentFrame / 20) % 3
    if ((player.jumping) || (player.descending)) {
        currentAnimationFrame = 2
    }
    player.currentPosY = player.basePosY - player.currentJumpHeight
    context.drawImage(characterSprite, 48 * currentAnimationFrame, 0, 48, 48, player.currentPosX, player.currentPosY, player.sizeWidth, player.sizeHeight)
    if (player.currentFrame > 60) {
        player.currentFrame = 0
    }
    inputInfo.upPressed = false
    inputInfo.downPressed = false
}

function drawObstacle(context, obstacleInfo, backgroundInfo) {
    obstacleGeneration(obstacleInfo)
    obstacleInfo.obstacleList.forEach(obstacle => {
        obstacle.currentFrameCount++
        obstacle.currentPosX -= backgroundInfo.speed
        let frame = Math.floor(obstacle.currentFrameCount / (Math.floor(60 / obstacle.maxFrameCount + 1))) % (obstacle.maxFrameCount + 1)
        context.drawImage(obstacle.sprite, 48 * frame, 0, 48, 48, obstacle.currentPosX, obstacle.currentPosY, obstacle.sizeWidth, obstacle.sizeHeight)
        if (obstacle.currentFrameCount > 60) {
            obstacle.currentFrameCount = 0
        }
    })

}

function obstacleGeneration(obstacleInfo) {
    if(obstacleInfo.currentCooldown <= 0) {
        let size = getRndNumber(50, 80)
        var newObstacle = new Obstacle(stoneSpriteFile, size, size)
        obstacleInfo.obstacleList.push(newObstacle)
        obstacleInfo.currentCooldown = getRndNumber(Math.floor(obstacleInfo.obstacleGenerationCooldown * 0.5), obstacleInfo.obstacleGenerationCooldown)
    }
    else {
        obstacleInfo.currentCooldown--
    }
}

function removeInvalidObstacles(obstacleInfo) {
    obstacleInfo.obstacleList.forEach(obstacle => {
        if (obstacle.currentPosX < -80) {
            let index = obstacleInfo.obstacleList.indexOf(obstacle)
            obstacleInfo.obstacleList.splice(index, 1)
        }
    })
}

function getRndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

function checkForCollision(player, obstacleInfo) {
    let collisionFound = false
    obstacleInfo.obstacleList.forEach(obstacle => {
        if ((player.currentPosX + 20 < obstacle.currentPosX + obstacle.sizeWidth) &&
            (player.currentPosX + player.sizeWidth - 16 > obstacle.currentPosX) &&
            (player.currentPosY < obstacle.currentPosY +  obstacle.sizeHeight) &&
            (player.currentPosY + player.sizeHeight > obstacle.currentPosY)) {
                collisionFound = true
            }
    })
    return collisionFound
}

function calculateScore(scoreInfo) {
    if (scoreInfo.currentFrame < scoreInfo.framePerScore) {
        scoreInfo.currentFrame++
    } 
    else {
        scoreInfo.score++
        scoreInfo.currentFrame = 0
    }
}

function drawScoreCounter(context, scoreInfo) {
    calculateScore(scoreInfo)
    context.font ="20px Arial"
    context.fillText((100000 + scoreInfo.score).toString().substring(1), 700, 30)
}

function gameLoop() {
    removeInvalidObstacles(obstacleInfo)
    drawBackground(screenContext, backgroundImage, backgroundInfo)
    drawCharacter(screenContext, characterSprite, player)
    drawObstacle(screenContext, obstacleInfo, backgroundInfo)
    drawScoreCounter(screenContext, scoreInfo)
    if (!checkForCollision(player, obstacleInfo)){
        requestAnimationFrame(gameLoop)
    }
}

var screenContext = screenInit()
addInputHandlers()
var backgroundImage = new Image()
backgroundImage.src = backgroundImageFile
var characterSprite = new Image()
characterSprite.src = characterSpriteFile
var globalConstants = {
    screenWidth: 800,
    screenHeight: 600,
    characterBasePositionX: 15,
    characterBasePositionY: 515,
    characterSpriteSize: 70
}
var backgroundInfo = {
    posX: 0,
    speed: 4
}
var player = new Player(characterSpriteFile)
var obstacleInfo = {
    obstacleList: [],
    obstacleGenerationCooldown: 150,
    currentCooldown: 0
}
var inputInfo = {
    upPressed: false,
    downPressed: false
}
var scoreInfo = {
    score: 0,
    framePerScore: 12,
    currentFrame: 0
}

window.onload = function() {
    requestAnimationFrame(gameLoop)
}


