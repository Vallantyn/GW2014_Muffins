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

        var mapP = new mapParser;
        var mapImg;
        var tiledMap;

        function init()
        {
            tiledMap = mapP.parse(map);

            resetBuffer();

            base.AddChild({
            Render: function (cx)
            {
                cx.drawImage(mapImg.canvas, 0, 0);
            }});

            for (var i = 0; i < 7; i++)
            {
                var dx = 300 - Math.random() * 600;
                base.AddChild(new sheep(600 + dx , 250, i+1));
            }

            wolf = new character(300, 10);
            base.AddChild(wolf);

            _inited = true;
        }

        function resetBuffer()
        {
            mapImg = new buffer(1280, 720);
            for (var i = 0; i < tiledMap.length; i++)
                for (var j = 0; j < tiledMap[i].length; j++)
                    tiledMap[i][j].draw(mapImg.context);

        }

        function update() {
            if (!_inited) init();
            base.Update();

            // OWN UPDATE
        }

        function unLoad() {
            base.UnLoad();

            // OWN UNLOAD
            _inited = false;
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

            Update: update,
            Render: base.Render,
            AddChild: base.AddChild,
            RemoveChild: base.RemoveChild,
            UnLoad: unLoad,
            resetBuffer : resetBuffer
        };

        return gameScene;
    }
});