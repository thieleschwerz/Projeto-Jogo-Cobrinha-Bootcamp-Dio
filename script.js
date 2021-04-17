let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
const scoreDisplay = document.querySelector('span') // mostrar score
let score = 0; //acrescentando a variavel score
let snake = [];


snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "white";
    context.strokeStyle = "black"; //cor borda no background
    context.fillRect(0, 0, 16 * box, 16 * box);
    context.strokeRect(0,0, 16 * box, 16 * box); //desenhando borda no background
}


function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "grey";
        context.strokeStyle = "black"; //cor borda no background
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeRect(snake[i].x, snake[i].y, box, box); //desenhando borda no background

    }
}

function drawFood (){
    context.fillStyle = "darkgreen";
    context.fillRect(food.x, food.y, box, box);
}



document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo(){    

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
    
    for(var i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            scoreDisplay.innerText = score;
            alert('Game Over');
        }
    }
   
            criarBG()
            criarCobrinha()
            drawFood()


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
        
     
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
        score += 10; //incrementando pontuacao de 10 em 10
        scoreDisplay.textContent = score; 
    }

   

    let newHead ={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}




let jogo = setInterval(iniciarJogo, 150); //ajuste da velocidade um pouco mais lenta de 100 para 150
