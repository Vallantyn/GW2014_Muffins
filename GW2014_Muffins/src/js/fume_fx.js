define(['sceneManager', 'spriteRenderer', 'spriteAnimation', 'eventManager'], function (sceneManager, spriteRenderer, spriteAnimation, eventManager)
{
    return function FumeFx(type)
    {
        var types =
        {
            DISGUISE: 'disguise',
            TP: 'tp',
            LOG: 'log',
            BLOOD: 'blood',
            DEAD: 'dead',
            EXPLOSION: 'explosion'
        };

        var sprite = new spriteRenderer('fx_spritesheet', 10, 8);
        var _t = type;

        function init()
        {
            console.log('INIT');

            sprite.AddAnim(types.DISGUISE, new spriteAnimation(2, 0, 7, 100));
            sprite.AddEvent(types.DISGUISE, 2, 'DISGUISE_FX_CHANGE');
            sprite.AddEvent(types.DISGUISE, 6, 'DISGUISE_FX_END');

            sprite.AddAnim(types.LOG, new spriteAnimation(1, 0, 7, 100));
            sprite.AddEvent(types.LOG, 2, 'LOG_FX_SPAWN');
            sprite.AddEvent(types.LOG, 6, 'LOG_FX_END');

            sprite.Play(_t);
        }

        function update(dt)
        {
            sprite.Play(_t);
            sprite.Update(dt);
        }

        function render(cx)
        {
            var wolf = sceneManager.currentScene.wolf.log;
            sprite.Render(cx, wolf.x-96+44, wolf.y-96-24);
        }

        init();

        return {
            Init: init,
            Update: update,
            Render: render
        };

    }
});