/*function skillBar()
{
	this.skillButtons = [];
}

skillBar.prototype.Start = function()
{
	//console.log(this)
	for (var i = 0; i < 5; i++) {
		this.skillButtons.push(new skillButton(50 + i * 50, 50, 50,50));
	};

}

skillBar.prototype.Render = function()
{
	for (var i = 0; i < this.skillButtons.length; i++) {
		this.skillButtons[i].Render();
	};

}




function skillButton(x, y,width, height, action)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.action = action;
}


skillButton.prototype = 
{
	x : 0,
	y : 0,
	width : 50,
	height : 50,
	action : function(){},
	Render : function()
	{
		context.strokeStyle = "#FFF";
		context.strokeRect(this.x - this.width/2, this.y -  this.height/2,this.width,this.height);
	}
}
*/