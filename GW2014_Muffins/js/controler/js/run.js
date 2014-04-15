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
        cube.x = window.event.clientX;
        cube.y = window.event.clientY;
    }
}

//boucle d'affichage des frames
function run(){
	//---------- CODE DE LA BOUCLE D'AFFICHAGE --------------------
    frame++;
    document.body.onmousemove = getMouseLoc;
	requestAnimFrame(run);
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    getKey();
    repletion.draw();
    ground.draw();
	//affichage et deplacement du cube
	cube.draw();
	cube.move();
}