import characterSpriteFile from '../assets/images/char_sprite.png'

export default class Player {
    constructor() {
        this.characterSprite = new Image()
        this.characterSprite.src = characterSpriteFile
        this.currentFrame = 0
        this.jumping = false
        this.descending = false
        this.startingJumpForce = 8
        this.currentJumpForce = 0
        this.currentPosX = 15
        this.currentPosY = 515
        this.basePosY = 515
        this.sizeWidth = 70
        this.sizeHeight = 70
        this.jumpGravity = 10
        this.descendGravity = 200
    }

    reset() {
        this.jumping = false
        this.startingJumpForce = 8
        this.currentJumpForce = 0
        this.descending = false
        this.currentFrame = 0
        this.currentPosX = 15
        this.currentPosY = 515
    }

    update(elapsedFrame, playerInput) {
        for (let i = 0; i < elapsedFrame; i++) {
            this.currentFrame += 1
            if ((playerInput[0]) && (!this.jumping)) {
                this.jumping = true
                this.currentJumpForce = this.startingJumpForce
            }
            if ((playerInput[1]) && (!this.descending)) {
                this.descending = true
                this.currentJumpForce = 0
            }
            if ((this.jumping) && (!this.descending)) {
                this.currentJumpForce -= (this.jumpGravity / 60)
            }
            if (this.descending) {
                this.currentJumpForce -= (this.descendGravity / 60)
            }
            this.currentPosY = this.currentPosY - this.currentJumpForce
            if (this.currentFrame >= 60) {
                this.currentFrame = 0
            }
            
            if (this.currentPosY > this.basePosY) {
                this.currentPosY = this.basePosY
                this.jumping = false
                this.descending = false
            }
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