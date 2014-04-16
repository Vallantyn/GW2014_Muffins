define(['assetManager'], function (assetManager)
{
    return function SpriteRenderer(assetName, dx, dy)
    {
        var img = assetManager.Get(assetName);
        var _anims = {};
        var _dx = img.width / dx, _dy = img.height / dy;
        var _current;

        function addAnim(name, anim, def)
        {
            if (!(anim in _anims))
            {
                _anims[name] = anim;
                if (def) _current = name;
            }
        };

        function play(name)
        {
            _current = name;
        };

        function update(dt)
        {
            _anims[_current].Update(dt);
        };

        function render(cx, x, y)
        {
            _anims[_current].Render(cx, img, x, y, _dx, _dy);
        };

        var spriteRenderer =
        {
            AddAnim: addAnim,
            Play: play,
            Update: update,
            Render: render
        };

        return spriteRenderer;
    }
});