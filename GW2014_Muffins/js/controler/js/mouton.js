
function Mouton(x,y)
{
	this.x = x;
	this.y = y;

	this.distOfView = 200 + Math.random() * 100;
}

Mouton.prototype = 
{
	x : 0,
	y : 0,
	distOfView : 300,
	distMini : 93,
	speed : 2,
	color : "red",
	isDead : false,
	Move : function(x,y)
	{
		this.x += x;
		this.y += y;
	},
	Follow : function(obj)
	{
		var d = Math.Dist(obj, this)

		if(d < this.distOfView * 0.75 && d >= this.distMini)
		{

				if(obj.x > this.x)
					this.Move(1 * this.speed,0);
				else
					this.Move(-1 * this.speed,0);
			return true;
			
		}else return false;


	},
	Flee : function(obj)
	{
		var d = Math.Dist(obj, this);

		if(d < this.distOfView && obj.color != "red")
		{
			if(obj.x >= this.x)
				this.Move(-1 * this.speed,0);
			else
				this.Move(1 * this.speed,0);
			return true;
		}
		else return false;

	},
	Render : function ()
	{
		//TEMP
		
			context.fillStyle =  this.color;
			context.fillRect(this.x - 46, this.y - 46,92,92);
			context.strokeStyle = "#FFF";
			context.strokeRect(this.x - 46, this.y - 46,92,92);
		
	},
	Die : function()
	{
		this.isDead = true;
		this.color = "#777";

	},


}

Math.Dist = function(obj1, obj2)
{
	var a = {x : (obj1.x > 0) ? obj1.x : 0, y :(obj1.y > 0) ? obj1.y : 0 };
	var b = {x : (obj2.x > 0) ? obj2.x : 0, y : (obj2.y > 0) ? obj2.y : 0 };

	return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
}