var Cube2 = function (x,y){
    //classe du cube
    this.x = x - 100;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.anim = 0;
    this.situation;
    this.countjump = 0;
    this.speedY = 0;
    this.speedX = 4;
    this.impulsion = 12;
    this.range = 200;
    this.color = "blue";
    this.hunger = 1;
    this.hungerReplenish = 0.2;
    this.hungerCost = 0.1;
    this.draw = function(){
        drawImage(loupImage, this.x, this.y, this.width, this.height, this.situation, 5, 4, 1);
        if(Input.rightKey == true){
            this.situation = 2;
        }
        else if(Input.leftKey == true){
            this.situation = 1;
        }
        else{
            this.situation = 0;
        }
    }
    this.move = function(){
        this.speedY += gravity;
        this.y += this.speedY;
        if (this.y > ground.y - ground.height && this.y <= ground.y + this.height && this.x <= ground.x + ground.width 
            && this.x >= ground.x - this.width){
            this.countjump = 0;
            // Le cube est replacé au niveau du sol
            this.y = ground.y - ground.height;
            // Annuler la vitesse actuelle en cas de contact avec le sol
            this.speedY = 0;
        }
        //déplacement du vaisseau
        this.x += (Input.rightKey - Input.leftKey) * this.speedX;
        if(Input.jump == true && this.countjump < 9){
            this.countjump++;
            this.speedY = -this.impulsion;
        }
    }
}