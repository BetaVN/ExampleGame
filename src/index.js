import _, { forEach } from 'lodash'
import Gameloop from './Core/Gameloop.js'


function gameInit() {
    var background = document.createElement('canvas')
    var context = background.getContext('2d')

    background.width = 800
    background.height = 600

    document.body.appendChild(background)
    return context
}

window.onload = function() {
    var gameloop = new Gameloop()
    gameloop.assignContext(gameInit())
    requestAnimationFrame(() => {
        gameloop.runGameLoop()
    })
}


