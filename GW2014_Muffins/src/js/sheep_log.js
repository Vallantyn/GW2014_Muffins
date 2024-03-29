﻿define(['sceneManager', 'tileCollider', 'eventManager', "Log"], function (sceneManager, TileCollider, eventManager, Log)
{
    Math.Dist = function (obj1, obj2) {
        if (obj1 == null || obj2 == null) {
            return Infinity;
        }
        var a = { x: (obj1.x > 0) ? obj1.x : 0, y: (obj1.y > 0) ? obj1.y : 0 };
        var b = { x: (obj2.x > 0) ? obj2.x : 0, y: (obj2.y > 0) ? obj2.y : 0 };

        return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
    }

    return function Sheep(x, y, id)
    {
        var gameScene = sceneManager.currentScene;

        var states =
        {
            IDLE:       'idle',
            MOVING:     'moving',
            RUNNING:    'running',
            EATING:     'eating',
            ROLLING:    'eating',
            SURPRISE: 'surprise',

            SLASHED:    'slashed',
            EXPLOSED:   'explosed',
            EMPALED: 'empaled',

            DEAD:    'dead'
        };

        var flags =
        {
            grounded: 0x1,
            moving: 0x2,
            follow: 0x4,
            flee: 0x8,
        };
        
        var moveJump = false;

        function needToFlee(obj)
        {
            if (sheep.state & states.flee) return false;

            var d = Math.Dist(obj, sheep);
            return (d < sheep.distOfView && obj.color != "red");
        }

        function needToFollow()
        {
            var b = gameScene.wolf.log.color == "red";
            var target = gameScene.ClosestSheepTo(sheep,b);
            if (target)
            {
                
                if(sheep.leader)
                    if(!gameScene.GetSheep(sheep.leader))
                        sheep.leader = null;



                if (!sheep.leader || b) {
                    var d = Math.Dist(target, sheep)

                    if (d < sheep.distOfView && d >= sheep.distMini)
                    {
                        sheep.leader = target.ID;
                        return true;
                    }
                }
                else if(gameScene.GetSheep(sheep.leader).log.isWandering && Math.Dist(gameScene.GetSheep(sheep.leader), sheep) >= sheep.distMini)
                {
                    return true;
                } 
                else if(Math.Dist(gameScene.GetSheep(sheep.leader), sheep) >= sheep.distMini ) return false;
                else return true;
                    
                
                    
                
            }
            return false;
        }

        function startMove()
        {
            sheep.flag |= flags.moving;
            sheep.state = states.MOVING;

            eventManager.Add('MOVE_END', endMove);
        };
        function endMove()
        {
            sheep.flag &= ~flags.moving;
            sheep.state = states.IDLE;

            eventManager.Remove('MOVE_END', endMove);
        };

        function wolfSpotted()
        {
            sheep.flag |= flags.flee;
            sheep.state = states.SURPRISE;

            eventManager.Add('SURPRISE_END', startFlee);
        }

        function startFlee()
        {
            eventManager.Remove('SURPRISE_END', startFlee);

            sheep.state = states.RUNNING;
            sheep.leader = null;

            eventManager.Add('RUN_END', endFlee);
        };
        function endFlee()
        {
            eventManager.Remove('RUN_END', endFlee);

            var dice = Math.random();
            if (dice >= ((sheep.maxFleeDist - sheep.fleeDist)/sheep.maxFleeDist)*sheep.stopFleeChances)
            {
                sheep.flag &= ~flags.flee;
                sheep.state = states.IDLE;
                sheep.fleeTarget = null;
                sheep.fleeDist = 0;
            }
            else
            {
                startFlee();
            }
        };

        function startFollow()
        {
            sheep.flag |= flags.follow;
            sheep.state = states.MOVING;

            eventManager.Add('MOVE_END', endFollow);
        };
        function endFollow()
        {
            sheep.flag &= ~flags.follow;
            sheep.state = states.IDLE;

            eventManager.Remove('MOVE_END', endFollow);
        };

        function startMoveJump() {
            moveJump = true;
        };
        function endMoveJump() {
            moveJump = false;
        };

        function sheepKilled(s)
        {
            if (s == sheep)
            {
                sheep.isDying = true;
                eventManager.Remove('EAT_SHEEP', sheepKilled);

                sheep.state = states.SLASHED;
                eventManager.Add('DEAD_N_COLD', sheepDead);
            }
        }

        function sheepDead()
        {
            eventManager.Remove('DEAD_N_COLD', sheepDead);

            eventManager.Remove('END_RUN', function () { sheep.state = states.IDLE; });
            eventManager.Remove('MOVE_JUMP_START', startMoveJump);
            eventManager.Remove('MOVE_JUMP_END', endMoveJump);
            sheep.state = states.DEAD;

            gameScene.killSheep(sheep);
        }

        var sheep =
        {
            ID: id,
            x: x,
            y: y,
            yOffset: -gameScene.groundOffset,

            grounded: false,
            collider: null,
            distOfView: 192 + Math.random() * 50,
            right: Math.random() > .5 ? true : false,

            state: states.IDLE,
            flag: 0,

            maxFleeDist: 92*4,
            fleeDist: 0,
            stopFleeChances: .67,

            height: 92,
            width: 92,
            //distOfView: 300,
            distMini: 50,
            speed: 50,
            fleeSpeed: 100,
            speedY: 0,
            color: "red",
            isDying: false,
            isDead: false,
            leader: null,
            isSaved : false,
            isWandering : false,
            isLeader: false,
            fleeTarget : null,

            Move: function (x, y) 
            {
                sheep.right = x < 0;

                sheep.x += x;

                sheep.y += y;
                var tx = sheep.x;
                sheep.x += x;
                for (var i = 0; i < gameScene.mapP.wall.length; i++)
                {
                    if (sheep.collider.CheckGround(gameScene.mapP.wall[i]))
                    {
                        if(sheep.x > gameScene.mapP.wall[i].x + gameScene.mapP.wall[i].width/2)
                            sheep.x = gameScene.mapP.wall[i].x + gameScene.mapP.wall[i].width  ; 
                        else
                            sheep.x = gameScene.mapP.wall[i].x - sheep.width - gameScene.mapP.wall[i].width/2  ; 
                        
                        break;
                    }
                }

                for (var i = 0; i < gameScene.mapP.killing.length; i++)
                {
                    if (sheep.collider.CheckGround(gameScene.mapP.killing[i]))
                    {
                        sheep.x = gameScene.mapP.killing[i].x - gameScene.mapP.killing[i].width/2;
                        sheep.y = gameScene.mapP.killing[i].y - gameScene.mapP.killing[i].height/2;
                        sheepKilled(sheep);
                        var a = gameScene.mapP.killing.splice(i, 1);
                        gameScene.mapP.walkable.push(a[0]);
                        break;
                    }
                }
                if(!sheep.isSaved)
                {
                    for (var i = 0; i < gameScene.mapP.winning.length; i++)
                    {
                        if (sheep.collider.CheckGround(gameScene.mapP.winning[i]))
                        {
                            sheep.isSaved = true;
                            gameScene.RemoveChild(sheep.parent);
                            gameScene.sheepsSaved.push(gameScene.sheeps.splice(gameScene.sheeps.indexOf(sheep), 1));
                            
                            if(gameScene.sheepsSaved.length >= gameScene.sheepsNeeded)
                                alert("Level Win");
                            
                            break;
                        }
                    }

                }


            },

            Follow: function (obj)
            {
                if (obj) {
                    sheep.leader = obj;
                    var d = Math.Dist(obj, sheep)

                    if (d < sheep.distOfView && d >= sheep.distMini)
                    {
                        sheep.flag |= flags.follow;

                        if (obj.x > sheep.x)
                            sheep.Move(1 * sheep.speed, 0);
                        else
                            sheep.Move(-1 * sheep.speed, 0);
                        return true;
                    } else return false;
                }
                return false;
            },

            Flee: function (obj) 
            {
                if(sheep.isLeader)
                    sheep.isWandering = false;

                var d = Math.Dist(obj, sheep);

                if (d < sheep.distOfView && obj.color != "red")
                {
                    sheep.flag |= flags.flee;

                    if (obj.x >= sheep.x)
                        sheep.Move(-1 * sheep.speed, 0);
                    else
                        sheep.Move(1 * sheep.speed, 0);

                    sheep.state = states.RUNNING;
                    sheep.leader = null;
                    return true;
                }   
                else return false;
            },

            StartWander : function(right)
            {
                sheep.right = right;
                sheep.isWandering = true;
                //sheep.Move((right ? 1 : -1) * sheep.speed, 0);
            },

            Wander : function(dt)
            {
                if(Math.random() > 0.99)
                    sheep.isWandering = false;

                sheep.Move((sheep.right ? -1 : 1) * sheep.speed * dt , 0);
            },

            CheckGravity: function () 
            {
                sheep.grounded = false;

                for (var i = 0; i < gameScene.mapP.walkable.length; i++)
                {
                    if (sheep.collider.CheckGround(gameScene.mapP.walkable[i]))
                    {
                        sheep.flag |= flags.grounded;

                        sheep.grounded = true;
                        sheep.speedY = 0;
                        sheep.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height / 2 - sheep.height / 2 + 1;
                    }
                    else sheep.flag &= ~flags.grounded;
                };

                if (!sheep.grounded)
                {
                    for (var i = 0; i < gameScene.mapP.wallground.length; i++)
                    {
                        if (sheep.collider.CheckGround(gameScene.mapP.wallground[i]))
                        {
                            sheep.flag |= flags.grounded;

                            sheep.grounded = true;
                            sheep.speedY = 0;
                            sheep.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height / 2 - sheep.height / 2 + 1;
                        }
                        else sheep.flag &= ~flags.grounded;
                    };
                }


                sheep.speedY += (sheep.flag & flags.grounded) ? 0 : gameScene.gravity;
                sheep.y += sheep.speedY;
            },

            Die: function () {
                sheep.isDead = true;
                sheep.color = "#777";
            }
        };

        function init()
        {
            sheep.collider = new TileCollider(sheep);
            eventManager.Add('END_RUN', function () { sheep.state = states.IDLE; });
            eventManager.Add('MOVE_JUMP_START', startMoveJump);
            eventManager.Add('MOVE_JUMP_END', endMoveJump);
            eventManager.Add('EAT_SHEEP', sheepKilled);
        };

        function update(dt)
        {
            if (sheep.isDying)
            {
                if (sheep.isDead)
                {
                    sheep.state = states.DEAD;
                }
                else
                {
                    sheep.state = states.SLASHED;
                }

                return;
            }

            
            var wolf = gameScene.wolf.log;

            sheep.CheckGravity();

            if (sheep.state == states.IDLE || sheep.state == states.EAT) {
                for (var i = 0; i < gameScene.logs.length; i++) {
                    

                    if (needToFlee(gameScene.logs[i])) // Wolf is there, run for your life dood
                    {
                        sheep.fleeTarget = gameScene.logs[i];
                        wolfSpotted();
                        break;
                    }
                };

                if (needToFlee(wolf)) // Wolf is there, run for your life dood
                {
                    if(!sheep.fleeTarget)
                    {
                        sheep.fleeTarget = wolf;
                        wolfSpotted();
                        
                    }
                }
                else if (needToFollow() && !sheep.isLeader) {
                    startFollow();
                }
                else {

                    if(sheep.isLeader && !sheep.isWandering)
                        Math.random() > 0.99 ? sheep.StartWander(Math.random() > 0.5 ? true : false) : false;

                    if(sheep.isWandering)
                        sheep.Wander(dt);
                }
            }

            //if (sheep.state == states.MOVING && moveJump) {
              //  sheep.y -= 24;
            //}
            var dir;
            if(sheep.fleeTarget)
            {
                //console.log(sheep.fleeTarget)
                dir = sheep.fleeTarget.x < sheep.x ? 1 : -1;
            }
            else
                dir = wolf.x < sheep.x ? 1 : -1;


             
            if (sheep.flag & flags.flee && sheep.state == states.RUNNING) {

                var dist = dir * sheep.fleeSpeed * dt;
                sheep.fleeDist += Math.abs(dist);
                console.log(dist > 0)
                sheep.Move(dist, 0);
            }
            else if (sheep.flag & flags.follow) {
                var target = gameScene.GetSheep(sheep.leader);
                if (target) {
                    var dir = target.log.x > sheep.x ? 1 : -1;
                    var dist = dir * sheep.speed * dt;

                    sheep.Move(dist, 0);
                }
            }

            if(sheep.y > gameScene.zdeath)
                sheepKilled(sheep);



            /*
            check if wolf
                1 -> flee
            check if movin sheep
                1 -> follow
            idle
            */

            /*
    
            if (sheep.Flee(wolf))
            {
                sheep.flag |= flags.flee;
            }
    
            if (!f)
            {
                sheep.state = states.MOVING;
    
                if (gameScene.wolf.log.color == "red")
                    sheep.Follow(gameScene.ClosestSheepTo(sheep, true));
                else
                {
                    if(sheep.leader == null)
                        sheep.Follow(gameScene.ClosestSheepTo(sheep));
                    else 
                        sheep.Follow(sheep.leader);
                }
            }
    
            */
        };

        return {
            get sheep()
            {
                return sheep;
            },

            Init: init,
            Update: update
        };
    };

    //function Mouton(x, y, ID) {
    //    this.ID = ID;
    //    this.x = x;
    //    this.y = y;


    //    this.grounded = false;
    //    this.collider = new TileCollider(this);
    //    this.distOfView = 150 + Math.random() * 50;

    //}

    //Mouton.prototype =
    //{
    //    x: 0,
    //    y: 0,
    //    height: 92,
    //    width: 92,
    //    distOfView: 300,
    //    distMini: 93,
    //    speed: 2,
    //    speedY: 0,
    //    color: "red",
    //    isDead: false,
    //    leader: null,
    //    ID: 0,
    //    isLeader: false,
    //    isDead: false,
    //    Move: function (x, y) {
    //        this.x += x;

    //        this.y += y;
    //        var tx = this.x;
    //        this.x += x;
    //        for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
    //            if (this.collider.CheckGround(gameScene.mapP.wall[i])) {
    //                this.x = tx;
    //                break;
    //            }
    //        }

    //    },
    //    Follow: function (obj) {
    //        if (obj) {
    //            this.leader = obj;
    //            var d = Math.Dist(obj, this)

    //            if (d < this.distOfView && d >= this.distMini) {

    //                if (obj.x > this.x)
    //                    this.Move(1 * this.speed, 0);
    //                else
    //                    this.Move(-1 * this.speed, 0);
    //                return true;

    //            } else return false;

    //        }

    //        return false;

    //    },
    //    Flee: function (obj) {
    //        var d = Math.Dist(obj, this);

    //        if (d < this.distOfView && obj.color != "red") {
    //            if (obj.x >= this.x)
    //                this.Move(-1 * this.speed, 0);
    //            else
    //                this.Move(1 * this.speed, 0);
    //            this.leader = null;
    //            return true;
    //        }
    //        else return false;

    //    },
    //    Render: function () {
    //        //TEMP

    //        if (this.isLeader && !this.isDead)
    //            context.fillStyle = "#F99";
    //        else
    //            context.fillStyle = this.color;

    //        context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    //        context.strokeStyle = "#FFF";
    //        context.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

    //        //FUCK IT
    //        this.CheckGravity();

    //    },
    //    CheckGravity: function () {
    //        this.grounded = false;

    //        for (var i = 0; i < gameScene.mapP.walkable.length; i++) {
    //            if (this.collider.CheckGround(gameScene.mapP.walkable[i])) {
    //                this.grounded = true;
    //                this.speedY = 0;
    //                this.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height / 2 - this.height / 2 + 1;

    //            }
    //        };

    //        if (!this.grounded) {
    //            for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
    //                if (this.collider.CheckGround(gameScene.mapP.wallground[i])) {
    //                    this.grounded = true;
    //                    this.speedY = 0;
    //                    this.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height / 2 - this.height / 2 + 1;

    //                }
    //            };
    //        }


    //        this.speedY += this.grounded ? 0 : gravity;
    //        this.y += this.speedY;
    //    },
    //    Die: function () {
    //        this.isDead = true;
    //        this.color = "#777";

    //    },


    //}
});