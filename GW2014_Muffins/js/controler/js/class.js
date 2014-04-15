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

var Repletion = function (x,y){
    //classe de la jauge de faim
    this.x = x;
    this.y = y;
    this.meter = 160;
    this.draw = function(){
        //affichage de la jauge
        if(frame % 20 == 0){
            this.meter--;
        }
        if(this.meter <= this.x){
            this.meter = 0;
        }
        /*if(condition){
            //recharge de la jauge, placer une condition cuissedepoulet == true;
            this.meter += 30;
        }
        if(this.meter > 160){
            this.meter = 160;
        }*/
        context.fillStyle = "brown";
        context.fillRect(this.x, this.y,this.meter,50);
    }
}