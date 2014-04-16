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
            Input.log = true;
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
       /* if(Input.teleport == true){
            //teleport le cube
            cube.x = window.event.clientX;
            cube.y = window.event.clientY;
        }
        //Presser Z
        else if(Input.log == true){
            //pose une buche
            logs.push (new Log(window.event.clientX,window.event.clientY));
        }
        else */
        //Les log et teleport sont géré ds le cube directement et mappé sur les touches 3 et 4

            if(/*Input.boom == true*/ window.event.clientX > cube.x && window.event.clientX < cube.x + cube.width
                && window.event.clientY > cube.y && window.event.clientY < cube.y + cube.height){
            /*for (var i = 0; i < logs.length; i++){
                
            }*/
            console.log('detect')
        }
        
        if(Input.teleport)
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
    
    gameScene.Update();

}