define(['sceneManager', 'tileCollider'], function (sceneManager, TileCollider)
{
    return function Sheep(x, y, id) {

        var gameScene = sceneManager.currentScene;
        
        var sheep =
        {
            ID: id,
            x: x,
            y: y,

            grounded: false,
            collider: null,
            distOfView: 150 + Math.random() * 50,
            right: Math.random() > .5 ? true : false,

            //x: 0,
            //y: 0,
            height: 92,
            width: 92,
            //distOfView: 300,
            distMini: 93,
            speed: 2,
            speedY: 0,
            color: "red",
            isDead: false,
            leader: null,
            ID: 0,
            isLeader: false,
            isDead: false,

            Move: function (x, y) 
            {
                sheep.x += x;

                sheep.y += y;
                var tx = sheep.x;
                sheep.x += x;
                for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                    if (sheep.collider.CheckGround(gameScene.mapP.wall[i])) {
                        sheep.x = tx;
                        break;
                    }
                }
            },

            Follow: function (obj)
            {
                if (obj) {
                    sheep.leader = obj;
                    var d = Math.Dist(obj, sheep)

                    if (d < sheep.distOfView && d >= sheep.distMini) {
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

                if (d < sheep.distOfView && obj.color != "red") {
                    if (obj.x >= sheep.x)
                        sheep.Move(-1 * sheep.speed, 0);
                    else
                        sheep.Move(1 * sheep.speed, 0);
                    sheep.leader = null;
                    return true;
                }
                else return false;
            },

            Render: function () 
            {
                //TEMP

                if (sheep.isLeader && !sheep.isDead)
                    context.fillStyle = "#F99";
                else
                    context.fillStyle = sheep.color;

                context.fillRect(sheep.x - sheep.width / 2, sheep.y - sheep.height / 2, sheep.width, sheep.height);
                context.strokeStyle = "#FFF";
                context.strokeRect(sheep.x - sheep.width / 2, sheep.y - sheep.height / 2, sheep.width, sheep.height);

                //FUCK IT
                sheep.CheckGravity();
            },

            CheckGravity: function () 
            {
                this.grounded = false;

                for (var i = 0; i < gameScene.mapP.walkable.length; i++) {
                    if (sheep.collider.CheckGround(gameScene.mapP.walkable[i])) {
                        sheep.grounded = true;
                        sheep.speedY = 0;
                        sheep.y = gameScene.mapP.walkable[i].y - gameScene.mapP.walkable[i].height / 2 - sheep.height / 2 + 1;
                    }
                };

                if (!sheep.grounded) {
                    for (var i = 0; i < gameScene.mapP.wallground.length; i++) {
                        if (sheep.collider.CheckGround(gameScene.mapP.wallground[i])) {
                            sheep.grounded = true;
                            sheep.speedY = 0;
                            sheep.y = gameScene.mapP.wallground[i].y - gameScene.mapP.wallground[i].height / 2 - sheep.height / 2 + 1;
                        }
                    };
                }

                sheep.speedY += sheep.grounded ? 0 : .8; //gravity;
                sheep.y += sheep.speedY;
            },

            Die: function () {
                sheep.isDead = true;
                sheep.color = "#777";
            },
        };

        function init()
        {
            sheep.collider = new TileCollider(sheep);
        };

        function update(dt)
        {
            sheep.Move(0, 0);
            sheep.CheckGravity();
        };

        return {
            get sheep()
            {
                return sheep;
            },

            Init: init,
            Update: update,
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

    Math.Dist = function (obj1, obj2) {
        var a = { x: (obj1.x > 0) ? obj1.x : 0, y: (obj1.y > 0) ? obj1.y : 0 };
        var b = { x: (obj2.x > 0) ? obj2.x : 0, y: (obj2.y > 0) ? obj2.y : 0 };

        return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y));
    }
});