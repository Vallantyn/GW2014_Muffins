define(function () {
    return function Character() {
        function init()
        {

        };

        function update(dt)
        {

        };

        function render(cx)
        {
            cx.fillStyle = 'gold';
            cx.fillRect(10, 10, 20, 20);
        };

        return {
            Init: init,
            Update: update,
            Render: render
        };
    };
});