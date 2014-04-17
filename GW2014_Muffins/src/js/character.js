define(function () {
    return function Character() {
        var log, gfx;
        log = new characterLog();
        gfx = new characterGfx();

        function init() {
            log.Init();
            gfx.Init();
        };

        function update(dt) {
            log.Update(dt);
            gfx.Update(dt);
        };

        function render(cx) {
            gfx.Render(cx);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    }
});