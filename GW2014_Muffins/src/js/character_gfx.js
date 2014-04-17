define(function () {
    return function CharacterGFX(w, h)
    {
        var color = 'blue';
        var width = w;
        var height = h;

        function init()
        {

        };

        function update(dt)
        {

        };

        function render(x, y)
        {
            cx.fillStyle = color;
            cx.fillRect(x, y, width, height);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    }
});