﻿define(['sheep_gfx', 'sheep_log', 'eventManager'], function (sheepGfx, sheepLog, eventManager)
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
            log.sheep.parent = this;

            //console.log(log.sheep)
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
            get log() { return log.sheep; },

            Init: init,
            Update: update,
            Render: render
        };
    };
});