var Cube = function (x,y){
	//classe du spacecraft
	this.x = x;
	this.y = y;
	this.speedY = 0;
	this.speedX = 4;
	this.impulsion = 10;
	this.range = 200;
	this.color = "blue";
	this.hunger = 0;
	this.hungerReplenish = 0.2;
	this.draw = function(){
		context.fillStyle = this.color;
		context.fillRect(this.x - 90, this.y -50,180,100);
	}
	this.move = function(){
		this.speedY += gravity;
		this.y += this.speedY;
		if (this.y > floor)
	    {
	        // Le héros est replacé au niveau du sol
	        this.y = floor
	 
	        // Anuler la vitesse actuelle en cas de contact avec le sol
	        this.speedY = 0;
	    }
		//déplacement du vaisseau
		this.x += (toucheDroite - toucheGauche) * this.speedX;

		if(saut == true){
			this.speedY = -this.impulsion;
		}
		//this.y += (toucheBas - toucheHaut) * 4;
	}

	this.desguise = function()
	{
		if(this.hunger < 1)
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

			this.hunger += this.hungerCost;
		}


	}

	this.eatSheep = function()
	{
		//Je sais, c'est horrible
		var s = gameScene.ClosestSheepTo(this, gameScene.moutons);
		if(Math.Dist(this, s) < this.range)
		{
			s.Die();
			this.hunger -= this.hungerReplenish;
		}

	}
}