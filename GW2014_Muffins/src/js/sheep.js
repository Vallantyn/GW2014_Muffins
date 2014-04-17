define(['sheep_gfx', 'sheep_log'], function (sheepGfx, sheepLog)
{
    return function Sheep(x, y, id)
    {
        var log, gfx;
        log = new sheepLog(x, y, id);
        gfx = new sheepGfx();

        function init()
        {
            log.Init();
            gfx.Init(log.sheep.yOffset);
        };

        function update(dt)
        {
            log.Update(dt);
            gfx.Update(dt);
        };

        function render(cx)
        {
            gfx.Render(cx, log.sheep);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    };
});