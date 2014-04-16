define(['eventManager', 'assetManager', 'game'], function(eventMgr, assMgr, game)
{
    function main()
    {
//        inputManager.Init();

        eventMgr.Add(assMgr.event.ASSETS_LOADED, function ()
        {
            game.Init();
        });
        assMgr.PreLoad();

        return 0;
    };
    
    return main
});