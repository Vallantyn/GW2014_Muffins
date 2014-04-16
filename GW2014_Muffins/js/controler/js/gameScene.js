var gameScene = (function()
{
	var that = {

		nbMouton : 7,
		moutons : [],
		deadMeat : [],
		sb : [],
		Start : function()
		{
			this.sb = new skillBar();
			this.sb.Start();

			for (var i = 0; i < this.nbMouton; i++) {
				var nmouton = new Mouton(150 + i * 150,250 , i +1);
				this.moutons.push(nmouton);
			};
			var nmouton = new Mouton(600,10, i +1);
			this.moutons.push(nmouton);


			this.moutons[0].isLeader =  this.moutons[4].isLeader = true;

			this.mapP = new mapParser();
			this.tiledMap = this.mapP.parse(map);
			
			//console.log(this.mapP.tileInXY(this.mapP.walkable, cube.x, cube.y));

			this.c = document.createElement("canvas");
			this.c.width = canvasWidth;
			this.c.height = canvasHeight;
			var ctx = this.c.getContext("2d");
			for (var i = 0; i < this.tiledMap.length; i++)
				for (var j = 0; j < this.tiledMap[i].length; j++)
					this.tiledMap[i][j].draw(ctx);

		},

		Update : function()
		{
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);

			//console.log(this.mapP.tileInXY(this.mapP.walkable, cube.x, cube.y));
			
		
			context.drawImage(this.c,0,0);

		    for (var i = 0; i < logs.length; i++){
		        logs[i].draw();
		    }

		    repletion.draw();
		    //ground.draw();
			//affichage et deplacement du cube
			cube.draw();
			cube.move();

			if(this.sb)
				this.sb.Render();

			

			if(this.moutons.length > 0)
			{
				for (var i = 0; i < this.moutons.length; i++) {
					this.moutons[i].Move(0,0);
					this.moutons[i].Render();
					var f = false;
					for (var j = 0; j < logs.length; j++) {
						if(this.moutons[i].Flee(logs[j]))
							f = true;
					};
					if(this.moutons[i].Flee(cube))
						f = true;

					if(!f)
					{
						if(cube.color == "red")
							this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i],this.moutons, true));
						else
						{
							//if(this.moutons[i].leader == null)
								this.moutons[i].Follow(this.ClosestSheepTo(this.moutons[i],this.moutons));
							//else 
							//	this.moutons[i].Follow(this.moutons[i].leader);
							
						}
					}
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
		ClosestSheepTo : function(target, moutonList, isWolfHidden)
		{
			var ret = null;
			var curDist = 1000000000;

			//Cherche a follow un leader ( le loup est un leader)
			//Les leader prefere les autre leader au loup
			//Si il n'y a pas de leader a proximité, instinc gregaire

			for (var i = 0; i < moutonList.length; i++) 
			{
				if(moutonList[i] != target )
				{
					if(moutonList[i].isLeader)
					{
						var d = Math.Dist(moutonList[i], target);

						if(d < curDist )
						{
							curDist = d;
							ret = moutonList[i];
						}
						
					}
					
				}
			};

			if(isWolfHidden && cube.isLeader)
			{
				var d = Math.Dist(cube, target);

				if(d < curDist )
				{
					curDist = d;
					ret = cube;
				}
			}




			if(ret == null)
			{

				for (var i = 0; i < moutonList.length; i++) {
					if(moutonList[i] != target )
					{
						if(moutonList[i].leader == null || moutonList[i].leader.ID != target.ID)
						{
							var d = Math.Dist(moutonList[i], target);

							if(d < curDist )
							{
								curDist = d;
								ret = moutonList[i];
							}
							
						}
						
					}
				};
			}



			//if(cube != target && cube.color == "red")
			//	moutonList.pop();

			return ret;
		}
	};

	return that;
})();