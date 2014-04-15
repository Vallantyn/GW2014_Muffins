var Cube = function (x,y){
    //classe du cube
    this.x = x;
    this.y = y;
    this.countjump = 0;
    this.speedY = 0;
    this.impulsion = 10;
    this.draw = function(){
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y,50,50);
    }
    this.move = function(){
        this.speedY += gravity;
        this.y += this.speedY;
        if (this.y > floor){
            this.countjump = 0;
            // Le cube est replacé au niveau du sol
            this.y = floor;
            // Annuler la vitesse actuelle en cas de contact avec le sol
            this.speedY = 0;
        }
        //déplacement du vaisseau
        this.x += (rightKey - leftKey) * 4;
        if(jump == true && this.countjump < 9){
            this.countjump++;
            this.speedY =-this.impulsion;
        }
    }
}

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

//boucle d'affichage des frames
function run(){
	//---------- CODE DE LA BOUCLE D'AFFICHAGE --------------------
    frame++;
	requestAnimFrame(run);
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    getKey();
	//affichage et deplacement du cube
	cube.draw();
	cube.move();
}