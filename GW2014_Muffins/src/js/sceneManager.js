define(['manifest/scenes', 'eventManager'], function (scenes, eventManager)
{
    var _current;

    function init()
    {
        var path = 'scenes/' + scenes.scenes[scenes.start];
        load(path);
    };

    function load(path)
    {
        require([path], function (scn) {
            if (scn)
            {
                if (_current) _current.UnLoad();
                _current = scn;

                eventManager.Fire('SCENE_LOADED', scn);
            }
        });
    }

    function loadScene(name)
    {
        var path = 'scenes/' + scenes.scenes[name];
        load(path);
    }

    return {
        Init: init,
        Load: loadScene,
        get currentScene()
        {
            return _current;
        }
    };
});