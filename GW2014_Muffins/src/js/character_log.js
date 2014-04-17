define(['sceneManager', 'tileCollider'], function (sceneManager, TileCollider) {
    return function CharacterLOG() 
    {
﻿define(['sceneManager', 'tileCollider', 'log', 'eventManager'], function (sceneManager, TileCollider, Log, eventManager)
{
    return function CharacterLOG(x, y)
    {
        var gameScene = sceneManager.currentScene;

        var wolf =
        {
            ID: 0,
            x: x,
            y: y,
            yOffset: -gameScene.groundOffset,

            width: 92,
            height: 92,

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
            grounded: false,
            collider: null
        };

        function move()
        {
        eventManager.Add('LEFT_DOWN', moveLeft);
        eventManager.Add('LEFT_UP', moveRight);

        eventManager.Add('RIGHT_DOWN', moveRight);
        eventManager.Add('RIGHT_UP', moveLeft);

        eventManager.Add('JUMP_UP', moveJump);

        function moveLeft()
        {
            wolf.dir -= 1;
        }

        function moveRight()
        {
            wolf.dir += 1;
        }

        function moveJump()
        {
            wolf.jump = true;
        }

        function move() {
            wolf.grounded = false;

            for (var i = 0; i < gameScene.mapP.walkable.length; i++) 
            {
                if(wolf.collider.CheckGround(gameScene.mapP.walkable[i]))
                {
                    wolf.grounded = true;
                    wolf.countjump = 0;
                    //this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height - this.height/2;
                    // Annuler la vitesse actuelle en cas de contact avec le sol
                    wolf.speedY = 0;

                    // Le cube est replacé au niveau du sol
                    wolf.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height/2 - wolf.height/2 +1;
                }
            };

            if(!wolf.grounded)
            {
                for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                    if(wolf.collider.CheckGround(gameScene.mapP.wallground[i]))
                    {
                        wolf.grounded = true;
                        wolf.countjump = 0;
                        //this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height - this.height/2;
                        // Annuler la vitesse actuelle en cas de contact avec le sol
                        wolf.speedY = 0;
                        // Le cube est replacé au niveau du sol
                        wolf.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height/2 - wolf.height/2 +1;

                        wolf.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height / 2 - wolf.height / 2 + 1;
                    }
                };
            }

            //déplacement du vaisseau
            if(Input.jump == true && wolf.grounded)
            {
            if (wolf.jump == true && wolf.grounded) {
                wolf.speedY = -wolf.impulsion;
                wolf.grounded = wolf.jump = false;
            }

            wolf.speedY += wolf.grounded ? 0 : .8;//gravity;
            wolf.y += wolf.speedY;
        
            var x = wolf.x;
            wolf.x += (Input.rightKey - Input.leftKey) * wolf.speedX;
            for (var i = 0; i < gameScene.mapP.wallground.length; i++) 
            {
                if(wolf.collider.CheckGround(gameScene.mapP.wall[i]))
                {
            wolf.x += /*(Input.rightKey - Input.leftKey)*/ wolf.dir * wolf.speedX;
            for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                if (wolf.collider.CheckGround(gameScene.mapP.wall[i])) {
                    wolf.x = x;
                    break;
                }
            }        
        };

        function desguise()
        {
            if(wolf.hunger > 0)
            {
                if(wolf.color != "red") 
                {
                    wolf.color = "red";
                    wolf.speedX = 2;
                }
                else 
                {
                    wolf.color = "blue";
                    wolf.speedX = 6;
                }

                wolf.hunger -= wolf.hungerCost;
                if(wolf.hunger < 0) wolf.hunger = 0;

            }
            repletion.setHunger(wolf.hunger);
        }

        function boom ()
        {

        }

        function eatSheep()
        {
            //Je sais, c'est horrible

            if(gameScene.moutons.length > 0)
            {
                var s = gameScene.ClosestSheepTo(wolf, gameScene.moutons);
                if(Math.Dist(wolf, s) < wolf.range)
                {
                    gameScene.KillSheep(s);
                    wolf.hunger += wolf.hungerReplenish;
                    if(wolf.hunger > 1) wolf.hunger = 1;
                }
                repletion.setHunger(wolf.hunger);
            }
        }

        function tp(x, y)
        {
            if(wolf.hunger > 0)
            {
                wolf.x = x;
                wolf.y = y;
                wolf.hunger -= wolf.hungerCost;
                if(wolf.hunger < 0) wolf.hunger = 0;
                repletion.setHunger(wolf.hunger);
            
            }

        }

        function putLog()
        {
            if(wolf.hunger > 0)
            {
                //pose une buche
                logs.push (new Log(wolf.x,wolf.y));
                wolf.hunger -= wolf.hungerCost;
                if(wolf.hunger < 0) wolf.hunger = 0;
                repletion.setHunger(wolf.hunger);
            }
        }
    }

    function init()
    {
        wolf.collider = new TileCollider(wolf);
    };

    function update(dt)
    {

    };
        function update(dt) {
            move();
        };

    return {
        Init: init,
        Update: update
    };
});