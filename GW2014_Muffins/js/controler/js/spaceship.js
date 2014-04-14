var Cube = function (x,y){
	//classe du spacecraft
	this.x = x;
	this.y = y;
	this.speedY = 0;
	this.impulsion = 10;
	this.draw = function(){
		context.fillStyle = "blue";
		context.fillRect(this.x, this.y,50,50);
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
		this.x += (toucheDroite - toucheGauche) * 4;

		if(saut == true){
			this.speedY = -this.impulsion;
		}
		//this.y += (toucheBas - toucheHaut) * 4;
	}
}