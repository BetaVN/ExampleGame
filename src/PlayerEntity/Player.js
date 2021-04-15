import characterSpriteFile from '../assets/images/char_sprite.png'

export default class Player {
    constructor() {
        this.characterSprite = new Image()
        this.characterSprite.src = characterSpriteFile
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

    reset() {
        this.jumping = false
        this.descending = false
        this.currentJumpHeight = 0
        this.jumpingModifier = 6
        this.maxJumpHeight = 200
        this.currentPosX = 15
        this.currentPosY = 515
    }

    update(input) {
        this.currentFrame += 1
        if ((input) && (!this.jumping) && (!this.descending)) {
            this.jumping = true
        }
        if ((this.jumping) && (!this.descending)) {
            this.currentJumpHeight += this.jumpingModifier
        }
        if (this.currentJumpHeight > this.maxJumpHeight) {
            this.currentJumpHeight = this.maxJumpHeight
            this.descending = true
            this.jumping = false
        }
        if (this.descending) {
            this.currentJumpHeight -= this.jumpingModifier
        }
        if ((this.descending) && (this.currentJumpHeight <= 0)) {
            this.descending = false
        }
        this.currentPosY = this.basePosY - this.currentJumpHeight
        if (this.currentFrame >= 60) {
            this.currentFrame = 0
        }
    }

    getAnimationFrame() {
        if ((this.jumping) || (this.descending)) {
            return 2
        }
        else {
            return Math.floor(this.currentFrame / 20) % 3
        }
    }
}