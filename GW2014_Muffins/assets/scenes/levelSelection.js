define(['gameScene', 'sceneManager', 'eventManager', 'levels/testmap'], function (gameScene, sceneManager, eventManager, map)
{
    var sandbox = new gameScene(map);

    return sandbox;
});