define(function ()
{

	return function Background(listOfImg)
	{
	    
	    var vals = 
	    {
		   listOfImg : listOfImg,
		   offset : 0,
	    	
	    }

	    var Render = function(cx)
	    {
	    	for (var i = 0; i < vals.listOfImg.length; i++) {
	    		cx.drawImage(vals.listOfImg[i],0 + vals.offset * i/10,-200,2560,1080);
	    	};
	    	

	  	}

	  	var Move = function(x)
	  	{
	  		vals.offset += x;
	  	}


	    return {
	    	Render : Render,
	    	Move : Move,
	    }
	}



});