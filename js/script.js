const game_state = {
    'canvas': null,
    'context': null,
    'snake': [{x:0, y:0}],
    'direction': {x:1, y:0},
}

const KEY_DIRECTION = {
    "ArrowUp" : [0,-1],
    "ArrowDown" : [0,1],
    "ArrowLeft" : [-1,0],
    "ArrowRight" : [1,0],
}


function snake_move() {
    
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