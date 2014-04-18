
﻿define(['sceneManager', 'tileCollider', 'log', 'eventManager'], function (sceneManager, TileCollider, Log, eventManager)
{
    return function CharacterLOG(x, y)
    {

        var gameScene = sceneManager.currentScene;

        var states = 
        {
            STAND: 'stand',
            WALK: 'walk',
            JUMP: 'jump',
            ATTACK: 'attack',
            DIG: 'dig',
            BRIDGE: 'bridge'
        };

        var wolf =
        {
            ID: 0,
            x: x,
            y: y,
            yOffset: -gameScene.groundOffset,

            right: true,
            state: states.STAND,

            width: 192,
            height: 192,

            speedY: 0,
            speedX: 6,

            dir: 0,
            jump: false,
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

        eventManager.Add('LEFT_DOWN', moveLeft);
        eventManager.Add('LEFT_UP', moveRight);

        eventManager.Add('RIGHT_DOWN', moveRight);
        eventManager.Add('RIGHT_UP', moveLeft);

        eventManager.Add('JUMP_UP', moveJump);

        eventManager.Add('SKILL_1_UP', eatSheep);
        eventManager.Add('SKILL_2_UP', dig);
        eventManager.Add('SKILL_3_UP', desguise);
        eventManager.Add('SKILL_4_UP', putLog);
        eventManager.Add('SKILL_5_UP', prepareTP);
        eventManager.Add('SKILL_6_UP', bridge);

        eventManager.Add('WALK_END', endWalk);


        function moveLeft()
        {
            wolf.state = states.WALK;
            wolf.dir -= 1;
            if (wolf.dir == 0) wolf.state = states.STAND;
        }

        function moveRight()
        {
            wolf.state = states.WALK;
            wolf.dir += 1;
            if (wolf.dir == 0) wolf.state = states.STAND;
        }

        function endWalk()
        {
            if (wolf.dir == 0) wolf.state = states.STAND;
        }

        function moveJump()
        {
            wolf.state = states.JUMP;
            wolf.jump = true;
        }

        function move() {

            if (wolf.dir > 0)
            {
                wolf.right = false;
            }
            else if (wolf.dir < 0)
            {
                wolf.right = true;
            }

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


            if (wolf.jump == true && wolf.grounded) {
                wolf.y-= 25;
                wolf.speedY = -wolf.impulsion;
                wolf.grounded = wolf.jump = false;
            }

            wolf.speedY += wolf.grounded ? 0 : gameScene.gravity;
            wolf.y += wolf.speedY;

            var x = wolf.x;
            gameScene.moveMap(-wolf.dir * wolf.speedX, 0);

            // wolf.x += /*(Input.rightKey - Input.leftKey)*/ wolf.dir * wolf.speedX;
            for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                if (wolf.collider.CheckGround(gameScene.mapP.wall[i])) {
                    gameScene.moveMap(wolf.dir * wolf.speedX, 0);

                    break;
                }
            }

            gameScene.resetBuffer();

        };

        function desguise() {
             console.log("2 : Desguise ")


            if (wolf.hunger > 0) {
                if (wolf.color != "red") {
                    wolf.color = "red";
                    wolf.speedX = 2;
                    wolf.hunger -= wolf.hungerCost;
                    if (wolf.hunger < 0) wolf.hunger = 0;
                }
                else {
                    wolf.color = "blue";
                    wolf.speedX = 6;
                }


            }
            gameScene.ui.setHunger(wolf.hunger);
        }

        function boom() {

        }

        function eatSheep() {
            //Je sais, c'est horrible

            console.log("Eat Sheep ")
            if (gameScene.sheeps.length > 0) {
                var s = gameScene.ClosestSheepTo(wolf, false);
                if (Math.Dist(wolf, s) < wolf.range) {
                    //gameScene.killSheep(s);

                    eventManager.Fire('EAT_SHEEP', s);

                    wolf.hunger += wolf.hungerReplenish;
                    if (wolf.hunger > 1) wolf.hunger = 1;
                }
                gameScene.ui.setHunger(wolf.hunger);
            }
        }

        function prepareTP()
        {
            
            console.log("Teleport, now click ")
            if (wolf.hunger > 0) 
            {
                eventManager.Add('LMB_DOWN', tp);

                wolf.hunger -= wolf.hungerCost;

                if (wolf.hunger < 0) wolf.hunger = 0;

               gameScene.ui.setHunger(wolf.hunger);

            }

        }

        function tp(obj) {

            eventManager.Remove('LMB_DOWN');

            var x = obj.x;
            var y = obj.y;

            if(!obj.x) x = 600;
            if(!obj.y) y = 100;

            var dx = x - wolf.x ;

            gameScene.moveMap(-dx , 0);
        
            wolf.y = y;


            
        }

        function putLog() {
            console.log("Put Log ")

            if (wolf.hunger > 0) {
                //pose une buche
                var log = new Log(wolf.x, wolf.y);
                gameScene.logs.push(log);
                gameScene.AddChild(log);

                if (gameScene.logs.length > 2)
                {
                    gameScene.logs[0].forceRemove();
                }

                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;

                gameScene.ui.setHunger(wolf.hunger);
            }
        }


        function dig()
        {
            console.log(" Dig ")

            if (wolf.hunger > 0) 
            {
              //DIG
                var tm = sceneManager.currentScene.tiledMap;
                var mp = sceneManager.currentScene.mapP;

                for (var i = 0; i < tm.length; i++) 
                {
                    var t = mp.tileInXY(tm[i], wolf.x+ wolf.width/2,wolf.y + wolf.height);
                    if(t)
                    {
                        t.img = null;
                        var ind = mp.walkable.indexOf(t);
                        if(ind == -1)
                        {
                            ind = mp.wallground.indexOf(t);
                            mp.wallground.splice(ind,1);

                        }
                        else
                            mp.walkable.splice(ind,1);

                        sceneManager.currentScene.resetBuffer();
                        break;
                    } 
                };

                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;

            }

            gameScene.ui.setHunger(wolf.hunger);
        }


        function bridge(x, y)
        {
            console.log(" Bridge ")

            if (wolf.hunger > 0) 
            {
                wolf.isBridge = true;
               

                wolf.hunger -= wolf.hungerCost;
                if (wolf.hunger < 0) wolf.hunger = 0;
            }

            gameScene.ui.setHunger(wolf.hunger);
        }

        function init() {
            wolf.collider = new TileCollider(wolf);
        };


        function update(dt) {
            move();
        };

        return {
            get character() { return wolf; },
            Init: init,
            Update: update
        };
    }
});