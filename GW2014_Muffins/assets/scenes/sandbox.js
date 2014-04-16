define(['scene', 'eventManager', 'sceneManager'], function (scene, eventManager, sceneManager)
{
    var sandbox = new scene(init);

    function init()
    {
        var bleh =
        {
            x: 10,
            y: 10,
            spd: 60,
            Init: function () {
                console.log("SB 01");
                bleh.x = 10;
                bleh.y = 10;
                eventManager.Add('ACTION_UP', end);
            },

            Update: function (dt) {
                bleh.x += dt * bleh.spd;
                bleh.y += dt * bleh.spd;
            },

            Render: function (cx) {
                cx.fillStyle = 'black';
                cx.fillRect(bleh.x, bleh.y, 10, 10);
            }
        }

        sandbox.AddChild(bleh);
    }

    function end()
    {
        eventManager.Remove('ACTION_UP', end);

        sceneManager.Load('test');
    }

    return sandbox;
});