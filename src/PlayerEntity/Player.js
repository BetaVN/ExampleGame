export default class Player {
    constructor(characterSprite) {
        this.characterSprite = new Image()
        this.characterSprite.src = characterSprite
        this.currentFrame = 0
        this.jumping = false
        this.descending = false
        this.currentJumpHeight = 0
        this.jumpingModifier = 6
        this.maxJumpHeight = 200
        this.currentPosX = 15
        this.currentPosY = 515
        this.basePosY = 515
        this.sizeWidth = 70
        this.sizeHeight = 70
    }
}