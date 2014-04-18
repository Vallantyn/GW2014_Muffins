define(['scene', 'sceneManager', 'eventManager', 'assetManager'], function (scene, sceneManager, eventManager, assetManager)
{
    var title = new scene(init);

    var bg = assetManager.Get('start_screen');
    var txt = assetManager.Get('press_space');

    var menu =
    [
        { title: 'SandBox', level: 'level_01' },

        { title: 'Tutorial Mouve', level: 'level_01' },
        { title: 'Tutorial Jeump', level: 'level_01' },
        { title: 'Tutorial Tepe', level: 'level_01' },
        { title: 'Tutorial Moothon', level: 'level_01' },
        { title: 'Tutorial Keel', level: 'level_01' },
        { title: 'Tutorial Pyaige', level: 'level_01' }
    ];

    var _menu =
    {
        Render: function (cx) {
            cx.fillStyle = '#392118';
            cx.font = '36px Cambria'

            cx.beginPath();
            cx.arc(2* 1280 / 5 + 10, 720 / 2 + _idx * 40, 10, 0, 2 * Math.PI);
            cx.closePath();
            cx.fill();

            for (var i = 0; i < menu.length; i++) {
                cx.fillText(menu[i].title, 2*1280 / 5 + 30, 720 / 2 + 10 + i * 40);
            }
        }
    };

    var background, msg;

    background =
    {
        Render: function (cx) {
            cx.drawImage(bg, 0, 0);
        }
    };

    msg =
    {
        str: "[PRESS SPACE]",
        blinkDelay: 1,
        blinkDuration: .4,
        blink: 0,
        state: 1,

        Init: function () {
            msg.blink = 0;
            msg.state = 1;
        },

        Update: function (dt) {
            msg.blink += dt;

            switch (msg.state) {
                case 0:
                    if (msg.blink >= msg.blinkDuration) {
                        msg.state = 1;
                        msg.blink = 0;
                    }

                    break;
                case 1:
                    if (msg.blink >= msg.blinkDelay) {
                        msg.state = 0;
                        msg.blink = 0;
                    }

                    break;
            }
        },

        Render: function (cx) {
            if (msg.state == 1) {
                cx.drawImage(txt, 1280 / 2 - txt.width / 2, 500);
            }
        }
    };

    var _idx = 0;

    function keyUp() {
        _idx--;

        if (_idx < 0) _idx = menu.length - 1;
    }

    function keyDown() {
        _idx++;

        if (_idx >= menu.length) _idx = 0;
    }

    function action() {
        eventManager.Remove('JUMP_UP', action);
        eventManager.Remove('UP_UP', keyUp);
        eventManager.Remove('DOWN_UP', keyDown);

        sceneManager.Load(menu[_idx].level);
    }

    function init()
    {
        title.AddChild(background);
        title.AddChild(msg);

        eventManager.Add('JUMP_UP', start);
    }

    function start()
    {
        eventManager.Remove('JUMP_UP', start);

        title.RemoveChild(msg);
        title.AddChild(_menu);

        eventManager.Add('JUMP_UP', action);
        eventManager.Add('UP_UP', keyUp);
        eventManager.Add('DOWN_UP', keyDown);
    }

    return title;
});