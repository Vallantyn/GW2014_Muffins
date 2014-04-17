define(['assetManager'], function (assetManager)
{
    return function SpriteRenderer(assetName, dx, dy)
    {
        var img = assetManager.Get(assetName);
        var _anims = {};
        var _dx = img.width / dx, _dy = img.height / dy;
        var _current;
        var _offset = { x: 0, y: 0 };

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

        function setOffset(x, y)
        {
            _offset.x = x;
            _offset.y = y;
        };

        function update(dt)
        {
            _anims[_current].Update(dt);
        };

        function render(cx, x, y, mirror)
        {
            _anims[_current].Render(cx, img, x, y, _dx, _dy, _offset, mirror);
        };

        var spriteRenderer =
        {
            AddAnim: addAnim,
            Play: play,
            SetOffset: setOffset,
            Update: update,
            Render: render
        };

        return spriteRenderer;
    }
});