define(["assetManager", "sceneManager"],function (assetManager,sceneManager)
{

	return function Repletion(x,y)
	{
		var gameScene = sceneManager.currentScene;
	    //classe de la jauge de faim
	    var vals = {
		    x : x,
		    y : y,
		    height : 50,
		    meter : 160,
		    fillRatio : 1
	    	
	    }

	    var Render = function(context){

	    	vals.meter = 414;


	        if(vals.meter <= vals.x){
	            vals.meter = 0;
	        }

	    	context.drawImage(assetManager.Get("HUD"),0,0);
	    	context.drawImage(assetManager.Get("bdv"),vals.meter * (1 - vals.fillRatio) ,0,vals.meter,15,vals.x, vals.y,vals.meter,15);


	    	var txtSheepAlive = gameScene.sheeps.length;
	    	var txtSheepSave = gameScene.sheepsSaved.length + "/" + gameScene.sheepsNeeded;
	    	var txtSheepDead = gameScene.kebabs.length;

	    	

	    	context.fillStyle = "#FFF";
	    	context.font = "35px Georgia bold"
	    	context.fillText(txtSheepAlive, 1042,35);
	    	context.fillText(txtSheepSave, 1117,35);
	    	context.fillText(txtSheepDead, 1221,35);

	        /*context.save();
	        context.globalAlpha = 0.9;*/
	        //La jauge de faim devient moins opaque quand le joueur rentre dedans
	       /* if (cube.x + cube.width > vals.x && cube.x < vals.meter * vals.fillRatio && cube.y < vals.y + vals.height){
	            context.globalAlpha = 0.4;
	        }*/
	        /*var my_gradient=context.createLinearGradient(0,0,vals.meter,0);
	        my_gradient.addColorStop(0,"red");
	        my_gradient.addColorStop(0.5,"orange");
	        my_gradient.addColorStop(1,"yellow");
	        context.fillStyle=my_gradient;
	        context.fillRect(vals.x, vals.y,vals.meter * vals.fillRatio,50);
	        context.restore();
	        context.strokeRect(vals.x, vals.y,vals.meter,50);*/
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