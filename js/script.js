const BODY_SIZE = 20;
const GROW_SIZE = 2;

const game_state = {
    'canvas': null,
    'context': null,
    'snake': [{x:0, y:0}],
    'direction': {x:1, y:0},
    'grow': false
}

const KEY_DIRECTION = {
    "ArrowUp" : [0,-1],
    "ArrowDown" : [0,1],
    "ArrowLeft" : [-1,0],
    "ArrowRight" : [1,0],
}


function snake_move() {
        
    const tailIndex = game_state.snake.length - 1;
    let tail = {};

    Object.assign(tail, game_state.snake[tailIndex])

    for(let i= tailIndex; i>-1; i--){

        if(i===0){
            game_state.snake[i].x += game_state.direction.x;
            game_state.snake[i].y += game_state.direction.y;
        } else {
            game_state.snake[i].x = game_state.snake[i-1].x
            game_state.snake[i].y = game_state.snake[i-1].y
        }

    }

    if(game_state.grow > 0){
        game_state.snake.push(tail);
        game_state.grow -= GROW_SIZE
    }

    requestAnimationFrame(draw_snake)
    setTimeout(snake_move, 1000)
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

        if(e.key === 'w'){
            game_state.grow += GROW_SIZE;
        }

    }

    snake_move()
}