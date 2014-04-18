define(['scene', 'mapParser', 'buffer', 'character', 'sheep','ui', 'background', "assetManager", "eventManager"],function (scene, mapParser, buffer, character, sheep, UI, background, assetManager, eventManager)
{
    return function GameScene(map, initCb)
    {
        var _inited = false;
        var base = new scene(initCb);

        var wolf;// = new character();
        var sheeps = [];
        var sheepsSaved = [];
        var logs = [];
        var kebabs = [];
        var fx = [];
        var sheepsNeeded = 3;

        var groundOffset = 18;
        var gravity = .8;

        var mapP = new mapParser;
        var mapImg;
        var tiledMap;
        var ui;
        var bg;
        var zdeath = 1000;

        eventManager.Add("MOUTON_UP", popSheep);


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

            if(wolf.log.isHidden && wolf.log != target && wolf.log.isLeader)
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
                        if(sheep.leader == null || sheep.leader != target.ID)
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
            if(id == 0) return wolf;
            for (var i = 0; i < sheeps.length; i++) {
                if (sheeps[i].log.ID == id) return sheeps[i];
            }
        }

        function init()
        {

            tiledMap = mapP.parse(map);
            mapImg = new buffer(1280, 720);
            resetBuffer();

            var t = [assetManager.Get("plx1"),assetManager.Get("plx2"),assetManager.Get("plx3"),assetManager.Get("plx4"),assetManager.Get("plx5")];
            bg = new background(t);

            base.AddChild(bg);

            wolf = new character(1280/2 - 184/2, 10);
            base.AddChild(wolf);

            for (var i = 0; i < 9; i++)
            {
                var dx = 300 - Math.random() * 600;

                if(i == 3 ) 
                    var s = new sheep(600 + dx , 250, i+1, true);
                else
                    var s = new sheep(600 + dx , 250, i+1);


                sheeps.push(s);
                base.AddChild(s);
            }
            base.AddChild({
            Render: function (cx)
            {
                //cx.save();
               // cx.translate(150,0);
                cx.drawImage(mapImg.canvas, 0, 0);

                //cx.restore();
            }});

            ui = new UI(120,24);

            base.AddChild(ui);


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


            bg.Move(x);


            for (var i = 0; i < kebabs.length; i++) {
                kebabs[i].log.x += x;
                kebabs[i].log.y += y;
            };

            for (var i = 0; i < logs.length; i++) {
                logs[i].x += x;
                logs[i].y += y;
            };

            for (var i = 0; i < fx.length; i++) {
                fx[i].x += x;
                fx[i].y += y;
            };
        }

        function resetBuffer()
        {
            mapImg.context.clearRect(0,0,1280,720);
            for (var i = 0; i < tiledMap.length; i++)
                for (var j = 0; j < tiledMap[i].length; j++)
                    tiledMap[i][j].draw(mapImg.context);

        }


        function popSheep()
        {
            var s = new sheep(600, 250, sheeps.length+1,  Math.random() > 0.8);
            console.log("NEW MOUTON")
            s.Init();
            sheeps.push(s);
            base.AddChild(s);
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
//            base.RemoveChild(obj.parent);
            obj.Die();
            kebabs.push(sheeps.splice(sheeps.indexOf(obj.parent), 1)[0]);
        }

        var gameScene =
        {
            get mapP() { return mapP; },
            get ui() { return ui; },
            get bg() { return bg; },
            get tiledMap() { return tiledMap; },
            get logs() { return logs; },
            get fx() { return fx; },
            get wolf() { return wolf; },
            get sheeps() { return sheeps; },
            get sheepsSaved() {return sheepsSaved;},
            get sheepsNeeded() { return sheepsNeeded;},
            get kebabs() { return kebabs; },
            get zdeath() { return zdeath; },

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