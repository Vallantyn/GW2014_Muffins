define(['gameScene', 'sceneManager', 'eventManager', 'levels/testmap'], function (gameScene, sceneManager, eventManager, map)
{
    console.log(map);

    var sandbox = new gameScene(map, init);

    return sandbox;
});