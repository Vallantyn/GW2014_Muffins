define(['sceneManager', 'tileCollider', 'eventManager'], function (sceneManager, TileCollider, eventManager)
{
    Math.Dist = function (obj1, obj2) {
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
            EMPALED:    'empaled'
        };

        var flags =
        {
            grounded: 0x1,
            moving: 0x2,
            follow: 0x4,
            flee: 0x10,
        };

        function needToFlee(obj)
        {
            if (sheep.state & states.flee) return false;

            var d = Math.Dist(obj, sheep);
            return (d < sheep.distOfView && obj.color != "red");
        }

        function needToFollow()
        {
            var target = gameScene.ClosestSheepTo(sheep);
            if (target && target != gameScene.wolf)
            {
                if (target.state == states.MOVING || target.state == states.RUNNING)
                {
                    sheep.leader = target;
                }
            }
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

            eventManager.Add('RUN_END', endFlee);
        };
        function endFlee()
        {
            eventManager.Remove('RUN_END', endFlee);


            //console.log((sheep.maxFleeDist - sheep.fleeDist));

            var dice = Math.random();
            if (dice >= ((sheep.maxFleeDist - sheep.fleeDist)/sheep.maxFleeDist)*sheep.stopFleeChances)
            {
                //console.debug('stap fleein');

                sheep.flag &= ~flags.flee;
                sheep.state = states.IDLE;

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

        var sheep =
        {
            ID: id,
            x: x,
            y: y,
            yOffset: -gameScene.groundOffset,

            grounded: false,
            collider: null,
            distOfView: 150 + Math.random() * 50,
            right: Math.random() > .5 ? true : false,

            state: states.IDLE,
            flag: 0,

            maxFleeDist: 92*4,
            fleeDist: 0,
            stopFleeChances: .67,

            height: 92,
            width: 92,
            //distOfView: 300,
            distMini: 93,
            speed: 2,
            fleeSpeed: 100,
            speedY: 0,
            color: "red",
            isDead: false,
            leader: null,

            isLeader: false,

            Move: function (x, y) 
            {
                sheep.right = x < 0;

                sheep.x += x;

                sheep.y += y;
                var tx = sheep.x;
                sheep.x += x;
                for (var i = 0; i < gameScene.mapP.wallground.length; i++)
                {
                    if (sheep.collider.CheckGround(gameScene.mapP.wall[i]))
                    {
                        if(sheep.x > gameScene.mapP.wall[i].x)
                            sheep.x = gameScene.mapP.wall[i].x + gameScene.mapP.wall[i].width/2 ; 
                        else
                            sheep.x = gameScene.mapP.wall[i].x - gameScene.mapP.wall[i].width/2 ; 

                        break;
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
        };

        function update(dt)
        {
            var f = false;
            var wolf = gameScene.wolf.log;

            sheep.CheckGravity();

            if (sheep.state == states.IDLE || sheep.state == states.EAT)
            {
                if (needToFlee(wolf)) // Wolf is there, run for your life dood
                {
                    wolfSpotted();
                }
                else if (needToFollow())
                {
                    startFollow();
                }
                else
                {

                }
            }

            if (sheep.flag & flags.flee && sheep.state == states.RUNNING)
            {

                var dir = wolf.x < sheep.x ? 1 : -1;
                var dist = dir * sheep.fleeSpeed * dt;
                sheep.fleeDist += Math.abs(dist);

                sheep.Move(dist, 0);
            }
            else if (sheep.flag & flags.follow && sheep.state == states.MOVING)
            {

            }

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