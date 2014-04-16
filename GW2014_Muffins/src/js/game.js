define([
    'screen'
  , 'inputManager'
  , 'sceneManager'
  , 'eventManager'
  , 'requestAnimationFrame'
], function
(   screen
  , inputManager
  , sceneManager
  , eventManager
  , raf
){
    var loop;
    var _scene;
    var _id = 0;
    var _t = null;

    function init()
    {
        inputManager.Init();
        screen.Init();
        sceneManager.Init();

        eventManager.Add('SCENE_LOADED', function (scn)
        {
            console.log("SCENE LOADED");
            setScene(scn);
        });
    }

    function setScene(scn)
    {
        cancelAnimationFrame(loop);

        _scene = scn;
        tick(0);
    }

    function tick(timestamp)
    {
        var dt = 0;

        if (!!_t) dt = timestamp - _t;
        if (dt < 0) dt = 0;

        update(dt / 1000);
        render();

        loop = requestAnimationFrame(tick);

        _t = timestamp;
    }

    function update(dt)
    {
        _scene && _scene.Update(dt);
    }

    function render()
    {
        screen.Clear();

        _scene && _scene.Render(screen.back.context);

        screen.Swap();
    }

    function getId()
    {
        return _id++;
    }

    return {
        Init: init,
        GetId: getId
    };
});