import _, { forEach } from 'lodash'
import SceneManager from './Manager/SceneManager.js'


function gameInit() {
    var background = document.createElement('canvas')
    var context = background.getContext('2d')

    background.width = 800
    background.height = 600

    document.body.appendChild(background)
    return context
}

window.onload = function() {
    var sceneManager = new SceneManager(gameInit())
    sceneManager.runGame()
}


