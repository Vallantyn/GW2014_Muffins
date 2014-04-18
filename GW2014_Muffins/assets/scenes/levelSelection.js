define(['scene', 'sceneManager', 'eventManager'], function (scene, sceneManager, eventManager)
{
    var levelSelection = new scene(init);

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

    var _idx = 0;

    function keyUp()
    {
        _idx--;

        if (_idx < 0) _idx = menu.length - 1;
    }

    function keyDown()
    {
        _idx++;

        if (_idx >= menu.length) _idx = 0;
    }

    function action()
    {
        eventManager.Remove('JUMP_UP', action);
        eventManager.Remove('UP_UP', keyUp);
        eventManager.Remove('DOWN_UP', keyDown);

        sceneManager.Load(menu[_idx].level);
    }

    function update(dt)
    {

    }

    function render(cx)
    {
        cx.fillStyle = 'lightgrey';

        cx.beginPath();
        cx.arc(1280/3 + 10, 720/3 + _idx*40, 10, 0, 2* Math.PI);
        cx.closePath();
        cx.fill();

        for (var i = 0; i < menu.length; i++)
        {
            cx.fillText(menu[i].title, 1280 / 3 + 30, 720 / 3 + 10 + i * 40);
        }
    }

    function init()
    {
        var background, _menu;

        background =
        {
            Render: function (cx) {
                cx.fillStyle = "black";
                cx.fillRect(0, 0, 1280, 720);
            }
        };

        _menu =
        {
            Render: render
        };

        levelSelection.AddChild(background);
        levelSelection.AddChild(_menu);

        eventManager.Add('JUMP_UP', action);
        eventManager.Add('UP_UP', keyUp);
        eventManager.Add('DOWN_UP', keyDown);
    }

    function start()
    {

    }

    return levelSelection;
});