define(['scene', 'mapParser', 'buffer', 'character', 'sheep'],function (scene, mapParser, buffer, character, sheep)
{
    return function GameScene(map, initCb)
    {
        var _inited = false;
        var base = new scene(initCb);

        var wolf;// = new character();
        var sheeps = [];
        var logs = [];
        var kebabs = [];

        var groundOffset = 18;
        var gravity = .8;

        var mapP = new mapParser;
        var mapImg;
        var tiledMap;

        function ClosestSheepTo(target, isWolfHidden)
        {
            var ret = null;
            var curDist = 92 * 3;

            //Cherche a follow un leader ( le loup est un leader)
            //Les leader prefere les autre leader au loup
            //Si il n'y a pas de leader a proximité, instinc gregaire

            for (var i = 0; i < sheeps.length; i++) 
            {
                var sheep = sheeps[i].log;

                if (sheep != target)
                {
                    if (sheep.isLeader)
                    {
                        var d = Math.Dist(sheep, target);

                        if(d < curDist )
                        {
                            curDist = d;
                            ret = sheep;
                        }
						
                    }
					
                }
            };

            if(isWolfHidden &&  wolf != target && wolf.log.isLeader)
            {
                var d = Math.Dist(wolf.log, target);

                if(d < curDist )
                {
                    curDist = d;
                    ret = wolf.log;
                }
            }
            
            if(ret == null)
            {
                for (var i = 0; i < sheeps.length; i++)
                {
                    var sheep = sheeps[i].log;

                    if(sheep != target )
                    {
                        if(sheep.leader == null || sheep.leader.ID != target.ID)
                        {
                            var d = Math.Dist(sheep, target);

                            if(d < curDist )
                            {
                                curDist = d;
                                ret = sheep;
                            }
                        }
                    }
                };
            }

            //if(cube != target && cube.color == "red")
            //  moutonList.pop();


            return ret;
        }

        function getSheep(id)
        {
            if (id == null) return null;

            for (var i = 0; i < sheeps.length; i++) {
                if (sheeps[i].ID == id) return sheeps[i];
            }
        }

        function init()
        {
            tiledMap = mapP.parse(map);

            resetBuffer();

            wolf = new character(1280/2 - 184/2, 10);
            base.AddChild(wolf);

            base.AddChild({
            Render: function (cx)
            {
                //cx.save();
               // cx.translate(150,0);
                cx.drawImage(mapImg.canvas, 0, 0);
                //cx.restore();
            }});

            for (var i = 0; i < 7; i++)
            {
                var dx = 300 - Math.random() * 600;

                var s = new sheep(600 + dx , 250, i+1);
                sheeps.push(s);
                base.AddChild(s);
            }


            _inited = true;
        }

        function moveMap(x,y)
        {
            for (var i = 0; i < tiledMap.length; i++) {
                for (var j = 0; j < tiledMap[i].length; j++) {
                    tiledMap[i][j].move(x,y);
                };
            };

            for (var i = 0; i < sheeps.length; i++) {
                sheeps[i].log.x += x;
                sheeps[i].log.y += y;
            };
        }

        function resetBuffer()
        {
            mapImg = new buffer(1280, 720);
            for (var i = 0; i < tiledMap.length; i++)
                for (var j = 0; j < tiledMap[i].length; j++)
                    tiledMap[i][j].draw(mapImg.context);

        }


        function update(dt) {
            if (!_inited) init();
            base.Update(dt);

            // OWN UPDATE
        }

        function unLoad() {
            base.UnLoad();

            // OWN UNLOAD
            _inited = false;
        }

        function killSheep(obj)
        {

            base.RemoveChild(obj.parent);
            obj.Die();
            kebabs.push(sheeps.splice(sheeps.indexOf(obj.parent), 1)[0]);

        }

        var gameScene =
        {
            get mapP() { return mapP; },
            get tiledMap() { return tiledMap; },
            get logs() { return logs; },
            get wolf() { return wolf; },
            get sheeps() { return sheeps; },
            get kebabs() { return kebabs; },

            get groundOffset() { return groundOffset; },
            get gravity() { return gravity;},

            GetSheep: getSheep,
            ClosestSheepTo: ClosestSheepTo,

            Update: update,
            Render: base.Render,
            AddChild: base.AddChild,
            RemoveChild: base.RemoveChild,
            UnLoad: unLoad,
            resetBuffer : resetBuffer,
            killSheep : killSheep,
            moveMap : moveMap
        };

        return gameScene;
    }
});