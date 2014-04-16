define(function ()
{
    return function SpriteAnimation(row, col, frames, spd, revert)
    {
        var _fps = spd / (1000 / 60);
        var _row = row;
        var _col = col;
        var _frames = frames;
        var _mirror = revert ? revert : false;

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

        function render(cx, img, x, y, dx, dy)
        {
            cx.save();

            if (_mirror)
            {
                cx.translate(1280/2, 0);
                cx.scale(-1, 1);
                cx.translate(-1280 / 2, 0);
            }

            cx.drawImage(img, _col + dx * _step, dy * _row, dx, dy, x, y, dx, dy);

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