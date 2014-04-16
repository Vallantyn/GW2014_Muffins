var Cube = function (x,y){
    //classe du cube
    this.x = x;
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
        //context.drawImage(loupImage, this.anim * this.width, this.situation * this.height, 80, 80, this.x, this.y, 80, 80);
        drawImage(loupImage, this.x, this.y, this.width, this.height, this.situation, 10, 4, 0);
        if(Input.rightKey == true){
            this.situation = 2;
        }
        else if(Input.leftKey == true){
            this.situation = 1;
        }
        else{
            this.situation = 0;
        }
        /*if(frame % 10 == 0){
            this.anim++;
            if(this.anim == 4){
                this.anim = 0;
            }
        }*/
        //context.fillStyle = this.color;
        //context.fillRect(this.x, this.y,this.width,this.height);
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
    this.desguise = function()
    {
        if(this.hunger > 0)
        {

            if(this.color != "red") 
            {
                this.color = "red";
                this.speedX = 2;

            }
            else 
            {
                this.color = "blue";
                this.speedX = 4;

            }

            this.hunger -= this.hungerCost;
            if(this.hunger < 0) this.hunger = 0;

        }
        repletion.setHunger(this.hunger);

    }

    this.boom = function ()
    {

    }

    this.eatSheep = function()
    {
        //Je sais, c'est horrible

        if(gameScene.moutons.length > 0)
        {
            var s = gameScene.ClosestSheepTo(this, gameScene.moutons);
            if(Math.Dist(this, s) < this.range)
            {
                gameScene.KillSheep(s);
                this.hunger += this.hungerReplenish;
                if(this.hunger > 1) this.hunger = 1;
            }
            repletion.setHunger(this.hunger);
            
        }

    }
    this.tp = function(x, y)
    {
        if(this.hunger > 0)
        {
            this.x = x;
            this.y = y;
            this.hunger -= this.hungerCost;
            if(this.hunger < 0) this.hunger = 0;
            repletion.setHunger(this.hunger);
            
        }

    }

    this.putLog = function()
    {
        if(this.hunger > 0)
        {
            //pose une buche
            logs.push (new Log(this.x,this.y));
            this.hunger -= this.hungerCost;
            if(this.hunger < 0) this.hunger = 0;
            repletion.setHunger(this.hunger);
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
    this.width = 1000;
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

var Input = 
{
    leftKey : false,
    rightKey : false,
    jump : false,
    teleport : false,
    log : false,
    boom : false
}