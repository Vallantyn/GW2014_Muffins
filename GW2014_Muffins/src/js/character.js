define(['character_log', 'character_gfx'], function (characterLog, characterGfx) {
    return function Character(x, y) {
        var log, gfx;
        log = new characterLog(x, y);
        gfx = new characterGfx(92, 92);

        function init() {
            log.Init();
            gfx.Init();
        };

        function update(dt) {
            log.Update(dt);
            gfx.Update(dt);
        };

        function render(cx) {
            gfx.Render(cx, log.character.x, log.character.y + log.character.yOffset);
        };

        return {
            get log() { return log.character;},
            Init: init,
            Update: update,
            Render: render
        };
    }
});