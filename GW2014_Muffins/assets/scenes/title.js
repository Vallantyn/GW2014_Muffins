define(['scene', 'sceneManager', 'eventManager'], function (scene, sceneManager, eventManager)
{
    var title = new scene(init);
    
    function init()
    {
        var background, msg;

        background =
        {
            Render: function(cx)
            {
                cx.fillStyle = "black";
                cx.fillRect(0,0,1280, 720);
            }
        };

        msg =
        {
            str: "[PRESS SPACE]",
            blinkDelay: 1,
            blinkDuration: .4,
            blink: 0,
            state: 1,

            Init: function ()
            {
                msg.blink = 0;
                msg.state = 1;
            },

            Update: function(dt)
            {
                msg.blink += dt;

                switch (msg.state)
                {
                    case 0:
                        if (msg.blink >= msg.blinkDuration)
                        {
                            msg.state = 1;
                            msg.blink = 0;
                        }

                        break;
                    case 1:
                        if (msg.blink >= msg.blinkDelay)
                        {
                            msg.state = 0;
                            msg.blink = 0;
                        }

                        break;
                }
            },

            Render: function (cx)
            {
                if (msg.state == 1)
                {
                    var w = cx.measureText(msg.str).width / 2;

                    cx.font = "20pt Arial";
                    cx.fillStyle = 'white';
                    cx.fillText(msg.str, 1280 / 2 - w, 500);
                }
            }
        };

        title.AddChild(background);
        title.AddChild(msg);

        eventManager.Add('JUMP_UP', start);
    }

    function start() {
        eventManager.Remove('JUMP_UP', start);

        sceneManager.Load('level_selection');
    }

    return title;
});