const points_title = document.getElementById('points_title');

const GROUND_SIZE = 500
const BODY_SIZE = 10;
const GROW_SIZE = 10;
const BOARD_WIDTH = GROUND_SIZE/BODY_SIZE
const BOARD_HEIGHT = GROUND_SIZE/BODY_SIZE
const PLAY_VELOCITY = 80

let game_points = 0;


const game_state = {
    'canvas': null,
    'context': null,
    'snake': [{x: parseInt(Math.random() * BOARD_WIDTH), y: parseInt(Math.random() * BOARD_HEIGHT)}],
    'direction': {x:1, y:0},
    'apple': {x: parseInt(Math.random() * BOARD_WIDTH), y: parseInt(Math.random() * BOARD_HEIGHT)},
    'grow': 0
}

const KEY_DIRECTION = {
    "ArrowUp" : [0,-1],
    "ArrowDown" : [0,1],
    "ArrowLeft" : [-1,0],
    "ArrowRight" : [1,0],
}

function randomPosition(){
    return {x: parseInt(Math.random() * BOARD_WIDTH), y: parseInt(Math.random() * BOARD_HEIGHT)}
}

function snake_move() {
        
    const tailIndex = game_state.snake.length - 1;
    let tail = {};

    Object.assign(tail, game_state.snake[tailIndex])

    let addBody = ( game_state.snake[0].x === game_state.apple.x && game_state.snake[0].y === game_state.apple.y);

    for(let i= tailIndex; i>-1; i--){

        if(i===0){
            game_state.snake[i].x += game_state.direction.x;
            game_state.snake[i].y += game_state.direction.y;
        } else {
            game_state.snake[i].x = game_state.snake[i-1].x
            game_state.snake[i].y = game_state.snake[i-1].y
        }

    }

    if(isCollision()){
        location.reload()
    }
    
    if(addBody){
        game_state.grow += GROW_SIZE;
        game_state.apple = randomPosition();
        points_title.innerHTML = `Points: ${++game_points}`
    }



    if(game_state.grow > 0){
        game_state.snake.push(tail);
        game_state.grow -= GROW_SIZE
    }

    requestAnimationFrame(draw_snake)
    setTimeout(snake_move, PLAY_VELOCITY)
}

function isCollision(){
    
    const head = game_state.snake[0];
    
    if(head.x < 0 || head.x >= BOARD_WIDTH|| head.y < 0|| head.y >= BOARD_HEIGHT) return true;

    
    for (let i = 1 ; i < game_state.snake.length; i++){
        if((game_state.snake[i].x === head.x) && (game_state.snake[i].y === head.y)) return true
    }

    return false
}


function draw_pixel(color, x, y) {
    game_state.context.fillStyle = color;
    game_state.context.fillRect(x * BODY_SIZE , y*BODY_SIZE, BODY_SIZE, BODY_SIZE);

}

function draw_snake(){

    game_state.context.clearRect(0,0,500,500);

    for (var i = 0; i<game_state.snake.length; i++) {
        const {x,y} = game_state.snake[i]
        draw_pixel('#453', x, y);
    }

    const {x, y} = game_state.apple;
    draw_pixel('red', x, y);
}

window.onload = ()=>{

    game_state.canvas = document.getElementById('canvas');
    game_state.context = game_state.canvas.getContext('2d')

    window.onkeydown = (e)=>{
        const direction = KEY_DIRECTION[e.key]

        if(direction){
            const [x, y] = direction
            if(game_state.direction.x !== -x && game_state.direction.y !== -y) {
                game_state.direction.x = x;
                game_state.direction.y = y;
            }
            
        }

    }

    snake_move()
}