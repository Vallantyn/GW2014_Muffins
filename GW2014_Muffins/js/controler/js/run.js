var jump = false, leftKey = false, rightKey = false, teleport = false, log = false;
function getKey(){
    document.onkeydown = function(e){
        //analyse des touches clavier pressées
        if (event.keyCode == 32){
            Input.jump = true;
        }
        else if (event.keyCode == 37){
            Input.leftKey = true;
        }
        else if (event.keyCode == 39){
            Input.rightKey = true;
        }
        else if (event.keyCode == 51){
            Input.teleport = true;
            Input.log = false;
        }
        else if (event.keyCode == 52){
            Input.teleport = false;
            //Input.log = true;
        }
        else if (event.keyCode == 53){
            Input.boom = true;
        }
    }
    document.onkeyup = function(e){
        //analyse de situation des touches du clavier
        if (event.keyCode == 32){
            Input.jump = false;
        }
        else if (event.keyCode == 37){
            Input.leftKey = false;
        }
        else if (event.keyCode == 39){
            Input.rightKey = false;
        }

        if (event.keyCode == 49){
            cube.desguise();
        }
        if (event.keyCode == 50){
            cube.eatSheep();
        }
        if (event.keyCode == 51){
            Input.teleport = false;
        }
        if (event.keyCode == 52){
            cube.putLog();
        }
    }
}

//Capture la position de la souris
function getMouseLoc(){
    document.onclick = function(){
        //Presser A
        if(Input.teleport == true){
            //teleport le cube
            cube.x = window.event.clientX;
            cube.y = window.event.clientY;
        }
        //Presser Z
        else if(Input.log == true){
            //pose une buche
            logs.push (new Log(window.event.clientX,window.event.clientY));
        }
        else if(Input.boom == true && window.event.clientX > ground.x && window.event.clientX < ground.x + ground.width
                && window.event.clientY > ground.y && window.event.clientY < ground.y + ground.height){
            
            console.log('detect')
        }
            cube.tp(window.event.clientX,window.event.clientY);
    }
}

var logs = [];  //tableau de buche

//boucle d'affichage des frames
function run(){
	//---------- CODE DE LA BOUCLE D'AFFICHAGE --------------------

    getKey();
    frame++;
    document.body.onmousemove = getMouseLoc;
    requestAnimFrame(run);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (var i = 0; i < logs.length; i++){
        logs[i].draw();
    }
    
    ground.draw();
	//affichage et deplacement du cube
	cube.draw();
	cube.move();
    repletion.draw();
    gameScene.Update();

}