var Cube = function (x,y){
    //classe du cube
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.countjump = 0;
    this.speedY = 0;
    this.impulsion = 10;
    this.range = 200;
    this.color = "blue";
    this.hunger = 1;
    this.hungerReplenish = 0.2;
    this.hungerCost = 0.1;
    this.draw = function(){
        context.fillStyle = this.color;
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
        this.x += (Input.rightKey - Input.leftKey) * 4;
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

    this.eatSheep = function()
    {
        //Je sais, c'est horrible
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

var Input = 
{
    leftKey : false,
    rightKey : false,
    jump : false,
    teleport : false,
    log : false
}