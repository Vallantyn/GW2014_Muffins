function getKey(){
    document.onkeydown = function(e){
        //analyse des touches clavier pressées
        if (event.keyCode == 32){
            jump = true;
        }
        else if (event.keyCode == 37){
            leftKey = true;
        }
        else if (event.keyCode == 39){
            rightKey = true;
        }
        else if (event.keyCode == 65){
            teleport = true;
            log = false;
        }
        else if (event.keyCode == 90){
            teleport = false;
            log = true;
        }
    }
    document.onkeyup = function(e){
        //analyse de situation des touches du clavier
        if (event.keyCode == 32){
            jump = false;
        }
        else if (event.keyCode == 37){
            leftKey = false;
        }
        else if (event.keyCode == 39){
            rightKey = false;
        }
    }
}

function getMouseLoc(){
    document.onclick = function(){
        if(teleport == true){
            //teleport le cube
            cube.x = window.event.clientX;
            cube.y = window.event.clientY;
        }
        else if(log == true){
            //pose une buche
            logs.push (new Log(window.event.clientX,window.event.clientY));
        }
    }
}
var logs = [];

//boucle d'affichage des frames
function run(){
	//---------- CODE DE LA BOUCLE D'AFFICHAGE --------------------
    
    frame++;
    document.body.onmousemove = getMouseLoc;
	requestAnimFrame(run);
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    getKey();
    for (var i = 0; i < logs.length; i++){
        logs[i].draw();
    }
    repletion.draw();
    ground.draw();
	//affichage et deplacement du cube
	cube.draw();
	cube.move();
}