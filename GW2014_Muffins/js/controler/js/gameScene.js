var gameScene = (function()
{
	var that = {

		nbMouton : 5,
		moutons : [],
		deadMeat : [],
		sb : [],
		Start : function()
		{
			this.sb = new skillBar();
			this.sb.Start();

			for (var i = 0; i < this.nbMouton; i++) {
				var nmouton = new Mouton(150 + i * 150,350 + i*20);
				this.moutons.push(nmouton);
			};
		},

		Update : function()
		{
			if(this.sb)
				this.sb.Render();

			if(this.moutons.length > 0)
			{
				

				for (var i = 0; i < this.moutons.length; i++) {
					this.moutons[i].Render();
					var f = false;
					for (var j = 0; j < logs.length; j++) {
						if(this.moutons[i].Flee(logs[j]))
							f = true;
					};
					if(this.moutons[i].Flee(cube))
						f = true;

					if(!f) this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i],this.moutons));
				};
				
			}
			for (var i = 0; i < this.deadMeat.length; i++) {
				this.deadMeat[i].Render();
			}
/*
				if(this.moutons[i] == sheepDIE )
					if(!a) this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i]));
				else
					this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i]));
*/
			
			//TODO make flee que le plus proche du loup
		

		},
		KillSheep : function (target)
		{
			target.Die();
			var a = this.moutons.splice(this.moutons.indexOf(target),1);
			this.deadMeat.push(a[0]);
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