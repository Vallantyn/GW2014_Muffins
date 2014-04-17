﻿define(['sceneManager', 'tileCollider', 'log'], function (sceneManager, TileCollider, Log) {
    return function CharacterLOG(x, y) {
        var wolf =
        {
            ID: 0,
            x: x,
            y: y,
            yOffset: 0,
            width: 184,
            height: 92,
            speedY: 0,
            speedX: 6,
            impulsion: 8,

            anim: 0,
            situation: null,

            range: 200,
            color: "blue",
            hunger: 1,
            hungerReplenish: 0.2,
            hungerCost: 0.1,
            isLeader: true,
            isBridge : false,
            grounded: false,
            collider: null
        };

        function move() {
            wolf.grounded = false;

            for (var i = 0; i < gameScene.mapP.walkable.length; i++) {
                if (wolf.collider.CheckGround(gameScene.mapP.walkable[i])) {
                    wolf.grounded = true;
                    wolf.countjump = 0;
                    //this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height - this.height/2;
                    // Annuler la vitesse actuelle en cas de contact avec le sol
                    wolf.speedY = 0;

                    // Le cube est replacé au niveau du sol
                    wolf.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height / 2 - wolf.height / 2 + 1;
                }
            };

            if (!wolf.grounded) {
                for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                    if (wolf.collider.CheckGround(gameScene.mapP.wallground[i])) {
                        wolf.grounded = true;
                        wolf.countjump = 0;
                        //this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height - this.height/2;
                        // Annuler la vitesse actuelle en cas de contact avec le sol
                        wolf.speedY = 0;
                        // Le cube est replacé au niveau du sol
                        wolf.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height / 2 - wolf.height / 2 + 1;

                    }
                };
            }

            //déplacement du vaisseau
            if (Input.jump == true && wolf.grounded) {
                wolf.speedY = -wolf.impulsion;
                wolf.grounded = false;
            }

            wolf.speedY += wolf.grounded ? 0 : gravity;
            wolf.y += wolf.speedY;

            var x = wolf.x;
            wolf.x += (Input.rightKey - Input.leftKey) * wolf.speedX;
            for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                if (wolf.collider.CheckGround(gameScene.mapP.wall[i])) {
                    wolf.x = x;
                    break;
                }
            }
        };

        function desguise() {
            if (wolf.hunger > 0) {
                if (wolf.color != "red") {
                    wolf.color = "red";
                    wolf.speedX = 2;
                }
                else {
                    wolf.color = "blue";
                    wolf.speedX = 6;
                }

                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;

            }
            repletion.setHunger(wolf.hunger);
        }

        function boom() {

        }

        function eatSheep() {
            //Je sais, c'est horrible

            if (gameScene.moutons.length > 0) {
                var s = gameScene.ClosestSheepTo(wolf, gameScene.moutons);
                if (Math.Dist(wolf, s) < wolf.range) {
                    gameScene.KillSheep(s);
                    wolf.hunger += wolf.hungerReplenish;
                    if (wolf.hunger > 1) wolf.hunger = 1;
                }
                repletion.setHunger(wolf.hunger);
            }
        }

        function tp(x, y) {
            if (wolf.hunger > 0) {
                wolf.x = x;
                wolf.y = y;
                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;
                repletion.setHunger(wolf.hunger);
            }
        }

        function putLog() {
            if (wolf.hunger > 0) {
                //pose une buche
                logs.push(new Log(wolf.x, wolf.y));
                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;
                repletion.setHunger(wolf.hunger);
            }
        }

        function dig(x,y)
        {
            if (wolf.hunger > 0) 
            {
              //DIG
                var tm = sceneManager.currentScene.tiledMap;
                var mp = sceneManager.currentScene.mapP;

                for (var i = 0; i < tm.length; i++) 
                {
                    var t = mp.tileInXY(tm[i], x,y);
                    if(t)
                    {
                        console.log(t);
                        t.img = null;
                        console.log(mp.walkable.length)
                        mp.walkable.splice(mp.walkable.indexOf(t),1);
                        sceneManager.currentScene.resetBuffer();
                        break;
                    } 
                };

                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;
            }

            repletion.setHunger(wolf.hunger);
        }

        function bridge(x, y)
        {
            if (wolf.hunger > 0) 
            {
                wolf.isBridge = true;
                //DIG
                var tm = sceneManager.currentScene.tiledMap;
                var mp = sceneManager.currentScene.mapP;

                for (var i = 0; i < tm.length; i++) 
                {
                    var t = mp.tileInXY(tm[i], x,y);
                    if(t)
                    {
                        console.log(t);
                        t.img = null;
                        console.log(mp.walkable.length)
                        mp.walkable.splice(mp.walkable.indexOf(t),1);
                        sceneManager.currentScene.resetBuffer();
                        break;
                    } 
                };

                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;
            }

            repletion.setHunger(wolf.hunger);
        }

        function init() {
            wolf.collider = new TileCollider(wolf);
        };

        function update(dt) {

        };

        return {
            get character() { return wolf; },
            Init: init,
            Update: update
        };
    }
});