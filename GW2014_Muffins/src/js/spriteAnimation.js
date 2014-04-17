define(function ()
{
    return function SpriteAnimation(row, col, frames, spd)
    {
        var _fps = spd / (1000 / 60);
        var _row = row;
        var _col = col;
        var _frames = frames;

        var _step = 0;
        var _frame = 0;

        function init()
        {
            _step = _frame = 0;
        }

        function update(dt)
        {
            _frame++;

            if (_frame > _fps)
            {
                _frame = 0;
                _step++;
            }

            if (_step >= _frames)
            {
                init();
            }
        }

        function render(cx, img, x, y, dx, dy, offset, mirror)
        {
            cx.save();

            if (mirror)
            {
                var ox = 1280 / 2 - (1280 / 2 - (x + 64));

                cx.translate(ox, 0);
                cx.scale(-1, 1);
                cx.translate(-ox, 0);
            }

            cx.translate(mirror? -offset.x : offset.x, offset.y);
            cx.drawImage(img, _col + dx * _step, dy * _row, dx, dy, x, y, dx, dy);
            cx.translate(mirror ? offset.x : -offset.x, -offset.y);

            cx.restore();
        }

        init();

        var spriteAnimation =
        {
            Update: update,
            Render: render
        };

        return spriteAnimation;
    };
});