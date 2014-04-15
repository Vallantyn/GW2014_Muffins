var gameScene = (function()
{
	var that = {

		nbMouton : 5,
		moutons : [],
		sb : [],
		Start : function()
		{
			this.sb = new skillBar();
			this.sb.Start();

			for (var i = 0; i < this.nbMouton; i++) {
				var nmouton = new Mouton(150 + i * 150,500 + i*20);
				this.moutons.push(nmouton);
			};
		},

		Update : function()
		{
			if(this.sb)
				this.sb.Render();

			var sheepDIE = this.ClosestSheepTo(cube,this.moutons);
			var a = sheepDIE.Flee(cube);

			for (var i = 0; i < this.moutons.length; i++) {
				this.moutons[i].Render();
				if(!this.moutons[i].Flee(cube))
					this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i],this.moutons));
			};

/*
				if(this.moutons[i] == sheepDIE )
					if(!a) this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i]));
				else
					this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i]));
*/
			
			//TODO make flee que le plus proche du loup
		

		},

		ClosestSheepTo : function(target, moutonList)
		{
			var ret = moutonList[0];
			var curDist = 1000000000;

			for (var i = 0; i < moutonList.length; i++) {
				if(moutonList[i] != target)
				{
					var d = Math.Dist(moutonList[i], target);

					if(d < curDist )
					{
						curDist = d;
						ret = moutonList[i];
					}
					
				}
			};

			if(cube != target && cube.color == "red")
			{
				var d = Math.Dist(cube, target);

				if(d < curDist )
				{
					curDist = d;
					ret = cube;
				}
			}

			return ret;
		}
	};

	return that;
})();