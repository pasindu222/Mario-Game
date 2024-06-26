import platform from './img/platform.png'

console.log(platform)
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50
        this.height = 50
    }

    draw(){
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
            
    }
}

class Platform {
    constructor({x, y}) {
        this.position = {
            x,
            y
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 
            this.width, this.height)
    }
}

const player = new Player()
//const platform = new Platform()
const platforms = [new Platform({
    x:200, y: 500
}), new Platform({x:500, y:200})]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
   // platform.draw()

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5

    }else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    }else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
            
        }else if (keys.left.pressed) {
            platforms.forEach(platform => {
                platform.position.x += 5
            })
            
        }
    }
// platform collusion condition
platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y 
        >= platform.position.y && player.position.x + player.width >= 
        platform.position.x && player.position.x <= platform.position.x + 
        platform.width) {
        player.velocity.y = 0
    }
})
}
animate()

addEventListener('keydown', ({keyCode}) => {

    switch (keyCode){
        case 65:
            console.log('left')
           // player.velocity.x -= 1
           keys.left.pressed = true
            break

        case 83:
            console.log('down')
           // player.velocity.y += 20
            break

        case 68:
            console.log('right')
           // player.velocity.x += 1
            keys.right.pressed = true
            break

        case 87:
            console.log('up')
            player.velocity.y -= 30 
            break
            
    }
    console.log(keys.right.pressed)
})

addEventListener('keyup', ({keyCode}) => {

    switch (keyCode){
        case 65:
            console.log('left')
           // player.velocity.x = 0
            keys.left.pressed = false
            break

        case 83:
            console.log('down')
           // player.velocity.y += 20
            break

        case 68:
            console.log('right')
           // player.velocity.x = 0
            keys.right.pressed = false
            break

        case 87:
            console.log('up')
            player.velocity.y = 0
            break
            
    }
    console.log(keys.right.pressed)
})
