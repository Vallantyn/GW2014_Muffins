define(function ()
{

	return function Repletion(x,y)
	{
	    //classe de la jauge de faim
	    var vals = {
		    x : x,
		    y : y,
		    height : 50,
		    meter : 160,
		    fillRatio : 1
	    	
	    }

	    var Render = function(context){
	    	vals.meter = 160;
	        if(vals.meter <= vals.x){
	            vals.meter = 0;
	        }

	        context.save();
	        context.globalAlpha = 0.9;
	        //La jauge de faim devient moins opaque quand le joueur rentre dedans
	       /* if (cube.x + cube.width > vals.x && cube.x < vals.meter * vals.fillRatio && cube.y < vals.y + vals.height){
	            context.globalAlpha = 0.4;
	        }*/
	        var my_gradient=context.createLinearGradient(0,0,vals.meter,0);
	        my_gradient.addColorStop(0,"red");
	        my_gradient.addColorStop(0.5,"orange");
	        my_gradient.addColorStop(1,"yellow");
	        context.fillStyle=my_gradient;
	        context.fillRect(vals.x, vals.y,vals.meter * vals.fillRatio,50);
	        context.restore();
	        context.strokeRect(vals.x, vals.y,vals.meter,50);
	    }

	    var setHunger = function(value)
	    {
	        vals.fillRatio = value;
	    }


	    return {
	    	Render : Render,
	    	setHunger : setHunger
	    }
	}



});