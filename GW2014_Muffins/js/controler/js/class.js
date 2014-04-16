var Cube = function (x,y){
    //classe du cube
    this.ID = 0;
    this.x = x;
    this.y = y;
    this.width = 184;
    this.height = 92;
    this.countjump = 0;
    this.speedY = 0;
    this.speedX = 6;
    this.impulsion = 8;
    this.range = 200;
    this.color = "blue";
    this.hunger = 1;
    this.hungerReplenish = 0.2;
    this.hungerCost = 0.1;
    this.isLeader = true;
    this.grounded = false;
    this.collider = new TileCollider(this);
    this.draw = function(){
        context.fillStyle = this.color;
        context.fillRect(this.x- this.width/2, this.y - this.height/2,this.width,this.height);
    }
    this.move = function(){
       
       /* if (this.y > ground.y - ground.height/2 && this.y <= ground.y + this.height && this.x <= ground.x + ground.width 
            && this.x >= ground.x - this.width){
            this.countjump = 0;
            // Le cube est replacé au niveau du sol
            this.y = ground.y - ground.height/2;
            // Annuler la vitesse actuelle en cas de contact avec le sol
            this.speedY = 0;
        }*/

        this.grounded = false;

        for (var i = 0; i < gameScene.mapP.walkable.length; i++) {
            if(this.collider.CheckGround(gameScene.mapP.walkable[i]))
            {
                this.grounded = true;
                this.countjump = 0;
                //this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height - this.height/2;
                // Annuler la vitesse actuelle en cas de contact avec le sol
                this.speedY = 0;

                // Le cube est replacé au niveau du sol
                this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height/2 - this.height/2 +1;
            }
        };

        if(!this.grounded)
        {
            for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                if(this.collider.CheckGround(gameScene.mapP.wallground[i]))
                {
                    this.grounded = true;
                    this.countjump = 0;
                    //this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height - this.height/2;
                    // Annuler la vitesse actuelle en cas de contact avec le sol
                    this.speedY = 0;
                    // Le cube est replacé au niveau du sol
                    this.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height/2 - this.height/2 +1;

                }
            };
        }


        //déplacement du vaisseau
        if(Input.jump == true && this.grounded){
            this.speedY = -this.impulsion;
            this.grounded = false;
        }

      
        this.speedY += this.grounded ? 0 : gravity;
        this.y += this.speedY;
        
        
        var x = this.x;
        this.x += (Input.rightKey - Input.leftKey) * this.speedX;
        for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
            if(this.collider.CheckGround(gameScene.mapP.wall[i]))
            {
                this.x = x;
                break;
            }
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
                this.speedX = 6;

            }

            this.hunger -= this.hungerCost;
            if(this.hunger < 0) this.hunger = 0;

        }
        repletion.setHunger(this.hunger);

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
var Ground = function (x,y, width, height){
    //classe du sol
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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