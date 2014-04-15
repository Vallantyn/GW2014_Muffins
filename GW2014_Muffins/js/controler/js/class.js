var Cube = function (x,y){
    //classe du cube
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.countjump = 0;
    this.speedY = 0;
    this.impulsion = 10;
    this.draw = function(){
        context.fillStyle = "green";
        context.fillRect(this.x, this.y,this.width,this.height);
    }
    this.move = function(){
        this.speedY += gravity;
        this.y += this.speedY;
        if (this.y > ground.y - ground.height && ground.x >= this.width && ground.x <= this.x ){
            this.countjump = 0;
            // Le cube est replacé au niveau du sol
            this.y = ground.y - ground.height;
            // Annuler la vitesse actuelle en cas de contact avec le sol
            this.speedY = 0;
        }
        //déplacement du vaisseau
        this.x += (rightKey - leftKey) * 4;
        if(jump == true && this.countjump < 9){
            this.countjump++;
            this.speedY = -this.impulsion;
        }
    }
}

var Log = function (x,y){
    //classe du sol
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.draw = function(){
        context.fillStyle = "brown";
        context.fillRect(this.x, this.y,this.width,this.height);
    }
}

//En dev pas fonctionnel
var Ground = function (x,y){
    //classe du sol
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.draw = function(){
        context.fillStyle = "black";
        context.fillRect(this.x, this.y,this.width,this.height);
    }
}

var Water = function (x,y){
    //class de l'eau
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.draw = function(){
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y,this.width,this.height);
    }
}